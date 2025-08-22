import React from 'react';
import { FiSearch } from 'react-icons/fi';

// Define the props for our component for type safety
interface SearchBarProps {
    value: string;
    onChange: (newValue: string) => void;
    placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, placeholder = "Search..." }) => {
    return (
        <div className="relative flex-grow sm:flex-grow-0">
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full border rounded-md pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
            />
            <FiSearch
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                aria-hidden="true" 
            />
        </div>
    );
};

export default SearchBar;
