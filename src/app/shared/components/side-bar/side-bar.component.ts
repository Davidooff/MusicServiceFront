import { Component, inject } from '@angular/core';
import { PlaylistsService } from '../../../core/services/playlists.service';
import { CommonModule } from '@angular/common';
import { ShowPlaylistsComponent } from '../show-playlists/show-playlists.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  imports: [CommonModule, ShowPlaylistsComponent],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css',
})
export class SideBarComponent {
  playlistService = inject(PlaylistsService);
  router = inject(Router);

  clickedOn(id: string) {
    this.router.navigate(['playlist', id]);
  }
}
