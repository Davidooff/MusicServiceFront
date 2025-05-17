import { AbstractControl, ValidatorFn } from "@angular/forms";
import { CustomValidatorError } from "./validator-error-desc";

export default function emailValidator(): ValidatorFn {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return (control: AbstractControl): CustomValidatorError | null => {
    const email = control.value;
    const isValid = emailRegex.test(email);
    return isValid ? null : { description: "Email addres not valid" };
  };
}