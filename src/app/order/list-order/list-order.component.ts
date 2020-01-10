import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';

import { registerLocaleData } from '@angular/common';
import localePtBr from '@angular/common/locales/br';
registerLocaleData(localePtBr, 'br')

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.scss']
})
export class ListOrderComponent implements OnInit {

  orders: any[];
  totalOrders: number;
  page: number = 1;
  pageSize: number = 8;

  constructor(private svc: OrderService) { }

  ngOnInit() {
    this.svc.list({
      limit: this.pageSize,
      offset: this.page - 1
    }).subscribe((data: any) => {
      this.orders = data.orders;
      this.totalOrders = data.count;
    }, console.error);
  }

}
