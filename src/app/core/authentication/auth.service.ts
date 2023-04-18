import { Injectable } from '@angular/core';
import { JwtTokenService } from '../services/jwt-token.service';
import { LocalStorageService } from '../services/local-storage.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthenticationRequest } from 'src/app/features/authentication/models/authentication-request.model';
import { AuthenticationResponse } from 'src/app/features/authentication/models/authentication-response.model';
import { EmailExistResponse } from 'src/app/features/authentication/models/email-exist-response.model';
import { RegisterRequest } from 'src/app/features/authentication/models/register-request.model';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private jwtService: JwtTokenService,
    private authStorageService: LocalStorageService
  ) {}

  private path: string = 'auth';

  public isAuthenticated(): boolean {
    const token = this.authStorageService.get('token');
    if (!token) return false;
    this.jwtService.setToken(token);
    return !this.jwtService.isTokenExpired();
  }

  public saveToken(token): void {
    this.authStorageService.set('token', token);
  }

  signIn(authRequest: AuthenticationRequest): Observable<AuthenticationResponse> {
    return this.http
      .post(`${environment.API.baseUrl}/${this.path}/authenticate`, authRequest)
      .pipe(
        map((res: AuthenticationResponse) => new AuthenticationResponse().deserialize(res))
      );
  }

  signUp(registerRequest: RegisterRequest): Observable<AuthenticationResponse> {
    return this.http
      .post(`${environment.API.baseUrl}/${this.path}/register`, registerRequest)
      .pipe(
        map((res: AuthenticationResponse) => new AuthenticationResponse().deserialize(res))
      );
  }

  checkEmailExist(email: string): Observable<EmailExistResponse> {
    const options = {
      params: new HttpParams().set('email', email.toString())
    };
    return this.http
      .get(`${environment.API.baseUrl}/${this.path}/email`, options)
      .pipe(
        map((res: EmailExistResponse) => new EmailExistResponse().deserialize(res))
      );
  }

  public logout(): void {
    this.authStorageService.remove('token');
  }
}
