// src/features/landing/ContactPage.tsx
import React from 'react';
import HeroHeader from '../Components/HeroHeader/HeroHeader';

// --- Icons for Contact Methods ---
const PhoneIcon = () => <svg className="w-8 h-8 text-primary-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.219-.99-.584-1.331l-6.375-6.375a1.5 1.5 0 00-2.122 0l-1.12 1.12a.668.668 0 01-.937 0z" /></svg>;
const WhatsAppIcon = () => <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25c-2.486 0-4.5 2.015-4.5 4.5s2.014 4.5 4.5 4.5c2.485 0 4.5-2.015 4.5-4.5s-2.015-4.5-4.5-4.5zm-8.25 3h.008v.008H11.25v-.008zm-2.25 0h.008v.008h-.008v-.008zm-4.5 0h.008v.008H4.5v-.008z" /></svg>;
const EmailIcon = () => <svg className="w-8 h-8 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 9v.906a2.25 2.25 0 01-1.183 1.981l-6.478 3.488M2.25 9v.906c0 .94.552 1.767 1.35 2.164l6.478 3.488m-8.13-1.425L12 18.33l8.632-4.636M12 21.75L2.25 16.5m9.75 5.25v-4.512" /></svg>;

const contactMethods = [
    { name: 'Call Us', description: 'Speak with our sales experts', detail: '+255 712 345 678', buttonText: 'Call Now (Coming Soon)', buttonHref: '#', icon: <PhoneIcon />, primary: false },
    { name: 'WhatsApp', description: 'Quick Contact via WhatsApp', detail: 'Chat on WhatsApp', buttonText: 'Chat Now', buttonHref: 'https://wa.me/255710852259', icon: <WhatsAppIcon />, primary: true },
    { name: 'Email Us', description: 'Send detailed requirements', detail: 'hello@kikaoconnect.com', buttonText: 'Send an Email', buttonHref: 'mailto:hello@kikaoconnect.com', icon: <EmailIcon />, primary: false },
];

const ContactPage: React.FC = () => {
    return (
      <>
        <HeroHeader />


        <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20 px-4">
            <div className="container mx-auto text-center">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-dark-text">Get in <span className="text-rose-500">Touch</span> with Us</h1>
                <p className="mt-4 text-xl text-light-text">We're here to help with your event management needs</p>
            </div>

            <div className="max-w-4xl mx-auto mt-16 bg-white/70 backdrop-blur-xl p-8 rounded-2xl shadow-xl border">
                 <h2 className="text-2xl font-bold text-center text-dark-text mb-2">Get in Touch for a Sales Inquiry & Consultation</h2>
                <p className="text-sm text-center text-primary-blue font-semibold mb-10">FREE CONSULTATION</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    {contactMethods.map((method) => (
                        <div key={method.name} className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">{method.icon}</div>
                            <h3 className="mt-4 text-lg font-bold">{method.name}</h3>
                            <p className="text-light-text text-sm">{method.description}</p>
                            <a href={method.buttonHref} target="_blank" rel="noopener noreferrer"
                               className={`mt-6 w-full py-2.5 rounded-lg font-semibold text-sm transition-all
                                   ${method.primary ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-slate-200 text-slate-800 hover:bg-slate-300'}
                               `}>
                                {method.buttonText}
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>

    </>
    );
};

export default ContactPage;
