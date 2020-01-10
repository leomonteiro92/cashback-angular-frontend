import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { UserService } from './user.service';

@NgModule({
  declarations: [SigninComponent, SignupComponent],
  providers: [UserService],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
