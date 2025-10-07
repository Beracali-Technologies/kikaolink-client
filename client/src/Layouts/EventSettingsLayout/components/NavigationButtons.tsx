import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface NavigationButtonsProps {
  eventId: string;
  steps: { path: string; label: string }[];
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({ eventId, steps }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname.split('/').pop() || 'info';
  const currentIndex = steps.findIndex(step => step.path === currentPath);

  const handlePrevious = () => {
    if (currentIndex > 0) {
      navigate(`/dashboard/events/${eventId}/${steps[currentIndex - 1].path}`);
    }
  };

  const handleNext = () => {
    if (currentIndex < steps.length - 1) {
      navigate(`/dashboard/events/${eventId}/${steps[currentIndex + 1].path}`);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mt-6 flex justify-end space-x-12">
      <button
        onClick={handlePrevious}
        disabled={currentIndex === 0}
        className="bg-gray-100 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-200 transition-all duration-200 disabled:bg-gray-50 disabled:text-gray-400 flex items-center"
      >
        ← Previous
      </button>
      <button
        onClick={handleNext}
        disabled={currentIndex === steps.length - 1}
        className="bg-gradient-to-r from-blue-400 to-blue-500 text-white px-3 py-2 rounded-lg hover:from-blue-500 hover:to-blue-600 transition-all duration-200 flex items-center"
      >
        Next →
      </button>
    </div>
  );
};

export default NavigationButtons;
