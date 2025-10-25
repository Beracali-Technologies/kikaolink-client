import React from 'react';
import { useNavigate } from 'react-router-dom';
import AccountMenu from '@/components/ui/AccountMenu/AccountMenu';

const TopBarRight: React.FC = () => {
  const navigate = useNavigate();

  const handleMyEvents = () => navigate('/dashboard/events');

  return (
    <div className="flex items-center space-x-4 sm:space-x-6">
      {/* My Events Button */}
      <button
        onClick={handleMyEvents}
        className="text-white hover:text-gray-200 font-medium text-xs sm:text-sm transition-colors duration-200 px-3 sm:px-4 py-2 rounded-lg hover:bg-white/10"
      >
        My Events
      </button>

      {/* Account Menu */}
      <AccountMenu />
    </div>
  );
};

export default TopBarRight;
