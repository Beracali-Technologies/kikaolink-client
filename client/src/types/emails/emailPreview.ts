import { EmailTemplate } from './emailTemplate';
import { EmailDummyData } from './emailDummyData';

export interface EmailPreviewData {
  subject: string;
  content?: string;
  template: EmailTemplate;
  dummy_data?: {
    event_title: string;
    event_date: string;
    event_location: string;
    attendee_first_name: string;
    attendee_last_name: string;
    attendee_full_name: string;
    attendee_email: string;
    attendee_company: string;
    registration_id: string;
  };
