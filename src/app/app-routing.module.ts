import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [{
  path: 'users',
  loadChildren: () => import('./user/user.module').then(m => m.UserModule)
}, {
  path: 'orders',
  canActivate: [AuthGuard],
  loadChildren: () => import('./order/order.module').then(m => m.OrderModule)
}, {
  path: '',
  component: AppComponent
}, {
  path: '**',
  component: AppComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
