import React from 'react';

interface LoadingTextProps {
  text?: string;
  subText?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const LoadingText: React.FC<LoadingTextProps> = ({
  text = 'Loading...',
  subText,
  size = 'md',
}) => {
  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
  };

  return (
    <div className="text-center mt-3">
      <p className={`font-medium text-gray-700 ${textSizes[size]}`}>{text}</p>
      {subText && <p className="text-gray-500 text-sm mt-1">{subText}</p>}
    </div>
  );
};

export default LoadingText;
