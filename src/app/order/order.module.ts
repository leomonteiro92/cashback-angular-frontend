import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { CreateOrderComponent } from './create-order/create-order.component';
import { ListOrderComponent } from './list-order/list-order.component';
import { UpdateOrderComponent } from './update-order/update-order.component';
import { OrderService } from './order.service';

@NgModule({
  declarations: [CreateOrderComponent, ListOrderComponent, UpdateOrderComponent],
  providers: [OrderService],
  imports: [
    CommonModule,
    OrderRoutingModule
  ]
})
export class OrderModule { }
