import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AuthenticationResponse } from '../../models/authentication-response.model';
import { Router } from '@angular/router';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let snackBarServiceSpy: jasmine.SpyObj<SnackBarService>;

  beforeEach(async(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', [
      'checkEmailExist',
      'signUp',
      'saveToken',
    ]);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    snackBarServiceSpy = jasmine.createSpyObj('SnackBarService', ['openSnackBar']);

    TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: SnackBarService, useValue: snackBarServiceSpy },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should create the form', () => {
    expect(component.registerForm).toBeTruthy();
  });

  it('should be valid when fields are valid', () => {
    component.registerForm.patchValue({
      emailGroup: { email: 'test@test.com' },
      nameGroup: { firstName: 'John', lastName: 'Doe' },
      passwordGroup: { password: 'Pa$$w0rd', passwordConfirm: 'Pa$$w0rd' },
    });
    expect(component.registerForm.valid).toBe(true);
  });

  it('should be invalid when fields are invalid', () => {
    component.registerForm.patchValue({
      emailGroup: { email: 'invalid' },
      nameGroup: { firstName: '', lastName: '' },
      passwordGroup: { password: '', passwordConfirm: '' },
    });
    expect(component.registerForm.valid).toBe(false);
  });

  it('should change formStep when onSubmit is called', () => {
    expect(component.formStep).toBe('email');
    component.onSubmit();
    expect(component.formStep).toBe('name');
    component.onSubmit();
    expect(component.formStep).toBe('password');
  });

  it('should call createUser when onSubmit is called and form is valid', () => {
    component.registerForm.patchValue({
      emailGroup: { email: 'test@test.com' },
      nameGroup: { firstName: 'John', lastName: 'Doe' },
      passwordGroup: { password: 'Pa$$w0rd', passwordConfirm: 'Pa$$w0rd' },
    });

    const mockAuthResponse = new AuthenticationResponse();
    mockAuthResponse.token = 'testtoken';

    authServiceSpy.signUp.and.returnValue(of(mockAuthResponse));

    component.createUser();

    expect(authServiceSpy.signUp).toHaveBeenCalled();
    expect(authServiceSpy.saveToken).toHaveBeenCalledWith(mockAuthResponse.token);
    expect(snackBarServiceSpy.openSnackBar).toHaveBeenCalledWith('User registration successful', 'Ok', 5);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['clients']);

  });
});
