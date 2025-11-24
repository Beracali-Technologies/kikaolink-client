import React from 'react';
import { NavLink } from 'react-router-dom';

const HeroHeader: React.FC = () => {
  const handleLogin = () => {
    window.open('/login', '_blank', 'noopener,noreferrer');
  };

  const handleSignup = () => {
    window.open('/signup', '_blank', 'noopener,noreferrer');
  };

  return (
    <header className="absolute top-0 left-0 w-full z-30">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <div className="text-2xl font-bold">
          <NavLink to="/">
            <span className="text-primary-blue">Kikao</span>
            <span className="text-dark-text">Link</span>
          </NavLink>
        </div>

        {/* Buttons */}
        <div className="flex items-center space-x-4">
          <button
            onClick={handleLogin}
            className="font-semibold text-gray-600 hover:text-primary-blue"
          >
            Login
          </button>

          <button
            onClick={handleSignup}
            className="bg-primary-blue hover:bg-primary-blue-hover text-white font-bold py-2 px-5 rounded-lg transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
};

export default HeroHeader;
