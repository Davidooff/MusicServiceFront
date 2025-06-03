import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sliding-input',
  imports: [],
  templateUrl: './sliding-input.component.html',
  styleUrl: './sliding-input.component.css',
})
export class SlidingInputComponent {
  @Input() pointerColor = 'red';
  @Input({ required: true }) progress!: number; // 0 -1
  @Input() pointerSize = 5;
}
