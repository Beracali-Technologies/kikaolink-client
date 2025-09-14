import React from 'react';
import { Event } from '../../../../types/event';

interface EventWebsiteTemplateProps {
  event: Event;
}

const Template2: React.FC<EventWebsiteTemplateProps> = ({ event }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">{event.title}</h1>
          <p className="text-gray-600 mt-2">{event.location}</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Join Us!</h2>
            <p className="text-gray-600 mb-6">{event.description || 'We look forward to seeing you at our event.'}</p>

            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-800">
                📅 {new Date(event.start_date).toLocaleDateString()} - {new Date(event.end_date).toLocaleDateString()}
              </p>
              <p className="text-sm text-blue-800">
                ⏰ {new Date(event.start_date).toLocaleTimeString()} - {new Date(event.end_date).toLocaleTimeString()}
              </p>
              <p className="text-sm text-blue-800">
                📍 {event.location}
              </p>
            </div>
          </div>

          <div className="text-center">
            <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors">
              Register Now
            </button>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>© 2024 KikaoLink. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Template2;
