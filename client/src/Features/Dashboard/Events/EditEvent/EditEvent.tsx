import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useEventStore } from '../../../../lib/stores/eventStore';
import EventForm from '../components/EventForm';



const EditEvent: React.FC = () => {
    const { eventId } = useParams<{ eventId: string }>();
    const navigate = useNavigate();

    const { currentEvent, fetchEventById, updateEvent, error } = useEventStore();
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
            toast.success('Event Updated Successfully!', { icon: '✅' });



        } catch (err) {
            toast.error(error || 'Failed to update event.');
        } finally {
            setIsSubmitting(false);
        }
    };



    if (!currentEvent) {
        return (
            <div className="text-center py-12">
                <h2 className="text-xl font-semibold text-gray-700">Event not found</h2>
                <button
                    onClick={() => navigate('/dashboard/events')}
                    className="mt-4 text-blue-600 hover:text-blue-800"
                >
                    ← Back to Events
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <Toaster position="top-right" />

            <header>
                <h1 className="text-3xl font-bold text-gray-800">Edit Event</h1>
                <p className="text-gray-500 mt-1">Update your event information.</p>
            </header>

            <div className="bg-white p-8 rounded-lg shadow-sm border">
                <EventForm
                    event={currentEvent}
                    onFormSubmit={handleFormSubmit}
                    isSubmitting={isSubmitting}
                    mode="edit" // Tell the form it's for EDITING
                />
            </div>
        </div>
    );
};

export default EditEvent;
