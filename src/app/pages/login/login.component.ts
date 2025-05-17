import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthTemplateComponent } from '../../shared/components/auth-template/auth-template.component';
import { SlidingLableInputComponent } from '../../shared/components/sliding-lable-input/sliding-lable-input.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import emailValidator from '../../core/validators/email-validator';
import passwordValidator from '../../core/validators/password-validator';
import { SubmitBtnComponent } from "../../shared/components/submit-btn/submit-btn.component";
import { CheckBoxComponent } from "../../shared/components/check-box/check-box.component";


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    AuthTemplateComponent,
    SlidingLableInputComponent,
    ReactiveFormsModule,
    SubmitBtnComponent,
    CheckBoxComponent
],

  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('asd', emailValidator()),
    password: new FormControl('', passwordValidator()),
    rememberMe: new FormControl(false)
  });

  getErrorMessage(controlName: string): string | null {
    const control = this.loginForm.get(controlName);
    if (control?.errors) {
      return control.errors['description'] || null;
    }
    return null;
  }
}
