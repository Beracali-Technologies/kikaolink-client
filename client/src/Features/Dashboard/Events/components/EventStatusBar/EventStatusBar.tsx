import React from 'react';
import EventStatusBadge from './components/EventStatusBadge';
import EventUrlCopy from './components/EventUrlCopy';
import { generateEventUrl } from '../utils/urlHelpers';

interface EventStatusBarProps {
  event: {
    title: string;
    status: string;
    is_live?: boolean;
    live_url?: string;
  };
}

const EventStatusBar: React.FC<EventStatusBarProps> = ({ event }) => {

  const eventUrl = event.live_url || generateEventUrl(event.title);

  return (
    <div className="bg-white border-b px-4 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
      <div className="flex items-center">
        <EventStatusBadge status={event.status} isLive={event.is_live || false} />
        <EventUrlCopy url={eventUrl} />
      </div>
    </div>
  );
};

export default EventStatusBar;
