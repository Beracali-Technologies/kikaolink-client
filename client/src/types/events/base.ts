import { ID } from '../common';
import { EventLocation } from './location';


export type EventStatus = 'ACTIVE' | 'INACTIVE' | 'DRAFT' | 'LIVE' | 'COMPLETED';

export interface EventBase {
  id: ID;
  title: string;
  description?: string;
  status: EventStatus;
  createdAt: string;
  updatedAt: string;
}

// Lightweight event for lists & tables (TEvent)
export type TEvent = {
  id: ID;
  title: string;
  start_date: string;
  end_date: string;
  created_at?: string;
  updated_at?: string;
  location?: string | EventLocation | null;
  status: EventStatus;
  template?: 'template1' | 'template2' | 'template3' | 'template4';
};

// Create / edit payload shape used in forms
export type TEventCreate = {
  title: string;
  startDate: string;
  startTime?: string;
  endDate: string;
  endTime?: string;
  location?: string | EventLocation | null;
};
