import { Component } from '@angular/core';
import { AuthTemplateComponent } from '../../shared/components/auth-template/auth-template.component';

@Component({
  selector: 'app-reset-password',
  imports: [AuthTemplateComponent],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent {}
