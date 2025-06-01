import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-circle-btn',
  imports: [CommonModule],
  templateUrl: './circle-btn.component.html',
  styleUrl: './circle-btn.component.css',
})
export class CircleBtnComponent {
  @Input({ required: true }) img!: string;
  @Input() isWhite = false;
}
