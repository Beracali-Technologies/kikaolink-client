import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { FiMenu, FiChevronLeft } from 'react-icons/fi';
import { useParams } from 'react-router-dom';

// Define the navigation structure here for easy management
const settingsNavigation = [
    {
        title: 'Event Setup',
        links: [
            { name: 'Event Information', to: 'edit-event-info' }, // Use relative paths
            { name: 'Registration Form', to: 'registration-form-editor' },
            { name: 'Confirmation Email', to: '#', disabled: true },
        ],
    },
    {
        title: 'Badge Printing',
        links: [{ name: 'Badge Designer', to: '#', disabled: true }],
    },
    {
        title: 'Check-in',
        links: [
            { name: 'Multi-Session', to: '#', disabled: true },
            { name: 'App Login QR', to: '#', disabled: true }
        ],
    },
];

const EventSettingsLayout: React.FC = () => {
    // State to manage the secondary sidebar's visibility
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    const { eventId } = useParams<{ eventId: string }>();

    // If for some reason there's no eventId, you can show a loading state or an error
    if (!eventId) {
        return <div>Loading event details or event not found...</div>;
    }


    return (
        <div className="p-4 md:p-8 h-full flex items-stretch">
            <div className="relative w-full h-full flex">

                {/* --- Collapsible Secondary Sidebar --- */}
                <aside
                    className={`
                        flex flex-col flex-shrink-0 bg-white border border-gray-200 rounded-l-xl
                        transition-all duration-300 ease-in-out
                        ${isSidebarOpen ? 'w-64' : 'w-0'}
                    `}
                >
                    <div className={`
                        overflow-hidden h-full flex flex-col p-6
                        ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}
                        transition-opacity duration-200
                    `}>
                        <h2 className="text-xl font-bold text-gray-800">Setting</h2>
                        <nav className="mt-6 space-y-6 flex-grow">
                            {settingsNavigation.map(group => (
                                <div key={group.title}>
                                    <h3 className="px-3 text-xs font-bold uppercase text-slate-500 tracking-wider">
                                        {group.title}
                                    </h3>
                                    <div className="mt-2 space-y-1">
                                        {group.links.map(link => (
                                            <NavLink
                                                key={link.name}
                                                to={link.to} // Relative paths now work because of the router setup
                                                end // Important for index routes to be styled correctly
                                                className={({ isActive }) =>
                                                    `block rounded-md px-3 py-2 text-sm transition-colors
                                                     ${isActive ? 'font-bold bg-blue-100 text-blue-700' : ''}
                                                     ${!isActive && !link.disabled ? 'text-gray-700 hover:bg-gray-100' : ''}
                                                     ${link.disabled ? 'text-gray-400 cursor-not-allowed' : ''}`
                                                }
                                            >
                                                {link.name}
                                            </NavLink>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </nav>
                    </div>
                </aside>

                 {/* --- The Collapse Button --- */}
                <div className="relative">
                    <button
                        onClick={() => setSidebarOpen(!isSidebarOpen)}
                        className={`
                            absolute top-6 -left-3.5 z-20
                            flex items-center justify-center h-7 w-7
                            bg-white border-2 border-gray-300 rounded-full
                            hover:bg-gray-100 text-gray-600
                        `}
                    >
                         {isSidebarOpen ? <FiChevronLeft /> : <FiMenu />}
                    </button>
                </div>


                {/* --- Main Content Area --- */}
                <main className={`
                    flex-1 overflow-y-auto bg-white p-6 md:p-8
                    border-t border-b border-r border-gray-200
                    rounded-r-xl transition-all duration-300
                    ${isSidebarOpen ? '' : '-ml-px rounded-l-xl' /* Fix border radius on collapse */}
                `}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default EventSettingsLayout;
