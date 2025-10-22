// Define the shape of the log data received from the backend
export interface SmsLog {
    id: number;
    message: string;
    timing_label: string;
    recipient_count: number;
    status: 'Pending' | 'Processing' | 'Sent' | 'Failed';
    created_at: string;
}

// Define the available timing labels (used for templates)
export type TimingLabel = 'Pre-Event' | 'At-Event' | 'Post-Event';

// Client-side SMS Templates
export const SMS_TEMPLATES: Record<TimingLabel, string> = {
    'Pre-Event': "Hi, thanks for registering for {{EVENT_NAME}}! We look forward to seeing you on {{START_DATE}}. Please check your email for any last-minute updates.",
    'At-Event': "Welcome to {{EVENT_NAME}}! The event is now live. If you need assistance, please visit the info desk.",
    'Post-Event': "Thank you for attending {{EVENT_NAME}}! We hope you had a great time. Find photos and feedback link at [Link].",
};
