import React from 'react';
import { EventDetails } from '@/types';

interface Template3Props {
  event: EventDetails;
}

const Template3: React.FC<Template3Props> = ({ event }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    const time = new Date(`2000-01-01T${timeString}`);
    return time.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">B</span>
              </div>
              <span className="text-gray-900 font-semibold">Beracali Technologies</span>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-medium transition-colors duration-200">
              Register Now
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative max-w-7xl mx-auto px-6 py-16 lg:py-24">
        <div className="text-center mb-16">
          {/* Event Badge */}
          <div className="inline-flex items-center px-4 py-1.5 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-8">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></span>
            Registration Open
          </div>

          {/* Event Title */}
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            {event.title}
          </h1>

          {/* Event Description */}
          {event.description && (
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              {event.description}
            </p>
          )}

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mb-12">
            {[
              { icon: '📅', label: 'Date', value: event.startDate ? formatDate(event.startDate) : 'TBA' },
              { icon: '⏰', label: 'Time', value: event.startTime ? formatTime(event.startTime) : 'TBA' },
              { icon: '📍', label: 'Location', value: event.location || 'Virtual' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className="text-sm text-gray-500 mb-1">{stat.label}</div>
                <div className="text-gray-900 font-semibold text-sm">
                    {typeof stat.value === 'string' ? stat.value : JSON.stringify(stat.value)}
                </div>
              </div>
            ))}
          </div>

          {/* Main CTA */}
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            🎯 Secure Your Spot
          </button>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            {
              icon: '🌟',
              title: 'Expert Speakers',
              description: 'Learn from industry leaders and innovators sharing their insights and experiences.'
            },
            {
              icon: '🤝',
              title: 'Networking',
              description: 'Connect with like-minded professionals and expand your business network.'
            },
            {
              icon: '💡',
              title: 'Innovation',
              description: 'Discover cutting-edge technologies and trends shaping the future.'
            }
          ].map((feature, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Detailed Info Section */}
        <div className="bg-white rounded-3xl shadow-xl p-12 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Event Details */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Event Details</h2>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">📅</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Date & Time</h3>
                    <p className="text-gray-600">
                      {event.startDate && formatDate(event.startDate)}
                      {event.startTime && ` at ${formatTime(event.startTime)}`}
                      {event.endTime && ` - ${formatTime(event.endTime)}`}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">📍</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Location</h3>
                    <p className="text-gray-600 mb-2">
                          {(typeof event.location === 'string' ? event.location : JSON.stringify(event.location)) || 'To be announced'}

                    </p>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      View on Map →
                    </button>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">👥</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Organizer</h3>
                    <p className="text-gray-600">Beracali Technologies</p>
                    <p className="text-gray-500 text-sm">Creating unforgettable experiences</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Registration Panel */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Join?</h3>
              <p className="text-gray-600 mb-6">
                Don't miss this opportunity to be part of an incredible experience.
                Limited seats available!
              </p>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Standard Ticket</span>
                  <span className="font-bold text-gray-900">Free</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">VIP Experience</span>
                  <span className="font-bold text-gray-900">$99</span>
                </div>
              </div>

              <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 rounded-xl font-bold mt-6 transition-all duration-300 transform hover:scale-105">
                Register Now
              </button>

              <p className="text-center text-gray-500 text-sm mt-4">
                🔒 Secure payment · 🎫 Instant confirmation
              </p>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Don't Wait - Spaces Are Limited!
          </h2>
          <p className="text-gray-600 text-xl mb-8 max-w-2xl mx-auto">
            Join hundreds of professionals who have already registered for this
            transformative experience.
          </p>
          <div className="space-y-4 sm:space-y-0 sm:space-x-6">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              🚀 Secure My Ticket Now
            </button>
            <button className="border-2 border-gray-300 text-gray-700 hover:border-gray-400 hover:text-gray-900 px-8 py-4 rounded-xl font-semibold transition-all duration-300">
              📞 Contact Organizer
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center">


            <p className="text-gray-500 text-sm">
              © 2024 Beracali Technologies. All rights reserved.
              Creating memorable experiences since 2024.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Template3;
