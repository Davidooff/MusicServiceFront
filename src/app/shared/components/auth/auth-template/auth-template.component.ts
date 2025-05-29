import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarsSvgComponent } from '../stars-svg/stars-svg.component';

@Component({
  selector: 'app-auth-template',
  imports: [StarsSvgComponent, CommonModule],
  templateUrl: './auth-template.component.html',
  styleUrl: './auth-template.component.css',
})
export class AuthTemplateComponent {
  @Input() title: string = 'Title';
  @Input() description: string = 'Description';
  @Input() error: { title: string; detail: string } | null = null;
}
