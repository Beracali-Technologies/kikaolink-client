import React from 'react';
import TopBarWrapper from './components/TopBarWrapper';
import TopBarLeft from './components/TopBarLeft';
import TopBarRight from './components/TopBarRight';

interface TopBarProps {
  onMenuClick: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ onMenuClick }) => {
  return (
    <TopBarWrapper>
      <TopBarLeft onMenuClick={onMenuClick} />
      <TopBarRight />
    </TopBarWrapper>
  );
};

export default TopBar;
