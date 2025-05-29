import { Component, inject } from '@angular/core';
import { PlayerService } from '../../../core/services/player.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-player',
  imports: [CommonModule],
  templateUrl: './player.component.html',
  styleUrl: './player.component.css',
})
export class PlayerComponent {
  playerService = inject(PlayerService);

  transformTime(time: number) {
    return Math.floor(time / 60) + ':' + (time % 60);
  }
}
