
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

  // Check if we're on the main events list page
  const isEventsListPage = location.pathname === '/dashboard/events';

  // Check if we're on any event-specific page (has eventId in URL)
  const isEventSpecificPage = location.pathname.includes('/dashboard/events/') && eventId;

  if (isEventSpecificPage && !isEventsListPage) {
    return <EventTopBar onMenuClick={onMenuClick} />;
  }

  // Default TopBar for events list page and other pages
  return <TopBar onMenuClick={onMenuClick} />;
};

export default DynamicTopBar;
