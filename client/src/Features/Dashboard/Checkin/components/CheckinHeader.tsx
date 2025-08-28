import React from 'react';
import { FiCamera } from 'react-icons/fi';

const CheckinHeader: React.FC<{ isAutoCheckin: boolean; onToggleAutoCheckin: () => void }> =
({ isAutoCheckin, onToggleAutoCheckin }) => (
    <header className="flex-shrink-0 flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-bold text-gray-800">Check-in Terminal</h1>
            <p className="text-gray-500 mt-1">Point the camera at an attendee's QR code.</p>
        </div>
         <button className="p-3 bg-white border shadow-sm rounded-lg hover:bg-gray-100 text-gray-600">
            <FiCamera className="w-5 h-5" />
         </button>
    </header>
);

export default CheckinHeader;
