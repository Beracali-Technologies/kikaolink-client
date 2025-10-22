import React from 'react';
import { NavLink } from 'react-router-dom';

interface SideBarLinkProps {
  to: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}

export const SideBarLink: React.FC<SideBarLinkProps> = ({ to, icon: Icon, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
          isActive
            ? 'bg-blue-50 text-blue-700 shadow-sm'
            : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
        }`
      }
    >
      {({ isActive }) => (
        <>
          <Icon className={`h-5 w-5 mr-3 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
          <span className="flex-1">{children}</span>
          {isActive && <div className="ml-2 w-2 h-2 rounded-full bg-blue-600"></div>}
        </>
      )}
    </NavLink>
  );
};
