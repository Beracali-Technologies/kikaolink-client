import React from 'react';
import { useNavigate } from 'react-router-dom';


const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleCreateEvent = () => {
      navigate('/dashboard/events/create');
  };

  const handleManageEvents = () => {
      navigate('/dashboard/events');
  };

    return (
        // Clean background with ample whitespace
        <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-white">

            {/* Elegant centered card with subtle borders */}
            <div className="w-full max-w-md bg-white rounded-lg p-12 border border-gray-100">

                {/* Sophisticated typography in your brand colors */}
                <div className="text-center mb-12">
                    <h1 className="text-gray-900 text-3xl font-light tracking-tight mb-4">
                        Begin Your Journey
                    </h1>
                    <p className="text-gray-600 text-sm font-light leading-relaxed">
                        Craft exceptional events with precision and elegance
                    </p>
                </div>

                {/* Action buttons with luxury spacing */}
                <div className="space-y-3">

                    {/* Primary Action - Using your red */}
                    <button
                        onClick={handleCreateEvent}
                        className="w-full px-6 py-3 rounded-lg text-sm font-medium bg-red-600 text-white hover:bg-red-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-300"
                    >
                        Create New Event
                    </button>

                    {/* Secondary Action - Using your blue */}
                    <button
                        onClick={handleManageEvents}
                        className="w-full px-6 py-3 rounded-lg text-sm font-medium text-blue-600 border border-blue-600 hover:bg-blue-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    >
                        View My Events
                    </button>
                </div>

                {/* Subtle brand attribution */}
                <div className="text-center mt-12 pt-6 border-t border-gray-100">
                    <p className="text-xs text-gray-400 font-light">
                        KikaoLink · Elevated Event Experiences
                    </p>
                </div>
            </div>

        </div>
    );
};

export default LandingPage;
