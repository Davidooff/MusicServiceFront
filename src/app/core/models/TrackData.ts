import { EPlatforms } from './EPlatforms';
import { IdNameGroup } from './IdNameGroup';
import { TrackImage } from './TrackImage';

export interface TrackData {
  id: string;
  name: string;
  artists: IdNameGroup[];
  ePlatform: EPlatforms;
  imgUrls: TrackImage[];
  albumId: string;
  duration: number;
}
