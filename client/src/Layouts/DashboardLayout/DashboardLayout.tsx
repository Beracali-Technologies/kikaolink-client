import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../Features/Dashboard/components/Sidebar/Sidebar';
import Header from '../../Features/Dashboard/components/Header/Header';

const DashboardLayout: React.FC = () => {
    // State for the mobile menu (slide-out overlay)
    const [mobileNavOpen, setMobileNavOpen] = useState(false);
    // State for the desktop sidebar (collapsing from wide to icon-only)
    const [isDesktopSidebarCollapsed, setIsDesktopSidebarCollapsed] = useState(false);

    return (
        <div className="flex h-screen bg-gray-100 overflow-hidden">

            {/* --- MOBILE Sidebar (rendered as a slide-over) --- */}
            {/* It uses and controls the 'mobileNavOpen' state */}
            <div className="lg:hidden">
                <Sidebar
                    isMobile={true}
                    isOpen={mobileNavOpen}
                    setIsOpen={setMobileNavOpen}
                />
            </div>

            {/* --- DESKTOP Sidebar (rendered as a collapsible panel) --- */}
            {/* It uses and controls the 'isDesktopSidebarCollapsed' state */}
            <div className="hidden lg:flex">
                <Sidebar
                    isMobile={false}
                    isOpen={!isDesktopSidebarCollapsed}
                    setIsOpen={() => setIsDesktopSidebarCollapsed(!isDesktopSidebarCollapsed)}
                />
            </div>

            {/* --- Main Content Area --- */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header onMenuClick={() => setMobileNavOpen(true)} />
                    <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6 md:p-8">
                            <div className="max-w-7xl mx-auto">
                                 <Outlet />
                            </div>
                    </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
