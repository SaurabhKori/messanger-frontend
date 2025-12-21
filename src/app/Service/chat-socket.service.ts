
import { Injectable } from '@angular/core';
import { Client, IMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client/dist/sockjs';
import { environment } from '../../environments/environment.development';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SecureStorageService } from '../auth/secure-storage.service';
@Injectable({ providedIn: 'root' })
export class ChatSocketService {
   
  private client!: Client;
  url:string=environment.apiUrl
  constructor(private http:HttpClient,private secureStorage: SecureStorageService) { }
  connect(jwt: any, onMessage: (msg: any) => void, onStatus: (msg: any) => void) {

    this.client = new Client({

      webSocketFactory: () =>
        new SockJS(`${this.url}/ws?token=${jwt}`),

      reconnectDelay: 5000,

      onConnect: () => {
        console.log('✅ WS CONNECTED');

        this.client.subscribe('/user/queue/messages', (m: IMessage) => {
          onMessage(JSON.parse(m.body));
        });
         // 🔹 STATUS UPDATE (✔✔ / ✔✔ blue)
      this.client.subscribe('/user/queue/status', (m: IMessage) => {
        onStatus(JSON.parse(m.body));
      });
      },
    
     
      debug: () => {}
    });

    this.client.activate();
  }
 
 subscribeTyping(callback: (data: any) => void) {
  console.log('🟡 subscribing to /user/queue/typing');

  this.client.subscribe('/user/queue/typing', msg => {
    console.log('📥 raw typing message', msg.body);
    callback(JSON.parse(msg.body));
  });
}


  sendTyping(senderId: number, receiverId: number, typing: boolean) {
    this.client.publish({
      destination: '/app/chat.typing',
      body: JSON.stringify({ senderId, receiverId, typing })
    });
  }
  sendText(receiverId: any, text: string,messageType:string,attachmentId:any) {
    if (!this.client?.connected) {
      console.warn('WS not connected');
      return;
    }

    this.client.publish({
      destination: '/app/chat.private',
      body: JSON.stringify({
        receiverId,
        attachmentId:attachmentId?attachmentId:null,
        content: text,
        messageType: messageType
      })
    });
  }

  chatHistory(selectedUserId:any):Observable<any>{
    const jwt = this.secureStorage.getItem("token")
  return  this.http.get<any[]>(
    `${this.url}/chat/history/${selectedUserId}`,
    { headers: { Authorization: 'Bearer ' + jwt } }).pipe(map(res=>{
      
       return res;
     }))
  }
  markSeen(messageId: number) {
  this.client.publish({
    destination: '/app/chat.seen',
    body: JSON.stringify({ messageId })
  });
}

}

