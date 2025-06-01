import { computed, inject, Injectable, signal } from '@angular/core';
import { TrackData } from '../models/TrackData';
import { UserAlbum } from '../models/UserAlbum';
import { PlaylistsService } from './playlists.service';
import { MenuItem } from '../models/MenuItem';
import { PlayerService } from './player.service';

@Injectable({
  providedIn: 'root',
})
export class MoreContextService {
  showMenuOn = signal<TrackData | UserAlbum | null>(null);
  possition = signal<[number, number]>([0, 0]);
  playlistsService = inject(PlaylistsService);
  player = inject(PlayerService);
  menu = computed(() => {
    var showMenuOn = this.showMenuOn();
    if (!showMenuOn) return null;

    return { menu: this.getMenu(showMenuOn), possition: this.possition() };
  });

  private getTrackMenu(on: TrackData): MenuItem[] {
    return [
      {
        img: 'assets/img/skip_next.svg',
        title: 'Play next',
        func: () => {
          this.player.addToStartQuee(on);
        },
      },
      {
        img: 'assets/img/skip_next.svg',
        title: 'Add to queu',
        func: () => {
          this.player.addToQuee(on);
        },
      },
      {
        img: 'assets/img/skip_next.svg',
        title: 'Add to playlist',
        func: () => {
          this.playlistsService.trackToAdd.set(on);
        },
      },
    ];
  }

  private getUserAlbumMenu(on: UserAlbum): MenuItem[] {
    return [
      {
        img: 'assets/img/skip_next.svg',
        title: 'Play',
        func: () => {
          this.player.playPlaylist(on.track);
        },
      },
      {
        img: 'assets/img/skip_next.svg',
        title: 'Add to queu',
        func: () => {
          this.player.addPlaylistToQueue(on.track);
        },
      },
      {
        img: 'assets/img/skip_next.svg',
        title: 'Add to start of queue',
        func: () => {
          this.player.addPlaylistStartQueue(on.track);
        },
      },
    ];
  }

  private isTrackData(obj: any): obj is TrackData {
    return obj && typeof obj === 'object' && 'albumId' in obj;
  }

  private isUserAlbum(obj: any): obj is TrackData {
    return obj && typeof obj === 'object' && 'timesOpened' in obj;
  }

  private getMenu(on: TrackData | UserAlbum) {
    if (this.isTrackData(on)) return this.getTrackMenu(on as TrackData);
    if (this.isUserAlbum(on)) return this.getUserAlbumMenu(on as UserAlbum);
    return null;
  }

  public openMenu(on: TrackData | UserAlbum, possition: [number, number]) {
    this.showMenuOn.set(on);
    this.possition.set(possition);
  }
}
