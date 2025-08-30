import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Attendee } from '../../../types';

// --- SUBCOMPONENTS ---
import Scanner from './components/Scanner';
import AttendeeCard from './components/AttendeeCard';

import { CameraProvider } from './contexts/CameraContext';
import CheckinHeader from './components/CheckinHeader';

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

const CheckinPageContent: React.FC = () => {
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

                  <CheckinHeader />

            <div className="relative flex-1 bg-white p-6 rounded-xl shadow-sm border flex items-center justify-center min-h-[500px]">
                {/* --- The call is now simpler and more robust --- */}
                <Scanner onScanSuccess={handleScanSuccess} />
                <AttendeeCard attendee={scannedAttendee} />
            </div>
        </div>
    );
};


const CheckinPage: React.FC = () => {

    return (
        <CameraProvider>
              <CheckinPageContent />
        </CameraProvider>
    );
};


export default CheckinPage;
