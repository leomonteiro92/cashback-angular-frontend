import { environment as env } from '../../environments/environment';
import { OrderService } from "../order/order.service";
import { async, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './access-token.interceptor';
import { AuthService } from './auth.service';
import { OAuthModule } from 'angular-oauth2-oidc';

describe("TokenInterceptor", () => {
  let service: OrderService;
  let httpMock: HttpTestingController;
  let auth: AuthService;
  let spy: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        OAuthModule.forRoot()
      ],
      providers: [
        AuthService,
        OrderService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: TokenInterceptor,
          multi: true
        }
      ]
    });
  }));

  beforeEach(() => {
    service = TestBed.get(OrderService);
    httpMock = TestBed.get(HttpTestingController);
    auth = TestBed.get(AuthService);
  });

  it('should add the Bearer token to the authorization header', () => {
    const mockBearerToken = 'eyJfaWQiOiI1ZTFkYjdiMjI1YThiY2M4ODg2NjAxNWMiLCJjcGYiOiIwMTUzMzQ2NTIzMSIsImFsZyI6IkhTMjU2In0.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.28HAdRydo_q63mX00O9mhq3gGPuQf8R7kt4VgB4douc';
    spy = spyOn(auth, 'getAccessToken').and.returnValue(mockBearerToken);
    service.list().subscribe(data => {
      expect(data).toBeTruthy();
    });
    const httpRequest = httpMock.expectOne(`${env.API_HOSTNAME}/orders`);
    expect(httpRequest.request.headers.has('Authorization')).toEqual(true);
    expect(httpRequest.request.headers.get('Authorization')).toBe(`Bearer ${mockBearerToken}`);
  });


});
