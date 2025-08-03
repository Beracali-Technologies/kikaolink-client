import React from 'react';
import { NavLink } from 'react-router-dom'; // Use NavLink for routing

const HeroHeader: React.FC = () => {
    // Note: The orange colors from your example have been replaced with the new palette.
    return (
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <div className="text-2xl font-bold">
            <NavLink to="/">
              <span className="text-blue-600">Kikao</span>
              <span className="text-gray-800">Connect</span>
            </NavLink>
          </div>

          {/* Navigation Items (for larger screens) */}
          <nav className="hidden md:flex items-center space-x-8 text-gray-600 font-medium">
            <NavLink to="/features" className="hover:text-blue-600">Features</NavLink>
            <NavLink to="/pricing" className="hover:text-blue-600">Pricing</NavLink>
            <NavLink to="/contact" className="hover:text-blue-600">Contact Us</NavLink>
          </nav>

          {/* Action Buttons (for larger screens) */}
          <div className="hidden md:flex items-center space-x-4">
            <NavLink to="/login" className="font-semibold text-gray-600 hover:text-blue-600">
              Login
            </NavLink>
            <NavLink
              to="/signup"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded-lg transition-colors duration-300"
            >
              Get Started Free
            </NavLink>
          </div>

          {/* Mobile Menu Button can be added here */}
        </div>
      </header>
    );
};

export default HeroHeader;
