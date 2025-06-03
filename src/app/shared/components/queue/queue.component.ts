import { Component, inject } from '@angular/core';
import { PlayerService } from '../../../core/services/player.service';
import { CommonModule } from '@angular/common';
import { JoindImageComponent } from '../joind-image/joind-image.component';
import { DragbleListComponent } from '../dragble-list/dragble-list.component';

@Component({
  selector: 'app-queue',
  imports: [CommonModule, JoindImageComponent, DragbleListComponent],
  templateUrl: './queue.component.html',
  styleUrl: './queue.component.css',
})
export class QueueComponent {
  player = inject(PlayerService);
}
