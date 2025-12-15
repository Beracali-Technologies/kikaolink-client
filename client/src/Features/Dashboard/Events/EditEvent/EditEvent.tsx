import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import toast, { Toaster } from 'react-hot-toast';
import { useEventStore } from '../../../../lib/stores/eventStore';
import EventForm from '../components/EventForm';
import EventStatusBar from '../components/EventStatusBar/EventStatusBar';
import { eventsApi } from '@/lib/api/events';
import BackButton from './components/BackButton';
import EditEventHeader from './components/EditEventHeader';
import { TEvent } from '@/types';

const EditEvent: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate(); 
  const [event, setEvent] = useState<TEvent | null>(null);
  const { currentEvent, fetchEventById, updateEvent, error, isLoading } = useEventStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validate eventId on mount
  useEffect(() => {
    if (!eventId) {
      toast.error('Event ID is required');
      navigate('/dashboard/events'); // Redirect if no eventId
      return;
    }
  }, [eventId, navigate]);

  useEffect(() => {
    if (eventId) {
      // Don't parse to int if eventId is already a string
      fetchEventById(eventId); // Just pass the string
    }
  }, [eventId, fetchEventById]);

  const handleFormSubmit = async (data: any) => {
    if (!eventId) {
      toast.error('Event ID is missing');
      return;
    }

    setIsSubmitting(true);
    try {
      // Don't parse to int - just pass the string
      await updateEvent(eventId, data);

      const eventData = await eventsApi.getEvent(eventId);
      console.log('✅ Parent received event:', eventData);
      setEvent(eventData);
      
      toast.success('Event Updated Successfully!', { icon: '✅' });
    } catch (err: any) {
      toast.error(err?.message || error || 'Failed to update event.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show loading or error state
  if (!eventId) {
    return (
      <div className="container mx-auto max-w-4xl p-8">
        <div className="text-center text-red-500">
          Event ID is required
        </div>
      </div>
    );
  }

  if (isLoading && !currentEvent) {
    return (
      <div className="container mx-auto max-w-4xl p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading event...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl">
      <Toaster position="top-right" />

      {/* Status Bar at the very top - eventId is guaranteed to be a string here */}
      <EventStatusBar eventId={eventId} eventData={event || currentEvent} />

      <div className="px-4 py-8">
        <BackButton />
        <EditEventHeader />

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <EventForm
            event={currentEvent}
            onFormSubmit={handleFormSubmit}
            isSubmitting={isSubmitting}
            mode="edit"
          />
        </div>
      </div>
    </div>
  );
};

export default EditEvent;