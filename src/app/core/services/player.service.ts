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
  isQueueShow = signal(false);

  switchQueueShow() {
    this.isQueueShow.update((el) => !el);
  }

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

  private setAudio(id: string, ePlatform: EPlatforms, startPlay: boolean) {
    this.audio.src = `/api/music/${ePlatform}/stream/${id}`;
    startPlay && this.audio.play();
  }

  playNext(start: boolean) {
    let nexEl: TrackData | undefined;
    this.queu.update((next) => {
      nexEl = next.shift();
      return [...next];
    });
    if (nexEl) {
      this.isPlaying.set(start);
      this.curentTrack.set(nexEl);
      this.passedQueu.update((queu) => [...queu, nexEl as TrackData]);
      this.setAudio(nexEl.id, nexEl.ePlatform, start);
    }
  }

  goPre() {
    if (this.curentTime() > 5) this.audio.currentTime = 0;
    else {
      let lastPlayed: TrackData[] | undefined;
      this.passedQueu.update((el) => {
        if (el.length === 0) {
          this.audio.currentTime = 0;
          return el;
        }
        lastPlayed = el.slice(-2);
        return el.slice(0, -2);
      });
      if (lastPlayed) {
        this.queu.update((el) => [...(lastPlayed as TrackData[]), ...el]);
        this.playNext(this.isPlaying());
      }
    }
  }

  play(track: TrackData) {
    this.queu.set([track]);
    this.passedQueu.set([]);
    this.playNext(true);
  }

  playPlaylist(track: TrackData[]) {
    this.queu.set([...track]);
    this.passedQueu.set([]);
    this.playNext(true);
  }

  addPlaylistToQueue(track: TrackData[]) {
    this.queu.update((pl) => [...pl, ...track]);
  }

  addPlaylistStartQueue(track: TrackData[]) {
    this.queu.update((pl) => [...track, ...pl]);
  }

  countinue() {
    this.isPlaying.set(true);
    this.audio.play();
  }

  pause() {
    this.audio.pause();
    this.isPlaying.set(false);
  }

  skip() {
    this.playNext(this.isPlaying());
  }

  addToQuee(track: TrackData) {
    let startPlaying = false;
    this.queu.update((el) => {
      if (el.length == 0) {
        startPlaying = true;
      }
      return [...el, track];
    });
    if (startPlaying && !this.isPlaying()) {
      this.playNext(true);
    }
  }

  addToStartQuee(track: TrackData) {
    let startPlaying = false;
    this.queu.update((el) => {
      if (el.length == 0) {
        startPlaying = true;
        return el;
      }
      return [track, ...el];
    });

    if (startPlaying && !this.isPlaying()) {
      this.playNext(true);
    }
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
