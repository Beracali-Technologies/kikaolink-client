import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../Features/Dashboard/components/Sidebar/Sidebar';
import TopBar from '../../Features/Dashboard/components/TopBar/TopBar';
import DynamicTopBar from '@/Features/Dashboard/components/TopBar/DynamicTopBar';

const DashboardLayout: React.FC = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [isDesktopSidebarCollapsed, setIsDesktopSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* MOBILE Sidebar */}
      <div className="lg:hidden">
        <Sidebar
          isMobile={true}
          isOpen={mobileNavOpen}
          setIsOpen={setMobileNavOpen}
        />
      </div>

      {/* DESKTOP Sidebar */}
      <div className="hidden lg:flex">
        <Sidebar
          isMobile={false}
          isOpen={!isDesktopSidebarCollapsed}
          setIsOpen={() =>
            setIsDesktopSidebarCollapsed(!isDesktopSidebarCollapsed)
          }
        />
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col overflow-hidden">

        <DynamicTopBar onMenuClick={() => setMobileNavOpen(true)} />

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
