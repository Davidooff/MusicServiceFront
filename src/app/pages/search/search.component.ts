import { Component, inject, signal } from '@angular/core';
import { PlatformService } from '../../core/services/platform.service';
import { TrackData } from '../../core/models/SearchResult';
import { CommonModule } from '@angular/common';
import { SongItemComponent } from '../../shared/components/song-item/song-item.component';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search',
  imports: [CommonModule, SongItemComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  private readonly platform = inject(PlatformService);
  private readonly activatedRoute = inject(ActivatedRoute);
  // readonly searchResult$: Observable<TrackData[]> = new Observable();
  searchResultSignal = signal<TrackData[] | null>(null);

  constructor() {
    this.activatedRoute.params.subscribe((params) => {
      const searchResult$ = this.platform.search(params['query']);

      searchResult$.subscribe({
        next: (result) => {
          this.searchResultSignal.set(result || null);
        },
        error: (err) => {
          console.error('Search error:', err);
          this.searchResultSignal.set(null);
        },
      });
    });
  }
}
