import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { PlaylistCollectionEl } from '../models/PlaylistCollectionEl';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlaylistsService {
  private readonly http = inject(HttpClient);
  public readonly userPlaylists = signal<PlaylistCollectionEl | null>(null);
  public readonly errors = signal(false);
  public isCreateNewOpen = signal(true);

  processChanges(req: Observable<PlaylistCollectionEl>) {
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
      this.http.post<PlaylistCollectionEl>('/api/playlists/create', { name })
    );
  }

  updatePlaylists() {
    this.processChanges(
      this.http.get<PlaylistCollectionEl>('/api/playlists/my')
    );
  }
}
