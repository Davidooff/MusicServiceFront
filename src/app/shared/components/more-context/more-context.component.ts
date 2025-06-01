import { Component, computed, inject, Input } from '@angular/core';
import { PopUpWindowComponent } from '../pop-up-window/pop-up-window.component';
import { MoreContextService } from '../../../core/services/more-context.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-more-context',
  imports: [PopUpWindowComponent, CommonModule],
  templateUrl: './more-context.component.html',
  styleUrl: './more-context.component.css',
})
export class MoreContextComponent {
  @Input() width = 210;
  moreContext = inject(MoreContextService);
  position = computed(() => {
    const menu = this.moreContext.menu();
    if (!menu) return null;

    const height = 34 * (menu.menu?.length || 0);
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const [x, y] = menu.possition;

    // Adjust X position if menu would go off screen
    let adjustedX = x;
    if (x + this.width > screenWidth) {
      adjustedX = x - this.width;
    }

    // Adjust Y position if menu would go off screen
    let adjustedY = y + 20;
    if (y + height + 20 > screenHeight) {
      adjustedY = y - height;
    }

    return [adjustedX, adjustedY];
  });

  close() {
    this.moreContext.showMenuOn.set(null);
  }
}
