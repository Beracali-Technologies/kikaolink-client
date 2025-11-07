import { ID } from '../common';


export interface Attendee {
  id?: ID;
  uuid: string;
  event_id: number;
  name: string;  // for the fullname purpose
  first_name?: string;
  last_name?: string;
  table?: string;
  seat?: number;
  ticketType?: string;
  isCheckedIn: boolean;
  email: string;
  phone?: string;
  company?: string;
  status: 'checkedIn' | 'absent';
  has_phone: boolean;
  checked_in_at?: string;
  job_title?: string;
  custom_fields?: Record<string, any>;
  created_at?: string;
}

export interface AttendeeRegistrationData {
  event_id: ID;
  attendees: Attendee[];
}


export interface CheckinAttendee {
    id: number;
    uuid: string;
    first_name: string;
    last_name: string;
    email: string;
    status: string;
    zpl: string;
}
