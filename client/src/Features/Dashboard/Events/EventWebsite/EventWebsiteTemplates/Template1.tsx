import React from 'react';
import { Event } from '../../../../types/event';

interface EventWebsiteProps {
  event: Event;
}

const Template1: React.FC<EventWebsiteProps> = ({ event }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">{event.title}</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {event.title}
            </h2>
            <p className="text-gray-600 mb-4">{event.description}</p>

            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-800">
                📍 {event.location}
              </p>
              <p className="text-sm text-blue-800">
                📅 {new Date(event.start_date).toLocaleDateString()} - {new Date(event.end_date).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="text-center">
            <a
              href="#register"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
            >
              Register Now
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Template1;
