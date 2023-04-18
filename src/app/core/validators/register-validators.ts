import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class RegisterValidators {
  public static patternValidator(
    regex: RegExp,
    error: ValidationErrors
  ): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
      const valid = regex.test(control.value);
      return valid ? null : error;
    };
  }

  public static passwordMatchValidator(control: AbstractControl) {
		const password: string = control.get('password').value;
		const passwordConfirm: string = control.get('passwordConfirm').value; 
		if (password !== passwordConfirm) {
			control.get('passwordConfirm').setErrors({ NoPassswordMatch: true });
		}
	}
}
