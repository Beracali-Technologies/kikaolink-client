import React from 'react';
import { FiX, FiPrinter } from 'react-icons/fi';
import { Attendee } from '../../../../types'; // You'll need to define this type

interface AttendeeCardProps {
    attendee: Attendee | null;
    onClose: () => void;
}

const AttendeeCard: React.FC<AttendeeCardProps> = ({ attendee, onClose }) => {
    if (!attendee) return null;

    const { name, table, seat, email, ticketType } = attendee;
    
    // Determine the color of the "checked-in" dot
    const statusColor = attendee.isCheckedIn ? 'bg-green-500' : 'bg-yellow-500';

    return (
        // The animated slide-up container
        <div className={`
            fixed bottom-0 left-0 right-0 p-4 transform transition-transform duration-300 ease-out
            ${attendee ? 'translate-y-0' : 'translate-y-full'}
        `}>
            <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-2xl p-6 relative">
                {/* Close Button */}
                <button onClick={onClose} className="absolute top-4 right-4 p-2 text-gray-400 hover:bg-gray-100 rounded-full">
                    <FiX />
                </button>

                {/* Header */}
                <div className="flex justify-between items-start">
                    <div>
                        <div className="flex items-center gap-3">
                             <span className={`w-3 h-3 rounded-full ${statusColor}`} />
                             <h2 className="text-2xl font-bold">{name}</h2>
                        </div>
                        <p className="text-gray-500 text-sm mt-1">{ticketType}</p>
                    </div>
                    <div className="bg-blue-100 text-blue-700 font-bold px-4 py-2 rounded-lg">
                        {table} Seat {seat}
                    </div>
                </div>
                <p className="text-gray-600 mt-2">{email}</p>

                {/* Action Buttons */}
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                    <button className="flex-1 px-4 py-3 bg-yellow-400 text-yellow-900 font-bold rounded-lg hover:bg-yellow-500">
                        Undo Check-in
                    </button>
                    <button className="flex-1 px-4 py-3 bg-gray-200 text-gray-800 font-bold rounded-lg hover:bg-gray-300">
                        Print
                    </button>
                     <button className="flex-1 px-4 py-3 bg-gray-200 text-gray-800 font-bold rounded-lg hover:bg-gray-300">
                        View Details
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AttendeeCard;
