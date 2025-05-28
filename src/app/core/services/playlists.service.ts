import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PlaylistsService {
  private readonly http = inject(HttpClient);

  getPlaylists() {
    this.http.get('/api/playlists/my').subscribe({
      next: (playlists: any) => {
        console.log('Playlists fetched successfully:', playlists);
      },
      error: (err: any) => {
        console.error('Error fetching playlists:', err);
      },
    });
  }
}
