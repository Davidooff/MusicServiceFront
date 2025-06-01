import { Component } from '@angular/core';
import { SideBarComponent } from '../../shared/components/side-bar/side-bar.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { RouterOutlet } from '@angular/router';
import { PlayerComponent } from '../../shared/components/player/player.component';
import { CreatePlaylistPopUpComponent } from '../../shared/components/create-playlist-pop-up/create-playlist-pop-up.component';
import { MoreContextComponent } from '../../shared/components/more-context/more-context.component';
import { AddToPlaylistWindowComponent } from '../../shared/components/add-to-playlist-window/add-to-playlist-window.component';
import { QueueComponent } from '../../shared/components/queue/queue.component';

@Component({
  selector: 'app-main-wrapper',
  imports: [
    SideBarComponent,
    HeaderComponent,
    RouterOutlet,
    PlayerComponent,
    CreatePlaylistPopUpComponent,
    MoreContextComponent,
    AddToPlaylistWindowComponent,
    QueueComponent,
  ],
  templateUrl: './main-wrapper.component.html',
  styleUrl: './main-wrapper.component.css',
})
export class MainWrapperComponent {}
