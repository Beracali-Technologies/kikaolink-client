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
  return (
    <NavLink
      to={disabled ? '#' : to}
      end={end}
      className={({ isActive }) =>
        `flex items-center px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200
        ${isActive
          ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-600 shadow-sm'
          : 'text-gray-700 hover:bg-gray-50 border-l-4 border-transparent'
        }
        ${disabled
          ? 'text-gray-400 cursor-not-allowed hover:bg-transparent'
          : 'hover:text-blue-600'
        }`
      }
    >
      <Icon className={`h-5 w-5 mr-3 ${disabled ? 'text-gray-400' : 'text-gray-500'}`} />
      {children}
      {disabled && (
        <span className="ml-auto px-2 py-1 text-xs bg-gray-100 text-gray-500 rounded-md">
          Soon
        </span>
      )}
      {!disabled && (
        <div className="ml-auto w-2 h-2 rounded-full bg-blue-600"></div>
      )}
    </NavLink>
  );
};
