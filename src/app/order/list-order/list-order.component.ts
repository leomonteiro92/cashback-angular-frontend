import { Component, OnInit } from '@angular/core';
import { Order } from '../order.model';
import { OrderService } from '../order.service';
import { Router } from '@angular/router';

import { registerLocaleData } from '@angular/common';
import localePtBr from '@angular/common/locales/br';
registerLocaleData(localePtBr, 'br');

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.scss']
})
export class ListOrderComponent implements OnInit {

  orders: Order[] = [];
  balance: number;

  totalOrders: number;
  page: number = 1;
  pageSize: number = 8;

  constructor(
    private router: Router,
    private svc: OrderService) { }

  ngOnInit() {
    this.svc.list({
      limit: this.pageSize,
      offset: this.page - 1
    }).subscribe((data: any) => {
      this.orders = data.orders;
      this.totalOrders = data.count;
    }, console.error);

    this.svc.balance().subscribe((data: any) => {
      this.balance = data.credit;
    }, console.error);
  }

  prepareUpdate(row: Order) {
    this.router.navigate([`orders/update/${row._id}`]);
  }

  removeOrder(index: number, row: Order) {
    this.svc.remove(row._id).subscribe(() => {
      this.orders.splice(index, 1);
    }, console.error);
  }

}
