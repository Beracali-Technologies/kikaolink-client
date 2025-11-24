import React from 'react';

interface Phone {
  label: string;
  number: string;
}

interface Props {
  phones: Phone[];
  onCall: (number: string) => void;
}

export const ContactPhoneCard: React.FC<Props> = ({ phones, onCall }) => {
  return (
    <div className="flex items-start space-x-4">
      <div className="w-12 h-12 bg-primary-blue rounded-lg flex items-center justify-center flex-shrink-0">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      </div>
      <div className="flex-1">
        <h4 className="font-semibold text-dark-text mb-4">Call Us Directly</h4>
        <div className="space-y-3">
          {phones.map((phone) => (
            <div key={phone.number} className="flex justify-between items-center">
              <span className="text-light-text">{phone.label}:</span>
              <button
                onClick={() => onCall(phone.number)}
                className="text-primary-blue hover:text-primary-blue-hover font-medium hover:underline transition"
              >
                {phone.number.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3')}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};