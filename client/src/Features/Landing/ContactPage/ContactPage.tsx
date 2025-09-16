import React from 'react';
import HeroHeader from '../components/HeroHeader/HeroHeader';
import ContactMethodCard from './ContactMethodCard';
import { contactMethods } from './ContactData';


//The main ContactPage it imports the data and the card component, making its structure very clean overall layout


const ContactPage: React.FC = () => {

  return (
    <>
      <HeroHeader />

      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-40 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-dark-text">
            Get in <span className="text-rose-500">Touch</span> with Us
          </h1>
          <p className="mt-4 text-xl text-light-text">We're here to help with your event management needs</p>
        </div>

        <div className="max-w-4xl mx-auto mt-16">
          <h2 className="text-2xl font-bold text-center text-dark-text mb-2">Get in Touch for a Sales Inquiry & Consultation</h2>
          <p className="text-sm text-center text-primary-blue font-semibold mb-10">FREE CONSULTATION</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {contactMethods.map((method) => (
              // Render each contact method using the ContactMethodCard component
              <ContactMethodCard key={method.name} method={method} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
