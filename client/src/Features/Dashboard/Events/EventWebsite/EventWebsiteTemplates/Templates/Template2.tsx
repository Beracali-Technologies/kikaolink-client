import React from 'react';
import { TemplateProps } from './templateProps';
import { Link } from 'react-router-dom';

const Template2: React.FC<TemplateProps> = ({ event, registrationLink }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-orange-50 to-pink-50 text-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-orange-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">E</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
              {event.title}
            </span>
          </div>
          <Link to={registrationLink}>
            <button className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-full font-semibold hover:from-orange-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl">
              Register Now
            </button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative py-20 lg:py-32 overflow-hidden">
        {/* Background Shapes */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl lg:text-7xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-orange-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
              {event.title}
            </span>
          </h1>
          
          {event.description && (
            <p className="text-xl lg:text-2xl text-gray-700 mb-12 max-w-3xl mx-auto">
              {event.description}
            </p>
          )}

          {/* Event Details */}
          <div className="inline-flex flex-wrap gap-6 justify-center mb-12">
            {event.startDate && (
              <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border border-orange-200">
                <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="font-medium">{formatDate(event.startDate)}</span>
              </div>
            )}
            
            {event.location && (
              <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border border-pink-200">
                <svg className="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                <span className="font-medium">{event.location}</span>
              </div>
            )}
          </div>

          {/* Main CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={registrationLink}>
              <button className="px-10 py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white text-lg font-bold rounded-xl hover:from-orange-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-2xl">
                🎉 Secure Your Spot
              </button>
            </Link>
            <button className="px-10 py-4 border-2 border-orange-500 text-orange-600 text-lg font-bold rounded-xl hover:bg-orange-50 transition-all duration-300">
              📅 Add to Calendar
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center mb-12">
          Why You Should Join
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: '💡', title: 'Expert Insights', desc: 'Learn from industry leaders' },
            { icon: '🤝', title: 'Networking', desc: 'Connect with professionals' },
            { icon: '🚀', title: 'Innovation', desc: 'Discover latest trends' },
            { icon: '🎯', title: 'Opportunities', desc: 'Find new possibilities' }
          ].map((feature, index) => (
            <div key={index} className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl border border-orange-100 hover:border-orange-300 transition-all duration-300 hover:shadow-xl">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Join the Fun?</h2>
          <p className="text-xl mb-10 opacity-90">
            Don't miss out on this incredible opportunity. Limited spots available!
          </p>
          <Link to={registrationLink}>
            <button className="px-12 py-5 bg-white text-orange-600 text-xl font-bold rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl">
              Register Now - It's Free!
            </button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-orange-100 py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-600">
            © {new Date().getFullYear()} {event.title}. All rights reserved.
          </p>
        </div>
      </footer>

      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default Template2;