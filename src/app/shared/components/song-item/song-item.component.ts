import { Component, inject, Input } from '@angular/core';
import { TrackData } from '../../../core/models/SearchResult';
import { IdNameGroup } from '../../../core/models/IdNameGroup';
import { PlayerService } from '../../../core/services/player.service';

@Component({
  selector: 'app-song-item',
  imports: [],
  templateUrl: './song-item.component.html',
  styleUrl: './song-item.component.css',
})
export class SongItemComponent {
  @Input({ required: true }) data!: TrackData;
  playerService = inject(PlayerService);

  onClick() {
    this.playerService.play(this.data);
  }

  getNames(el: IdNameGroup[]) {
    return el.map((el) => el.name).join(' ');
  }

  cutNames(str: string, len: number) {
    return str.slice(0, len) + (str.length > len ? '...' : '');
  }
}
