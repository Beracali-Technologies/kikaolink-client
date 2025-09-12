import React from 'react';

interface EventStatusBadgeProps {
  status: string;
  isLive: boolean;
}

const EventStatusBadge: React.FC<EventStatusBadgeProps> = ({ status, isLive }) => {
  const getStatusConfig = () => {
    if (isLive) return { text: 'Live', color: 'bg-green-100 text-green-800' };
    if (status === 'DRAFT') return { text: 'Draft Mode', color: 'bg-yellow-100 text-yellow-800' };
    if (status === 'PUBLISHED') return { text: 'Published', color: 'bg-blue-100 text-blue-800' };
    return { text: 'Inactive', color: 'bg-gray-100 text-gray-800' };
  };

  const config = getStatusConfig();

  return (
    <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${config.color}`}>
      {config.text}
    </span>
  );
};

export default EventStatusBadge;
