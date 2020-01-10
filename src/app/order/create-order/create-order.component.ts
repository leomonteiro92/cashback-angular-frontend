import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss']
})
export class CreateOrderComponent implements OnInit {

  orderForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private svc: OrderService) {
  }

  ngOnInit() {
    this.orderForm = this.fb.group({
      code: ['', Validators.required],
      amount: ['', Validators.required],
      orderDate: ['', Validators.required]
    });
  }

  submitOrder() {
    const order = this.orderForm.value;
    this.svc.create(order).subscribe(() => {
      this.orderForm.reset();
    }, console.error);
  }

}
