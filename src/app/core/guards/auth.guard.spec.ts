import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import {
  Router,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../authentication/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let routerStateSnapshot: RouterStateSnapshot;
  let activatedRouteSnapshot: ActivatedRouteSnapshot;

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['isAuthenticated']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });

    authGuard = TestBed.inject(AuthGuard);
    routerStateSnapshot = jasmine.createSpyObj<RouterStateSnapshot>(
      'RouterStateSnapshot',
      ['toString']
    );
    activatedRouteSnapshot = jasmine.createSpyObj<ActivatedRouteSnapshot>(
      'ActivatedRouteSnapshot',
      ['toString']
    );
  });

  it('should be created', () => {
    expect(authGuard).toBeTruthy();
  });

  it('should allow access if user is authenticated', () => {
    authServiceSpy.isAuthenticated.and.returnValue(true);
    expect(
      authGuard.canActivate(activatedRouteSnapshot, routerStateSnapshot)
    ).toBeTrue();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('should not allow access if user is not authenticated', () => {
    authServiceSpy.isAuthenticated.and.returnValue(false);
    expect(authGuard.canActivate(activatedRouteSnapshot, routerStateSnapshot)).toBeFalse();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['auth/login']);
  });
});
