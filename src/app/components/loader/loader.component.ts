import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService } from './loader.service';

@Component({
    selector: 'app-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit, OnDestroy {

    showLoader: boolean = false;
    private subscription: Subscription;

    constructor(private svc: LoaderService) { }

    ngOnInit() {
        this.subscription = this.svc.loaderSubject.subscribe((data: boolean) => {
            this.showLoader = data;
        }, console.error);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
