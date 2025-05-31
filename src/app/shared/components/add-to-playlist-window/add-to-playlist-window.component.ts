import { Component, inject } from '@angular/core';
import { PlaylistsService } from '../../../core/services/playlists.service';
import { PopUpWindowComponent } from '../pop-up-window/pop-up-window.component';
import { ShowPlaylistsComponent } from '../show-playlists/show-playlists.component';

@Component({
  selector: 'app-add-to-playlist-window',
  imports: [PopUpWindowComponent, ShowPlaylistsComponent],
  templateUrl: './add-to-playlist-window.component.html',
  styleUrl: './add-to-playlist-window.component.css',
})
export class AddToPlaylistWindowComponent {
  playlistsService = inject(PlaylistsService);

  add(playlistId: string) {
    this.playlistsService.addToPlaylist(
      this.playlistsService.trackToAdd()!,
      playlistId
    );
    this.playlistsService.trackToAdd.set(null);
  }
}
