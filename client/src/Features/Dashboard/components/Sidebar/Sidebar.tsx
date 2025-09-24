import React from 'react';
import { useLocation, useParams } from 'react-router-dom';

// Importing Icons
import { FiGrid, FiSettings, FiCheckSquare, FiLayout } from 'react-icons/fi';

// Import the new Subcomponents
import SidebarHeader from './components/SidebarHeader';
import SidebarNav from './components/SidebarNav';
import SidebarUserMenu from './components/SidebarUserMenu';

interface SidebarProps {
    isMobile: boolean;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isMobile, isOpen, setIsOpen }) => {
    const location = useLocation();

  const { eventId } = useParams<{ eventId: string }>();


    const menuItems = [
        {
            name: 'Dashboard',
            path: '/dashboard', // The new Dashboard link
            icon: FiLayout,
            // isActive is true only if the path is an EXACT match
            isActive: location.pathname === '/dashboard'
        },
        {
            name: 'Events',
            path: '/dashboard/events',
            icon: FiGrid,
            // Active for event list page but not the individual event settings
            isActive: location.pathname === '/dashboard/events' ||
                       (location.pathname.startsWith('/dashboard/events') && !eventId)
        },
        {
            name: 'Check-in',
            path: '/dashboard/checkin', // The new Check-in link
            icon: FiCheckSquare,
            isActive: location.pathname.startsWith('/dashboard/checkin')
        },
        {
            name: 'Settings',
                  //using eventId if available otherwise to event list page
            path: eventId ? `/dashboard/events/${eventId}/info` : `/dashboard/events`,
            icon: FiSettings,
              //Active settings on any events page
            isActive: !!eventId && location.pathname.startsWith(`/dashboard/events/${eventId}/`)
        },
    ];

    // --- Presentation Layer (The UI that will be rendered) ---
    const SidebarContent = (
        <div className="flex flex-col h-full bg-[#1e293b] text-gray-200">
            <SidebarHeader
                isOpen={isOpen}
                isMobile={isMobile}
                onToggle={() => setIsOpen(!isOpen)}
            />
            <SidebarNav
                isCollapsed={!isOpen}
                menuItems={menuItems}
            />
            <SidebarUserMenu
                isOpen={isOpen}
            />
        </div>
    );

    // --- Rendering Logic ---
    // Decide HOW to render the content based on context (mobile vs. desktop).
    if (isMobile) {
        return (
            <>
                <div
                    className={`fixed inset-0 bg-black bg-opacity-60 z-30 transition-opacity lg:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                    onClick={() => setIsOpen(false)}
                />
                <aside className={`fixed inset-y-0 left-0 w-64 z-40 transform transition-transform duration-300 lg:hidden ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                   {SidebarContent}
                </aside>
            </>
        );
    }

    return (
         <aside className={`relative flex-shrink-0 transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'}`}>
            {SidebarContent}
         </aside>
    );
};

export default Sidebar;
