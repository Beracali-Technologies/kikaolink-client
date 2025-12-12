// services/attendeeService.ts
import api from '@/lib/axios';
import { Attendee } from '@/types';

export interface AttendeesResponse {
  attendees: Attendee[];
  counts: {
    all: number;
    checkedIn: number;
    absent: number;
    with_phone: number;
  };
  total: number;
}

export interface SMSRequest {
  attendee_ids: number[];
  message: string;
}

class AttendeeService {
  private baseURL = '/api';

  //  Get all attendees for a specific event
  async getAttendees(eventId: string): Promise<AttendeesResponse> {
    try {
      const { data } = await api.get<AttendeesResponse>(
        `${this.baseURL}/events/${eventId}/attendees`
      );
      return data;
    } catch (error) {
      console.error('❌ Failed to fetch attendees:', error);
      throw error;
    }
  }

  // Get attendee counts for an event
  async getAttendeeCounts(eventId: string) {
    try {
      const { data } = await api.get(
        `${this.baseURL}/events/${eventId}/attendees/counts`
      );
      return data;
    } catch (error) {
      console.error('❌ Failed to fetch attendee counts:', error);
      throw error;
    }
  }

  //  Send bulk SMS to attendees
  async sendBulkSMS(eventId: string, data: SMSRequest) {
    try {
      const response = await api.post(
        `${this.baseURL}/events/${eventId}/sms/send`,
        data
      );
      return response.data;
    } catch (error) {
      console.error('❌ Failed to send SMS:', error);
      throw error;
    }
  }

  // Resend QR code to a specific attendee
  async resendQR(attendeeId: number) {
    try {
      const response = await api.post(
        `${this.baseURL}/attendees/${attendeeId}/resend-qr`
      );
      return response.data;
    } catch (error) {
      console.error('❌ Failed to resend QR code:', error);
      throw error;
    }
  }

  // Print badges for multiple attendees
  async printBadges(attendeeIds: number[]) {
    try {
      const response = await api.post(
        `${this.baseURL}/attendees/print`,
        { attendeeIds }
      );
      return response.data;
    } catch (error) {
      console.error('❌ Failed to print badges:', error);
      throw error;
    }
  }

  // Get a single attendee’s details
  async getAttendee(eventId: string, attendeeId: number) {
    try {
      const { data } = await api.get(
        `${this.baseURL}/events/${eventId}/attendees/${attendeeId}`
      );
      return data;
    } catch (error) {
      console.error('❌ Failed to fetch attendee details:', error);
      throw error;
    }
  }


  async createAttendee(eventId: string, data: any) {
    try {
      const response = await api.post(
        `${this.baseURL}/events/${eventId}/attendees`,
        data
      );
      return response.data;
    } catch (error) {
      console.error('Failed to create attendee:', error);
      throw error;
    }
  }

  async updateAttendee(eventId: string, attendeeId: number, data: any) {
    try {
      const response = await api.put(
        `${this.baseURL}/events/${eventId}/attendees/${attendeeId}`,
        data
      );
      return response.data;
    } catch (error) {
      console.error('Failed to update attendee:', error);
      throw error;
    }
  }

  async deleteAttendee(eventId: string, attendeeId: number) {
    try {
      const response = await api.delete(
        `${this.baseURL}/events/${eventId}/attendees/${attendeeId}`
      );
      return response.data;
    } catch (error) {
      console.error('Failed to delete attendee:', error);
      throw error;
    }
  }

  async importAttendees(eventId: string, formData: FormData) {
    try {
      const response = await api.post(
        `${this.baseURL}/events/${eventId}/attendees/import`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Failed to import attendees:', error);
      throw error;
    }
  }

  
}

export const attendeeService = new AttendeeService();
