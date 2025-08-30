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
        <div className="h-full flex flex-col">
            <Toaster position="top-right" />

                  <div className="flex-shrink-0">
                      <CheckinHeader />
                  </div>


                  <div className="flex-1 flex flex-col min-h-0"> {/* min-h-0 allows flex child to shrink */}
              <div className="relative flex-1 bg-white p-4 rounded-xl shadow-sm border flex flex-col">
                  {/* Scanner container that occupies available space */}
                  <div className="flex-1 flex items-center justify-center min-h-0">
                      <Scanner onScanSuccess={handleScanSuccess} />
                  </div>

                  <AttendeeCard attendee={scannedAttendee} />
              </div>
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
