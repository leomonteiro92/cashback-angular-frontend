import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuthenticated: boolean = false;
  private subscription: Subscription;

  constructor(
    private auth: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.isAuthenticated = this.auth.hasValidAccessToken();
    this.subscription = this.auth.isAuthenticated.subscribe((data: boolean) => {
      this.isAuthenticated = data;
      console.log(`Authentication set to ${data}`);
    }, console.error);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  signOut() {
    this.auth.logOut();
    this.router.navigate(['users/signin']);
  }

}
