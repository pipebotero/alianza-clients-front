import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private _snackBar: MatSnackBar) { }

  public openSnackBar(message: string, action: string, duration: number = 3): void {
    this._snackBar.open(message, action, {
      duration: duration * 1000,
    });
  }
}
