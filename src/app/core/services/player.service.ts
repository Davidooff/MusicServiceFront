import { Injectable, signal } from '@angular/core';
import { TrackData } from '../models/TrackData';
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
  isShuffleEnabled = signal<boolean>(false);
  isRepeatEnabled = signal<boolean>(false);
  isLoading = signal<boolean>(false);
  audio = new Audio();

  constructor() {
    this.setupAudioEvents();
  }

  private setupAudioEvents(): void {
    // Time update event to track current playback position
    this.audio.addEventListener('timeupdate', () => {
      this.curentTime.set(Math.floor(this.audio.currentTime));
    });

    // Track ended event to handle next track or repeat
    this.audio.addEventListener('ended', () => {
      if (this.isRepeatEnabled()) {
        // If repeat is enabled, replay the current track
        this.audio.currentTime = 0;
        this.audio.play();
      } else {
        // Otherwise, move to next track
        this.skip();
      }
    });

    // Track loading state
    this.audio.addEventListener('loadstart', () => {
      this.isLoading.set(true);
    });

    this.audio.addEventListener('canplay', () => {
      this.isLoading.set(false);
    });

    // Handle errors
    this.audio.addEventListener('error', (e) => {
      console.error('Audio playback error:', e);
      this.isPlaying.set(false);
      this.isLoading.set(false);
    });
  }

  play(track: TrackData) {
    this.curentTrack.set(track);
    this.isPlaying.set(true);
    this.passedQueu.update((el) => [...el, track]);
    this.audio.src = `/api/music/${track.ePlatform}/stream/${track.id}`;
    this.audio.play();
  }

  countinue() {
    this.isPlaying.set(true);
    this.audio.play();
  }

  stop() {
    this.audio.pause();
    this.isPlaying.set(false);
  }

  skip() {
    this.queu.update((el) => {
      if (el.length == 0) {
        this.curentTrack.set(null);
        this.isPlaying.set(false);
        return el;
      }
      let nextToPlay = el.shift() as TrackData;
      this.play(nextToPlay);
      return el;
    });
  }

  addToQuee(track: TrackData) {
    this.queu.update((el) => {
      if (el.length == 0) {
        this.play(track);
        return el;
      }
      return [...el, track];
    });
  }

  addToStartQuee(track: TrackData) {
    this.queu.update((el) => {
      if (el.length == 0) {
        this.play(track);
        return el;
      }
      return [track, ...el];
    });
  }
  // vol: 0 - 1
  setVolume(vol: number) {
    this.audio.volume = vol;
  }

  toggleShuffle() {
    this.isShuffleEnabled.update((value) => !value);
  }

  toggleRepeat() {
    this.isRepeatEnabled.update((value) => !value);
  }
}
