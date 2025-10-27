import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useEventStore } from '../../../../lib/stores/eventStore';
import EventForm from '../components/EventForm';
import EventSuccessPage from '../components/EventSuccessPage/EventSuccessPage';

const CreateEvent: React.FC = () => {

    const createEvent = useEventStore((state) => state.createEvent);
    const isLoading = useEventStore((state) => state.isLoading);
    const error = useEventStore((state) => state.error);

    const [showSuccess, setShowSuccess] = useState(false);
    const [createdEvent, setCreatedEvent] = useState<any>(null);

    const handleFormSubmit = async (data: any) => {
        try {
            const newEvent = await createEvent(data);
            setCreatedEvent(newEvent);
            setShowSuccess(true);

        } catch (err: any) {
            console.error('Event creation error:', err);

            if (err?.response?.status === 422) {
                const validationErrors = err.response.data.errors;
                const firstError = Object.values(validationErrors)[0] as string[];
                toast.error(firstError[0] || 'Validation error occurred');
            } else {
                toast.error(err?.message || error || 'Failed to create event.');
            }
        }
    };

    // Show success page if event was created
    if (showSuccess && createdEvent) {
        return (
            <EventSuccessPage
                eventId={createdEvent.id}
                eventTitle={createdEvent.title}
                redirectDelay={4000}
            />
        );
    }

    return (
        <div className="space-y-8">
            <Toaster position="top-right" />

            <header>
                <h1 className="text-3xl font-bold text-gray-800">Create a New Event</h1>
                <p className="text-gray-500 mt-1">Start by filling out the basic information.</p>
            </header>

            <div className="bg-white p-8 rounded-lg shadow-sm border">
                <EventForm
                    onFormSubmit={handleFormSubmit}
                    isSubmitting={isLoading}
                    mode="create"
                />
            </div>
        </div>
    );
};

export default CreateEvent;
