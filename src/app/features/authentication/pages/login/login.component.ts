import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { Router } from '@angular/router';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { AuthenticationRequest } from '../../models/authentication-request.model';
import { AuthenticationResponse } from '../../models/authentication-response.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    username: [
      '',
      Validators.compose([Validators.minLength(2), Validators.required]),
    ],
    password: [
      '',
      Validators.compose([Validators.minLength(8), Validators.required]),
    ],
  });

  constructor(
    private fb: FormBuilder,
    public router: Router,
    private authService: AuthService,
    private snackBarService: SnackBarService
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.loginForm.valid) {
      const authRequest: AuthenticationRequest =
        new AuthenticationRequest().deserialize(this.loginForm.value);
      this.authService.signIn(authRequest).subscribe(
        (data: AuthenticationResponse) => {
          console.log({ data });
          this.authService.saveToken(data.token);
          this.snackBarService.openSnackBar('Sign in success', 'Ok');
          this.router.navigate(['clients']);
        },
        (e: any) => {
          console.log('errorrr');
          this.loginForm.get('username').setErrors({ incorrect: true });
          this.loginForm.get('password').setErrors({ incorrect: true });
        }
      );
    }
  }

  getErrorMessage(formControlName: string): string {
    // console.log(this.loginForm.get(formControlName));
    if (this.loginForm.get(formControlName).hasError('required')) {
      return 'You must enter a value';
    }
    if (this.loginForm.get(formControlName).hasError('minlength')) {
      return `The minimun length is ${
        this.loginForm.get(formControlName).errors.minlength.requiredLength
      }`;
    }
    if (this.loginForm.get(formControlName).hasError('incorrect')) {
      return `Username or password incorrect`;
    }

    return this.loginForm.get(formControlName).hasError('wrong')
      ? `Not a valid ${formControlName}`
      : '';
  }

  getErrorType(formControlName: string): string {
    if (this.loginForm.get(formControlName).hasError('required')) {
      return 'required';
    }
    if (this.loginForm.get(formControlName).hasError('minlength')) {
      return 'minlength';
    }
    if (this.loginForm.get(formControlName).hasError('incorrect')) {
      return 'incorrect';
    }
    return 'wrong';
  }
}
