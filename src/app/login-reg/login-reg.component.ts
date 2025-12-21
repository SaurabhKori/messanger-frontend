import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserregistrationserviceService } from '../Service/userregistrationservice.service';
import { SecureStorageService } from '../auth/secure-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-reg',
  imports: [ReactiveFormsModule,],
  templateUrl: './login-reg.component.html',
  styleUrl: './login-reg.component.css'
})
export class LoginRegComponent implements OnInit {
  [x: string]: any;
  reg!: FormGroup;
  constructor(private fb: FormBuilder, private usereg: UserregistrationserviceService, private secureStorage: SecureStorageService,private router:Router) {
    this.reg = this.fb.group({
      user_name: [''],
      userPhone: ['', [Validators.required, Validators.pattern('^[6-9][0-9]{9}$'), Validators.maxLength(10), Validators.minLength(10)]],
      user_password: ['', [Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{8,}$')]]
    })

  }
  ngOnInit(): void {
    
  }
  isLogin: boolean = true;
  toggleForm() {

    this.isLogin = !this.isLogin
    let username = this.reg.get('user_name')
    if (!this.isLogin) {
      username?.setValidators([Validators.required, Validators.pattern('^[a-zA-Z ]+$')])
    } else {
      username?.clearValidators()
    }
    username?.updateValueAndValidity()
  }
  login() {
    if (this.reg.valid) {
      this.usereg.userLogin(this.reg.value).subscribe(res => {
        console.log("Login---", res)
        if (res && res["success"]==true) {
          this.secureStorage.setItem("token", res["payload"]["token"])
          this.secureStorage.setItem("userid", res["payload"]["user"]["userId"])
          this.secureStorage.setItem("usernumber", res["payload"]["user"]["userPhone"])
          this.secureStorage.setItem("username", res["payload"]["user"]["user_name"])
          // this.router.navigateByUrl("/chats")
          this.router.navigate(['/chats'], { queryParams: { userid: this.secureStorage.getItem("userid")} });
          this.reg.reset()
        } else {
          this.secureStorage.removeItem("token")
        }
      })
    } else if (this.reg.invalid) {
      this.reg.markAllAsTouched()
    }
  }
  register() {

    if (this.reg.valid) {
      console.log(this.reg.value);
      this.usereg.userRegistration(this.reg.value)
        .subscribe(res => {
          if (res && res.success == true) {
            this.reg.reset()
          } else {

          }
        })

    } else if (this.reg.invalid) {

      this.reg.markAllAsTouched();
      return
    }

  }
}
