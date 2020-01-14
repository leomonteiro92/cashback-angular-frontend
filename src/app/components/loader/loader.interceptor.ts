import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoaderService } from './loader.service';

@Injectable({
    providedIn: 'root'
})
export class LoaderInterceptor implements HttpInterceptor {
    constructor(private svc: LoaderService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('Loader intercepted!');
        this.svc.show();
        return next.handle(req).pipe(
            tap(
                (event: HttpEvent<any>) => {
                    console.log('Finished');
                    if (event instanceof HttpResponse) {
                        this.svc.hide();
                    }
                },

                () => {
                    this.svc.hide();
                }
            )
        )
    }
}