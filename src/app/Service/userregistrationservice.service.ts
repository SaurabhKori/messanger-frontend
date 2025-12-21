import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subscriber } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { EncDecryptionService } from './enc-decryption.service';

@Injectable({
  providedIn: 'root'
})
export class UserregistrationserviceService {
   url:string=environment.apiUrl
  constructor(private http:HttpClient,private encryDecryp:EncDecryptionService) { }

  userRegistration(obj:any):Observable<any>{
   let encryt= this.encryDecryp.encryptionAES256(obj)
    this.encryDecryp.decryptionAES256(encryt)
     console.log(encryt)
    const headers =new HttpHeaders()
     headers.append('Content-Type', 'application/json');
    let payload= {payload:encryt}
    

 return this.http.post(`${this.url}/userReg`,payload,{headers}).pipe(map(res=>{
    return res;
  }))
  }
  userLogin(obj:any):Observable<any>{
   let encrypt=this.encryDecryp.encryptionAES256(obj)
   console.log(encrypt)
   const headers =new HttpHeaders()
   headers.append('Content Type','appliction/json');
   let payload={payload:encrypt}
  return this.http.post<any>(`${this.url}/login`,payload,{headers}).pipe(map(res=>{
      let value=  this.encryDecryp.decryptionAES256(res.payload);
      res.payload=value;
     
    return res;
   }))
  }
  uploadFile(obj:any):Observable<any>{
    const headers =new HttpHeaders()
   return this.http.post<any>(`${this.url}/uploadAttachment`,obj).pipe(map(res=>{
     console.log(res)
       let value=  this.encryDecryp.decryptionAES256(res.payload);
      res.payload=value;
       console.log(res)
     return res;
    }))
   }
   uploadFiles(obj:any):Observable<any>{
    const headers =new HttpHeaders()
   return this.http.post<any>(`${this.url}/uploadAttachment`,obj).pipe(map(res=>{
     console.log(res)
       let value=  this.encryDecryp.decryptionAES256(res.payload);
      res.payload=value;
       console.log(res)
     return res;
    }))
   }
   getFileByDestination(obj:any):Observable<any>{
    console.log(obj)
       let encrypt=this.encryDecryp.encryptionAES256(obj)
   console.log(encrypt)
   const headers =new HttpHeaders()
   headers.append('Content Type','appliction/json');
   let payload={payload:encrypt}
  return this.http.post<any>(`${this.url}/getFileByDestination`,payload,{headers}).pipe(map(res=>{
      let value=  this.encryDecryp.decryptionAES256(res.payload);
      res.payload=value;
     
    return res;
   }))
    // let encrypt=this.encryDecryp.encryptionAES256(obj);
    // const headers=new HttpHeaders();
    // headers.append('Content Type','application/json')
    // let payload={paylaod:encrypt}
    //  console.log(payload)
    // return this.http.post<any>(`${this.url}/getFileByDestination`,payload,{headers}).pipe(map(res=>{
    //     if(res.payload){
    //       let value=this.encryDecryp.decryptionAES256(res.payload)
    //        res.payload=value;
    //        console.log(res)
    //     }
    //     return res;
    // }))
   }
}
