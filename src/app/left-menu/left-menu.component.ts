import { Component } from '@angular/core';
import { ProfileComponent } from '../profile/profile.component';
import { ProfileSignalService } from '../store/profile_signal.service';
import { SecureStorageService } from '../auth/secure-storage.service';
import { UserregistrationserviceService } from '../Service/userregistrationservice.service';


@Component({
  selector: 'app-left-menu',
  imports: [ProfileComponent],
  templateUrl: './left-menu.component.html',
  styleUrl: './left-menu.component.css'
})
export class LeftMenuComponent {
  
   showProfilePanel = false;
   profilePic:string=''
   constructor(public profileSignalService:ProfileSignalService,
     private secureStorage: SecureStorageService,
      private usereg: UserregistrationserviceService,
   ){
    this.profilePic=this.profileSignalService.getProfilePic().profilePic
     if(this.profileSignalService.getProfilePic().profilePic=='' || !this.profileSignalService.getProfilePic().profilePic){
    this.loadUserProfile();
    }
   }
openProfile() {
    this.showProfilePanel = true;
  }

  closeProfile() {
    this.showProfilePanel = false;
  }
   loadUserProfile() {
    // Load user data from storage or API
    const userid= this.secureStorage.getItem<string>('userid');
    console.log(this.secureStorage.getItem('username'),userid)
    this.usereg.getFileByDestination({userid:userid,destination:'profile'}).subscribe(res=>{
      console.log(res,"----")
      if(res.success==true){
        
        //  this.user = {
          let name= this.secureStorage.getItem<string>('username');
          let status=  "Available";
          this.profilePic= res["payload"]["base64"] ?'data:image/png;base64,'+ res["payload"]["base64"]:''
          // this.payload.set(this.profilePic);
        this.profileSignalService.setProfilePic({
          profilePic: this.profilePic,
          profileName: name||'User',
          profileStatus: status,
          profileId:res["payload"]["file_id"]?res["payload"]["file_id"]:'',
          profileUrl:res["payload"]["fileurl"]?res["payload"]["fileurl"]:''
        });
          console.log(this.profileSignalService.getProfilePic())
      
        // };
      }
    })
   
  }
}
