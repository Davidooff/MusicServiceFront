import { Component, inject } from '@angular/core';
import { PlaylistsService } from '../../../core/services/playlists.service';

@Component({
  selector: 'app-side-bar',
  imports: [],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css',
})
export class SideBarComponent {
  playlistService = inject(PlaylistsService);
}
