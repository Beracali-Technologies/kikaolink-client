import React from 'react';
import EventStatusBadge from './components/EventStatusBadge';
import EventUrlCopy from './components/EventUrlCopy';
import { generateEventUrl } from '../utils/urlHelpers';
import OpenEventButton from './components/OpenEventButton';
import { Event } from '../../../../types/event';
import { useEventStore } from '../../../../../lib/stores/eventStore';
import { generateEventUrlPath, generateAbsoluteEventUrl, generateDisplayEventUrl } from '../../../../../lib/utils/urlHelpers';



interface EventStatusBarProps {
  event: Event;
  isLoading: boolean;
}

const EventStatusBar: React.FC<EventStatusBarProps> = ({ event, isLoading }) => {
  const { toggleLiveStatus } = useEventStore();

  // Generate URLs
  const eventUrlPath = generateEventUrlPath(event.title); // /events/house-party
  const absoluteEventUrl = generateAbsoluteEventUrl(event.title); // http://localhost:5173/events/house-party
  const displayEventUrl = generateDisplayEventUrl(event.title); // localhost:5173/events/house-party

  /* Use provided live_url or generate one from event title
  const eventUrl = event.live_detail?.live_url || generateEventUrl(event.title); */

  // Fixed onToggleLive function that returns the expected format
  const handleToggleLive = async (eventId: string) => {
    try {
      await toggleLiveStatus(eventId);

      return { success: true, message: 'Event status updated successfully' };

    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to toggle live status'
      };
    }
  };

  return (
    <div className="bg-white border-b px-4 py-2">
      <div className="flex items-center justify-between gap-4">
        {/* Left side: Status badge */}
        <EventStatusBadge status={event.status} isLive={event.status === 'LIVE'} />

        {/* Center: URL copy - hidden on small screens, shown on medium+ */}
        <div className="hidden md:flex flex-1 items-center justify-center">
          <EventUrlCopy url={displayEventUrl} compact />
        </div>

        {/* Right side: Open Event button */}
        <OpenEventButton
          url={absoluteEventUrl}
          eventId={event.id.toString()}
          isLive={event.status === 'LIVE'}
          onToggleLive={handleToggleLive}
          isLoading={isLoading}
        />
      </div>

      {/* URL copy for mobile - appears below on small screens */}
      <div className="md:hidden mt-2 flex justify-center">
        <EventUrlCopy url={displayEventUrl} compact />
      </div>
    </div>
  );
};

export default EventStatusBar;
