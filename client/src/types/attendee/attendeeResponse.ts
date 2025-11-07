import {  Attendee } from './attendee';

export interface AttendeesResponse {
  attendees: Attendee[];
  counts: {
    all: number;
    checkedIn: number;
    absent: number;
    with_phone: number;
  };
  total: number;
}
