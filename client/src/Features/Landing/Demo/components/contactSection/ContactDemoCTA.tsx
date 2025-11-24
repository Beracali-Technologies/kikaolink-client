// src/components/contact/ContactDemoCTA.tsx
import React, { useState } from 'react';

interface Props {
  onEmailClick: () => void;
}

export const ContactDemoCTA: React.FC<Props> = ({ onEmailClick }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    setIsSent(false);

    // Simulate a tiny delay for better UX (feels intentional)
    await new Promise(resolve => setTimeout(resolve, 1200));

    // Trigger the actual mailto
    onEmailClick();

    // Update UI
    setIsLoading(false);
    setIsSent(true);

    // Optional: Reset after 3 seconds
    setTimeout(() => setIsSent(false), 3000);
  };

  return (
    <div className="bg-gradient-to-br from-primary-blue to-navy-700 rounded-2xl p-12 text-center text-white hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-8">
        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </div>
      <h3 className="text-3xl font-bold mb-6">Schedule a Demo</h3>
      <p className="text-navy-100 text-lg mb-8 leading-relaxed max-w-md mx-auto">
        Let us show you exactly how our platform can solve your specific challenges with a one-on-one demonstration
      </p>

      <button
        onClick={handleClick}
        disabled={isLoading}
        className={`relative font-bold py-4 px-12 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center mx-auto min-w-[240px]
          ${isLoading 
            ? 'bg-gray-600 cursor-not-allowed' 
            : isSent 
              ? 'bg-green-600 hover:bg-green-700' 
              : 'bg-accent-red hover:bg-red-600'
          } text-white`}
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Opening Email...
          </>
        ) : isSent ? (
          <>Email Opened!</>
        ) : (
          'Request Personal Demo'
        )}
      </button>
    </div>
  );
};