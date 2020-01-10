import { CanActivate } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: "root"
})
export class AuthGuard implements CanActivate {
    constructor(private oauth: OAuthService) { }

    canActivate(): boolean {
        const hasAccessToken = this.oauth.hasValidAccessToken();
        return !!hasAccessToken;
    }
}