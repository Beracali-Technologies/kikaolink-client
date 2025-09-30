import React, { useState } from 'react';
import EventStatusBadge from './components/EventStatusBadge';
import EventUrlCopy from './components/EventUrlCopy';
import OpenEventButton from './components/OpenEventButton';
import { eventsApi } from '../../../../../lib/api/events';
import {  generateAbsoluteEventUrl, generateDisplayEventUrl } from '../../../../../lib/utils/urlHelpers';

interface EventStatusBarProps {
  event: any;
  isLoading: boolean;
}

const EventStatusBar: React.FC<EventStatusBarProps> = ({ event, isLoading }) => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  // Generate base URLs
  const absoluteEventUrl = generateAbsoluteEventUrl(event.title); // http://localhost:5173/events/house-party
  const displayEventUrl = generateDisplayEventUrl(event.title); // localhost:5173/events/house-party

  // Append selected template to URLs if a template is chosen
  const getDynamicUrl = (baseUrl: string) => {
    return selectedTemplate ? `${baseUrl}?template=${selectedTemplate}` : baseUrl;
  };

  // Fixed onToggleLive function that returns the expected format
  const handleToggleLive = async (eventId: string) => {
    try {
      await eventsApi.toggleLiveStatus(eventId);
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
          <EventUrlCopy url={getDynamicUrl(displayEventUrl)} compact />
        </div>

        {/* Right side: Open Event button */}
        <OpenEventButton
          url={getDynamicUrl(absoluteEventUrl)}
          eventId={event.id.toString()}
          isLive={event.status === 'LIVE'}
          onToggleLive={handleToggleLive}
          isLoading={isLoading}
          onTemplateSelect={setSelectedTemplate}
        />
      </div>

      {/* URL copy for mobile - appears below on small screens */}
      <div className="md:hidden mt-2 flex justify-center">
        <EventUrlCopy url={getDynamicUrl(displayEventUrl)} compact />
      </div>

      {/* Information note for attendees */}
      <p className="mt-2 text-xs text-gray-500 text-center">
        This is the link to be copied and shared with attendees.
      </p>
    </div>
  );
};

export default EventStatusBar;
