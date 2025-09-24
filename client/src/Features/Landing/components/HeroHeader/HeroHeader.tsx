import React from 'react';
import { NavLink } from 'react-router-dom'; // Use NavLink for routing

const HeroHeader: React.FC = () => (
    <header className="absolute top-0 left-0 w-full z-30">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <div className="text-2xl font-bold">
                <NavLink to="/">
                    <span className="text-primary-blue">Kikao</span><span className="text-dark-text">Connect</span>
                </NavLink>
            </div>
            <div className="flex items-center space-x-4">
                <NavLink to="/login" className="font-semibold text-gray-600 hover:text-primary-blue">Login</NavLink>
                <NavLink to="/signup" className="bg-primary-blue hover:bg-primary-blue-hover text-white font-bold py-2 px-5 rounded-lg transition-colors duration-300 shadow-lg hover:shadow-xl">
                    Get Started
                </NavLink>
            </div>
        </div>
    </header>
);


export default HeroHeader;
