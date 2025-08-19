import React, { useState } from 'react';
import Stepper from '../Components/Stepper/Stepper';
import CreateEventForm from './CreateEventForm';
import { useNavigate } from 'react-router-dom';
import { useEventStore } from '../../../lib/stores/eventStore';


// steps for event creation process
const eventCreationSteps = [
    'Event Information',
    'Tickets & Pricing',
    'Event Page Design',
    'Publish'
];

const CreateEvent: React.FC = () => {

    const [currentStep, setCurrentStep] = useState(0);
    const { createEvent, isLoading, error } = useEventStore();


    const handleNextStep = () => {
        // In a real app, you would save data and then move to the next step
        if (currentStep < eventCreationSteps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };



    const handleFormSubmit = async (data: any) => {
        try {
            const newEvent = await createEvent(data);
            alert('Event created successfully!');
            // Redirect to the new event's settings page
            navigate(`/dashboard/events/${newEvent.id}/info`);
        } catch (err) {
            alert(error || 'An unexpected error occurred.');
        }
    };

    return (
      <div className="bg-gray-100 min-h-screen p-4 sm:p-6 md:p-8">
         <div className="max-w-7xl mx-auto">
             <header className="mb-8">
                 {/* Your existing header might have navigation here */}
                 <h1 className="text-3xl font-bold text-gray-800">Create a New Event</h1>
             </header>

             {/* The new reusable Stepper component */}
             <Stepper steps={eventCreationSteps} currentStep={currentStep} />

             {/* The main content area */}
             <div className="mt-8">
                 {currentStep === 0 && (
                     <CreateEventForm onFormSubmit={handleFormSubmit} isSubmitting={isLoading} />
                 )}

             </div>
         </div>
     </div>
    );
};

export default CreateEvent;
