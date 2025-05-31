import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pop-up-window',
  imports: [CommonModule],
  templateUrl: './pop-up-window.component.html',
  styleUrl: './pop-up-window.component.css',
})
export class PopUpWindowComponent {
  @Input({ required: true }) isOpen!: boolean;
  @Input() makeBgDark: boolean = true;
  @Input() displayAsWindow: boolean = true;
  @Output() panelClosed = new EventEmitter<void>();
}
