import React from 'react';
import AlternatingFeature from './AlternatingFeature/AlternatingFeature';
import TabbedFeatures from './TabbedFeatures/TabbedFeatures';
import QrFeatureVisual from './QrFeatureVisual/QrFeatureVisual';

import qrPrinterScanning from '../../../../assets/images/qrPrinterScanning.webp';
import onSiteBadge from '../../../../assets/images/onSiteBadge.png';
import eventPrinterConfiguration from '../../../../assets/images/eventPrinterConfiguration.png';
import badgeDesign from '../../../../assets/images/badgeDesign.webp';

// --- Icons (KioskIcon renamed for clarity)---
const KioskIcon = () => <svg className="w-6 h-6 text-primary-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 11h14M5 17h14M5 5h14M12 5v12" /></svg>;
const PrintIcon = () => <svg className="w-6 h-6 text-primary-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>;

const alternatingFeaturesData = [
    {
        title: <>From Online Registration <br/> to On-Site Scan</>,
        description: "Generate a unique, secure QR code for every attendee the moment they register. This scannable ticket is their key to a frictionless check-in experience, eliminating queues and manual lookups.",
        visualContent: <img src={qrPrinterScanning} alt="A phone scanning a QR code ticket from a Zebra printer" className="rounded-2xl shadow-xl w-full h-full object-cover" />,
    },
    {
        title: <>Secure, Unique, and <br className="hidden md:block" />Instant QR Codes</>,
        description: "From registration to check-in, we simplify every step. Each attendee receives a unique, secure QR code, eliminating duplicates and ensuring a smooth, fast entry experience for everyone.",
        visualContent: <QrFeatureVisual />,
    },
    {
        title: "A World-Class On-Site Experience",
        description: "Transform your event entrance from chaos to calm. Our platform allows attendees to self-check-in at stylish kiosks, automatically triggering a badge print, getting them into your event faster.",
        points: ["Eliminate long queues and frustrated attendees.", "Reduce the need for temporary event staff.", "Create a professional and modern first impression."],
        visualContent: <img src={onSiteBadge} alt="Rows of professional event badges and check-in kiosks ready for attendees" className="rounded-2xl shadow-xl w-full h-full object-cover" />,
        imageOnLeft: true,
    },
];

const tabbedFeaturesData = [
    { id: 'hardware', icon: <KioskIcon />, title: 'Printer & Kiosk Configuration', subtitle: 'Effortless hardware setup', description: 'Easily connect and configure industry-standard printers and tablet kiosks. Our software guides you through the process, ensuring your on-site setup is robust and ready for action.', imageUrl: eventPrinterConfiguration, imageAlt: "Configuration screen for event printers." },
    { id: 'printing', icon: <PrintIcon />, title: 'On-Demand Badge Printing', subtitle: 'Professional badge solutions', description: 'Design professional name badges with our intuitive editor. Drag and drop logos, attendee details, and custom fields to create a badge that perfectly represents your brand.', imageUrl: badgeDesign, imageAlt: "Badge design interface." },
];

const FeaturesSection: React.FC = () => {
    return (
        <section className="bg-white py-24 sm:py-32">
            <div className="container mx-auto px-6 space-y-24 md:space-y-40">
                <div className="text-center max-w-4xl mx-auto">
                    <p className="font-semibold text-primary-blue uppercase tracking-widest">The All-In-One Platform</p>
                    <h2 className="text-4xl sm:text-6xl font-bold text-dark-text mt-4 tracking-tight">
                        Flawless Events Start Here.
                    </h2>
                    <p className="mt-6 text-xl text-light-text">
                        From the first click to the final handshake, KikaoConnect provides the professional tools you need to create truly memorable events.
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
