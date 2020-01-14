import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isAuthenticated: boolean = false;

  constructor(
    private oauth: OAuthService,
    private router: Router) { }

  ngOnInit() {
    this.isAuthenticated = this.oauth.hasValidAccessToken();
  }

  async signOut() {
    this.oauth.logOut();
    this.router.navigate(['/']);
  }

}
