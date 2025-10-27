import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../../Features/Dashboard/components/Sidebar/Sidebar';
import DynamicTopBar from '@/Features/Dashboard/components/TopBar/DynamicTopBar';

const DashboardLayout: React.FC = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [isDesktopSidebarCollapsed, setIsDesktopSidebarCollapsed] = useState(false);
   const location = useLocation();

      //hiding side bar
    const shouldHideSidebar = location.pathname === '/dashboard/events';
  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
        {/* MOBILE Sidebar */}
              {!shouldHideSidebar && (
                    <div className="lg:hidden">
                        <Sidebar
                          isMobile={true}
                          isOpen={mobileNavOpen}
                          setIsOpen={setMobileNavOpen}
                        />
                    </div>
              )}

            {/* DESKTOP Sidebar */}
                {!shouldHideSidebar &&
                      <div className="hidden lg:flex">
                          <Sidebar
                            isMobile={false}
                            isOpen={!isDesktopSidebarCollapsed}
                            setIsOpen={() =>
                              setIsDesktopSidebarCollapsed(!isDesktopSidebarCollapsed)
                            }
                          />
                      </div>
                }

      {/* MAIN CONTENT */}
      <div className={`flex-1 flex flex-col overflow-hidden ${shouldHideSidebar ? 'w-full' : ''}`}>

        <DynamicTopBar onMenuClick={() => setMobileNavOpen(true)} />

        <main className={`flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6 md:p-8 ${shouldHideSidebar ? 'p-0' : 'p-4 sm:p-6 md:p-8'}`}>
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
