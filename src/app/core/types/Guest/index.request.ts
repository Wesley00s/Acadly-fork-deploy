export interface GuestRequest {
  name: string;
  occupation: string;
  period: Period
}

export enum Period {
  MORNING = 'MORNING',
  AFTERNOON = 'AFTERNOON',
  EVENING = 'EVENING'
}
