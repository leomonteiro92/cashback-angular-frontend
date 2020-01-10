import { Component } from '@angular/core';
import { OAuthService, JwksValidationHandler } from 'angular-oauth2-oidc';
import { authConfig } from './auth/auth.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cashback-ui';

  constructor(private oauth: OAuthService) {
    this.oauth.configure(authConfig);
    this.oauth.tokenValidationHandler = new JwksValidationHandler();
  }
}
