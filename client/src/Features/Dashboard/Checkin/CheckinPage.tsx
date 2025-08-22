import React from 'react';
import { useParams } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';

const CheckinPage: React.FC = () => {
    const { eventId } = useParams<{ eventId: string }>();

    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold text-gray-800">Check-in Terminal</h1>
                <p className="text-gray-500 mt-1">Search for and check in attendees for event: {eventId}</p>
            </header>
            <div className="bg-white p-8 rounded-lg shadow-sm border">
                <div className="relative">
                    <input type="text" placeholder="Search by name, email, or ticket number..."
                           className="w-full p-4 pl-12 text-lg border rounded-lg"/>
                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-gray-400"/>
                </div>
                <div className="text-center text-gray-400 py-20">
                    Search results will appear here.
                </div>
            </div>
        </div>
    );
};

export default CheckinPage;
