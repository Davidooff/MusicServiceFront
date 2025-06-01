import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { TrackImage } from '../../../core/models/TrackImage';
import { getByResolution } from '../../../core/scripts/getByResolution';
import { CommonModule } from '@angular/common';
// import {NgAfter}

@Component({
  selector: 'app-joind-image',
  imports: [CommonModule],
  templateUrl: './joind-image.component.html',
  styleUrl: './joind-image.component.css',
})
export class JoindImageComponent implements OnChanges {
  @Input({ required: true }) images!:
    | TrackImage[][]
    | TrackImage[]
    | TrackImage
    | null;
  @Input() placeholder = 'P';
  @Input({ required: true }) resolution!: number;

  toDisplay!: TrackImage[] | TrackImage | null;

  ngOnChanges(): void {
    this.toDisplay = this.getImage();
  }

  isArr = Array.isArray;

  getImage(): TrackImage[] | TrackImage | null {
    if (!Array.isArray(this.images)) return this.images as TrackImage;

    if (!Array.isArray(this.images[0]))
      return getByResolution(this.images as any, this.resolution);

    if (this.images.length === 0) return null;

    if (this.images.length < 4)
      return getByResolution(this.images[0] as any, this.resolution);

    let result = [];

    for (let i = 0; i < 4; i++)
      result.push(getByResolution(this.images[i] as any, this.resolution / 4));

    return result;
  }
}
