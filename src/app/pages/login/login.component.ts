import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlidingLableInputComponent } from '../../shared/components/auth/sliding-lable-input/sliding-lable-input.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import emailValidator from '../../core/validators/email-validator';
import passwordValidator from '../../core/validators/password-validator';
import { SubmitBtnComponent } from '../../shared/components/auth/submit-btn/submit-btn.component';
import { CheckBoxComponent } from '../../shared/components/auth/check-box/check-box.component';
import { AuthService } from '../../core/services/auth.service';
import { AuthTemplateComponent } from '../../shared/components/auth/auth-template/auth-template.component';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    AuthTemplateComponent,
    SlidingLableInputComponent,
    ReactiveFormsModule,
    SubmitBtnComponent,
    CheckBoxComponent,
  ],

  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  authService = inject(AuthService);
  serverMsg = signal<{ title: string; detail: string } | null>(null);

  loginForm = new FormGroup({
    email: new FormControl('', emailValidator()),
    password: new FormControl('', passwordValidator()),
    rememberMe: new FormControl(false),
  });

  displayErrors = signal(false);

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(
        this.loginForm.value.email!,
        this.loginForm.value.password!,
        this.serverMsg
      );
    } else {
      this.displayErrors.set(true);
    }
  }

  getErrorMessage(controlName: string): string | null {
    const control = this.loginForm.get(controlName);
    if (control?.errors) {
      return control.errors['description'] || null;
    }
    return null;
  }
}
