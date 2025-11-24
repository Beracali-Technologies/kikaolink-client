import React from 'react';

export const ContactEmailCard: React.FC = () => {
  return (
    <div className="flex items-start space-x-4">
      <div className="w-12 h-12 bg-primary-blue rounded-lg flex items-center justify-center flex-shrink-0">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </div>
      <div>
        <h4 className="font-semibold text-dark-text mb-3">Send Us an Email</h4>
        <p className="text-lg text-light-text">sales.kikaolink@beracalitechnologies.co.tz</p>
        <p className="text-sm text-light-text mt-2">We typically respond within 2 hours</p>
      </div>
    </div>
  );
};