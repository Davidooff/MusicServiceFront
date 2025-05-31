import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { PlaylistCollectionEl } from '../models/PlaylistCollectionEl';
import { Observable } from 'rxjs';
import { UserAlbum } from '../models/UserAlbum';
import { TrackData } from '../models/TrackData';

@Injectable({
  providedIn: 'root',
})
export class PlaylistsService {
  private readonly http = inject(HttpClient);
  public readonly userPlaylists = signal<PlaylistCollectionEl[] | null>(null);
  public readonly errors = signal(false);
  public isCreateNewOpen = signal(false);
  public trackToAdd = signal<TrackData | null>(null);

  constructor() {
    this.updatePlaylists();
  }

  processChanges(req: Observable<PlaylistCollectionEl[]>) {
    req.subscribe({
      next: (playlists) => {
        this.userPlaylists.set(playlists);
      },
      error: (err: any) => {
        this.errors.set(true);
        console.error('Error fetching playlists:', err);
      },
    });
  }

  create(name: string) {
    this.processChanges(
      this.http.post<PlaylistCollectionEl[]>('/api/playlists/create', { name })
    );
  }

  updatePlaylists() {
    this.processChanges(
      this.http.get<PlaylistCollectionEl[]>('/api/playlists/my')
    );
  }

  getUserPlaylist(playlistId: string) {
    return this.http.get<UserAlbum>('/api/playlists/' + playlistId);
  }

  addToPlaylist(track: TrackData, playlistId: string) {
    this.http
      .post('/api/playlists/add-track', {
        eplatform: track.ePlatform,
        playlistId,
        TrackId: track.id,
      })
      .subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  removeFromPlaylist(track: TrackData, playListId: string) {
    this.http
      .post('/api/playlists/remove-track', {
        eplatform: track.ePlatform,
        playListId,
        trackId: track.id,
      })
      .subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
