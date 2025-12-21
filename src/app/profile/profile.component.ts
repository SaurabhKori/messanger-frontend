import { Component, EventEmitter, Output, OnInit, ViewChild, ElementRef, ChangeDetectorRef, Signal, signal } from '@angular/core';
import { Router } from '@angular/router';
import { SecureStorageService } from '../auth/secure-storage.service';
// import { UserService } from '../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../environments/environment';
// import { FileItem, FileUploader, FileUploaderItem } from 'ng2-file-upload';
import { Inject } from '@angular/core';
import { LinkedDevicesDialogComponent } from '../dialogs/linked-devices/linked-devices.component';
import { PrivacySettingsDialogComponent } from '../dialogs/privacy-settings/privacy-settings.component';
import { SettingsDialogComponent } from '../dialogs/settings/settings.component';
import { EditProfileDialogComponent } from '../dialogs/edit-profile/edit-profile.component';
import { UserregistrationserviceService } from '../Service/userregistrationservice.service';
import { ProfileSignalService } from '../store/profile_signal.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  payload:any=signal('')
  user: any = {
    name: '',
    status: 'Available',
    profilePic: '/assets/images/default-profile.png'
  };
  name:any='User'
  status:any= 'Available'
  profilePic:any= '/assets/images/default-profile.png'
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  userid: any;
  // uploader!: FileUploader;

  constructor(
    private router: Router,
    private secureStorage: SecureStorageService,
    private usereg: UserregistrationserviceService,
    @Inject(MatDialog) public dialog: MatDialog,
    @Inject(MatSnackBar) private snackBar: MatSnackBar,
    private cdr:ChangeDetectorRef,
    public profileSignal:ProfileSignalService
  ) {
     this.userid= this.secureStorage.getItem("userid");
  }

  ngOnInit() {
    this.profilePic=this.profileSignal.getProfilePic()
     if(this.profileSignal.getProfilePic().profilePic=='' || !this.profileSignal.getProfilePic().profilePic){
    this.loadUserProfile();
    }
    
  
  }

  // File upload methods
  openFileInput() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    console.log(file);
    if (file) {

      if (file.type.startsWith('image/')) {
        // let bass64:string='';
        // let type:string=file.type.split('/')[1]
        // let filename:string=file.name
        // const reader = new FileReader();
        // reader.readAsDataURL(file)
        // reader.onload = () => {
        //  bass64 = (reader.result as string).split(',')[1];
        //  let payload={
        //   file_name:filename,
        //   file_type:type,
        //   base64:bass64,
        //   userId:this.userid,
        //   destination:"profile"
        // }  
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);
        formData.append('userId', this.userid.toString());
        formData.append('destination', 'profile');
        console.log(formData)
        //  console.log(bass64)
        this.usereg.uploadFile(formData).subscribe(res => {
          console.log(res)
          this.loadUserProfile()
        })
        // console.log(payload)
        // }
        // reader.onerror = (error) => {
        //   console.error('Error reading file:', error);
        // }


      }
      // this.uploader.uploadItem(new FileUploaderItem(file));
    }
  }

  saveUserProfile() {
    this.secureStorage.setItem('user', JSON.stringify(this.user));
  }

  loadUserProfile() {
    // Load user data from storage or API
    const userData = this.secureStorage.getItem<string>('userid');
    console.log(this.secureStorage.getItem('username'))
    this.usereg.getFileByDestination({userid:this.userid,destination:'profile'}).subscribe(res=>{
      console.log(res,"----")
      if(res.success==true){
        
        //  this.user = {
          this.name= this.secureStorage.getItem('username')|| '',
          this.status=  'Available',
          this.profilePic= res["payload"]["base64"] ?'data:image/png;base64,'+ res["payload"]["base64"]:''
          this.payload.set(this.profilePic);
          this.profileSignal.setProfilePic({
          profilePic: this.profilePic,
          profileName: this.name||'',
          profileStatus: this.status,
          profileId:res["payload"]["file_id"]?res["payload"]["file_id"]:'',
           profileUrl:res["payload"]["fileurl"]?res["payload"]["fileurl"]:''
        });
          // console.log(this.profileSignal.getProfilePic())
          // console.log(this.profilePic,res["payload"]["fileurl"])
        // };
      }
    })
    // if (userData) {
    //   try {
    //     const parsedData = JSON.parse(userData);
    //     this.user = {
    //       name: parsedData.name || '',
    //       status: parsedData.status || 'Available',
    //       profilePic: parsedData.profilePic || ''
    //     };
    //   } catch (error) {
    //     console.error('Error parsing user data:', error);
    //     this.user = {
    //       name: '',
    //       status: 'Available',
    //       profilePic: ''
    //     };
    //   }
    // }
  }

  closePanel() {
    this.close.emit();
  }

  logout() {
    this.secureStorage.clear();
    this.router.navigateByUrl("/login-reg");
  }

  editProfile() {
    const dialogRef = this.dialog.open(EditProfileDialogComponent, {
      width: '500px',
      data: { user: this.user }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.user = result;
        this.secureStorage.setItem('user', JSON.stringify(this.user));
        this.snackBar.open('Profile updated successfully!', 'Close', {
          duration: 3000
        });
      }
    });
  }

  openStarredMessages() {
    this.router.navigate(['/starred-messages']);
  }

  openPrivacySettings() {
    const dialogRef = this.dialog.open(PrivacySettingsDialogComponent, {
      width: '600px'
    });
  }

  openLinkedDevices() {
    const dialogRef = this.dialog.open(LinkedDevicesDialogComponent, {
      width: '600px'
    });
  }

  openSettings() {
    const dialogRef = this.dialog.open(SettingsDialogComponent, {
      width: '600px'
    });
  }
}
