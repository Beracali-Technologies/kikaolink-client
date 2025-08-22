import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiCamera } from 'react-icons/fi';
import toast, { Toaster } from 'react-hot-toast';

// Import our new subcomponents
import Scanner from './components/Scanner';
import AttendeeCard from './components/AttendeeCard';
import { Attendee } from '../../../types';

// Mock data for a found attendee. In a real app, this would come from an API call.
const MOCK_ATTENDEE: Attendee = {
    id: '2564341f1f9',
    name: 'Alan Chan',
    email: 'george.linn@eventnook.com',
    table: 'Table 1',
    seat: 9,
    ticketType: 'Table Booking',
    isCheckedIn: true,
};

const CheckinPage: React.FC = () => {
    const { eventId } = useParams<{ eventId: string }>();

    // --- STATE MANAGEMENT ---
    const [scannedResult, setScannedResult] = useState<Attendee | null>(null);
    const [isAutoCheckin, setIsAutoCheckin] = useState(true);

    const handleScan = (decodedText: string, decodedResult: any) => {
        console.log(`Scan successful, result: ${decodedText}`, decodedResult);

        // --- In a real app, you would make an API call here ---
        // const attendeeData = await api.post(`/api/events/${eventId}/checkin`, { qrCode: result });
        // setScannedResult(attendeeData);

        // For now, we'll use mock data
        toast.success(`Checked in ${MOCK_ATTENDEE.name}!`);
        setScannedResult(MOCK_ATTENDEE);
    };

    const handleError = (error: any) => {
        if (error.name !== "NotFoundException") { // Ignore "QR not found" errors
            console.error("QR Scanner Error:", error);
            toast.error("Could not start camera. Please check permissions.");
        }
    };

    return (
        <div className="w-full h-full bg-black text-white relative flex flex-col">
            <Toaster position="bottom-center" />

            {/* --- HEADER --- */}
            <header className="flex-shrink-0 p-4 bg-gray-900/50 backdrop-blur-sm flex items-center justify-between">
                <div>
                     <h1 className="font-bold">Charity and Fundraising Event 2023</h1>
                     {/* Your "Back to all events" link can go here */}
                </div>
                 <Link to={`/dashboard/events/${eventId}/checkin-list`} // Link to the list view
                    className="p-2 bg-white/10 rounded-lg hover:bg-white/20">
                     <FiCamera />
                 </Link>
            </header>

            {/* --- SCANNER & OVERLAYS --- */}
            <main className="flex-grow flex items-center justify-center p-4">
                 <Scanner onScanResult={handleScan} onError={handleError} />
            </main>

            {/* --- The slide-up result card --- */}
            <AttendeeCard attendee={scannedResult} onClose={() => setScannedResult(null)} />
        </div>
    );
};
export default CheckinPage;
