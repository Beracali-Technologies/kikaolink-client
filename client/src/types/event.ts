

export type EventStatus = 'DRAFT' | 'LIVE' | 'COMPLETED';

//there is the problem with the event status and in the Events/components/EventStatusBar/EventStatusBar
export interface Event {
  id: number;
  user_id: number;
  title: string;
  description?: string;
  location?: string;
  start_date: string;
  end_date: string;
  status: 'DRAFT' | 'LIVE' | 'COMPLETED';
  timezone?: string;
  cover_image?: string;
  organizer_name?: string;
  organizer_email?: string;
  created_at: string;
  updated_at: string;
  live_detail?: EventLiveDetail;

  startDate?: string;
  endDate?: string;
  startTime?: string;
  endTime?: string;
}

export type TEvent = {
    id: string | number;
    title: string;
    start_date: string;
    end_date: string;
    created_at?: string;
    updated_at?: string;
    location?: string | null;
    status: string;
    // Add any other properties your Event model has
};

export type TEventCreate = {
    title: string;
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
    location?: string | null;
};

export interface EventLiveDetail {
  id: number;
  event_id: number;
  slug: string;
  is_live: boolean;
  live_url: string;
  went_live_at?: string;
  created_at: string;
  updated_at: string;
}
