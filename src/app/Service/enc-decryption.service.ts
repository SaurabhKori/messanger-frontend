import { Injectable } from '@angular/core';
import * as crypto from 'crypto-js';
import { environment } from '../../environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class EncDecryptionService {

  constructor() { }
 secretKey :any= crypto.enc.Utf8.parse(environment.aesKey128);
 iv:any=crypto.enc.Base64.parse(environment.ivkey)

   encryptionAES256(data:any){
    console.log(this.secretKey)
    let jsonData=JSON.stringify(data)
 let encryptData =  crypto.AES.encrypt(jsonData,this.secretKey,{
  iv:this.iv,
  mode:crypto.mode.CBC,
  padding:crypto.pad.Pkcs7
 })
  // console.log(encryptData.toString(),encryptData)
 return encryptData.toString()

   }
  decryptionAES256(data:any){

    let decryptData=crypto.AES.decrypt(data,this.secretKey,{
      iv:this.iv,
  mode:crypto.mode.CBC,
  padding:crypto.pad.Pkcs7
    })
    let decryptedText = decryptData.toString(crypto.enc.Utf8);
    // console.log(decryptData,JSON.parse(decryptData.toString(crypto.enc.Utf8)))
     try {
    const json = JSON.parse(decryptedText);
    console.log("Decrypted JSON:", json);
    return json;
  } catch (e) {
    console.error("Failed to parse JSON:", e);
    return decryptedText;
  }
  }
}
