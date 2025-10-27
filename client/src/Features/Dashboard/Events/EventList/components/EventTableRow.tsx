import React from 'react';
import { TEvent } from '@/types';
import { FiCalendar, FiUsers, FiBarChart2, FiSettings } from 'react-icons/fi';

interface EventTableRowProps {
    event: TEvent;
    onEventSelect: (eventId: number) => void;
    onEventManage: (eventId: number) => void;
}

const EventTableRow: React.FC<EventTableRowProps> = ({ event, onEventSelect, onEventManage }) => {
    const getStatusChip = (status: string) => {
        const statusMap: Record<string, string> = {
            LIVE: "bg-green-100 text-green-800 border border-green-200",
            DRAFT: "bg-yellow-100 text-yellow-800 border border-yellow-200",
            COMPLETED: "bg-gray-100 text-gray-800 border border-gray-200",
            ACTIVE: "bg-blue-100 text-blue-800 border border-blue-200",
            INACTIVE: "bg-red-100 text-red-800 border border-red-200",
        };
        const color = statusMap[status] || statusMap.DRAFT;
        return (
            <span className={`text-xs font-medium px-3 py-1 rounded-full ${color}`}>
                {status}
            </span>
        );
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Convert event.id to number
    const eventId = Number(event.id);

    return (
        <li className="p-6 hover:bg-gray-50 transition-colors">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Event Info */}
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                        {getStatusChip(event.status)}
                        <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                            <FiCalendar className="w-4 h-4" />
                            <span>Starts: {formatDate(event.start_date)}</span>
                        </div>
                        {event.location && (
                            <div className="flex items-center gap-2">
                                <FiUsers className="w-4 h-4" />
                                <span>{typeof event.location === 'string' ? event.location : event.location?.name}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 flex-shrink-0">
                    <button
                        onClick={() => onEventSelect(eventId)}
                        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                        <FiBarChart2 className="w-4 h-4" />
                        View Dashboard
                    </button>

                    <button
                        onClick={() => onEventManage(eventId)}
                        className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                    >
                        <FiSettings className="w-4 h-4" />
                        Manage
                    </button>
                </div>
            </div>
        </li>
    );
};

export default EventTableRow;
