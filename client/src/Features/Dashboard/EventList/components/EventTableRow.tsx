import React from 'react';
import { Link } from 'react-router-dom';
import { TEvent, EventStatus } from '../../../../types'; // Ensure you have this type defined
import { FiCalendar } from 'react-icons/fi';

// This helper function creates the colored "status chip"
const getStatusChip = (status: EventStatus) => {
    const statusMap: Record<EventStatus, string> = {
        LIVE: "bg-green-100 text-green-800",
        DRAFT: "bg-yellow-100 text-yellow-800",
        COMPLETED: "bg-gray-200 text-gray-700",
    };
    const color = statusMap[status] || statusMap.DRAFT;
    return <span className={`flex-shrink-0 text-xs font-medium px-2.5 py-1 rounded-full ${color}`}>{status}</span>;
};

// --- The Row Component ---
interface EventTableRowProps {
    event: TEvent;
}

const EventTableRow: React.FC<EventTableRowProps> = ({ event }) => {
    // Format the date for a more human-readable display
    const formattedStartDate = new Date(event.start_date).toLocaleDateString(undefined, {
        year: 'numeric', month: 'long', day: 'numeric'
    });

    return (
        <li className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 hover:bg-gray-50/50 transition-colors">

            {/* --- Left Side: Event Details --- */}
            <div className="flex items-center gap-4">
                {getStatusChip(event.status)}
                <div>
                    <h3 className="font-bold text-lg text-gray-800">{event.title}</h3>
                    <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                        <FiCalendar className="w-4 h-4" />
                        <span>Starts on {formattedStartDate}</span>
                    </div>
                </div>
            </div>

            {/* --- Right Side: Action Button --- */}
            <div className="flex-shrink-0 w-full sm:w-auto">
                <Link
                    to={`/dashboard/events/${event.id}/info`}
                    className="flex items-center justify-center sm:justify-start w-full bg-white border border-gray-300 text-gray-700 font-semibold px-4 py-2 rounded-md hover:bg-gray-100 transition-shadow text-sm"
                >
                    <span>Manage</span>
                    <span className="ml-2">→</span>
                </Link>
            </div>
        </li>
    );
};

export default EventTableRow;
