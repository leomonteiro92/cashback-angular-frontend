import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { Router, RouterModule } from '@angular/router';
import { OAuthService, OAuthModule } from 'angular-oauth2-oidc';
import { HttpClientModule } from '@angular/common/http';
import { By } from '@angular/platform-browser';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let oauth: OAuthService;
  let router: Router;
  let spy: any;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]),
        HttpClientModule,
        OAuthModule.forRoot()
      ],
      declarations: [HeaderComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    oauth = TestBed.get(OAuthService);
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the menu when when user is authenticated', () => {
    spy = spyOn(oauth, 'hasValidAccessToken').and.returnValue(true);
    component.ngOnInit();
    expect(oauth.hasValidAccessToken).toHaveBeenCalled();
    fixture.detectChanges();
    const homeMenu = fixture.debugElement.query(By.css('#home'));
    const createOrderMenu = fixture.debugElement.query(By.css('#create-order'));
    const signUpMenu = fixture.debugElement.query(By.css('#signup'));
    const signInMenu = fixture.debugElement.query(By.css('#signin'));
    const signOutMenu = fixture.debugElement.query(By.css('#signout'));
    expect(homeMenu).toBeTruthy();
    expect(createOrderMenu).toBeTruthy();
    expect(signUpMenu).toBeFalsy();
    expect(signInMenu).toBeFalsy();
    expect(signOutMenu).toBeTruthy();
  });

  it('should render the menu when user is not authenticated', () => {
    spy = spyOn(oauth, 'hasValidAccessToken').and.returnValue(false);
    component.ngOnInit();
    expect(oauth.hasValidAccessToken).toHaveBeenCalled();
    fixture.detectChanges();
    const homeMenu = fixture.debugElement.query(By.css('#home'));
    const createOrderMenu = fixture.debugElement.query(By.css('#create-order'));
    const signUpMenu = fixture.debugElement.query(By.css('#signup'));
    const signInMenu = fixture.debugElement.query(By.css('#signin'));
    const signOutMenu = fixture.debugElement.query(By.css('#signout'));
    expect(homeMenu).toBeTruthy();
    expect(createOrderMenu).toBeFalsy();
    expect(signUpMenu).toBeTruthy();
    expect(signInMenu).toBeTruthy();
    expect(signOutMenu).toBeFalsy();
  })
});
