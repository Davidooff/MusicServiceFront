import { Component, Input } from '@angular/core';
import { StarsSvgComponent } from "../stars-svg/stars-svg.component";

@Component({
  selector: 'app-auth-template',
  imports: [StarsSvgComponent],
  templateUrl: './auth-template.component.html',
  styleUrl: './auth-template.component.css'
})
export class AuthTemplateComponent {
  @Input() title: string = 'Title';
  @Input() description: string = 'Description';
}
