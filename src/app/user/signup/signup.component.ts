import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { CustomCPFValidator } from './helpers/cpf.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private svc: UserService) {
  }

  ngOnInit() {
    this.signUpForm = this.fb.group({
      name: ['', Validators.required],
      cpf: ['', [Validators.required, CustomCPFValidator]],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  signUp() {
    const user = this.signUpForm.value;
    user.confirmPassword = undefined;
    this.svc.create(user).subscribe(() => {
      this.signUpForm.reset();
    }, console.error);
  }

}
