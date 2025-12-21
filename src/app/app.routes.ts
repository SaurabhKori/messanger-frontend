import { Routes } from '@angular/router';
import { LoginRegComponent } from './login-reg/login-reg.component';
import { ChatsComponent } from './chats/chats.component';

export const routes: Routes = [
    {path:'',redirectTo:'login-reg',pathMatch:'full'},
    {path:'login-reg',component:LoginRegComponent},
    {path:'chats',component:ChatsComponent}
];
