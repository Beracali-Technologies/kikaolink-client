// EventWebsite.tsx
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

    // Get template parameter from URL
    const queryParams = new URLSearchParams(search);
    const template = queryParams.get('template') || 'template1';

    console.log('EventWebsite loaded with:', { customSlug, template, search }); // Debug log

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

    // Simple centered loading state
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                    <p className="text-gray-600">Loading event...</p>
                </div>
            </div>
        );
    }

    if (error || !event) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center p-8">
                    <div className="text-2xl font-bold text-gray-800 mb-2">Event Not Found</div>
                    <p className="text-gray-600 mb-4">{error || 'The event you\'re looking for doesn\'t exist.'}</p>
                    <button 
                        onClick={() => window.location.href = '/'}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded"
                    >
                        Go Home
                    </button>
                </div>
            </div>
        );
    }

    const registrationLink = `/r/${customSlug}`;
    const templateProps = {
        event: event as any,
        registrationLink: registrationLink
    };

    // Debug: Log which template is being rendered
    console.log('Rendering template:', template);

    // Render the correct template based on URL parameter
    switch (template) {
        case 'template2':
            return <Template2 {...templateProps} />;
        case 'template3':
            return <Template3 {...templateProps} />;
        case 'template1':
        default:
            return <Template1 {...templateProps} />;
    }
};

export default EventWebsite;