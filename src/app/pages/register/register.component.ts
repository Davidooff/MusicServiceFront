import { Component, inject, signal } from '@angular/core';
import { AuthTemplateComponent } from '../../shared/components/auth-template/auth-template.component';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import emailValidator from '../../core/validators/email-validator';
import passwordValidator from '../../core/validators/password-validator';
import { CommonModule } from '@angular/common';
import { SlidingLableInputComponent } from '../../shared/components/sliding-lable-input/sliding-lable-input.component';
import { SubmitBtnComponent } from '../../shared/components/submit-btn/submit-btn.component';

@Component({
  selector: 'app-register',
  imports: [
    AuthTemplateComponent,
    CommonModule,
    SlidingLableInputComponent,
    ReactiveFormsModule,
    SubmitBtnComponent,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  authService = inject(AuthService);

  serverMsg = signal<{ title: string; detail: string } | null>(null);

  registerForm = new FormGroup({
    email: new FormControl('', emailValidator()),
    userename: new FormControl('', emailValidator()),
    password: new FormControl('', passwordValidator()),
    confirmPassword: new FormControl('', emailValidator()),
  });

  displayErrors = signal(false);

  onSubmit() {
    // if (this.loginForm.valid) {
    this.authService.register(
      this.registerForm.value.userename!,
      this.registerForm.value.email!,
      this.registerForm.value.password!,
      this.serverMsg
    );
    // } else {
    // this.displayErrors.set(true);
    // console.log('Form is invalid');
    // }
  }

  getErrorMessage(controlName: string): string | null {
    const control = this.registerForm.get(controlName);
    if (control?.errors) {
      return control.errors['description'] || null;
    }
    return null;
  }
}
