import React from 'react';

interface TopBarWrapperProps {
  children: React.ReactNode;
}

const TopBarWrapper: React.FC<TopBarWrapperProps> = ({ children }) => (
  <header className="w-full bg-[#0E2344] border-b border-gray-700 px-4 sm:px-6 py-3 sm:py-4">
    <div className="flex items-center justify-between max-w-7xl mx-auto">
      {children}
    </div>
  </header>
);

export default TopBarWrapper;
