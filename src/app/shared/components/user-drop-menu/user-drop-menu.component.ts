import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-user-drop-menu',
  imports: [CommonModule],
  templateUrl: './user-drop-menu.component.html',
  styleUrl: './user-drop-menu.component.css',
})
export class UserDropMenuComponent {
  showMenu = signal(false);

  changeMenuVisibility() {
    this.showMenu.update((current) => !current);
  }
}
