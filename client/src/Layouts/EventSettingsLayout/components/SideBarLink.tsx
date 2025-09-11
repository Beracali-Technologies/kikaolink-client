// src/Layouts/EventSettingsLayout/components/SidebarLink.tsx
import React from 'react';
import { NavLink } from 'react-router-dom';

interface SidebarLinkProps {
  to: string;
  icon: React.ComponentType<{ className?: string }>;
  disabled?: boolean;
  children: React.ReactNode;
  end?: boolean;
}

export const SidebarLink: React.FC<SidebarLinkProps> = ({
  to,
  icon: Icon,
  disabled = false,
  children,
  end = false
}) => {
  if (disabled) {
    return (
      <div className="flex items-center px-3 py-3 rounded-lg text-sm font-medium text-gray-400 cursor-not-allowed">
        <Icon className="h-5 w-5 mr-3 text-gray-400" />
        <span className="flex-1">{children}</span>
        <span className="ml-2 px-2 py-1 text-xs bg-gray-100 text-gray-500 rounded-md">
          Soon
        </span>
      </div>
    );
  }

  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `flex items-center px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200
        ${isActive
          ? 'bg-blue-50 text-blue-700 shadow-sm'
          : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
        }`
      }
    >
      {({ isActive }) => (
        <>
          <Icon className="h-5 w-5 mr-3 text-gray-500" />
          <span className="flex-1">{children}</span>
          {isActive && (
            <div className="ml-2 w-2 h-2 rounded-full bg-blue-600"></div>
          )}
        </>
      )}
    </NavLink>
  );
};
