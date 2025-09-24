import React from 'react';

const Spinner: React.FC = () => {
    return (
        <div className="flex items-center justify-center space-x-2">
            <div className="h-3 w-3 bg-red-500 rounded-full animate-pulse-dots"></div>
            <div className="h-3 w-3 bg-red-500 rounded-full animate-pulse-dots" style={{ animationDelay: '0.2s' }}></div>
            <div className="h-3 w-3 bg-red-500 rounded-full animate-pulse-dots" style={{ animationDelay: '0.4s' }}></div>
        </div>
    );
};

export default Spinner;
