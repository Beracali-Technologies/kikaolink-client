import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Attendee } from '../../../types';

// --- SUBCOMPONENTS ---
import Scanner from './components/Scanner';
import AttendeeCard from './components/AttendeeCard';
import { FiCamera } from 'react-icons/fi';


// Mock data for a successful scan
const MOCK_ATTENDEE: Attendee = {
    id: '2564341F1F9',
    name: 'Alan Chan',
    email: 'george.linn@eventnook.com',
    table: 'Table 1',
    seat: 9,
    ticketType: 'Table Booking',
    isCheckedIn: true,
};

const CheckinPage: React.FC = () => {
    const [scannedAttendee, setScannedAttendee] = useState<Attendee | null>(null);

    const handleScanSuccess = (decodedText: string) => {
        if (scannedAttendee) return;

        console.log("Scan success:", decodedText);
        setScannedAttendee(MOCK_ATTENDEE);
        toast.success(`Checked In: ${MOCK_ATTENDEE.name}`);

        setTimeout(() => setScannedAttendee(null), 3500);
    };

    return (
        <div className="h-full flex flex-col space-y-8">
            <Toaster position="top-right" />
            <header className="flex-shrink-0 flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-800">Check-in Terminal</h1>
                <button className="p-3 bg-white border shadow-sm rounded-lg text-gray-600">
                    <FiCamera className="w-5 h-5" />
                </button>
            </header>
            <div className="relative flex-1 bg-white p-6 rounded-xl shadow-sm border flex items-center justify-center min-h-[500px]">
                {/* --- The call is now simpler and more robust --- */}
                <Scanner onScanSuccess={handleScanSuccess} />
                <AttendeeCard attendee={scannedAttendee} />
            </div>
        </div>
    );
};
export default CheckinPage;
