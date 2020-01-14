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
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {
    constructor(private auth: AuthService) { }

    addAccessToken(request: HttpRequest<any>) {
        const accessToken = this.auth.getAccessToken();
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