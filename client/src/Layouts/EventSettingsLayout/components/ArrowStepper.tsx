import React from 'react';
import { NavLink, useParams, useLocation } from 'react-router-dom';

// The main Stepper component with clickable circular steps and labels
interface ArrowStepperProps {
  steps: { label: string; path: string }[];
}

const ArrowStepper: React.FC<ArrowStepperProps> = ({ steps }) => {
  const { eventId } = useParams<{ eventId: string }>();
  const location = useLocation();
  const currentPath = location.pathname.split('/').pop() || 'info';
  const currentStep = steps.findIndex(step => step.path === currentPath);

  return (
    <nav aria-label="Progress" className="flex items-center space-x-6">
      {steps.map((step, index) => (
        <div key={step.label} className="flex items-center group">
          <NavLink
            to={`/dashboard/events/${eventId}/${step.path}`}
            className={({ isActive }) =>
              `flex items-center justify-center w-10 h-10 rounded-full border-2 text-sm font-medium transition-all duration-200
              ${isActive || index < currentStep
                ? 'bg-blue-500 border-blue-500 text-white hover:bg-blue-600'
                : index === currentStep
                ? 'border-blue-500 bg-white text-blue-500 hover:bg-gray-100'
                : 'border-gray-300 bg-white text-gray-400 hover:bg-gray-100'
              }`
            }
          >
            {index < currentStep ? (
              <span className="text-base">✓</span>
            ) : (
              <span>{index + 1}</span>
            )}
          </NavLink>
          <NavLink
            to={`/dashboard/events/${eventId}/${step.path}`}
            className={({ isActive }) =>
              `ml-2 text-sm font-medium hidden md:block transition-colors duration-200
              ${index <= currentStep ? 'text-gray-800 hover:text-blue-600' : 'text-gray-500 hover:text-gray-700'}
              ${isActive ? 'font-semibold' : ''}`
            }
          >
            {step.label}
          </NavLink>
        </div>
      ))}
    </nav>
  );
};

export default ArrowStepper;
