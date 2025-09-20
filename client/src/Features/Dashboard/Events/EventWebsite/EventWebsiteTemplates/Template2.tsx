import React from 'react';
import { EventDetails } from '@/types';



const Template2: React.FC<{ event: EventDetails }> = ({ event }) => {
  // Format dates for display
  const formatDateRange = () => {
    if (!event.start_date || !event.end_date) return '';

    const startDate = new Date(event.start_date);
    const endDate = new Date(event.end_date);

    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    };

    return `${startDate.toLocaleDateString('en-US', options)} - ${endDate.toLocaleDateString('en-US', options)}`;
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="container mx-auto px-6 py-5 flex justify-between items-center">
          <div className="text-xl font-semibold text-blue-600">
            {event.title || 'Event Name'}
          </div>



          <button className="bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 rounded-md font-medium transition-colors text-sm">
            Register Now
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-300 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-red-300 rounded-full filter blur-3xl"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="text-sm font-medium text-blue-500 mb-6 tracking-wider uppercase">
              {formatDateRange()} {event.location && `• ${event.location}`}
            </div>
            <h1 className="text-5xl md:text-6xl font-light mb-8 leading-tight tracking-tight">
              {event.title || 'Event Name'}
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
              {event.description || 'An exclusive gathering for professionals and innovators'}
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-5">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-md font-medium text-base transition-colors shadow-md">
                Register Now
              </button>
              <button className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 rounded-md font-medium text-base transition-colors">
                View Schedule
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl font-light text-blue-600 mb-2">500+</div>
              <div className="text-sm uppercase tracking-wider text-gray-500">Attendees</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-light text-blue-600 mb-2">24</div>
              <div className="text-sm uppercase tracking-wider text-gray-500">Speakers</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-light text-red-500 mb-2">18</div>
              <div className="text-sm uppercase tracking-wider text-gray-500">Sessions</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-light text-red-500 mb-2">2</div>
              <div className="text-sm uppercase tracking-wider text-gray-500">Days</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-light text-center mb-4 text-gray-800">About The Event</h2>
            <div className="w-16 h-0.5 bg-blue-500 mx-auto mb-12"></div>

            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  {event.description || 'This event brings together industry leaders, innovators, and professionals to share knowledge, network, and explore the latest trends and developments in the field.'}
                </p>

                <div className="flex space-x-8">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                      </svg>
                    </div>
                    <div className="ml-3">
                      <div className="font-medium text-gray-800">Networking</div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                      </svg>
                    </div>
                    <div className="ml-3">
                      <div className="font-medium text-gray-800">Learning</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="aspect-w-16 aspect-h-12 bg-gradient-to-br from-blue-50 to-red-50 rounded-lg overflow-hidden border border-gray-100 shadow-sm">
                  <div className="absolute inset-0 flex items-center justify-center p-8">
                    <div className="text-center">
                      <div className="text-4xl font-light text-blue-600 mb-2">{event.title?.split(' ')[0] || 'Event'}</div>
                      <div className="text-base font-medium text-red-500">{event.title || 'Conference'}</div>
                      <div className="w-12 h-0.5 bg-gradient-to-r from-blue-400 to-red-400 mx-auto my-4"></div>
                      <div className="text-xs text-gray-500">{formatDateRange()}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      {event.location && (
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-light text-center mb-4 text-gray-800">Location</h2>
              <div className="w-16 h-0.5 bg-red-500 mx-auto mb-8"></div>
                  <p className="text-xl text-gray-600 mb-2">
                  {typeof event.location === 'string'
                        ? event.location
                        : event.location?.name ?? event.location?.address ?? ''}
                  </p>
              <p className="text-gray-500">{formatDateRange()}</p>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-light mb-6 text-gray-800">Join Us</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
            Reserve your spot at this exclusive event
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-5">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-md font-medium text-base transition-colors shadow-md">
              Register Now
            </button>
            <button className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 rounded-md font-medium text-base transition-colors">
              Contact Us
            </button>
          </div>
        </div>
      </section>

      {/* Simple Event Footer */}
      <footer className="bg-gray-100 py-12">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="text-lg font-medium text-gray-800 mb-4">
              {event.title || 'Event Name'}
            </div>
            <div className="text-gray-600 mb-6 max-w-md mx-auto">
              {event.description || 'A premier conference for professionals and innovators.'}
            </div>
            <div className="text-sm text-gray-500">
              {formatDateRange()} {event.location && `• ${event.location}`}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Template2;
