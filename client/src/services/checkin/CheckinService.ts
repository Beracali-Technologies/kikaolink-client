import { CheckinAttendee } from '@/types';
import toast from 'react-hot-toast';
import api from '../../lib/axios';

// Define the expected API response structure
interface CheckinResponse {
  data: CheckinAttendee;
}

export class CheckinService {
  async fetchAttendee(uuid: string): Promise<CheckinAttendee | null> {
    try {
      console.log('Fetching attendee for UUID:', uuid);
      const response = await api.get<CheckinResponse>(`/api/checkin/${uuid}`); // Updated generic type
      const attendee = response.data.data;
      toast.success(`Checked In: ${attendee.first_name} ${attendee.last_name}`);
      return attendee;
    } catch (error) {
      console.error('Check-in fetch error:', error);
      toast.error('Attendee not found or error occurred');
      return null;
    }
  }
}

export const checkinService = new CheckinService();
