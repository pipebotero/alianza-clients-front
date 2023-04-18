import { Component } from '@angular/core';
import { AuthService } from './core/authentication/auth.service';
import { SnackBarService } from './core/services/snack-bar.service';
import { Router } from '@angular/router';
import { menuItem } from './core/models/menu-item-interface';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  menuItems: menuItem[] = [
    { label: 'Clients', route: '/clients' },
    { label: 'Client look history', route: '/clients' },
    { label: 'Emergency PIN configuration', route: '/clients' },
    { label: 'Emergency PIN history', route: '/clients' },
  ];

  constructor(
    public router: Router,
    private authService: AuthService,
    private snackBarService: SnackBarService
  ) {}

  public logout(): void {
    this.authService.logout();
    this.snackBarService.openSnackBar('Logout successfully', 'Ok', 3);
    this.router.navigate(['/auth/login']);
  }
}
