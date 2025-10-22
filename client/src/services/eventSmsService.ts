import api from '../lib/axios';
import { AttendeesResponse } from '../Features/Communications/SmsCommunication/SmsTypes';

export const fetchAttendees = async (eventId: string, params?: { search?: string; status?: string }): Promise<AttendeesResponse> => {
    const query = new URLSearchParams();
    if (params?.search) query.append('search', params.search);
    if (params?.status) query.append('status', params.status);

    const url = query.toString() ? `/api/events/${eventId}/attendees?${query.toString()}` : `/events/${eventId}/attendees`;
    const res = await api.get(url);
    return res.data;
};

export const fetchSmsLogs = async (eventId: string) => {
    const res = await api.get(`/api/events/${eventId}/sms/logs`);
    return res.data;
};

export const sendBulkSms = async (eventId: string, message: string, timing: string, type: string, attendeeIds: string[]) => {
    const res = await api.post(`/api/events/${eventId}/sms/send`, {
        message,
        timing,
        type,
        attendee_ids: attendeeIds,
    });
    return res.data;
};
