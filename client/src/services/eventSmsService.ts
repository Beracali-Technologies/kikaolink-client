import api from '../lib/axios'; 

interface SmsLog {
    id: number;
    message: string;
    timing_label: string;
    recipient_count: number;
    status: 'Pending' | 'Processing' | 'Sent' | 'Failed';
    created_at: string;
}

/**
 * Dispatches a bulk SMS job to the backend.
 * @param eventId The ID of the current event.
 * @param message The SMS message content.
 * @param timing_label The context (e.g., Pre-Event).
 */
export const sendBulkSms = async (eventId: string, message: string, timing_label: string) => {
    const response = await api.post(`/events/${eventId}/sms/send`, {
        message,
        timing_label,
    });
    return response.data;
};

/**
 * Fetches the history of bulk SMS jobs for an event.
 * @param eventId The ID of the current event.
 */
export const fetchSmsLogs = async (eventId: string): Promise<SmsLog[]> => {
    const response = await api.get(`/events/${eventId}/sms/logs`);
    return response.data;
};
