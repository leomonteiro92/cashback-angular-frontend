import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OrderService } from '../order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss']
})
export class CreateOrderComponent implements OnInit {

  orderForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private svc: OrderService) {
  }

  ngOnInit() {
    this.orderForm = this.fb.group({
      code: ['', [Validators.required, Validators.maxLength(10), Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      amount: ['', Validators.required],
      orderDate: ['', Validators.required]
    });
  }

  submitOrder() {
    const order = this.orderForm.value;
    const parseOrderDate = new Date();
    parseOrderDate.setFullYear(this.orderForm.value.orderDate.year);
    parseOrderDate.setMonth(this.orderForm.value.orderDate.month);
    parseOrderDate.setDate(this.orderForm.value.orderDate.day);
    order.orderDate = parseOrderDate;
    this.svc.create(order).subscribe(() => {
      this.orderForm.reset();
      this.router.navigate(['orders']);
    }, console.error);
  }

}
