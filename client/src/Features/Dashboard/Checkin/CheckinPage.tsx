import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { Attendee } from '../../../types';

// --- SUBCOMPONENTS ---
import Scanner from './components/Scanner';
import AttendeeCard from './components/AttendeeCard';
import { FiCamera } from 'react-icons/fi';

// Mock Data for a successful scan
const MOCK_ATTENDEE: Attendee = {
    id: 'DEMO-123', name: 'Jane Doe', email: 'jane.doe@example.com', table: 'Table 5',
    seat: 4, ticketType: 'VIP Pass', isCheckedIn: true,
};

const CheckinPage: React.FC = () => {
    const { eventId } = useParams<{ eventId: string }>();
    const [scannedAttendee, setScannedAttendee] = useState<Attendee | null>(null);
    const [isScannerActive, setIsScannerActive] = useState(true);

    // This is called by the Scanner on a successful scan
    const handleScanSuccess = (decodedText: string) => {
        if (!isScannerActive) return; // Prevent multiple scans if we're already handling one

        console.log("Scan success:", decodedText);
        setIsScannerActive(false); // Pause the scanner

        // Simulate API call and show result
        setScannedAttendee(MOCK_ATTENDEE);
        toast.success(`Checked In: ${MOCK_ATTENDEE.name}`);

        // Automatically reset after a few seconds to scan the next person
        setTimeout(() => {
            setScannedAttendee(null); // Hide the card
            setIsScannerActive(true);  // Re-enable scanning
        }, 3500);
    };

    const handleScanError = (errorMessage: string) => {
        // We can ignore 'No QR code found' errors for a cleaner console
        if (!errorMessage.includes("No QR code found")) {
            console.error(`QR Scanner Error: ${errorMessage}`);
        }
    };

    return (
        <div className="h-full flex flex-col space-y-8">
            <Toaster position="top-right" />

            {/* --- HEADER SECTION --- */}
            <header className="flex-shrink-0 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Check-in Terminal</h1>
                    <p className="text-gray-500 mt-1">Point the camera at an attendee's QR code.</p>
                </div>
                {/* Add a link to the attendee list page later */}
                 <button className="p-3 bg-white border shadow-sm rounded-lg hover:bg-gray-100 text-gray-600">
                    <FiCamera className="w-5 h-5" />
                 </button>
            </header>

            {/* --- MAIN CONTENT CARD --- */}
            {/* The main card contains the scanner AND the result overlay */}
            <div className="relative flex-1 bg-white p-6 rounded-xl shadow-sm border flex flex-col items-center justify-center min-h-[500px]">
                {/* 1. The Scanner Component */}
                <Scanner
                    onScanSuccess={handleScanSuccess}
                    onScanError={handleScanError}
                    isScanningActive={isScannerActive}
                />

                {/* 2. The Attendee Card (conditionally rendered overlay) */}
                <AttendeeCard attendee={scannedAttendee} />
            </div>
        </div>
    );
};

export default CheckinPage;
