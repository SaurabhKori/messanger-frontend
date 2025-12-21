import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SecureStorageService } from './secure-storage.service';
import { getTokenExpiration, isTokenExpired } from '../helper/jwt-utils';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private logoutTimer: any;

  constructor(private secureStorage: SecureStorageService, private router: Router) {}

  initSessionWatcher(): void {
    const token = this.secureStorage.getItem<string>('token');

    if (!token || isTokenExpired(token)) {
      this.logout(); // Immediately logout if expired
      return;
    }

    const expiresAt = getTokenExpiration(token);
    const delay = expiresAt! - Date.now();

    this.logoutTimer = setTimeout(() => {
      this.logout();
      return; 
    }, delay);
    this.router.navigate(['/chats'], { queryParams: { userid: this.secureStorage.getItem("userid")} });
    console.log('Auto logout scheduled in:', delay / 1000, 'seconds');
  }

  logout(): void {
    this.secureStorage.clear();
    this.router.navigate(['/login-reg']);
    console.log('Logged out due to token expiration');
  }
}
