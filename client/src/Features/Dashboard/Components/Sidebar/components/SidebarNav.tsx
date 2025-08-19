import React from 'react';
import { NavLink } from 'react-router-dom';

interface MenuItem {
    name: string;
    path: string;
    icon: React.FC<{ className?: string }>;
    isActiveOverride?: boolean;
}

interface SidebarNavProps {
    isCollapsed: boolean;
    menuItems: MenuItem[];
}

const SidebarNav: React.FC<SidebarNavProps> = ({ isCollapsed, menuItems }) => {
    return (
        <nav className="flex-grow mt-4 px-2 space-y-2">
            {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        end={!item.isActiveOverride}
                        title={isCollapsed ? item.name : ''}
                        className={({ isActive }) =>
                            `flex items-center p-3 text-sm font-semibold rounded-lg group transition-colors
                            ${isCollapsed ? 'justify-center' : ''}
                            ${item.isActiveOverride || isActive
                                ? "bg-blue-600 text-white shadow-lg"
                                : "text-gray-400 hover:bg-gray-700 hover:text-white"
                            }`
                        }
                    >
                        <Icon className="w-6 h-6 flex-shrink-0" />
                        <span
                            className={`whitespace-nowrap ml-4 transition-all duration-300 ${isCollapsed ? 'w-0 opacity-0 ml-0' : 'w-auto opacity-100'}`}
                            aria-hidden={isCollapsed}
                        >
                            {item.name}
                        </span>
                    </NavLink>
                );
            })}
        </nav>
    );
};

export default SidebarNav;
