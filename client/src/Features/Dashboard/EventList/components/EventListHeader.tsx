import React from 'react';
import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import SearchBar from '../../Components/SearchBar/SearchBar'; // Import our new reusable component

interface EventListHeaderProps {
    searchTerm: string;
    onSearchChange: (term: string) => void;
}

const EventListHeader: React.FC<EventListHeaderProps> = ({ searchTerm, onSearchChange }) => {
    return (
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h1 className="text-3xl font-bold text-gray-800">My Events</h1>
            <div className="flex items-center gap-4 w-full sm:w-auto">
                <SearchBar
                    value={searchTerm}
                    onChange={onSearchChange}
                    placeholder="Search events..."
                />
                <Link
                    to="/dashboard/events/create"
                    className="flex-shrink-0 flex items-center gap-2 bg-blue-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-700 shadow-sm"
                >
                    <FiPlus />
                    <span>Create Event</span>
                </Link>
            </div>
        </header>
    );
};
export default EventListHeader;
