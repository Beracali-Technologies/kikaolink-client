// Features/Dashboard/Events/EventList/components/EventTable.tsx
import React from 'react';
import { TEvent } from '@/types';
import EventTableRow from './EventTableRow';

interface EventTableProps {
    events: TEvent[];
    onEventSelect: (eventId: number) => void;
    onEventManage: (eventId: number) => void;
}

const EventTable: React.FC<EventTableProps> = ({ events, onEventSelect, onEventManage }) => {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <ul className="divide-y divide-gray-200">
                {events.map((event) => (
                    <EventTableRow
                        key={event.id}
                        event={event}
                        onEventSelect={onEventSelect}
                        onEventManage={onEventManage}
                    />
                ))}
            </ul>
        </div>
    );
};

export default EventTable;
