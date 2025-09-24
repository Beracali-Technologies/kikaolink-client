import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useEventStore } from '../../../../lib/stores/eventStore';
import Template1 from './EventWebsiteTemplates/Template1';
import Template2 from './EventWebsiteTemplates/Template2';
import Template3 from './EventWebsiteTemplates/Template3';


const EventWebsite: React.FC = () => {
  const { eventSlug } = useParams<{ eventSlug: string }>();
  const { search } = useLocation();
  const { events, fetchEvents } = useEventStore();



  // Extract ?template= value
  const queryParams = new URLSearchParams(search);
  const template = queryParams.get('template') || 'template1';

  React.useEffect(() => {
    if (events.length === 0) {
      fetchEvents();
    }
  }, [events.length, fetchEvents]);

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


  const registrationLink = `/register-attendee/${eventSlug}/${event.id}`;


  // Choose template
  switch (template) {
    case 'template2':
        return <Template2 event={event} registrationLink={registrationLink} />;
    case 'template1':
        return <Template1 event={event} registrationLink={registrationLink} />;
    case 'template3':
        return <Template3 event={event} registrationLink={registrationLink} />;
    default:
      return <Template1 event={event} registrationLink={registrationLink} />;
  }
};

export default EventWebsite;
