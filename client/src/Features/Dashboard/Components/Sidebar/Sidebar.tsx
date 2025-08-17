import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

type IconProps = { className?: string };

// --- HIGH-QUALITY, RELIABLE SVG ICONS ---
const EventIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
);

// Correctly defined SettingsIcon
const SettingsIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.242 1.451l-1.043.862c-.29.24-.435.608-.435.986v.642c0 .378.145.747.435.986l1.043.862a1.125 1.125 0 01.242 1.451l-1.296 2.247a1.125 1.125 0 01-1.37.49l-1.217-.456c-.355-.133-.75-.072-1.075.124a6.37 6.37 0 01-.22.127c-.331.183-.581.495-.644.87l-.213 1.281c-.09.543-.56.94-1.11.94h-2.593c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.063-.374-.313-.686-.645-.87a6.37 6.37 0 01-.22-.127c-.324-.196-.72-.257-1.075-.124l-1.217.456a1.125 1.125 0 01-1.37-.49l-1.296-2.247a1.125 1.125 0 01.242-1.451l1.043-.862c.29-.24.435-.608.435-.986v-.642c0-.378-.145-.747-.435-.986l-1.043-.862a1.125 1.125 0 01-.242-1.451l1.296-2.247a1.125 1.125 0 011.37-.49l1.217.456c.355.133.75.072 1.075-.124a6.37 6.37 0 01.22-.127c.331-.183.581-.495-.644-.87l.213-1.281z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const ChevronLeftIcon: React.FC<IconProps> = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>;

const Sidebar: React.FC = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const location = useLocation();

   // Check if the current path is ANY settings page
   const isSettingsActive = location.pathname.startsWith('/dashboard/settings');

    const menuItems = [
        { name: 'Events', path: '/dashboard/events', icon: EventIcon },
        { name: 'Settings', path: '/dashboard/settings', icon: SettingsIcon, isActive: isSettingsActive },
    ];

    return (
        <div className={`relative bg-dark-text text-white flex flex-col transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
            <div className="p-4 flex items-center justify-between border-b border-gray-700 h-16">
                <span className={`font-bold text-xl whitespace-nowrap transition-opacity duration-200 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>
                    <span className="text-blue-400">Kikao</span>
                    <span className="text-white">Link</span>
                </span>
                <button onClick={() => setIsCollapsed(!isCollapsed)} className="p-2 rounded-full hover:bg-gray-700 focus:outline-none">
                    <ChevronLeftIcon className={`w-6 h-6 transform transition-transform duration-300 ${isCollapsed ? 'rotate-180' : 'rotate-0'}`} />
                </button>
            </div>

            <nav className="flex-grow mt-4">
                {menuItems.map(({ name, path, icon: Icon }) => (
                    <NavLink
                        key={name}
                        to={path}
                        // Use end={true} for the "Events" link to avoid it matching child routes like /events/create
                        end={path === '/dashboard/events'}
                        className={({ isActive }) =>
                            `flex items-center gap-4 py-3 px-6 text-sm font-medium transition-colors ${isCollapsed ? 'justify-center' : ''}
                            ${isActive ? "bg-primary-blue text-white" : "text-gray-400 hover:bg-gray-700 hover:text-white"}`
                        }
                    >
                        <Icon className="w-6 h-6 flex-shrink-0" />
                        <span className={`${isCollapsed ? 'hidden' : 'block'}`}>{name}</span>
                    </NavLink>
                ))}
            </nav>
        </div>
    );
}

export default Sidebar;
