// EventStatusBar.tsx - COMPLETELY REWRITTEN
import React, { useState, useEffect } from 'react';
import EventStatusBadge from './components/EventStatusBadge';
import EventUrlCopy from './components/EventUrlCopy';
import OpenEventButton from './components/OpenEventButton';
import { eventsApi } from '../../../../../lib/api/events';
import { eventUrlService } from '@/services/url/eventUrlService';
import { toast } from 'react-hot-toast';

interface EventStatusBarProps {
  eventId: string; // This should come from useParams() in parent
  eventData?: any; // Optional: If parent already fetched event data
}

const EventStatusBar: React.FC<EventStatusBarProps> = ({ eventId, eventData }) => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [event, setEvent] = useState<any | null>(eventData || null);
  const [eventUrls, setEventUrls] = useState<any>(null);
  const [loading, setLoading] = useState(!eventData);
  const [loadingUrls, setLoadingUrls] = useState(false);

  // CRITICAL: Validate eventId immediately
  useEffect(() => {
    console.log('EventStatusBar initialized with:', { eventId, hasEventData: !!eventData });
    
    if (!eventId || eventId === 'undefined') {
      console.error('🚨 CRITICAL: eventId is invalid:', eventId);
      toast.error('Event ID is missing. Please refresh the page.');
    }
  }, [eventId, eventData]);

  // Fetch event data if not provided
  useEffect(() => {
    const fetchEvent = async () => {
      if (!eventId || eventId === 'undefined' || eventData) {
        return;
      }

      try {
        setLoading(true);
        console.log('📡 Fetching event data for ID:', eventId);
        
        const data = await eventsApi.getEvent(eventId);
        console.log('✅ Event data received:', data);
        setEvent(data);
        
      } catch (error: any) {
        console.error('❌ Error fetching event:', error);
        toast.error('Failed to load event data');
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId, eventData]);

  // Fetch event URLs (this contains the custom_slug)
  useEffect(() => {
    const fetchUrls = async () => {
      if (!eventId || eventId === 'undefined') {
        return;
      }

      try {
        setLoadingUrls(true);
        console.log('📡 Fetching event URLs for ID:', eventId);
        
        const urls = await eventUrlService.getEventUrls(eventId);
        console.log('✅ Event URLs received:', urls);
        setEventUrls(urls);
        
      } catch (error: any) {
        console.warn('⚠️ Could not fetch event URLs:', error);
        // Don't show error - this is not critical for basic functionality
      } finally {
        setLoadingUrls(false);
      }
    };

    fetchUrls();
  }, [eventId]);

  // Get the event slug - try multiple sources in priority order
  const getEventSlug = (): string => {
    // Debug what we have
    console.log('🔍 Getting event slug from:', {
      eventUrls: eventUrls?.custom_slug,
      eventData: eventData?.custom_slug,
      event: event?.custom_slug,
      title: event?.title || eventData?.title
    });

    // Priority 1: From eventUrls (most reliable)
    if (eventUrls?.custom_slug) {
      console.log('✅ Using custom_slug from eventUrls:', eventUrls.custom_slug);
      return eventUrls.custom_slug;
    }

    // Priority 2: From event data (if fetched)
    if (event?.custom_slug) {
      console.log('✅ Using custom_slug from event:', event.custom_slug);
      return event.custom_slug;
    }

    // Priority 3: From props
    if (eventData?.custom_slug) {
      console.log('✅ Using custom_slug from props:', eventData.custom_slug);
      return eventData.custom_slug;
    }

    // Priority 4: Generate from title as fallback
    if (event?.title || eventData?.title) {
      const title = event?.title || eventData?.title;
      const slug = title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .substring(0, 50);
      
      console.log('⚠️ Generated slug from title:', slug);
      return slug;
    }

    console.warn('❌ No slug available');
    return '';
  };

  // Get display URL for copying
  const getDisplayUrl = (): string => {
    const slug = getEventSlug();
    if (!slug) {
      console.warn('❌ Cannot generate display URL - no slug');
      return '';
    }
    
    const baseUrl = window.location.origin;
    const fullUrl = `${baseUrl}/e/${slug}`;
    const finalUrl = selectedTemplate ? `${fullUrl}?template=${selectedTemplate}` : fullUrl;
    
    console.log('🌐 Generated display URL:', finalUrl);
    return finalUrl;
  };

  // Handle toggle live - FIXED with proper validation
  const handleToggleLive = async (idToToggle: string) => {
    console.log('🔄 Toggling live status for event ID:', idToToggle);
    
    // CRITICAL VALIDATION
    if (!idToToggle || idToToggle === 'undefined') {
      const errorMsg = `Invalid event ID: ${idToToggle}`;
      console.error('❌', errorMsg);
      toast.error('Cannot toggle event: Invalid ID');
      return {
        success: false,
        message: errorMsg
      };
    }

    try {
      console.log('📡 Calling API: /api/events/' + idToToggle + '/toggle-live');
      const result = await eventsApi.toggleLiveStatus(idToToggle);
      console.log('✅ Toggle result:', result);
      
      // Update local state
      if (event) {
        const updatedEvent = {
          ...event,
          status: result.is_live ? 'LIVE' : 'DRAFT',
          is_live: result.is_live
        };
        setEvent(updatedEvent);
        console.log('🔄 Updated local event state:', updatedEvent);
      }
      
      toast.success(result.is_live ? '🎉 Event is now live!' : '📝 Event is now in draft mode');
      return { 
        success: true, 
        message: 'Event status updated',
        data: result 
      };
      
    } catch (error: any) {
      console.error('❌ Toggle error:', error);
      const errorMsg = error.response?.data?.message || 
                      error.message || 
                      'Failed to toggle live status';
      toast.error(`❌ ${errorMsg}`);
      return {
        success: false,
        message: errorMsg
      };
    }
  };

  // Loading state
  if ((loading && !event) || !eventId) {
    return (
      <div className="bg-white border-b px-4 py-3">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500 mr-2"></div>
          <span className="text-sm text-gray-600">Loading event status...</span>
        </div>
      </div>
    );
  }

  // Get current values
  const eventSlug = getEventSlug();
  const displayUrl = getDisplayUrl();
  const isEventLive = event?.status === 'LIVE' || event?.is_live === true;

  console.log('🎨 Rendering EventStatusBar with:', {
    eventId,
    eventSlug,
    displayUrl,
    status: event?.status,
    isLive: isEventLive
  });

  return (
    <div className="bg-white border-b px-4 py-3">
      <div className="flex items-center justify-between gap-4">
        {/* Status Badge */}
        <EventStatusBadge 
          status={event?.status || 'DRAFT'} 
          isLive={isEventLive} 
        />

        {/* URL Copy (Desktop) */}
        {eventSlug && (
          <div className="hidden md:flex flex-1 items-center justify-center">
            <EventUrlCopy url={displayUrl} compact />
          </div>
        )}

        {/* Open Event Button */}
        <OpenEventButton
          url={eventSlug}
          eventId={eventId} // This MUST be valid
          isLive={isEventLive}
          onToggleLive={handleToggleLive}
          isLoading={loading || loadingUrls}
          onTemplateSelect={setSelectedTemplate}
        />
      </div>

      {/* URL Copy (Mobile) */}
      {eventSlug && (
        <div className="md:hidden mt-3 flex justify-center">
          <EventUrlCopy url={displayUrl} compact />
        </div>
      )}

      {/* Debug info - Remove in production

      {process.env.NODE_ENV === 'development' && eventId && (
        <div className="mt-2 pt-2 border-t border-gray-100">
          <div className="text-xs text-gray-500 space-y-1">
            <div className="flex justify-between">
              <span>Event ID:</span>
              <span className="font-mono">{eventId}</span>
            </div>
            <div className="flex justify-between">
              <span>Slug:</span>
              <span className="font-mono">{eventSlug || 'Not set'}</span>
            </div>
            <div className="flex justify-between">
              <span>Status:</span>
              <span className="font-mono">{event?.status || 'Unknown'}</span>
            </div>
          </div>
        </div>
      )} 
       
       */}


    </div>
  );
};

export default EventStatusBar;