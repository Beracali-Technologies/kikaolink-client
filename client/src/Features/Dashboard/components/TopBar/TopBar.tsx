
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '@/components/ui/Logo/Logo';
import AccountMenu from '@/components/ui/AccountMenu/AccountMenu';
import MobileNavBar from '../MobileNavBar/MobileNavBar';

interface TopBarProps {
  onMenuClick: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ onMenuClick }) => {
  const navigate = useNavigate();

  const handleMyEvents = () => navigate('/dashboard/events');

  return (
    <header className="w-full bg-[#0E2344] border-b border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">

        {/* Left Section */}
        <div className="flex items-center space-x-4">
          {/* Mobile: Menu Button */}
          <div className="lg:hidden">
            <MobileNavBar onMenuClick={onMenuClick} />
          </div>

          {/* Logo */}
          <Logo size="lg" showIcon={false} />
        </div>

        {/* Right Section */}
        <div className="hidden lg:flex items-center space-x-6">
          <button
            onClick={handleMyEvents}
            className="text-white hover:text-gray-200 font-medium text-sm transition-colors duration-200 px-4 py-2 rounded-lg hover:bg-white/10"
          >
            My Events
          </button>

          <AccountMenu />
        </div>
      </div>
    </header>
  );
};

export default TopBar;
