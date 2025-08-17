import React from 'react';


const ActiveArrowStep: React.FC<{ stepNumber: number; title: string }> = ({ stepNumber, title }) => (
    <div className="flex items-center z-10">
        {/* Main colored body of the arrow */}
        <div className="h-10 pl-5 pr-4 flex items-center bg-blue-600 text-white font-bold text-sm rounded-l-md">
            {stepNumber}. {title}
        </div>

        {/* Arrow tip created with the robust border trick */}
        <div
            className="w-0 h-0"
            style={{
                borderTop: '20px solid transparent',
                borderBottom: '20px solid transparent',
                borderLeft: '15px solid #2563eb' // Tailwind's blue-600
            }}
        />
    </div>
);

// --- Helper component for INACTIVE and COMPLETED steps ---
const InactiveStep: React.FC<{ stepNumber: number; title: string; isCompleted: boolean }> = ({ stepNumber, title, isCompleted }) => {
    // Completed steps will be blue, upcoming steps will be gray
    const activeColor = isCompleted ? 'text-blue-600' : 'text-gray-500';
    const titleColor = isCompleted ? 'text-gray-900' : 'text-gray-500';

    //const borderColor = isCompleted ? 'border-blue-600' : 'border-gray-200';

    return (
        <div className="flex flex-col py-1 pl-4 border-l-4 transition-colors">
            <span className={`text-xs font-semibold uppercase tracking-wider ${activeColor}`}>
                Step {stepNumber}
            </span>
            <span className={`text-sm font-medium ${titleColor}`}>
                {title}
            </span>
        </div>
    );
};


// decides whether to render an Active or Inactive step.
export const Stepper: React.FC<{ steps: string[], currentStep: number }> = ({ steps, currentStep }) => {
    return (
        <nav aria-label="Progress">
            <ol role="list" className="flex items-center">
                {steps.map((step, index) => {
                    const isActive = index === currentStep;
                    const isCompleted = index < currentStep;

                    return (
                        <React.Fragment key={step}>
                            {/* Render the separator line between each item */}
                            {index > 0 && (
                                <div className="w-px h-10 bg-gray-200 mx-4 lg:mx-8" />
                            )}

                            <li className="flex items-center">
                                {isActive ? (
                                    // If the step is active, render the blue arrow
                                    <ActiveArrowStep
                                        stepNumber={index + 1}
                                        title={step}
                                    />
                                ) : (
                                    // Otherwise, render the simple vertical line style
                                    <InactiveStep
                                        stepNumber={index + 1}
                                        title={step}
                                        isCompleted={isCompleted}
                                    />
                                )}
                            </li>
                        </React.Fragment>
                    );
                })}
            </ol>
        </nav>
    );
};

export default Stepper;
