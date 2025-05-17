import { ValidationErrors } from '@angular/forms';

export type CustomValidatorError =  ValidationErrors &  {
  description: string;
} 