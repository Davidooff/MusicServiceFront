import { Component } from '@angular/core';
import { SideBarComponent } from '../../shared/components/side-bar/side-bar.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { RouterOutlet } from '@angular/router';
import { PlayerComponent } from '../../shared/components/player/player.component';
import { CreatePlaylistPopUpComponent } from '../../shared/components/create-playlist-pop-up/create-playlist-pop-up.component';

@Component({
  selector: 'app-main-wrapper',
  imports: [
    SideBarComponent,
    HeaderComponent,
    RouterOutlet,
    PlayerComponent,
    CreatePlaylistPopUpComponent,
  ],
  templateUrl: './main-wrapper.component.html',
  styleUrl: './main-wrapper.component.css',
})
export class MainWrapperComponent {}
