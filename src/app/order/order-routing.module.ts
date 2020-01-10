import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateOrderComponent } from './create-order/create-order.component';
import { ListOrderComponent } from './list-order/list-order.component';
import { UpdateOrderComponent } from './update-order/update-order.component';

const routes: Routes = [{
  path: 'create',
  component: CreateOrderComponent
}, {
  path: 'list',
  component: ListOrderComponent
}, {
  path: 'update',
  component: UpdateOrderComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
