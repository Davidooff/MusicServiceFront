import { Component, inject } from '@angular/core';
import { PlayerService } from '../../../core/services/player.service';
import { CommonModule } from '@angular/common';
import { SongItemComponent } from '../song-item/song-item.component';
import { SlidingInputComponent } from '../sliding-input/sliding-input.component';

@Component({
  selector: 'app-player',
  imports: [CommonModule, SongItemComponent, SlidingInputComponent],
  templateUrl: './player.component.html',
  styleUrl: './player.component.css',
})
export class PlayerComponent {
  playerService = inject(PlayerService);

  transformTime(time: number) {
    const t = [Math.floor(time / 60) + '', (time % 60) + ''];
    return t.map((el) => (el.length === 1 ? '0' + el : el)).join(':');
  }
}
