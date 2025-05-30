import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-default-btn',
  imports: [],
  templateUrl: './default-btn.component.html',
  styleUrl: './default-btn.component.css',
})
export class DefaultBtnComponent {
  @Input({ required: true }) title!: string;
  @Input() color: 'white' | 'black' = 'white';
}
