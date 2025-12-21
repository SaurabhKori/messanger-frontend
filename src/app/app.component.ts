import { Component, OnInit } from '@angular/core';

// import { LoginRegComponent } from "./login-reg/login-reg.component";
// import { ChatsComponent } from "./chats/chats.component";

import { RouterOutlet } from '@angular/router';
import { AuthService } from './auth/auth.service';
// import { ChatsComponent } from "./chats/chats.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'whatsapp';
  constructor(private authService: AuthService){}
  ngOnInit(): void {
    this.authService.initSessionWatcher()
  }
  
}
