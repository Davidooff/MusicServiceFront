import { Component, inject, signal } from '@angular/core';
import { PlaylistsService } from '../../core/services/playlists.service';
import { ActivatedRoute } from '@angular/router';
import { UserAlbum } from '../../core/models/UserAlbum';
import { TrackImage } from '../../core/models/TrackImage';
import { getByResolution } from '../../core/scripts/getByResolution';
import { AlbumComponent } from '../../shared/components/album/album.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-album',
  imports: [AlbumComponent, CommonModule],
  templateUrl: './user-album.component.html',
  styleUrl: './user-album.component.css',
})
export class UserAlbumComponent {
  playlists = inject(PlaylistsService);
  userPlaylist = signal<{
    data: UserAlbum;
    img: TrackImage | TrackImage[] | null;
  } | null>(null);
  private readonly activatedRoute = inject(ActivatedRoute);

  constructor() {
    this.activatedRoute.params.subscribe((params) => {
      let playlistId = params['playlistId'];

      this.playlists.getUserPlaylist(playlistId).subscribe({
        next: (data) => {
          if (data.track.length == 0)
            this.userPlaylist.set({ data, img: null });
          else if (data.track.length > 0 && data.track.length < 4)
            this.userPlaylist.set({ data, img: data.track[0].imgUrls });
          else {
            this.userPlaylist.set({
              data,
              img: [
                getByResolution(data.track[0].imgUrls, 200),
                getByResolution(data.track[1].imgUrls, 200),
                getByResolution(data.track[2].imgUrls, 200),
                getByResolution(data.track[3].imgUrls, 200),
              ],
            });
          }
        },
      });
    });
  }
}
