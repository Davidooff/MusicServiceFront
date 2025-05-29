import { EPlatforms } from './EPlatforms';
import { IdNameGroup } from './IdNameGroup';

export interface TrackData {
  id: string;
  name: string;
  artists: IdNameGroup[];
  ePlatform: EPlatforms;
  imgUrl: string;
  albumId: string;
  duration: number;
}
