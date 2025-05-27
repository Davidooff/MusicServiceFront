import { Component, forwardRef, inject, signal } from '@angular/core';
import { AuthTemplateComponent } from '../../shared/components/auth-template/auth-template.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CodeInputComponent } from '../../shared/components/code-input/code-input.component';
import codeValidator from '../../core/validators/code-validator';
import { SubmitBtnComponent } from '../../shared/components/submit-btn/submit-btn.component';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-verify-code',
  imports: [
    AuthTemplateComponent,
    ReactiveFormsModule,
    CodeInputComponent,
    SubmitBtnComponent,
  ],

  templateUrl: './verify-code.component.html',
  styleUrl: './verify-code.component.css',
})
export class VerifyCodeComponent {
  private readonly auth = inject(AuthService);
  serverMsg = signal<{ title: string; detail: string } | null>(null);

  verifyForm = new FormGroup({
    d1: new FormControl('', codeValidator),
    d2: new FormControl('', codeValidator),
    d3: new FormControl('', codeValidator),
    d4: new FormControl('', codeValidator),
    d5: new FormControl('', codeValidator),
    d6: new FormControl('', codeValidator),
  });
  showErrors = signal(false);

  onSubmit() {
    if (this.verifyForm.valid) {
      let code = Object.values(this.verifyForm.value).reduce(
        (acc: string, val: any) => acc + val.data,
        ''
      );

      this.auth.verifyEmail(code, this.serverMsg);
    } else {
      console.error('Form is invalid');
      this.showErrors.set(true);
    }
  }

  getError(controlName: string): boolean {
    const control = this.verifyForm.get(controlName);
    if (control && control.invalid && this.showErrors()) {
      return true;
    }
    return false;
  }
}
