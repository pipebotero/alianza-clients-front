import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { Router } from '@angular/router';
import { AuthService } from './core/authentication/auth.service';
import { SnackBarService } from './core/services/snack-bar.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  // let routerSpy: jasmine.SpyObj<Router>;
  let snackBarServiceSpy: jasmine.SpyObj<SnackBarService>;

  beforeEach(async(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['logout']);
    // routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    snackBarServiceSpy = jasmine.createSpyObj('SnackBarService', ['openSnackBar']);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        // { provide: Router, useValue: routerSpy },
        { provide: SnackBarService, useValue: snackBarServiceSpy },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should set menuItems correctly`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.menuItems).toEqual([
      { label: 'Clients', route: '/clients' },
      { label: 'Client look history', route: '/clients' },
      { label: 'Emergency PIN configuration', route: '/clients' },
      { label: 'Emergency PIN history', route: '/clients' },
    ]);
  });


  it('should logout', () => {
    component.logout();
    expect(authServiceSpy.logout).toHaveBeenCalled();
    expect(snackBarServiceSpy.openSnackBar).toHaveBeenCalledWith('Logout successfully', 'Ok', 3);
  });

});
