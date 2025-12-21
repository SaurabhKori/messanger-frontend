import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SecureStorageService } from '../auth/secure-storage.service';
import { ChatHeaderService } from '../Service/chat-header.service';

@Component({
  selector: 'app-chat-header',
  imports: [ReactiveFormsModule],
  templateUrl: './chat-header.component.html',
  styleUrl: './chat-header.component.css'
})
export class ChatHeaderComponent {
showFilter = false;
@Output() showContact= new EventEmitter<boolean>();
  showAddContact = false;
  newContactNumber!: FormGroup;
   constructor(private fb:FormBuilder,private secureStorage:SecureStorageService,private chatheaderService:ChatHeaderService){
     this.newContactNumber=this.fb.group({
       userPhone: ['', [Validators.required, Validators.pattern('^[6-9][0-9]{9}$'), Validators.maxLength(10), Validators.minLength(10)]],
     })
   }
  toggleFilter() {
    this.showFilter = !this.showFilter;
  }

  openContacts() {
    this.showFilter = false;
   this.showContact.emit(true);
    console.log('Open Contacts');
  }

  openAddContactPopup() {
    this.showFilter = false;
    this.showAddContact = true;
  }

  closeAddContactPopup() {
    this.showAddContact = false;
    this.newContactNumber.reset()
  }

  saveContact() {
    console.log('Saving contact:', this.newContactNumber);
    // Add your save logic here
    if(this.newContactNumber.invalid){
      this.newContactNumber.markAllAsTouched()
    }else{
      let data=this.newContactNumber.value
      data.user_id=this.secureStorage.getItem('userid');
      this.chatheaderService.addContact(data).subscribe({
        next:(res)=>{
          console.log(res)
        },
        error:()=>{
          console.log()
        }
      })
      
    }
    this.closeAddContactPopup();
  }

  viewFavourites() {
    this.showFilter = false;
    console.log('View Favourites');
  }

}
