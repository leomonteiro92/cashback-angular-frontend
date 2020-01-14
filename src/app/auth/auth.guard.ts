import { CanActivate, Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: "root"
})
export class AuthGuard implements CanActivate {
    constructor(
        private auth: OAuthService,
        private router: Router
    ) { }

    canActivate(): boolean {
        const hasAccessToken = this.auth.hasValidAccessToken();
        if (!hasAccessToken) {
            this.router.navigate(['/users/signin']);
        }
        return !!hasAccessToken;
    }
}