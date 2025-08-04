import React from 'react';



// Placeholder Icons for features
const QRIcon = () => <svg className="w-10 h-10 text-primary-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6.5 6.5l-1-1M6 12H4m11.5-6.5l-1-1M12 4a8 8 0 100 16 8 8 0 000-16z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11h.01M12 11h.01M9 11h.01M12 8h.01" /></svg>;
const PrintIcon = () => <svg className="w-10 h-10 text-primary-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>;
const DataIcon = () => <svg className="w-10 h-10 text-primary-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>;

const features = [
    {
        icon: <QRIcon />,
        title: "Effortless QR Check-in",
        description: "Send unique QR codes to every attendee. Scan them at the door with any smartphone or laptop for a smooth, queue-free entry."
    },
    {
        icon: <PrintIcon />,
        title: "On-Demand Badge Printing",
        description: "Forget pre-printing and sorting hundreds of badges. Print professional, customized badges instantly as attendees check in."
    },
    {
        icon: <DataIcon />,
        title: "Real-time Analytics",
        description: "Know exactly who has arrived and when. Access live attendance data from your dashboard to make informed decisions during your event."
    },
];

const FeaturesSection: React.FC = () => {
    return (
        <section className="bg-white py-20 sm:py-28">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold text-dark-text">The Modern Way to Manage Events</h2>
                    <p className="mt-4 text-lg text-light-text">
                        KikaoConnect automates your most tedious tasks, so you can focus on creating an unforgettable experience for your guests.
                    </p>
                </div>

                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                    {features.map((feature, index) => (
                        <div key={index}>
                            <div className="flex justify-center items-center">{feature.icon}</div>
                            <h3 className="mt-5 text-xl font-semibold text-dark-text">{feature.title}</h3>
                            <p className="mt-2 text-light-text">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
