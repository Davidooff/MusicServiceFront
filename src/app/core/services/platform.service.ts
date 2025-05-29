import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { EPlatforms } from '../models/EPlatforms';
import { Router, ActivatedRoute } from '@angular/router';
import { TrackData } from '../models/SearchResult';
import { observeNotification } from 'rxjs/internal/Notification';

@Injectable({
  providedIn: 'root',
})
export class PlatformService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  public readonly platformNames = Object.values(EPlatforms).splice(
    0,
    Object.values(EPlatforms).length / 2
  );
  public readonly curentPlatform = (() => {
    const platformParam = this.route.snapshot.paramMap.get('platform');
    return (
      parseInt(platformParam as string) ||
      parseInt(localStorage.getItem('platform') as string) ||
      EPlatforms.YTMusic
    );
  })();

  changePlatform(platform: EPlatforms) {
    localStorage.setItem('platform', platform.toString());
    if (this.router.url.includes('/platform'))
      this.router.navigate(['/library']);
  }

  search(query: string) {
    return this.http.post<TrackData[]>('api/music/search', {
      search: query,
      platform: this.curentPlatform,
    });
  }

  streamTrack(id: string, platform = this.curentPlatform) {
    // return this.http.post<TrackData[]>('api/music/search', {}, {observe}
    // return this.http.get(`api/music/${id}/stream/${platform}`,  {}, {observe});
  }
}
