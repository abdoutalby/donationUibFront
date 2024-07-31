import { Component, ViewChild } from '@angular/core';
import { StripeCardNumberComponent, StripeService } from 'ngx-stripe';
import {
  StripeCardElementOptions,
  StripeElementsOptions,
} from '@stripe/stripe-js';
import { HttpClient } from '@angular/common/http';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { switchMap, Observable } from 'rxjs';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {
 
  constructor(private fb: FormBuilder, private stripeService: StripeService) {}

  ngOnInit() {
    document.getElementById("payment")!.innerHTML = "    <script async src='https://js.stripe.com/v3/buy-button.js'></script> <stripe-buy-button id='buy_btn_1Pda7bKpnFKx1MbZw7QqER2p' publishable-key='pk_test_51PdVeuKpnFKx1MbZRGuXj7xdLT895gTmgzKmhGN07ZwZTfUpTY8gavTAq9Op0YNlpBy4aqV7JJJw4iC9K3khiRzw00m2Dl3WWW'> </stripe-buy-button>" 
  }

  onSubmit() {
    
  }
}