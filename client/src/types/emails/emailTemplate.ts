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
  banner_image?: string | null; 
  enabled_sections: EmailSections;
  is_active: boolean;
}

export interface EmailBanner {
  banner_url: string;
}
