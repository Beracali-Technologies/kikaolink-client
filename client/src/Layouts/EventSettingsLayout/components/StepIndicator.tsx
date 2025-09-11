import React from 'react';

interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ steps, currentStep }) => {
  return (
    <div className="flex items-center space-x-6">
      {steps.map((step, index) => (
        <div key={step} className="flex items-center">
          <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2
            ${index < currentStep
              ? 'bg-blue-600 border-blue-600 text-white'
              : index === currentStep
              ? 'border-blue-600 bg-white text-blue-600 font-bold'
              : 'border-gray-300 bg-white text-gray-400'
            }`}>
            {index < currentStep ? (
              <span className="text-sm">✓</span>
            ) : (
              <span className="text-sm font-medium">{index + 1}</span>
            )}
          </div>
          <span className={`ml-2 text-sm font-medium hidden md:block
            ${index <= currentStep ? 'text-gray-800' : 'text-gray-500'}`}>
            {step}
          </span>
        </div>
      ))}
    </div>
  );
};
