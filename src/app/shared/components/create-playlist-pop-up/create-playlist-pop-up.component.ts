import { Component, inject, signal, ViewChild } from '@angular/core';
import { PlaylistsService } from '../../../core/services/playlists.service';
import { CommonModule } from '@angular/common';
import { DefaultInputComponent } from '../default-input/default-input.component';
import { DefaultBtnComponent } from '../default-btn/default-btn.component';
import { PopUpWindowComponent } from '../pop-up-window/pop-up-window.component';

@Component({
  selector: 'app-create-playlist-pop-up',
  imports: [
    CommonModule,
    DefaultInputComponent,
    DefaultBtnComponent,
    PopUpWindowComponent,
  ],
  templateUrl: './create-playlist-pop-up.component.html',
  styleUrl: './create-playlist-pop-up.component.css',
})
export class CreatePlaylistPopUpComponent {
  @ViewChild('NewPlaylistInput') playlistInput!: DefaultInputComponent;
  playlists = inject(PlaylistsService);
}
