import { ID } from '../common';


export interface Attendee {
  id?: ID;
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
  job_title?: string;
  custom_fields?: Record<string, any>;
  created_at?: string;
}

export interface AttendeeRegistrationData {
  event_id: ID;
  attendees: Attendee[];
}

export interface RegistrationResponse {
  success: boolean;
  message: string;
  attendee?: Attendee;
}
