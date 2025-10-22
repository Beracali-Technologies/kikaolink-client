import React, { useState } from 'react';
import { Outlet, useParams, useLocation, useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiMail, FiSend, FiMessageSquare } from 'react-icons/fi';
import { SideBarGroup } from './components/SideBarGroup';
import { SideBarLink } from './components/SideBarLink';

const CommunicationsLayout: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useState(true);

  // Sidebar navigation
  const commNavigation = [
    {
      title: 'COMMUNICATIONS',
      icon: FiMessageSquare,
      links: [
        {
          name: 'Send SMS',
          to: `/dashboard/events/${eventId}/communications/sms`,
          icon: FiSend,
        },
        {
          name: 'Send Email',
          to: `/dashboard/events/${eventId}/communications/email`,
          icon: FiMail,
        },
      ],
    },
  ];

  if (!eventId) {
    return (
      <div className="w-full h-full flex items-center justify-center text-red-600 font-medium">
        Event ID is missing
      </div>
    );
  }

  return (
    <div className="relative w-full h-full flex">
      {/* Sidebar */}
      <aside
        className={`transition-all duration-300 flex-shrink-0 bg-white border-r border-gray-200 shadow-sm ${
          isNavOpen ? 'w-72' : 'w-0'
        }`}
      >
        <div
          className={`overflow-hidden h-full flex flex-col transition-opacity ${
            isNavOpen ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Header */}
          <div className="px-6 py-5 flex items-center justify-between border-b border-gray-100 bg-gray-50">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Communications</h2>
              <p className="text-sm text-gray-500 mt-1">Manage SMS & Emails</p>
            </div>
            <button
              onClick={() => setIsNavOpen(false)}
              className="p-1.5 rounded-md hover:bg-gray-200 text-gray-500 lg:hidden"
            >
              <FiX className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-grow px-4 py-6 space-y-8 overflow-y-auto">
            {commNavigation.map((group) => (
              <SideBarGroup key={group.title} title={group.title} icon={group.icon}>
                {group.links.map((link) => (
                  <SideBarLink key={link.name} to={link.to} icon={link.icon}>
                    {link.name}
                  </SideBarLink>
                ))}
              </SideBarGroup>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-y-auto bg-gray-50">
        {/* Top Bar */}
        <div className="flex-shrink-0 h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={() => setIsNavOpen(!isNavOpen)}
              className="p-2.5 rounded-lg hover:bg-gray-100 mr-4"
            >
              <FiMenu className="h-5 w-5 text-gray-600" />
            </button>
            <h1 className="text-lg font-semibold text-gray-800">Communications Center</h1>
          </div>
        </div>

        {/* Content */}
        <div className="flex-grow p-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default CommunicationsLayout;
