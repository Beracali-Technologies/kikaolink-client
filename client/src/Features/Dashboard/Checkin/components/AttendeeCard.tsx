import React from 'react';
import { Attendee } from '../../../../types';

const AttendeeCard: React.FC<{ attendee: Attendee | null }> = ({ attendee }) => (
    <footer className={`
        absolute bottom-0 left-0 right-0 p-4 z-10
        transform transition-all duration-300 ease-out
        ${attendee ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full pointer-events-none'}
    `}>
        <div className="max-w-xl mx-auto bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl p-6 text-gray-900 space-y-4">
             {/* All attendee info is inside this conditional render */}
             {attendee && (
                <>
                    <div className="text-center">
                        <p className="text-xs text-gray-500">Scan: {attendee.id}</p>
                        <h2 className="text-2xl font-bold mt-1">{attendee.name}</h2>
                    </div>
                    <div className="text-center font-bold text-lg bg-gray-200 text-gray-800 py-2 rounded-lg">
                        {attendee.table} Seat {attendee.seat}
                    </div>
                    <p className="text-center text-gray-600 text-sm">{attendee.email}</p>
                    <p className="text-center text-sm font-semibold">{attendee.ticketType}</p>
                    <div className="grid grid-cols-3 gap-3 pt-2">
                        <button className="bg-yellow-400 text-yellow-900 font-bold py-3 rounded-lg">Undo Check-in</button>
                        <button className="bg-gray-200 font-bold py-3 rounded-lg">Print</button>
                        <button className="bg-gray-200 font-bold py-3 rounded-lg">View</button>
                    </div>
                </>
            )}
        </div>
    </footer>
);
export default AttendeeCard;
