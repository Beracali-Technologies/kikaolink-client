// Updated EventWebsite component
import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { publicEventService, PublicEvent } from '@/services/url/publicEventService';
import Template1 from './EventWebsiteTemplates/Template1';
import Template2 from './EventWebsiteTemplates/Template2';
import Template3 from './EventWebsiteTemplates/Template3';

const EventWebsite: React.FC = () => {
    const { customSlug } = useParams<{ customSlug: string }>();
    const { search } = useLocation();
    const [event, setEvent] = useState<PublicEvent | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const queryParams = new URLSearchParams(search);
    const template = queryParams.get('template') || 'template1';

    useEffect(() => {
        const fetchEvent = async () => {
            if (!customSlug) {
                setError('Event URL is required');
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError(null);
                const eventData = await publicEventService.getEventByCustomSlug(customSlug);
                setEvent(eventData);
            } catch (err: any) {
                console.error('Error fetching event:', err);
                setError(err.response?.data?.message || 'Event not found');
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();
    }, [customSlug]);

    if (loading) {
        return <div>Loading event...</div>;
    }

    if (error || !event) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-800">Event Not Found</h1>
                    <p className="text-gray-600">{error || 'The event you\'re looking for doesn\'t exist.'}</p>
                </div>
            </div>
        );
    }

    const registrationLink = `/r/${customSlug}`;

    const templateProps = {
        event: event,
        registrationLink: registrationLink
    };

    switch (template) {
        case 'template2':
            return <Template2 {...templateProps} />;
        case 'template1':
            return <Template1 {...templateProps} />;
        case 'template3':
            return <Template3 {...templateProps} />;
        default:
            return <Template1 {...templateProps} />;
    }
};

export default EventWebsite;
