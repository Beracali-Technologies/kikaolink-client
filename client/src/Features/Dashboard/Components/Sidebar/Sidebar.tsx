import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FiGrid, FiSettings, FiChevronLeft, FiX } from 'react-icons/fi';

// Define the shape of our props for clarity
interface SidebarProps {
    isMobile: boolean;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isMobile, isOpen, setIsOpen }) => {
    const location = useLocation();

    // Determine if any settings page is active to highlight the "Settings" icon
    const isSettingsActive = location.pathname.includes('/settings');

    const menuItems = [
        { name: 'Events', path: '/dashboard/events', icon: FiGrid },
        { name: 'Settings', path: '/dashboard/settings', icon: FiSettings, isActiveOverride: isSettingsActive },
    ];

    // This is the shared UI content for both mobile and desktop sidebars
    const SidebarContent = (
        <div className="flex flex-col h-full bg-[#1e293b] text-gray-200">
            {/* --- Header & Action Button --- */}
            <div className={`flex items-center justify-between h-16 px-4 border-b border-gray-700/50 flex-shrink-0
                ${isMobile ? 'justify-between' : isOpen ? 'justify-between' : 'justify-center'}`
            }>
                <span
                    className={`font-bold text-xl whitespace-nowrap transition-all duration-300 ease-in-out
                               ${!isOpen ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}
                    aria-hidden={!isOpen}
                >
                    <span className="text-blue-400">Kikao</span>
                    <span className="text-white">Link</span>
                </span>

                {/* --- THIS IS THE CRITICAL CHANGE --- */}
                {/* Render the appropriate button based on the context (mobile vs. desktop) */}
                {isMobile ? (
                    // On Mobile, this is a simple "Close" button inside the panel
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                        <FiX className="w-6 h-6" />
                    </button>
                ) : (
                    // On Desktop, this is the "Collapse/Expand" button
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-2 rounded-lg hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <FiChevronLeft className={`w-6 h-6 transform transition-transform duration-500 ${!isOpen ? 'rotate-180' : 'rotate-0'}`} />
                    </button>
                )}
            </div>

            {/* --- Navigation Links --- */}
            <nav className="flex-grow mt-4 px-2 space-y-2">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            end={!item.isActiveOverride}
                            className={({ isActive }) =>
                                `flex items-center p-3 text-sm font-semibold rounded-lg transition-colors group
                                ${isOpen ? '' : 'justify-center'}
                                ${item.isActiveOverride || isActive
                                    ? "bg-blue-600 text-white shadow-lg"
                                    : "text-gray-400 hover:bg-gray-700 hover:text-white"
                                }`
                            }
                            title={isOpen ? '' : item.name} // Show tooltip when collapsed
                        >
                            <Icon className="w-6 h-6 flex-shrink-0" aria-hidden="true" />
                            <span
                                className={`whitespace-nowrap transition-all duration-300 ease-in-out
                                           ${!isOpen ? 'w-0 opacity-0 ml-0' : 'w-auto opacity-100 ml-4'}`}
                                aria-hidden={!isOpen}
                            >
                                {item.name}
                            </span>
                        </NavLink>
                    );
                })}
            </nav>
        </div>
    );

    // --- RENDER LOGIC: Decide how to display the sidebar ---
    if (isMobile) {
        return (
            <>
                <div
                    className={`fixed inset-0 bg-black bg-opacity-60 z-30 transition-opacity lg:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                    onClick={() => setIsOpen(false)}
                    aria-hidden="true"
                />
                <aside className={`fixed inset-y-0 left-0 w-64 z-40 transform transition-transform duration-300 ease-in-out lg:hidden ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                   {SidebarContent}
                </aside>
            </>
        );
    }

    // For Desktop, render a panel that changes width
    return (
         <aside className={`relative flex-shrink-0 transition-all duration-300 ease-in-out ${isOpen ? 'w-64' : 'w-20'}`}>
            {SidebarContent}
         </aside>
    );
};

export default Sidebar;
