import { HttpInterceptorFn } from '@angular/common/http';
import { SecureStorageService } from './secure-storage.service';
import { inject } from '@angular/core';
import {isTokenExpired } from '../helper/jwt-utils';
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const secureStorage =inject(SecureStorageService)
  
  const token =secureStorage.getItem("token")
  if(token && isTokenExpired(token.toString())){
  const cloned=  req.clone({setHeaders:{
      Authorization:`Bearer ${token}`
    }})
    return next(cloned)
  }
  
  return next(req);
};
