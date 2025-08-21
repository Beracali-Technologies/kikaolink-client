import React from 'react';

// A small, self-contained component for the active blue arrow step
const ActiveArrowStep: React.FC<{ title: string; stepNumber: number }> = ({ title, stepNumber }) => (
    <li className="flex items-center text-sm font-semibold z-10">
        <div className="h-10 pl-8 pr-6 flex items-center bg-blue-600 text-white">
            {stepNumber}. {title}
        </div>
        <div className="w-0 h-0" style={{
            borderTop: '20px solid transparent',
            borderBottom: '20px solid transparent',
            borderLeft: `20px solid #2563EB` // Tailwind's blue-600
        }}/>
    </li>
);

// A small, self-contained component for the inactive gray steps
const InactiveArrowStep: React.FC<{ title: string; stepNumber: number }> = ({ title, stepNumber }) => (
    <li className="flex items-center text-sm font-semibold -ml-5">
        <div className="h-10 pl-8 pr-6 flex items-center bg-gray-200 text-gray-600">
            {stepNumber}. {title}
        </div>
        <div className="w-0 h-0" style={{
            borderTop: '20px solid transparent',
            borderBottom: '20px solid transparent',
            borderLeft: `20px solid #E5E7EB` // Tailwind's gray-200
        }}/>
    </li>
);

// The main Stepper component that decides which style to use
export const ArrowStepper: React.FC<{ steps: string[]; currentStep: number }> = ({ steps, currentStep }) => {
    return (
        <nav aria-label="Progress">
            <ol role="list" className="flex items-center">
                {steps.map((step, index) => (
                    // Conditionally render the correct component based on the step
                    index <= currentStep ? (
                        <ActiveArrowStep key={step} title={step} stepNumber={index + 1} />
                    ) : (
                        <InactiveArrowStep key={step} title={step} stepNumber={index + 1} />
                    )
                ))}
            </ol>
        </nav>
    );
};
