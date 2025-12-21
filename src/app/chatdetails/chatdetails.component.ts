import { Component, EventEmitter, Input, Output } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-chatdetails',
  imports: [CommonModule],
  templateUrl: './chatdetails.component.html',
  styleUrl: './chatdetails.component.css'
})
export class ChatdetailsComponent {
  @Input() contactChat:any[]=[]
  @Output() sendContactId = new EventEmitter<number>();
  url:string=environment.apiUrl;
  selectContact(contactDetails:any) {
    this.sendContactId.emit(contactDetails);
  }
}
