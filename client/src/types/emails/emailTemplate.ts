import { EmailSections } from './emailSections';

export interface EmailTemplate {
  id?: number;
  event_id: number;
  name: string;
  subject: string;
  greeting: string;
  message: string;
  closing: string;
  from_name: string;
  reply_to: string;
  show_banner: boolean;
  banner_text?: string;
  banner_image?: string;
  banner_url?: string;
  enabled_sections: {
        qrCode: boolean;
        attendeeInfo: boolean;
        eventInfo: boolean;
        registrationSummary?: boolean;
        viewRegistration?: boolean;
  };
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface EmailBanner {
  banner_url: string;
}
