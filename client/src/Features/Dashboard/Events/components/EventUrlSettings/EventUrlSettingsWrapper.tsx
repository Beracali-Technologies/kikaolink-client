import React from 'react';
import { useParams } from 'react-router-dom';
import EventUrlSettings from './EventUrlSettings';

const EventUrlSettingsWrapper: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();

  if (!eventId) {
    return <div>Event ID is missing</div>;
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Event URL Settings</h2>
        <p className="text-gray-600 mt-2">
          Customize your event URLs and get embed codes for your website.
        </p>
      </div>
      <EventUrlSettings eventId={eventId} />
    </div>
  );
};

export default EventUrlSettingsWrapper;
