import {
  Component,
  inject,
  Input,
  signal,
  effect,
  OnInit,
} from '@angular/core';
import { TrackData } from '../../../core/models/TrackData';
import { IdNameGroup } from '../../../core/models/IdNameGroup';
import { PlayerService } from '../../../core/services/player.service';
import { getByResolution } from '../../../core/scripts/getByResolution';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { PlaylistsService } from '../../../core/services/playlists.service';
import { MoreContextService } from '../../../core/services/more-context.service';
import { LoadImageService } from '../../../core/services/load-image.service';
import { TrackImage } from '../../../core/models/TrackImage';
import { tap } from 'rxjs';

@Component({
  selector: 'app-song-item',
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './song-item.component.html',
  styleUrl: './song-item.component.css',
})
export class SongItemComponent implements OnInit {
  @Input({ required: true }) data!: TrackData;
  @Input() userAlbumId: string | null = null;
  playerService = inject(PlayerService);
  moreContextService = inject(MoreContextService);
  loadImageService = inject(LoadImageService);
  img = signal<string | null>(null);
  ngOnInit() {
    const nextImg = this.getImg(this.data.imgUrls);
    if (nextImg && nextImg.url) {
      this.loadImageService.addToLoad(nextImg.url).subscribe({
        next: (loadedUrl) => {
          this.img.set(loadedUrl);
        },
        error: () => {
          // Handle image load error, maybe set a default image
          console.error(`Failed to load image: ${nextImg.url}`);
        },
      });
    }
  }

  playlistsService = inject(PlaylistsService);

  onClick() {
    this.playerService.play(this.data);
  }

  getNames(el: IdNameGroup[]) {
    return el.map((el) => el.name).join(' ');
  }

  getImg(el: TrackImage[]) {
    return getByResolution(el, 160);
  }

  cutNames(str: string, len: number) {
    return str.slice(0, len) + (str.length > len ? '...' : '');
  }
}
