import { Injectable } from '@angular/core';
import { Observable, Subject, from } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';

const MAX_CONCURRENT_LOADS = 4;
const BATCH_RESET_TIME = 1000;
const MIN_LOAD_INTERVAL = 100;

@Injectable({
  providedIn: 'root',
})
export class LoadImageService {
  private imagesToLoad = new Map<string, Observable<string>>();
  private batchCount = 0;
  private preloadedImages = new Set<string>();

  constructor() {
    // Reset batch counter periodically
    setInterval(() => {
      this.batchCount = 0;
    }, BATCH_RESET_TIME);
  }

  addToLoad(url: string): Observable<string> {
    // Return cached observable if already loading this URL
    if (this.imagesToLoad.has(url)) {
      return this.imagesToLoad.get(url)!;
    }

    // Return immediately if image is already preloaded
    if (this.preloadedImages.has(url)) {
      return from([url]);
    }

    // Create new image loading observable
    const loadImage$ = new Observable<string>((observer) => {
      if (this.batchCount >= MAX_CONCURRENT_LOADS) {
        setTimeout(() => this.loadImage(url, observer), MIN_LOAD_INTERVAL);
      } else {
        this.loadImage(url, observer);
      }

      // Cleanup function
      return () => {
        this.imagesToLoad.delete(url);
      };
    }).pipe(
      shareReplay(1), // Share the same observable for multiple subscribers
      tap({
        next: (loadedUrl) => {
          this.preloadedImages.add(loadedUrl);
          this.imagesToLoad.delete(url);
        },
        error: () => {
          this.imagesToLoad.delete(url);
        },
      })
    );

    this.imagesToLoad.set(url, loadImage$);
    return loadImage$;
  }

  private loadImage(url: string, observer: any) {
    this.batchCount++;

    const img = new Image();
    img.onload = () => {
      observer.next(url);
      observer.complete();
      this.batchCount--;
    };

    img.onerror = (error) => {
      observer.error(error);
      this.batchCount--;
    };

    img.src = url;
  }
}
