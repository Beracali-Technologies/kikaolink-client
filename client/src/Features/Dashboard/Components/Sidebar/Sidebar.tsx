import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

// Placeholder Icons - replace with your own SVG components
const EventIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>;
const FormIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>;
const ChevronLeftIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>;

const Sidebar: React.FC = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const menuItems = [
        { name: 'My Events', path: '/dashboard/events', icon: <EventIcon /> },
        { name: 'Registration Form', path: '/dashboard/form-editor', icon: <FormIcon /> },
    ];

    return (
        <div className={`relative bg-dark-text text-white flex flex-col transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
            <div className="p-4 flex items-center justify-between border-b border-gray-700">
                <span className={`font-bold text-xl whitespace-nowrap transition-opacity duration-200 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>
                    <span className="text-blue-400">Kikao</span>
                    <span className="text-white">Connect</span>
                </span>
                <button onClick={() => setIsCollapsed(!isCollapsed)} className="p-2 rounded-full hover:bg-gray-700 focus:outline-none">
                    <ChevronLeftIcon className={`transform transition-transform duration-300 ${isCollapsed ? 'rotate-180' : 'rotate-0'}`} />
                </button>
            </div>
            <nav className="flex-grow mt-4">
                {menuItems.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center gap-4 py-3 px-6 text-sm font-medium transition-colors ${isCollapsed ? 'justify-center' : ''} ${
                                isActive
                                ? "bg-primary-blue text-white"
                                : "text-gray-400 hover:bg-gray-700 hover:text-white"
                            }`
                        }
                    >
                        {item.icon}
                        <span className={`${isCollapsed ? 'hidden' : 'block'}`}>{item.name}</span>
                    </NavLink>
                ))}
            </nav>
        </div>
    );
}

export default Sidebar;
