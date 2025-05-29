import { Injectable, signal } from '@angular/core';
import { TrackData } from '../models/SearchResult';
import { EPlatforms } from '../models/EPlatforms';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  passedQueu = signal<TrackData[]>([]);
  queu = signal<TrackData[]>([]);
  curentTrack = signal<TrackData | null>(null);
  isPlaying = signal<boolean>(false);
  curentTime = signal<number>(0);
  audio = new Audio();

  play(track: TrackData) {
    this.curentTrack.set(track);
    this.passedQueu.update((el) => [...el, track]);
    this.audio.src = `/api/music/${track.ePlatform}/stream/${track.id}`;
    this.audio.play();
  }

  // vol: 0 - 1
  setVolume(vol: number) {
    this.audio.volume = vol;
  }
}
