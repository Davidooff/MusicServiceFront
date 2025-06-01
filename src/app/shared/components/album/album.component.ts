import { Component, inject, Input } from '@angular/core';
import { TrackImage } from '../../../core/models/TrackImage';
import { TrackData } from '../../../core/models/TrackData';
import { getByResolution } from '../../../core/scripts/getByResolution';
import { JoindImageComponent } from '../joind-image/joind-image.component';
import { CircleBtnComponent } from '../circle-btn/circle-btn.component';
import { SongItemComponent } from '../song-item/song-item.component';
import { CommonModule } from '@angular/common';
import { PlayerService } from '../../../core/services/player.service';
import { UserAlbum } from '../../../core/models/UserAlbum';
import { MoreContextService } from '../../../core/services/more-context.service';

@Component({
  selector: 'app-album',
  imports: [
    JoindImageComponent,
    CircleBtnComponent,
    SongItemComponent,
    CommonModule,
  ],
  templateUrl: './album.component.html',
  styleUrl: './album.component.css',
})
export class AlbumComponent {
  player = inject(PlayerService);
  moreContext = inject(MoreContextService);

  @Input({ required: true }) img!: TrackImage[][] | null;
  @Input({ required: true }) playlist!: UserAlbum;
}
