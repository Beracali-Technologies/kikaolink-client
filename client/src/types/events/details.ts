// src/types/events/details.ts
import { TEvent, TEventCreate } from './base';
import { EventOrganizer } from './organizer';
import { EventLiveDetail } from './live';
import { EventLocation } from './location';

export type EventDetails = TEvent & Partial<TEventCreate> & Partial<EventOrganizer> & {
  // allow either string or structured location (TEvent already supports this)
  location?: string | EventLocation | null;

  // frontend-friendly camelCase fields (optional)
  startDate?: string;
  endDate?: string;

  // image fields
  image?: string;       // frontend-friendly property
  cover_image?: string; // backend property if returned snake_case
  bannerImage?: string;
  gallery?: string[];

  timezone?: string;
  live_detail?: EventLiveDetail;
  capacity?: number;
  tags?: string[];

  // event description (templates expect this)
  description?: string;
}
