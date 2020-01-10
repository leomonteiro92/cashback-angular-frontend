import { Injectable } from '@angular/core';
import {
    HttpHandler,
    HttpHeaderResponse,
    HttpInterceptor,
    HttpProgressEvent,
    HttpRequest,
    HttpResponse,
    HttpSentEvent,
    HttpUserEvent
} from '@angular/common/http';
import { OAuthService } from 'angular-oauth2-oidc';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {
    constructor(private oauth: OAuthService) { }

    addAccessToken(request: HttpRequest<any>) {
        const accessToken = this.oauth.getAccessToken();
        console.log('Intercepted!');
        console.log(accessToken);
        if (!accessToken) return request;
        return request.clone({
            setHeaders: {
                Authorization: `Bearer ${accessToken}`
            }
        });
    }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<
        HttpSentEvent
        | HttpHeaderResponse
        | HttpProgressEvent
        | HttpResponse<any>
        | HttpUserEvent<any>
    > {
        return next.handle(this.addAccessToken(request));
    }
}