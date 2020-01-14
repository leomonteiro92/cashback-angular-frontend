import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Order } from '../order.model';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-update-order',
  templateUrl: './update-order.component.html',
  styleUrls: ['./update-order.component.scss']
})
export class UpdateOrderComponent implements OnInit {

  order: Order;
  orderForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private svc: OrderService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    this.svc.fetch(id).subscribe((data: Order) => {
      this.order = data;
      this.orderForm = this.prepareForm(this.order);
    }, console.error);
  }

  prepareForm(order: Partial<Order>): FormGroup {
    const rawOrderDate = new Date(order.orderDate);
    const strOrderDate = {
      year: rawOrderDate.getFullYear(),
      month: rawOrderDate.getMonth() + 1,
      day: rawOrderDate.getDate()
    };
    return this.fb.group({
      code: [order.code, [
        Validators.required,
        Validators.maxLength(10),
        Validators.pattern(/^-?(0|[1-9]\d*)?$/)]
      ],
      amount: [order.amount, Validators.required],
      orderDate: [strOrderDate, Validators.required]
    });
  }

  submitOrder() {
    const inputOrder = this.orderForm.value;
    if (inputOrder.orderDate) {
      const parseOrderDate = new Date();
      parseOrderDate.setFullYear(inputOrder.orderDate.year);
      parseOrderDate.setMonth(inputOrder.orderDate.month - 1);
      parseOrderDate.setDate(inputOrder.orderDate.day);
      inputOrder.orderDate = parseOrderDate;
    }
    this.svc.update(this.order._id, inputOrder)
      .subscribe(() => {
        this.orderForm.reset();
        this.router.navigate(['orders']);
      }, console.error);
  }

}
