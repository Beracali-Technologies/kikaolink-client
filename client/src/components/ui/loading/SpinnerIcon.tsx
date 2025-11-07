import React from 'react';

interface SpinnerIconProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const SpinnerIcon: React.FC<SpinnerIconProps> = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-5 h-5 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
    xl: 'w-16 h-16 border-4',
  };

  return (
    <div
      className={`${sizeClasses[size]} border-gray-200 border-t-blue-500 rounded-full animate-spin`}
    />
  );
};

export default SpinnerIcon;
