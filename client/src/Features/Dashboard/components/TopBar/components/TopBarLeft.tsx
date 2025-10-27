import React from 'react';
import Logo from '@/components/ui/Logo/Logo';
import MobileNavBar from '../../MobileNavBar/MobileNavBar';

interface TopBarLeftProps {
  onMenuClick: () => void;
}

const TopBarLeft: React.FC<TopBarLeftProps> = ({ onMenuClick }) => (
  <div className="flex items-center space-x-4">
    {/* Mobile Menu */}
    <div className="lg:hidden">
      <MobileNavBar onMenuClick={onMenuClick} />
    </div>

    {/* Logo */}
    <Logo size="lg" />
  </div>
);

export default TopBarLeft;
