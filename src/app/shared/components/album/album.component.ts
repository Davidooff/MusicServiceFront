import { Component, Input } from '@angular/core';
import { TrackImage } from '../../../core/models/TrackImage';
import { TrackData } from '../../../core/models/TrackData';

@Component({
  selector: 'app-album',
  imports: [],
  templateUrl: './album.component.html',
  styleUrl: './album.component.css',
})
export class AlbumComponent {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) img!: TrackImage[] | TrackImage | null;
  @Input({ required: true }) trackData!: TrackData[];
}
