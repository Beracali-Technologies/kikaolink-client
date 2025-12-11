import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useEventStore } from '../../../../lib/stores/eventStore';
import EventForm from '../components/EventForm';
import EventStatusBar from '../components/EventStatusBar/EventStatusBar';
import { eventsApi } from '@/lib/api/events'
import BackButton from './components/BackButton';
import EditEventHeader from './components/EditEventHeader';



const EditEvent: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [event, setEvent] = useState(null);
  const { currentEvent, fetchEventById, updateEvent, error, isLoading } = useEventStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (eventId) {
      fetchEventById(parseInt(eventId).toString());
    }
  }, [eventId, fetchEventById]);

  const handleFormSubmit = async (data: any) => {
    if (!eventId) return;

    setIsSubmitting(true);
    try {
      await updateEvent(parseInt(eventId).toString(), data);

      const eventData = await eventsApi.getEvent(eventId);
        console.log('✅ Parent received event:', eventData);
        setEvent(eventData);
      
      toast.success('Event Updated Successfully!', { icon: '✅' });
    } catch (err) {
      toast.error(error || 'Failed to update event.');
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="container mx-auto max-w-4xl">
      <Toaster position="top-right" />

      {/* Status Bar at the very top */}
      <EventStatusBar eventId={eventId} eventData={event} />


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
