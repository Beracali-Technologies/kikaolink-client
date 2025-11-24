import React from 'react';
import DemoHero from './components/DemoHero';
import ContactSection from './components/contactSection/ContactSection';
import HeroHeader from '../components/HeroHeader/HeroHeader';

const Demo: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
            <div className="py-8">
          <HeroHeader />
            </div>
            
                  <DemoHero />
                  <ContactSection />
            </div>  
    
  );
};

export default Demo;