import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OAuthService } from 'angular-oauth2-oidc';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  signInForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private oauth: OAuthService) {
  }

  ngOnInit() {
    this.signInForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  async signIn() {
    const { email: username, password } = this.signInForm.value;
    try {
      await this.oauth.fetchTokenUsingPasswordFlow(username, password);
      this.router.navigate(['orders'])
    } catch (err) {
      alert(`Erro ao autenticar ${err.message}`);
    }
  }

}
