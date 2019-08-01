import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs/Observable';
// import { map } from 'rxjs/add/operator/map';
// import { promise } from 'rxjs/add/operator/toPromise';

import { Ticket } from './ticket.model';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  ticket: Ticket;
  readonly baseURL ='http://localhost:3000/tickets';
  readonly paymentsBaseURL ='http://localhost:3000/payments';
  readonly countURL='http://localhost:3000/ticketsCount';
  constructor(private http:HttpClient) { }

  getTicket() {
    return this.http.post(this.baseURL,"");
  }

  getPaymentDetails(tckt: Ticket){
    console.log(tckt['value']);
    return this.http.get(this.baseURL+ `/${tckt['value']}`);
  }
  payTicket(tckt: string, card: string){
    console.log(tckt);
    console.log(card);
    return this.http.post(this.paymentsBaseURL+ `/${tckt['value']}`+`/${card['value']}`,"");
  }
  slotCount(){
    return this.http.get(this.countURL);
  }
}


