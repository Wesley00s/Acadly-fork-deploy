import {Participant} from '../Participant';

export interface Enrollment {
  participant: Participant,
  enrollmentDate: string,
  status: string,
  wasPresent: 'TRUE' | 'FALSE' | 'PENDING'
}
