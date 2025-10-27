import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import TopBar from './TopBar';
import EventTopBar from './components/EventTopBar';

interface DynamicTopBarProps {
  onMenuClick: () => void;
}

const DynamicTopBar: React.FC<DynamicTopBarProps> = ({ onMenuClick }) => {
  const location = useLocation();
  const { eventId } = useParams<{ eventId: string }>();


  //const isEventsListPage = location.pathname === '/dashboard/events' && !eventId;


  const showEventTopBar =
    location.pathname === '/dashboard/home' ||
    (location.pathname.includes('/dashboard/events/') && eventId);

  if (showEventTopBar) {
    return <EventTopBar onMenuClick={onMenuClick} />;
  }

  // Show regular TopBar only on the main events list page
  // /dashboard/events (without any eventId)
  return <TopBar onMenuClick={onMenuClick} />;
};

export default DynamicTopBar;
