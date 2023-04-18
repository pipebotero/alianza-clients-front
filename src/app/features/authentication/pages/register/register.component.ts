import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { EmailExistResponse } from '../../models/email-exist-response.model';
import { capitalize } from 'src/app/core/utils/common-functions';
import { RegisterRequest } from '../../models/register-request.model';
import { AuthenticationResponse } from '../../models/authentication-response.model';
import { RegisterValidators } from 'src/app/core/validators/register-validators';
import { Router } from '@angular/router';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  @ViewChild('emailInput') emailInputEl: ElementRef;

  registerForm = this.fb.group({
    emailGroup: this.fb.group({
      email: ['', Validators.compose([Validators.email, Validators.required])],
    }),
    passwordGroup: this.fb.group(
      {
        password: [
          '',
          Validators.compose([
            Validators.required,
            RegisterValidators.patternValidator(/\d/, { hasNumber: true }),
            RegisterValidators.patternValidator(/[A-Z]/, {
              hasCapitalCase: true,
            }),
            RegisterValidators.patternValidator(/[a-z]/, {
              hasSmallCase: true,
            }),
            Validators.minLength(8),
          ]),
        ],
        passwordConfirm: ['', Validators.compose([Validators.required])],
      },
      {
        // check whether our password and confirm password match
        validator: RegisterValidators.passwordMatchValidator,
      }
    ),
    nameGroup: this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    }),
  });

  formStep: 'email' | 'name' | 'password' = 'email';
  emailChecked: boolean = false;

  constructor(
    private fb: FormBuilder,
    public router: Router,
    private authService: AuthService,
    private snackBarService: SnackBarService
  ) {}

  ngOnInit(): void {
    this.detectFormChanges();
  }

  ngAfterViewInit(): void {
    fromEvent(this.emailInputEl.nativeElement, 'input')
      .pipe(map((event: Event) => (event.target as HTMLInputElement).value))
      .pipe(debounceTime(1000))
      .pipe(distinctUntilChanged())
      .subscribe((data) => {
        console.log({ data });
        this.checkEmailExists();
      });
  }

  detectFormChanges(): void {
    this.registerForm
      .get('emailGroup')
      .get('email')
      .valueChanges.subscribe((x) => {
        this.emailChecked = false;
      });
  }

  checkEmailExists() {
    const email = this.registerForm.get('emailGroup').get('email').value;
    this.authService
      .checkEmailExist(email)
      .subscribe((data: EmailExistResponse) => {
        console.log(data);
        if (data.emailExist) {
          this.registerForm
            .get('emailGroup')
            .get('email')
            .setErrors({ exists: true });
        }
        this.emailChecked = true;
      });
  }

  onSubmit(): void {
    console.log('onsubmit');
    if (this.formStep === 'email') {
      this.formStep = 'name';
    } else if (this.formStep === 'name') {
      this.formStep = 'password';
    } else if (this.formStep === 'password') {
      if (this.registerForm.valid) {
        this.createUser();
      }
      return;
    }
  }

  createUser() {
    const request = {
      email: this.registerForm.get('emailGroup').get('email').value,
      name: `${this.registerForm.get('nameGroup').get('firstName').value} ${
        this.registerForm.get('nameGroup').get('lastName').value
      }`,
      password: this.registerForm.get('passwordGroup').get('password').value,
    };
    console.log({ request });
    const registerRequest: RegisterRequest = new RegisterRequest().deserialize(
      request
    );
    this.authService
      .signUp(registerRequest)
      .subscribe((data: AuthenticationResponse) => {
        this.authService.saveToken(data.token);
        this.snackBarService.openSnackBar('User registration successful', 'Ok', 5);
        this.router.navigate(['clients']);
      });
    return;
  }

  getErrorMessage(formGroupName: string, formControlName: string): string {
    // console.log(this.registerForm.get(formGroupName).get(formControlName));
    if (
      this.registerForm
        .get(formGroupName)
        .get(formControlName)
        .hasError('required')
    ) {
      return 'You must enter a value';
    }
    if (
      this.registerForm
        .get(formGroupName)
        .get(formControlName)
        .hasError('minlength')
    ) {
      return `The minimun length is ${
        this.registerForm.get(formGroupName).get(formControlName).errors
          .minlength.requiredLength
      }`;
    }
    if (
      this.registerForm
        .get(formGroupName)
        .get(formControlName)
        .hasError('incorrect')
    ) {
      return `Username or password incorrect`;
    }

    if (
      this.registerForm
        .get(formGroupName)
        .get(formControlName)
        .hasError('exists')
    ) {
      return `${capitalize(formControlName)} has been registered`;
    }

    if (
      this.registerForm
        .get(formGroupName)
        .get(formControlName)
        .hasError('email')
    ) {
      return `${capitalize(formControlName)} is wrong`;
    }

    if (
      this.registerForm
        .get(formGroupName)
        .get(formControlName)
        .hasError('hasCapitalCase') ||
      this.registerForm
        .get(formGroupName)
        .get(formControlName)
        .hasError('hasNumber') ||
      this.registerForm
        .get(formGroupName)
        .get(formControlName)
        .hasError('hasSmallCase')
    ) {
      return `Wrong password`;
    }

    if (
      this.registerForm
        .get(formGroupName)
        .get(formControlName)
        .hasError('NoPassswordMatch')
    ) {
      return `No psssword match`;
    }

    return this.registerForm
      .get(formGroupName)
      .get(formControlName)
      .hasError('wrong')
      ? `Not a valid ${formControlName}`
      : '';
  }

  getErrorType(formGroupName: string, formControlName: string): string {
    if (
      this.registerForm
        .get(formGroupName)
        .get(formControlName)
        .hasError('required')
    ) {
      return 'required';
    }
    if (
      this.registerForm
        .get(formGroupName)
        .get(formControlName)
        .hasError('minlength')
    ) {
      return 'minlength';
    }
    if (
      this.registerForm
        .get(formGroupName)
        .get(formControlName)
        .hasError('incorrect')
    ) {
      return 'incorrect';
    }
    if (
      this.registerForm
        .get(formGroupName)
        .get(formControlName)
        .hasError('exists')
    ) {
      return 'exists';
    }
    if (
      this.registerForm
        .get(formGroupName)
        .get(formControlName)
        .hasError('email')
    ) {
      return 'email';
    }
    if (
      this.registerForm
        .get(formGroupName)
        .get(formControlName)
        .hasError('hasCapitalCase')
    ) {
      return 'hasCapitalCase';
    }
    if (
      this.registerForm
        .get(formGroupName)
        .get(formControlName)
        .hasError('hasNumber')
    ) {
      return 'hasNumber';
    }
    if (
      this.registerForm
        .get(formGroupName)
        .get(formControlName)
        .hasError('hasSmallCase')
    ) {
      return 'hasSmallCase';
    }

    if (
      this.registerForm
        .get(formGroupName)
        .get(formControlName)
        .hasError('NoPassswordMatch')
    ) {
      return 'NoPassswordMatch';
    }
    return 'wrong';
  }

  disableSubmitBySteps() {
    if (this.formStep === 'email') {
      if (
        this.registerForm.get('emailGroup').get('email').invalid ||
        !this.emailChecked
      ) {
        return true;
      }
    }
    if (this.formStep === 'name') {
      if (
        this.registerForm.get('nameGroup').get('firstName').invalid ||
        this.registerForm.get('nameGroup').get('lastName').invalid
      ) {
        return true;
      }
    }
    if (this.formStep === 'password') {
      if (this.registerForm.invalid) {
        return true;
      }
    }
    return false;
  }
}
