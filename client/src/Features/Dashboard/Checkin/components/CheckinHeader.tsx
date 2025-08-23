import React from 'react';
import { FiCamera, FiX } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const CheckinHeader: React.FC<{ eventTitle: string, isAutoCheckin: boolean, onToggleAutoCheckin: () => void }> =
({ eventTitle, isAutoCheckin, onToggleAutoCheckin }) => (
    <header className="absolute top-0 left-0 right-0 p-4 z-10 bg-gradient-to-b from-black/60 to-transparent">
        <div className="flex justify-between items-center text-white">
            <h1 className="font-bold text-lg">{eventTitle}</h1>
            <div className="flex items-center gap-4">
                {/* Auto Check-in Toggle */}
                <div className="flex items-center space-x-2">
                    <div
                        onClick={onToggleAutoCheckin}
                        className={`relative w-14 h-8 flex items-center rounded-full cursor-pointer ${isAutoCheckin ? 'bg-green-500' : 'bg-gray-700'}`}>
                        <span className={`absolute left-1 w-6 h-6 bg-white rounded-full transition-transform ${isAutoCheckin ? 'translate-x-6' : 'translate-x-0'}`} />
                    </div>
                    <span className="font-medium text-sm hidden sm:block">auto check-in</span>
                </div>
                <Link to="/dashboard/events" className="p-2 rounded-lg hover:bg-white/10" title="Back to Events">
                    <FiCamera className="w-6 h-6" /> {/* Replace with list/grid icon if needed */}
                </Link>
            </div>
        </div>
    </header>
);
export default CheckinHeader;
