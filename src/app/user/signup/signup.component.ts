import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomCPFValidator } from './helpers/cpf.validator';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private svc: UserService,
    private router: Router
  ) {
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
    const user: User = this.signUpForm.value;
    user.confirmPassword = undefined;
    this.svc.create(user).subscribe(() => {
      this.signUpForm.reset();
      this.router.navigate(['users/signin']);
    }, console.error);
  }

}
