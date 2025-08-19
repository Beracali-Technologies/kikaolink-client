import React from 'react';
import { FiChevronLeft, FiX } from 'react-icons/fi';

interface SidebarHeaderProps {
    isOpen: boolean;
    isMobile: boolean;
    onToggle: () => void;
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({ isOpen, isMobile, onToggle }) => {
    return (
        <div className={`flex items-center justify-between h-16 px-4 border-b border-gray-700/50 flex-shrink-0
            ${isOpen ? 'justify-between' : 'justify-center'}`}
        >
            <span
                className={`font-bold text-xl whitespace-nowrap transition-all duration-300
                           ${!isOpen ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}
                aria-hidden={!isOpen}
            >
                <span className="text-blue-400">Kikao</span>
                <span className="text-white">Link</span>
            </span>

            <button
                onClick={onToggle}
                className="p-2 rounded-lg hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
                aria-label={isMobile ? "Close menu" : "Toggle sidebar"}
            >
                {isMobile ? (
                    <FiX className="w-6 h-6" />
                ) : (
                    <FiChevronLeft className={`w-6 h-6 transform transition-transform duration-500 ${!isOpen ? 'rotate-180' : 'rotate-0'}`} />
                )}
            </button>
        </div>
    );
};

export default SidebarHeader;
