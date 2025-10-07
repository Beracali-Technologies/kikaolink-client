import React, { useEffect } from 'react';
import { CheckinAttendee } from '@/types';
import { usbPrintService } from '../../../../services/usb/UsbPrintService';

interface AttendeeCardProps {
  attendee: CheckinAttendee | null;
}

const AttendeeCard: React.FC<AttendeeCardProps> = ({ attendee }) => {
  useEffect(() => {
    if (attendee?.zpl && usbPrintService.isConnected) { // Use isConnectedStatus if getter is added
      const timer = setTimeout(() => {
        usbPrintService.printZPL(attendee.zpl).catch(error => {
          console.error('Print timeout error:', error);
        });
      }, 1000); // Delay 1 second before printing
      return () => clearTimeout(timer);
    } else if (attendee?.zpl && !usbPrintService.isConnected) { // Use isConnectedStatus if getter is added
      console.warn('Printer not connected. Please connect the printer first.');
    }
  }, [attendee]);

  if (!attendee) return null;

  const fullName = `${attendee.first_name} ${attendee.last_name}`.trim();

  return (
    <footer className="absolute bottom-0 left-0 right-0 p-4 z-10 transform translate-y-0 opacity-100">
      <div className="max-w-xl mx-auto bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl p-6 text-gray-900 space-y-4">
        <div className="text-center">
          <p className="text-xs text-gray-500">Scan: {attendee.uuid}</p>
          <h2 className="text-2xl font-bold mt-1">{fullName}</h2>
        </div>
        {attendee.email && <p className="text-center text-gray-600 text-sm">{attendee.email}</p>}
        <div className="text-center text-green-600 font-bold">
          {usbPrintService.isConnected ? 'Printing via USB...' : 'Printer not connected'} {/* Use isConnectedStatus if getter is added */}
        </div>
      </div>
    </footer>
  );
};

export default AttendeeCard;
