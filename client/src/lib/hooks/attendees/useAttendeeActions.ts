import { useState } from 'react';
import { attendeeService } from '@/services/attendees/attendeeService';

export const useAttendeeActions = (eventId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendBulkSMS = async (attendeeIds: number[], message: string) => {
    try {
      setLoading(true);
      setError(null);
      const result = await attendeeService.sendBulkSMS(eventId, {
        attendee_ids: attendeeIds,
        message: message
      });
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send SMS');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const resendQR = async (attendeeId: number) => {
    try {
      setLoading(true);
      setError(null);
      const result = await attendeeService.resendQR(attendeeId);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to resend QR');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const printBadges = async (attendeeIds: number[]) => {
    try {
      setLoading(true);
      setError(null);
      const result = await attendeeService.printBadges(attendeeIds);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to print badges');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getAttendee = async (attendeeId: number) => {
    try {
      setLoading(true);
      setError(null);
      const result = await attendeeService.getAttendee(eventId, attendeeId);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch attendee');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    sendBulkSMS,
    resendQR,
    printBadges,
    getAttendee
  };
};
