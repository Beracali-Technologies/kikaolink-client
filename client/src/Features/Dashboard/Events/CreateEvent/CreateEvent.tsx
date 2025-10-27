import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import Confetti from 'react-confetti';
import { useEventStore } from '../../../../lib/stores/eventStore';
import EventForm from '../components/EventForm'; // Our smart, reusable form

const CreateEvent: React.FC = () => {
    const navigate = useNavigate();

    const createEvent = useEventStore((state) => state.createEvent);
    const isLoading = useEventStore((state) => state.isLoading);
    const error = useEventStore((state) => state.error);

    const [showConfetti, setShowConfetti] = useState(false);

    const handleFormSubmit = async (data: any) => {
    try {
        const newEvent = await createEvent(data);
        setShowConfetti(true);
        toast.success('Event Created!', { icon: '🎉', duration: 4000 });

        setTimeout(() => {
            navigate(`/dashboard/events/${newEvent.id}/info`);
        }, 2000);

    } catch (err: any) {
        console.error('Event creation error:', err);

        // Check if it's a validation error (422)
        if (err?.response?.status === 422) {
            const validationErrors = err.response.data.errors;
            const firstError = Object.values(validationErrors)[0] as string[];
            toast.error(firstError[0] || 'Validation error occurred');
        } else {
            toast.error(err?.message || error || 'Failed to create event.');
        }
    }
};

    return (
        // Wrapper for the entire page
        <div className="space-y-8">
            {showConfetti && <Confetti recycle={false} onConfettiComplete={() => setShowConfetti(false)} />}
            <Toaster position="top-right" />

            <header>
                <h1 className="text-3xl font-bold text-gray-800">Create a New Event</h1>
                <p className="text-gray-500 mt-1">Start by filling out the basic information.</p>
            </header>

            {/* The form is wrapped in a card for better UI */}
            <div className="bg-white p-8 rounded-lg shadow-sm border">
                <EventForm
                    onFormSubmit={handleFormSubmit}
                    isSubmitting={isLoading}
                    mode="create" // We explicitly tell the form it's for CREATING an event
                />
            </div>
        </div>
    );
};
export default CreateEvent;
