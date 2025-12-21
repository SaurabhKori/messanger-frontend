import { effect, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ProfileSignalService{
 private profilePic = signal<{profilePic: string, profileName: string, profileStatus: string,profileId:string,profileUrl:string}>({
    profilePic: '',
    profileName: '',
    profileStatus: 'Available',
    profileId:'',
    profileUrl:''
  });
   setProfilePic(value: {profilePic: string, profileName: string, profileStatus: string,profileId:string,profileUrl:string}) {
    this.profilePic.set(value);
  }
 constructor(){
    effect(() => {
      console.log('Profile picture updated:', this.profilePic());
    });
    console.log(this.profilePic())
 }
 getProfilePic(){
  return  this.profilePic();
 }
 
}