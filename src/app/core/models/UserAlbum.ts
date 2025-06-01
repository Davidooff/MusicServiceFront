import { IdNameGroup } from './IdNameGroup';
import { TrackData } from './TrackData';

export interface UserAlbum {
  id: string;
  name: string;
  owner: IdNameGroup;
  track: TrackData[];
  timesOpened: number;
}
