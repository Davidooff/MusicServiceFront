import { AbstractControl, ValidatorFn } from "@angular/forms";
import { CustomValidatorError } from "./validator-error-desc";

export default function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): CustomValidatorError | null => {
    const isValid = control.value.length >= 8 && /[A-Z]/.test(control.value) && /[0-9]/.test(control.value);
    console.log(control.value);
    console.log(isValid);
    
    return isValid ? null : { description: "Password not valid" };
  };
}