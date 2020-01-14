import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { OAuthModule } from 'angular-oauth2-oidc';
import { AuthGuard, AuthService, TokenInterceptor } from './auth';
import { HeaderComponent, FooterComponent, LoaderComponent, LoaderInterceptor } from './components';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    OAuthModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    LoaderInterceptor,
    TokenInterceptor
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
