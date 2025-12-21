import { CommonModule, JsonPipe, NgClass } from '@angular/common';
import { Component, ElementRef, NgModule, OnInit, ViewChild } from '@angular/core';
import { ChatdetailsComponent } from "../chatdetails/chatdetails.component";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core'; // Needed for native Date adapter
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { LeftMenuComponent } from "../left-menu/left-menu.component";
import { ChatHeaderComponent } from "../chat-header/chat-header.component";
import { ChatService } from '../Service/chat.service';
import { SecureStorageService } from '../auth/secure-storage.service';
import { ChatSocketService } from '../Service/chat-socket.service';
import { UserregistrationserviceService } from '../Service/userregistrationservice.service';
import { environment } from '../../environments/environment.development';
import { HttpEventType } from '@angular/common/http';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
@Component({
  selector: 'app-chats',
  imports: [NgClass, ChatdetailsComponent, MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatButtonModule, FormsModule, LeftMenuComponent, CommonModule, PickerModule, ChatHeaderComponent,],
  templateUrl: './chats.component.html',
  styleUrl: './chats.component.css'
})
export class ChatsComponent implements OnInit {

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  input_click: boolean = false;
  input_drag: string = ''
  contactsChat: any[] = []
  open: any;
  contactDetails: any;
  messages: any[] = [];
  text = '';
  userId: any;
  messageType: string = "text";
  attachmentId: any = null;
  showEmoji = false;
  url: string = environment.apiUrl;
  typingTimeout: any;
  typingUserId :any;
isTyping = false;
  constructor(private chat: ChatService, private secureStorage: SecureStorageService, private socket: ChatSocketService,
    private usereg: UserregistrationserviceService
  ) {

  }
  @ViewChild('chatBody') chatBody!: ElementRef;

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    try {
      this.chatBody.nativeElement.scrollTop =
        this.chatBody.nativeElement.scrollHeight;
    } catch { }
  }
  ngOnInit(): void {
    this.getChatAndContactDetails();

    const jwt = this.secureStorage.getItem("token")
    this.userId = this.secureStorage.getItem("userid");
   

    this.socket.connect(
      jwt,

      // new message
      (msg) => {
        this.messages.push(msg);
        if (
          this.contactDetails &&
          msg.sender.userId === this.contactDetails.contactUser.userId
        ) {
          this.socket.markSeen(msg.messageId);
        }
      },

      // delivered / seen
      (updated) => {
        const local = this.messages.find(
          m => m.messageId === updated.messageId
        );
        if (local) {
          local.deliveredAt = updated.deliveredAt;
          local.seenAt = updated.seenAt;
        }
      }
    );
 

  }
  drag() {
    this.input_drag = 'open'
    console.log(this.input_drag)
  }
  //  get inputClasses() {
  //   if (this.input_drag === 'open') return 'anima';
  //   if (this.input_drag === 'close') return 'anime_close';
  //   return 'relative -top-12';
  // }

  getChatAndContactDetails() {
    this.contactsChat = []
    this.chat.getAllContact({ user_id: this.secureStorage.getItem("userid") }).subscribe(
      {
        next: (res) => {
          console.log("res---->", res);
          this.contactsChat = res.payload || []
        },
        error: (err) => {
          console.log("error ------>", err)
        }
      }
    )
  }
  receiveContactId(contactDetails: any) {
    console.log("dfdfdfdf--------", contactDetails)
    this.contactDetails = contactDetails;
    this.isTyping = false;
  this.typingUserId = null;

  this.socket.subscribeTyping(data => {
    console.log('📥 typing received', data);

    if (data.senderId === this.contactDetails.contactUser.userId) {
      this.isTyping = data.typing;
      this.typingUserId = data.senderId;
    }
  });
    this.loadChathistory();
  }
  showContact(event: any) {
    this.getChatAndContactDetails()

  }
  send() {
    if (this.messageType == "text") {
      if (this.text == null || this.text == '') return;
      this.socket.sendText(this.contactDetails.contactUser.userId, this.text, this.messageType, this.attachmentId);
      this.text = '';
    } else {
      this.selectedFile = this.selectedFiles[0]
      if (this.selectedFile == null) return;
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('userId', this.userId.toString());
      formData.append('destination', 'chat');
      console.log(formData)
      //  console.log(bass64)
      this.usereg.uploadFile(formData).subscribe(res => {
        console.log("res----", res)
        this.attachmentId = res.payload.file_id
        this.socket.sendText(this.contactDetails.contactUser.userId, this.text, this.messageType, this.attachmentId);
      })
      this.attachmentId = null
      this.text = '';
      this.messageType = "text"
      this.closePreview();
    }


    console.log("mseaase", this.messages)
  }
  loadChathistory() {
    if (this.contactDetails != null) {
      this.socket.chatHistory(this.contactDetails.contactUser.userId).subscribe({
        next: (res) => {
          this.messages = res
          this.messages
            .filter(m =>
              m.sender.userId === this.contactDetails.contactUser.userId &&
              !m.seenAt
            )
            .forEach(m => {
              this.socket.markSeen(m.messageId);
            });
          console.log(res)
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
  }

  selectedFile!: File;
  previewFiles: any[] = [];
  selectedFiles: File[] = [];
  activePreview: string | null = null;

  // onFileSelect(event: any) {
  //   this.selectedFile = event.target.files[0];
  //   this.messageType="file"
  //     const reader = new FileReader();
  //   reader.onload = () => {
  //     this.previewUrl = reader.result as string;
  //   };
  //   reader.readAsDataURL(this.selectedFile);
  // }

  onFileSelect(event: any) {
    const files: File[] = Array.from(event.target.files);
    if (!files.length) return;

    for (const file of files) {
      this.selectedFiles.push(file);
      this.previewFiles = []
      this.activePreview = null
      const reader = new FileReader();
      reader.onload = () => {
        const preview = reader.result as string;
        this.previewFiles.push(preview);
        if (!this.activePreview) {
          this.activePreview = preview;
        }
      };

      reader.readAsDataURL(file);
    }
    this.messageType = "file"

    // console.log('FILES:', this.selectedFiles);
    // console.log('PREVIEWS:', this.previewFiles);
  }


  closePreview() {
    this.messageType='text'
    this.previewFiles = [];
    this.selectedFiles = [];
    this.activePreview = null;
    this.text = '';
  }

  openFileInput() {
    this.fileInput.nativeElement.click();
  }
  uploadProgress: number = 0
  previewUrl: any
  resetFileState() {
    // this.selectedFile =null;
    this.previewUrl = null;
    this.uploadProgress = 0;
    this.messageType = 'text';
    this.attachmentId = null;
  }

  cancelUpload() {
    this.resetFileState();
  }

  sendFiles() {
    if (!this.selectedFiles.length) return;

    const formData = new FormData();
    this.selectedFiles.forEach(f => formData.append('files', f));
    formData.append('destination', 'chat');
    formData.append('userId', this.userId.toString());

    this.usereg.uploadFiles(formData)
      .subscribe(event => {

        if (event.type === HttpEventType.UploadProgress && event.total) {
          this.uploadProgress = Math.round(
            (event.loaded / event.total) * 100
          );
        }

        if (event.type === HttpEventType.Response) {
          const attachments = event.body.payload;

          attachments.forEach((att: any) => {
            this.socket.sendText(
              this.contactDetails.contactUser.userId,
              this.text,
              'file',
              att.file_id
            );
          });

          this.closePreview();
        }
      });
  }
  addEmoji(event: any) {
    this.text += event.emoji.native;
  }
  onTyping() {
    console.log('⌨️ typing event fired')
    this.isTyping=true
  this.socket.sendTyping(
    this.userId,
    this.contactDetails.contactUser.userId,
    true
  );

  clearTimeout(this.typingTimeout);
  this.typingTimeout = setTimeout(() => {
    this.socket.sendTyping(
      this.userId,
      this.contactDetails.contactUser.userId,
      false
    );
    this.isTyping=false
  }, 1200);
}
}
