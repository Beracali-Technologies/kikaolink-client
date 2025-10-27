export interface Attendee {
    id: string;
    uuid: string;
    name: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string | null;
    company: string | null;
    job_title: string | null;
    status: 'checkedIn' | 'absent' | 'pending';
    has_phone: boolean;
}

export interface AttendeeCounts {
    all: number;
    checkedIn: number;
    absent: number;
    with_phone: number;
}

export interface AttendeesResponse {
    attendees: Attendee[];
    counts: AttendeeCounts;
    total: number;
}

export type TimingLabel = 'Pre-Event' | 'At-Event' | 'Post-Event';

export interface SmsLog {
    id: string;
    event_id: string;
    recipient_count: number;
    message: string;
    timing: TimingLabel;
    sent_at: string;
    status?: string;
}

export const SMS_TEMPLATES: Record<TimingLabel, string> = {
    'Pre-Event': 'Welcome to {{EVENT_NAME}}, {{FIRST_NAME}}! Your QR code is ready. Check-in starts at {{CHECKIN_TIME}}.',
    'At-Event': 'Thanks for attending {{EVENT_NAME}}, {{FIRST_NAME}}! Please show your QR code at the entrance.',
    'Post-Event': 'Thank you for joining {{EVENT_NAME}}, {{FIRST_NAME}}! We hope to see you at our next event.'
};
