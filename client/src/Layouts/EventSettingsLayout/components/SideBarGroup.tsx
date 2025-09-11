import React from 'react';

interface SideBarGroupProps {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}

export const SideBarGroup: React.FC<SideBarGroupProps> = ({ title, icon: Icon, children }) => {
  return (
    <div className="space-y-3">
      {/* Group Header - Made bold as requested */}
      <div className="flex items-center px-3 py-2">
        <Icon className="h-4 w-4 text-gray-700 mr-2 font-bold" />
        <h3 className="text-xs font-bold uppercase text-gray-700 tracking-wider">
          {title}
        </h3>
      </div>

      {/* Group Links */}
      <div className="space-y-1">
        {children}
      </div>
    </div>
  );
};
