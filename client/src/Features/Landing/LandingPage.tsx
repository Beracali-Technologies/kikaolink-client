import React from 'react';
import { useNavigate } from 'react-router-dom';
import badgeBg from '@/assets/images/badge/badge.png';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleCreateEvent = () => navigate('/dashboard/events/create');
  const handleManageEvents = () => navigate('/dashboard/events');

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 lg:p-8">
      {/* Main container with side-by-side layout */}
      <div className="w-full max-w-7xl flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16 xl:gap-24">

        {/* Left: Content Container */}
        <div className="w-full lg:w-2/5 max-w-lg">
          <div className="bg-white rounded-2xl p-8 lg:p-12">
            <div className="text-left mb-12">

              <h1 className="text-gray-900 text-4xl lg:text-5xl xl:text-6xl font-light tracking-tight mb-6 leading-tight">
                Begin Your Journey
              </h1>

              <p className="text-gray-900 text-2xl font-light leading-relaxed mb-3">
                        Where technology meets luxury
              </p>

              <p className="text-gray-500 text-xl font-light leading-relaxed">
                        Eliminate queues, streamline check-ins, and deliver
                        flawless experiences with our premium event platform.
                    </p>
            </div>

            <div className="space-y-4">
              <button
                onClick={handleCreateEvent}
                className="w-full px-8 py-4 rounded-xl text-base lg:text-lg font-medium bg-red-600 text-white hover:bg-red-700 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-red-300 hover:shadow-lg transform hover:scale-105"
              >
                Create New Event
              </button>

              <button
                onClick={handleManageEvents}
                className="w-full px-8 py-4 rounded-xl text-base lg:text-lg font-medium text-blue-600 border-2 border-blue-600 hover:bg-blue-50 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-200 hover:shadow-md transform hover:scale-105"
              >
                View My Events
              </button>
            </div>

            <div className="text-center mt-12 pt-8 border-t border-gray-100">
              <p className="text-sm lg:text-base text-gray-400 font-light tracking-wide">
                KikaoLink · Elevated Event Experiences
              </p>
            </div>
          </div>
        </div>

        {/* Right: Large Image Container with Dramatic Fade */}
        <div className="w-full lg:w-3/5 relative">
          <div className="relative h-96 lg:h-[600px] xl:h-[700px] w-full">
            {/* Large Image with Dramatic Radial Fade */}
            <div
              className="absolute inset-0 bg-center bg-no-repeat bg-contain lg:bg-cover"
              style={{
                backgroundImage: `url(${badgeBg})`,
                maskImage: `
                  radial-gradient(ellipse at center, black 30%, transparent 80%)
                `,
                WebkitMaskImage: `
                  radial-gradient(ellipse at center, black 30%, transparent 80%)
                `,
              }}
            ></div>

            {/* Enhanced Soft Ambient Glow */}
            <div
              className="absolute inset-0 opacity-50 blur-4xl"
              style={{
                background: `radial-gradient(ellipse at 60% 50%, rgba(239, 68, 68, 0.4) 0%, rgba(59, 130, 246, 0.3) 50%, transparent 80%)`,
                transform: 'scale(1.5)',
              }}
            ></div>

            {/* Floating Accent Elements */}
            <div className="absolute top-1/4 -right-8 w-32 h-32 bg-gradient-to-br from-red-400 to-pink-500 rounded-full mix-blend-multiply opacity-25 blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 -left-8 w-40 h-40 bg-gradient-to-tr from-blue-400 to-cyan-500 rounded-full mix-blend-multiply opacity-20 blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mix-blend-multiply opacity-15 blur-2xl animate-pulse delay-500"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
