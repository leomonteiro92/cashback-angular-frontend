import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { OAuthModule } from 'angular-oauth2-oidc';
import { AuthGuard } from './auth/auth.guard';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { TokenInterceptor } from './auth/access-token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    OAuthModule.forRoot(),
    AppRoutingModule
  ],
  providers: [AuthGuard, TokenInterceptor],
  bootstrap: [AppComponent]
})
export class AppModule { }
