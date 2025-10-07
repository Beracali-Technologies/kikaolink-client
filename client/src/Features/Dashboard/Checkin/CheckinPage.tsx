import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Scanner from './components/Scanner';
import AttendeeCard from './components/AttendeeCard';
import { CameraProvider } from './contexts/CameraContext';
import CheckinHeader from './components/CheckinHeader';
import { CheckinAttendee } from '@/types';
import { usbPrintService } from '../../../services/usb/UsbPrintService';


const CheckinPageContent: React.FC = () => {
    const [scannedAttendee, setScannedAttendee] = useState<CheckinAttendee | null>(null);
    const [connectionAttempted, setConnectionAttempted] = useState(false);

    const handleAttendeeScanned = (attendee: CheckinAttendee | null) => {
        setScannedAttendee({
            id: 1,
            uuid: '00ade7e6-db51-4639-b9a2-5177183a8b42',
            first_name: 'Kelvin',
            last_name: 'Magwe',
            email: 'kelvinmullar5@gmail.com',
            status: 'checked_in',
            zpl: '^XA^LL480^PW800^PR6^MMT^FO200,50^A0N,40,60^FDKelvin Magwe^FS^FO200,150^BQN,2,480^FDMA,00ade7e6-db51-4639-b9a2-5177183a8b42^FS^XZ',
        });
        if (attendee) {
            setTimeout(() => setScannedAttendee(null), 5000); // Reset after 5s
        }
    };

    useEffect(() => {
        if ('usb' in navigator) {
            console.log('USB supported');
        } else {
            toast.error('USB not supported. Use Chrome/Edge with experimental WebUSB enabled.');
        }
    }, []);

    const handleConnectPrinter = async () => {
        setConnectionAttempted(true);
        try {
            await usbPrintService.connect();
        } catch (error) {
            const err = error as Error; // Type assertion
            console.error('Printer connection error:', err);
            if (err.message.includes('Access denied')) {
                toast.error('Access denied. Please accept the permission prompt and ensure the device is not in use.');
            } else {
                toast.error(`Printer connection failed: ${err.message}`);
            }
        }
    };

    return (
        <div className="h-screen flex flex-col bg-gray-50">
            <Toaster position="top-right" />
            <CheckinHeader />
            <div className="flex-1 flex flex-col min-h-0 px-6 pb-6">
                <div className="relative flex-1 bg-white p-4 rounded-xl shadow-sm border flex flex-col">
                    <div className="flex-1 flex items-center justify-center min-h-0">
                        <Scanner
                            onScanSuccess={(decodedText) => console.log('Scanned:', decodedText)}
                            onAttendeeScanned={handleAttendeeScanned}
                        />
                    </div>
                    <AttendeeCard attendee={scannedAttendee} />
                </div>
                <div className="mt-4 text-center">
                    {!connectionAttempted ? (
                        <button
                            onClick={handleConnectPrinter}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Connect Printer
                        </button>
                    ) : usbPrintService.isConnected ? ( // This will need a public getter or property
                        <p className="text-green-600 font-bold">Printer is live and connected</p>
                    ) : (
                        <p className="text-red-600 font-bold">Printer not connected (attempting...)</p>
                    )}
                </div>
            </div>
        </div>
    );
};

const CheckinPage: React.FC = () => (
    <CameraProvider>
        <CheckinPageContent />
    </CameraProvider>
);

export default CheckinPage;
