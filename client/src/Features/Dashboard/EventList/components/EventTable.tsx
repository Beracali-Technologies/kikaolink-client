import React from 'react';
import { TEvent } from '../../../../types';
import EventTableRow from './EventTableRow'; // Import the new row component

interface EventTableProps {
    events: TEvent[];
}

const EventTable: React.FC<EventTableProps> = ({ events }) => {
    return (
        // The main container provides the card look and feel.
        // The "space-y-4" and "divide-y" add to the luxurious spacing.
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              {/* We use a <ul> for semantic correctness, as this is a list of items. */}
              <ul className="divide-y space-y-4 divide-gray-200">
                    {events.map((event) => (
                        // Each event is now rendered by our new, powerful subcomponent.
                        <EventTableRow key={event.id} event={event} />
                    ))}
              </ul>
        </div>
    );
};

export default EventTable;
