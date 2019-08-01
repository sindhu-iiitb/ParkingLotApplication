import { Component, OnInit } from '@angular/core';
// import {FormGroup, FormControl, Validators}  from '@angular/forms';
import { TicketService } from '../shared/ticket.service';
import { Ticket } from '../shared/ticket.model';

declare var M: any;

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css'],
  providers: [TicketService]
})
export class TicketComponent implements OnInit {
  clickMessage = '';
  payment = '';
  CreditCardCheck = '';
  timeParked = '';
  ToggleButton: boolean = false;
  IsVisible: boolean = false;
  showDetails: boolean = false;

  constructor(private ticketService: TicketService) {

    this.ticketService.slotCount().subscribe((res) => {

      if (res.toString() == '0') {
        this.ToggleButton = false;
      }
      else {
        this.ToggleButton = true;
      }

    });
  }

  ngOnInit() {

  }

  onClick() {

    this.ticketService.getTicket().subscribe((res) => {

      if (res)
        this.clickMessage = res['ticket_id'];
      this.timeParked = res['createdAt'];
      this.showDetails = true;
      console.log(res);
      // M.toast({ html: 'Saved successfully', classes: 'rounded' });
    }, (err) => {
      this.ToggleButton = true;
      this.showDetails = true;
      this.clickMessage = "Parking slots are all full";
    });
  }
  getPaymentDetails(ticket_id: Ticket) {
    this.ticketService.getPaymentDetails(ticket_id).subscribe((res) => {
      console.log("In getPaymentDetails"+res);
      if (res)
        this.payment = res.toString();
        this.IsVisible = true;
        this.CreditCardCheck="";
      console.log(res);
      // M.toast({ html: 'Saved successfully', classes: 'rounded' });
    }, (err) => {
        this.CreditCardCheck="Please enter valid ticket_id";
    });
  }

  onPay(tckt: string, card: string) {
    this.ticketService.payTicket(tckt, card).subscribe((res) => {
      console.log(res);
      if (res)
        this.CreditCardCheck = res["ticket_id"] + "  payment successful !!"
      this.IsVisible = false;

      console.log(res);
      // M.toast({ html: 'Saved successfully', classes: 'rounded' });
    }, (err) => {

    });
  }
}
