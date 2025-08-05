import { AlternatingFeatureItem, TabbedFeatureItem } from './features';
import QrFeatureVisual from '../QrFeatureVisual/QrFeatureVisual'; // Use relative paths from this new location


import qrPrinterScanning from '../../../../../assets/Images/qrPrinterScanning.webp';
import onSiteBadge from '../../../../../assets/Images/onSiteBadge.png';
import eventPrinterConfiguration from '../../../../../assets/Images/eventPrinterConfiguration.png';
import badgeDesign from '../../../../../assets/Images/badgeDesign.webp';

// Icons need to be defined here or imported
const KioskIcon = () => <svg className="w-6 h-6 text-primary-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 11h14M5 17h14M5 5h14M12 5v12" /></svg>;
const PrintIcon = () => <svg className="w-6 h-6 text-primary-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>;


// --- DATA for the Alternating Features ---
export const alternatingFeaturesData: AlternatingFeatureItem[] = [
    {
        title: <>From Online Registration <br/> to On-Site Scan</>,
        description: "Generate a unique, secure QR code for every attendee the moment they register. This scannable ticket is their key to a frictionless check-in experience, eliminating queues and manual lookups.",
        visualContent: <img src={qrPrinterScanning} alt="A phone scanning a QR code ticket from a Zebra printer" className="rounded-2xl shadow-xl w-full h-full object-cover" />,
    },
    {
        title: "The Ultimate On-Site Experience",
        description: "Transform your event entrance from chaos to calm. Our platform allows attendees to self-check-in at stylish kiosks, automatically triggering a badge print, getting them into your event faster.",
        points: ["Eliminate long queues and frustrated attendees.", "Reduce the need for temporary event staff.", "Create a professional and modern first impression."],
        visualContent: <img src={onSiteBadge} alt="Rows of professional event badges and check-in kiosks ready for attendees" className="rounded-2xl shadow-xl w-full h-full object-cover" />,
        imageOnLeft: true,
    },
    {
        title: <>One Scan. <br className="hidden md:block" />Instant Verification.</>,
        description: "Forget spreadsheets. A single scan provides instant verification, automatically checking in the attendee and triggering their badge to print. It's secure, fast, and incredibly professional.",
        visualContent: <QrFeatureVisual />,
    },
];


// --- DATA for the Tabbed Features ---
export const tabbedFeaturesData: TabbedFeatureItem[] = [
    {
        id: 'hardware',
        icon: <KioskIcon />,
        title: 'Printer & Kiosk Configuration',
        subtitle: 'Effortless hardware setup',
        description: 'Easily connect and configure industry-standard printers and tablet kiosks, ensuring your on-site setup is robust and ready for action.',
        imageUrl: eventPrinterConfiguration,
        imageAlt: "Configuration screen for event printers."
    },
    {
        id: 'printing',
        icon: <PrintIcon />,
        title: 'Drag-and-Drop Badge Design',
        subtitle: 'Professional badge solutions',
        description: 'Design professional name badges with our intuitive editor. Drag and drop logos, attendee details, and custom fields to create a badge that perfectly represents your brand.',
        imageUrl: badgeDesign,
        imageAlt: "Badge design interface."
    },
];
