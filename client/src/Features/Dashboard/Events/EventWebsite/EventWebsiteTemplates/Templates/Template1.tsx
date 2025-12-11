// Template1.tsx - Modern Minimalist
import React from 'react';
import { TemplateProps } from './templateProps';
import { Link } from 'react-router-dom';

const Template1: React.FC<TemplateProps> = ({ event, registrationLink }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
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
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-blue-50">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-24 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            {/* Event Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full border border-gray-200 mb-8 shadow-sm">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-emerald-700">LIVE EVENT</span>
            </div>

            {/* Title */}
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
              {event.title}
            </h1>

            {/* Description */}
            {event.description && (
              <p className="text-xl text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto">
                {event.description}
              </p>
            )}

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={registrationLink}>
                <button className="px-8 py-4 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:translate-y-[-2px]">
                  Register Now
                </button>
              </Link>
              <button className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all duration-300">
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Event Details */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Date & Time */}
          <div className="p-8 border border-gray-200 rounded-2xl hover:border-gray-300 transition-all duration-300">
            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Date & Time</h3>
            <div className="space-y-2">
              {event.startDate && (
                <p className="text-lg text-gray-700">{formatDate(event.startDate)}</p>
              )}
              {event.startTime && (
                <p className="text-gray-600">
                  {formatTime(event.startTime)}
                  {event.endTime && ` - ${formatTime(event.endTime)}`}
                </p>
              )}
            </div>
          </div>

          {/* Location */}
          <div className="p-8 border border-gray-200 rounded-2xl hover:border-gray-300 transition-all duration-300">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Location</h3>
            <p className="text-gray-700 text-lg">
              {typeof event.location === 'string' ? event.location : JSON.stringify(event.location)}
            </p>
            <button className="mt-4 text-indigo-600 font-medium hover:text-indigo-700 transition-colors">
              View on Map →
            </button>
          </div>

          {/* Organizer */}
          <div className="p-8 border border-gray-200 rounded-2xl hover:border-gray-300 transition-all duration-300">
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Organized By</h3>
            <p className="text-gray-700 text-lg mb-2">Beracali Technologies</p>
            <p className="text-gray-600">Creating exceptional event experiences</p>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">About This Event</h2>
          <div className="prose prose-lg mx-auto text-gray-600">
            <p className="mb-6">
              Join us for an unforgettable experience that brings together industry leaders, innovators, 
              and professionals from around the world. This event is designed to inspire, educate, and 
              connect like-minded individuals.
            </p>
            <p>
              Whether you're looking to expand your network, gain valuable insights, or discover new opportunities, 
              this event offers something for everyone. Don't miss your chance to be part of this transformative experience.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} Beracali Technologies. All rights reserved.</p>
            <p className="mt-2">Creating memorable experiences since 2024</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Template1;