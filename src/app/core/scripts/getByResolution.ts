import { TrackImage } from '../models/TrackImage';

export function getByResolution(
  imgs: TrackImage[],
  resolution: number
): TrackImage {
  return imgs.sort(
    (a, b) =>
      Math.abs(a.resolution - resolution) - Math.abs(b.resolution - resolution)
  )[0];
}
