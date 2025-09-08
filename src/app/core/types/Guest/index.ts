import {Period} from './index.request';

export interface Guest {
  id?: number;
  name: string;
  occupation: string;
  profilePictureUrl: string;
  profilePicturePublicId: string;
  period: Period
}
