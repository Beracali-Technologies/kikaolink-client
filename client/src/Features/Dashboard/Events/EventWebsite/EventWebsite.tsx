import React from 'react';
import { useParams } from 'react-router-dom';
import { useEventStore } from '../../../../lib/stores/eventStore';
import Template1 from './EventWebsiteTemplates/Template1';

const EventWebsite: React.FC = () => {
  const { eventSlug } = useParams<{ eventSlug: string }>();
  const { events, fetchEvents } = useEventStore();

  React.useEffect(() => {
    if (events.length === 0) {
      fetchEvents();
    }
  }, [events.length, fetchEvents]);

  // Find event by slug
  const event = events.find(e => {
    const slug = e.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    return slug === eventSlug;
  });

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Event Not Found</h1>
          <p className="text-gray-600">The event you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return <Template1 event={event} />;
};

export default EventWebsite;
