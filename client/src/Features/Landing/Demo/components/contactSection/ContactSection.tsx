import React from 'react';
import { ContactInfoCard } from './ContactInfoCard';
import { ContactPhoneCard } from './ContactPhoneCard';
import { ContactEmailCard } from './ContactEmailCard';
import { ContactDemoCTA } from './ContactDemoCTA';

const ContactSection: React.FC = () => {
  const handleCall = (number: string) => {
    window.location.href = `tel:${number.replace(/\s/g, '')}`;
  };

  const handleEmail = () => {
    const subject = encodeURIComponent("Request for Personal Demo - Kikaolink");
    const body = encodeURIComponent(
      `Hi Team,\n\nI'd like to schedule a personal demo of Kikaolink.\n\nBest regards,\n[Your Name]`
    );
    window.location.href = `mailto:sales.kikaolink@beracalitechnologies.co.tz?subject=${subject}&body=${body}`;
  };

  const phones = [
    { label: 'Sales Team', number: '+255 748 787 952' },
    { label: 'Tech Team', number: '+255 733 879 722' },

  ];

  return (
    <section className="min-h-screen bg-white py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-dark-text mb-6">
            Ready to get started?
          </h2>
          <p className="text-xl text-light-text max-w-2xl mx-auto">
            Connect with our team for a personalized consultation and see how we can help your business grow
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Contact Info */}
          <div className="space-y-8">
            <ContactInfoCard title="Visit Our Office">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary-blue rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-light-text text-lg leading-relaxed">
                    Makumbusho Near Bakita,<br />
                    Dar es salaam, Tanzania
                  </p>
                </div>
              </div>
            </ContactInfoCard>

            <ContactInfoCard title="">
              <ContactPhoneCard phones={phones} onCall={handleCall} />
            </ContactInfoCard>

            <ContactInfoCard title="">
              <ContactEmailCard />
            </ContactInfoCard>
          </div>

          {/* Right: CTA */}
          <ContactDemoCTA onEmailClick={handleEmail} />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;