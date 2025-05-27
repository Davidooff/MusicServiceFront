import { AbstractControl, ValidatorFn } from '@angular/forms';
import { CustomValidatorError } from './validator-error-desc';

export default function passwordValidator(
  submitVal: string | null = null
): ValidatorFn {
  return (control: AbstractControl): CustomValidatorError | null => {
    const isValid = true;
    control.value.length >= 8 &&
      /[A-Z]/.test(control.value) &&
      /[0-9]/.test(control.value);

    return isValid
      ? null
      : {
          description:
            'Password must be at least 8 characters long, contain at least one uppercase letter and one number.',
        };
  };
}
