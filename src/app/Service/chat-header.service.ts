import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subscriber } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { EncDecryptionService } from './enc-decryption.service';

@Injectable({
  providedIn: 'root'
})
export class ChatHeaderService {
   url:string=environment.apiUrl
  constructor(private http:HttpClient,private encryDecryp:EncDecryptionService) { }

  addContact(obj:any):Observable<any>{
   let encryt= this.encryDecryp.encryptionAES256(obj)
    this.encryDecryp.decryptionAES256(encryt)
     console.log(encryt)
    const headers =new HttpHeaders()
     headers.append('Content-Type', 'application/json');
    let payload= {payload:encryt}
    

 return this.http.post(`${this.url}/addContact`,payload,{headers}).pipe(map(res=>{
    return res;
  }))
  }
 
}
