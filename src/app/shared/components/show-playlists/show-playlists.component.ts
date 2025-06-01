import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserAlbum } from '../../../core/models/UserAlbum';
import { PlaylistCollectionEl } from '../../../core/models/PlaylistCollectionEl';
import { CommonModule } from '@angular/common';
import { JoindImageComponent } from '../joind-image/joind-image.component';

@Component({
  selector: 'app-show-playlists',
  imports: [CommonModule, JoindImageComponent],
  templateUrl: './show-playlists.component.html',
  styleUrl: './show-playlists.component.css',
})
export class ShowPlaylistsComponent {
  @Input({ required: true }) userAlbums!: PlaylistCollectionEl[];
  @Input() showImg: boolean = false;
  @Output() clickedOn = new EventEmitter<string>(); // playlist id
}
