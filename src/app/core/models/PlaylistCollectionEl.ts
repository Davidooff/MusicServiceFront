import { IdNameGroup } from './IdNameGroup';
import { TrackImage } from './TrackImage';

export interface PlaylistCollectionEl extends IdNameGroup {
  imgs: TrackImage[];
  owner: IdNameGroup;
}
