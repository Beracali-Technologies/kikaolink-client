// src/Features/Landing/Components/FeaturesSection/FeaturesSection.tsx
import React from 'react';

// --- YOUR LOCAL IMAGE IMPORTS ---
import badgeDesign from '../../../../assets/Images/badgeDesign.webp';
import eventPrinterConfiguration from '../../../../assets/Images/eventPrinterConfiguration.png';
import onSiteBadge from '../../../../assets/Images/onSiteBadge.png';
import qrPrinterScanning from '../../../../assets/Images/qrPrinterScanning.webp';

// --- YOUR COMPONENT IMPORTS ---
import AlternatingFeature from './AlternatingFeature/AlternatingFeature';
import TabbedFeatures from './TabbedFeatures/TabbedFeatures';
import QrFeatureVisual from './QrFeatureVisual/QrFeatureVisual';


// --- Icons for TabbedFeatures ---
const WebsiteIcon = () => <svg className="w-6 h-6 text-primary-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c.251.042.492.099.721.168C11.39 3.58 12.5 4.5 12.5 5.75c0 .324-.04.642-.115.942m3.835-3.086a2.25 2.25 0 00-3.328-1.591l-4.5 3a2.25 2.25 0 102.508 4.295l2.7-1.8a2.25 2.25 0 001.21-1.922V5.75c0-1.25.75-2.295 1.771-2.731a1.125 1.125 0 111.458 1.956Z" /></svg>;
const PrintIcon = () => <svg className="w-6 h-6 text-primary-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>;


// *** THE FIX: The data arrays are updated to use your new imported images ***
const alternatingFeaturesData = [
    {
        title: <>Secure, Unique, and <br className="hidden md:block" />Instant QR Codes</>,
        description: "From registration to check-in, we simplify every step. Each attendee receives a unique, secure QR code, eliminating duplicates and ensuring a smooth, fast entry experience for everyone.",
        visualContent: <img src={qrPrinterScanning} alt="A phone scanning a QR code ticket at an event check-in kiosk" className="rounded-2xl shadow-xl w-full h-full object-cover" />,
    },
    {
        title: "Brilliantly Customizable Forms",
        description: "Our intuitive form builder allows you to create a seamless registration experience, collecting exactly the information you need, from dietary requirements to session selections.",
        points: ["Drag-and-drop fields for easy customization.", "Add standard or custom questions.", "Ensure a professional, branded look."],
        visualContent: <img src={onSiteBadge} alt="Rows of professional event badges and check-in kiosks ready for attendees" className="rounded-2xl shadow-xl w-full h-full object-cover" />,
        imageOnLeft: true,
    },
];

const tabbedFeaturesData = [
    {
        id: 'websites',
        icon: <WebsiteIcon />,
        title: 'Printer & Kiosk Configuration',
        subtitle: 'Effortless hardware setup',
        description: 'Easily connect and configure industry-standard printers and tablet kiosks. Our software guides you through the process, ensuring your on-site setup is robust and ready for action.',
        imageUrl: eventPrinterConfiguration,
        imageAlt: "A configuration screen for setting up an event printer and check-in kiosks."
    },
    {
        id: 'printing',
        icon: <PrintIcon />,
        title: 'On-Demand Badge Printing',
        subtitle: 'Professional badge design',
        description: 'Design and print professional name badges on-demand. Our drag-and-drop editor and seamless printer integration mean no more pre-printing, waste, or forgotten badges.',
        imageUrl: badgeDesign,
        imageAlt: "A drag-and-drop badge design interface next to a printer issuing a badge."
    },
];

const FeaturesSection: React.FC = () => {
    return (
        <section className="bg-white py-20 sm:py-28">
            <div className="container mx-auto px-6 space-y-24 md:space-y-32">
                 {/* --- Section Header --- */}
                 <div className="text-center max-w-3xl mx-auto">
                    <p className="font-semibold text-primary-blue">ALL-IN-ONE PLATFORM</p>
                    <h2 className="text-3xl sm:text-4xl font-bold text-dark-text mt-2">
                        Everything You Need for a Flawless Event
                    </h2>
                    <p className="mt-4 text-lg text-light-text">
                        From the first click to the final handshake, KikaoConnect provides the tools to create professional and memorable events.
                    </p>
                </div>

                {alternatingFeaturesData.map((feature, index) => (
                    <AlternatingFeature
                        key={index}
                        title={feature.title}
                        description={feature.description}
                        points={feature.points}
                        visualContent={feature.visualContent}
                        imageOnLeft={feature.imageOnLeft}
                    />
                ))}

                <TabbedFeatures features={tabbedFeaturesData} />
            </div>
        </section>
    );
};

export default FeaturesSection;
