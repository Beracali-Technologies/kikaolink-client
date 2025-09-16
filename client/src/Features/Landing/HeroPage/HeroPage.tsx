import React from 'react';
import { NavLink } from 'react-router-dom';
import FeaturesSection from '../components/FeaturesSection/FeaturesSection';



const AnimatedScrollArrow = () => (
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <div className="w-8 h-12 border-2 border-slate-400 rounded-full flex justify-center pt-2 animate-bounce">
             <div className="w-1 h-3 bg-slate-400 rounded-full"></div>
        </div>
    </div>
);


const HeroHeader: React.FC = () => (
    <header className="absolute top-0 left-0 w-full z-30">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <div className="text-2xl font-bold">
                <NavLink to="/">
                    <span className="text-primary-blue">Kikao</span><span className="text-dark-text">Link</span>
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


const HeroPage: React.FC = () => {
    return (
        <>
            <HeroHeader />
            <div className="relative h-screen flex items-center justify-center text-center bg-gradient-to-br from-sky-50 via-slate-50 to-sky-100 overflow-hidden">
                {/* Decorative background shapes */}
                <div className="absolute top-0 -left-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-blob"></div>
                <div className="absolute top-0 -right-1/4 w-96 h-96 bg-red-200 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-blob animation-delay-2000"></div>

                <main className="z-10 px-4">
                    <h1 className="text-5xl md:text-7xl font-extrabold text-dark-text leading-tight">
                        Flawless Events,
                        <br />
                        <span className="text-primary-blue">Instant Check-ins.</span>
                    </h1>
                    <p className="mt-6 text-lg text-light-text max-w-2xl mx-auto">
                        Say goodbye to registration headaches and long queues. KikaoLink provides smart QR codes and on-the-spot badge printing for an experience your attendees will love.
                    </p>


                    <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4">
                          <NavLink to="/contact" className="bg-primary-blue text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-primary-blue-hover transition-all duration-300">
                              Book a Demo
                          </NavLink>

                          <a href="#features" className="bg-white/50 backdrop-blur-sm border border-slate-300 text-dark-text font-semibold py-3 px-8 rounded-full shadow-md hover:bg-white/80 transition-all duration-300">
                              Discover More
                          </a>
                  </div>

                </main>

                  {/* --- Animated Scroll Indicator --- */}
                      <AnimatedScrollArrow />
            </div>

            {/*  Features Section on Advantages of the Platform*/}
              <FeaturesSection />

            {/* Footer added at the layout Section*/}
        </>
    );
};

export default HeroPage;
