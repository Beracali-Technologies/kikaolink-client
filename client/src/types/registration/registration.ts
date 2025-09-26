
export interface RegistrationData {
  event_id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  custom_data?: Record<string, any>;
}

export interface RegistrationResponse {
  message: string;
  attendee: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    status: string;
    unique_code: string;
    attendee_uuid: string;
    qr_code_url?: string | null;
  };
}

export interface QrValidationResponse {
  valid: boolean;
  data?: {
    registration: {
      id: number;
      code: string;
      name: string;
      email: string;
      status: string;
    };
    qr_code: {
      scanned_at: string;
      scan_count: number;
    };
  };
}
