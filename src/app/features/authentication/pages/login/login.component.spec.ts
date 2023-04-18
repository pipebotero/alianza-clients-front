import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { Router } from '@angular/router';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { FormBuilder } from '@angular/forms';
import { AuthenticationResponse } from '../../models/authentication-response.model';
import { of, throwError } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let snackBarServiceSpy: jasmine.SpyObj<SnackBarService>;

  beforeEach(async(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['signIn', 'saveToken']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    snackBarServiceSpy = jasmine.createSpyObj('SnackBarService', ['openSnackBar']);

    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [
        FormBuilder,
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: SnackBarService, useValue: snackBarServiceSpy },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show error message if form is invalid', () => {
    component.loginForm.setValue({ username: '', password: '' });
    const errorMessage = component.getErrorMessage('username');
    expect(errorMessage).toEqual('You must enter a value');
  });

  it('should send authentication request when form is valid', () => {
    component.loginForm.setValue({ username: 'testuser', password: 'testpassword' });

    const mockAuthResponse = new AuthenticationResponse();
    mockAuthResponse.token = 'testtoken';

    authServiceSpy.signIn.and.returnValue(of(mockAuthResponse));

    component.onSubmit();

    expect(authServiceSpy.signIn).toHaveBeenCalled();
    expect(authServiceSpy.saveToken).toHaveBeenCalledWith(mockAuthResponse.token);
    expect(snackBarServiceSpy.openSnackBar).toHaveBeenCalledWith('Sign in success', 'Ok');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['clients']);
  });

  it('should show error message if authentication fails', () => {
    component.loginForm.setValue({ username: 'testuser', password: 'testpassword' });

    authServiceSpy.signIn.and.returnValue(throwError('Error'));

    component.onSubmit();

    expect(authServiceSpy.signIn).toHaveBeenCalled();
    expect(component.loginForm.get('username').hasError('incorrect')).toBeTruthy();
    expect(component.loginForm.get('password').hasError('incorrect')).toBeTruthy();
  });
});
