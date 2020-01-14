import { OAuthService, JwksValidationHandler } from 'angular-oauth2-oidc';
import { authConfig } from './auth.config';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private oauth: OAuthService) {
        this.oauth.configure(authConfig);
        this.oauth.tokenValidationHandler = new JwksValidationHandler();
    }

    public isAuthenticated = new Subject();

    async login(username: string, password: string): Promise<any> {
        await this.oauth.fetchTokenUsingPasswordFlow(username, password);
        this.isAuthenticated.next(true);
    }

    logOut(): void {
        this.oauth.logOut();
        this.isAuthenticated.next(false);
    }

    hasValidAccessToken(): boolean {
        return this.oauth.hasValidAccessToken();
    }

    getAccessToken(): any {
        return this.oauth.getAccessToken();
    }
}