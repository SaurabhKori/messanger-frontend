import { Injectable } from '@angular/core';
import SecureStorage from 'secure-web-storage';
import { environment } from '../../environments/environment.development';
import * as crypto from 'crypto-js'
const SECRET_KEY = environment.secretKey;
@Injectable({
  providedIn: 'root'
})
export class SecureStorageService {
  private secureStorage: SecureStorage

  constructor() {
    this.secureStorage = new SecureStorage(localStorage, {
      hash: (key) => crypto.SHA256(key + SECRET_KEY).toString(),
      encrypt: (data) => {
        if (typeof data !== 'string') {
          throw new Error('Invalid data passed to encryption. Expected a string.');
        }
        return crypto.AES.encrypt(data, SECRET_KEY).toString()
      },
      decrypt: (data) =>
        crypto.AES.decrypt(data, SECRET_KEY).toString(crypto.enc.Utf8)
    });

  }
  setItem(key: string, value: any): void {
    if (value === undefined || value === null) {
      console.warn(`SecureStorageService: Skipping storage for key "${key}" due to invalid value.`);
      return;
    }
    this.secureStorage.setItem(key, JSON.stringify(value));
  }

  getItem<T>(key: string): T | null {
    const value = this.secureStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : null;
  }

  removeItem(key: string): void {
    this.secureStorage.removeItem(key);
  }

  clear(): void {
    this.secureStorage.clear();
  }
}
