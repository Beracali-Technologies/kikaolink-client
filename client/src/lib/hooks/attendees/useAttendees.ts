// hooks/useAttendees.ts
import { useState, useEffect } from 'react';
import { Attendee } from '@/types';
import { attendeeService, AttendeesResponse } from '@/services/attendees/attendeeService';

export const useAttendees = (eventId: string | undefined) => {
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [filteredAttendees, setFilteredAttendees] = useState<Attendee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [counts, setCounts] = useState({
    all: 0,
    checkedIn: 0,
    absent: 0,
    with_phone: 0
  });

  const fetchAttendees = async () => {
    if (!eventId) {
      setError('Event ID is required');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data: AttendeesResponse = await attendeeService.getAttendees(eventId);
      setAttendees(data.attendees);
      setFilteredAttendees(data.attendees);
      setCounts(data.counts);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch attendees');
    } finally {
      setLoading(false);
    }
  };

  const refreshCounts = async () => {
    if (!eventId) return;

    try {
      const countsData = await attendeeService.getAttendeeCounts(eventId);
      setCounts(countsData);
    } catch (err) {
      console.error('Failed to refresh counts:', err);
    }
  };

  useEffect(() => {
    if (eventId) {
      fetchAttendees();
    }
  }, [eventId]);

  const refetch = () => {
    fetchAttendees();
  };

  return {
    attendees,
    filteredAttendees,
    setFilteredAttendees,
    loading,
    error,
    counts,
    refetch,
    refreshCounts
  };
};
