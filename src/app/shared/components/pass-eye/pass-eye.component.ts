import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pass-eye',
  imports: [NgIf],
  templateUrl: './pass-eye.component.html',
  styleUrl: './pass-eye.component.css',
})
export class PassEyeComponent {
  @Input({ required: true }) isVisible!: boolean;
  rangdomMaskID = Math.random().toString(36).substring(2, 15);
}
