


export interface EmailPreviewData {
  subject: string;
  template: EmailTemplate;
  dummy_data: {
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
}

export interface EmailBanner {
  banner_url: string;
}


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
  enabled_sections: EmailSections;
  is_active: boolean;
}

export interface EmailSections {
  qrCode: boolean;
  attendeeInfo: boolean;
  aboutEvent: boolean;
  registrationSummary: boolean;
  attendeeDetails: boolean;
  viewRegistration: boolean;
}


export interface EmailApiResponse<T> {
  data: T;
  message?: string;
}
