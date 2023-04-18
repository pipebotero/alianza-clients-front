import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AuthenticationRequest } from 'src/app/features/authentication/models/authentication-request.model';
import { AuthenticationResponse } from 'src/app/features/authentication/models/authentication-response.model';
import { RegisterRequest } from 'src/app/features/authentication/models/register-request.model';
import { environment } from 'src/environments/environment';
import { JwtTokenService } from '../services/jwt-token.service';
import { LocalStorageService } from '../services/local-storage.service';

describe('AuthService', () => {
  let authService: AuthService;
  let httpMock: HttpTestingController;
  let jwtTokenService: JwtTokenService;
  let localStorageService: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService, JwtTokenService, LocalStorageService],
    });
    authService = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    jwtTokenService = TestBed.inject(JwtTokenService);
    localStorageService = TestBed.inject(LocalStorageService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('should check if user is authenticated', () => {
    const token = 'testToken';
    localStorageService.set('token', token);
    spyOn(jwtTokenService, 'setToken');
    spyOn(jwtTokenService, 'isTokenExpired').and.returnValue(false);
    expect(authService.isAuthenticated()).toBeTruthy();
    expect(jwtTokenService.setToken).toHaveBeenCalledWith(token);
    localStorageService.remove('token');
  });

  it('should save token to local storage', () => {
    const token = 'testToken';
    spyOn(localStorageService, 'set');
    authService.saveToken(token);
    expect(localStorageService.set).toHaveBeenCalledWith('token', token);
  });

  it('should sign in successfully', () => {
    const authRequest: AuthenticationRequest =
      new AuthenticationRequest().deserialize({
        username: 'jdoe',
        password: 'testPassword',
      });
    const mockResponse: AuthenticationResponse =
      new AuthenticationResponse().deserialize({ token: 'testToken' });
    authService.signIn(authRequest).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });
    const req = httpMock.expectOne(
      `${environment.API.baseUrl}/auth/authenticate`
    );
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should sign up successfully', () => {
    const registerRequest: RegisterRequest = new RegisterRequest().deserialize({
      email: 'test@example.com',
      password: 'testPassword',
      name: 'Test User',
    });
    const mockResponse: AuthenticationResponse =
      new AuthenticationResponse().deserialize({ token: 'testToken' });
    authService.signUp(registerRequest).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });
    const req = httpMock.expectOne(`${environment.API.baseUrl}/auth/register`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

});
