import { AbstractControl, ValidatorFn } from '@angular/forms';
import { CustomValidatorError } from './validator-error-desc';

export default function codeValidator(
  control: AbstractControl
): CustomValidatorError | null {
  const digit = Number.parseInt(control.value.data);
  const isValid = !isNaN(digit);
  console.log(digit, isValid, control.value.data);

  return isValid ? null : { description: 'The code must be a digit' };
}
