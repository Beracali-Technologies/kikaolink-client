import React from 'react';
import { EventDetails } from '@/types';

interface Template1Props {
  event: EventDetails;
}

const Template1: React.FC<Template1Props> = ({ event }) => {
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-24 lg:py-32">
          <div className="text-center">
            {/* Event Badge */}
            <div className="inline-flex items-center px-6 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></span>
              <span className="text-green-300 text-sm font-medium">LIVE EVENT</span>
            </div>

            {/* Event Title */}
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              {event.title}
            </h1>

            {/* Event Description */}
            {event.description && (
              <p className="text-xl lg:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                {event.description}
              </p>
            )}

            {/* CTA Button */}
            <div className="space-y-4 sm:space-y-0 sm:space-x-6">
              <button className="w-full sm:w-auto bg-white text-slate-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl">
                🎟️ Register Now
              </button>
              <button className="w-full sm:w-auto border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-slate-900 transition-all duration-300">
                📅 Add to Calendar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div className="relative max-w-6xl mx-auto px-6 py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Date & Time */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📅</span>
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">Date & Time</h3>
              {event.startDate && (
                <p className="text-gray-300 text-sm mb-1">
                  {formatDate(event.startDate)}
                </p>
              )}
              {event.startTime && (
                <p className="text-purple-300 font-medium">
                  {formatTime(event.startTime)}
                  {event.endTime && ` - ${formatTime(event.endTime)}`}
                </p>
              )}
            </div>
          </div>

          {/* Location */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📍</span>
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">Location</h3>
              {event.location && (
                <p className="text-gray-300">
                        {typeof event.location === 'string' ? event.location : JSON.stringify(event.location)}
                </p>
              )}
              <button className="mt-4 text-blue-300 text-sm hover:text-blue-200 transition-colors">
                View on Map →
              </button>
            </div>
          </div>

          {/* Organizer */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👥</span>
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">Organized By</h3>
              <p className="text-gray-300 mb-2">Beracali Technologies</p>
              <div className="flex justify-center space-x-2">
                <button className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                  <span className="text-sm">📧</span>
                </button>
                <button className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                  <span className="text-sm">🔗</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="relative max-w-4xl mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-8">
          Ready to Join the Experience?
        </h2>
        <p className="text-xl text-gray-300 mb-12 leading-relaxed">
          Secure your spot today and connect with professionals and innovators in an unforgettable event.
          Network with industry leaders, gain valuable insights, and be part of something extraordinary.
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            { icon: '🤝', title: 'Networking', desc: 'Connect with industry professionals' },
            { icon: '💡', title: 'Insights', desc: 'Learn from expert speakers' },
            { icon: '🎯', title: 'Opportunities', desc: 'Discover new possibilities' }
          ].map((feature, index) => (
            <div key={index} className="bg-white/5 rounded-xl p-6 border border-white/10">
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h4 className="text-white font-semibold mb-2">{feature.title}</h4>
              <p className="text-gray-300 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Final CTA */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 lg:p-12">
          <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
            Don't Miss Out!
          </h3>
          <p className="text-purple-100 mb-8">
            Limited seats available. Register now to secure your spot.
          </p>
          <button className="bg-white text-slate-900 px-12 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
            🚀 Secure My Ticket
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-white/10 mt-20 py-8">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 Beracali Technologies. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Template1;
