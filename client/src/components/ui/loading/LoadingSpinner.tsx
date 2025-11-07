import React, { useState, useEffect } from 'react';
import SpinnerIcon from './SpinnerIcon';
import LoadingText from './LoadingText';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  text?: string;
  subText?: string;
  fullScreen?: boolean;
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  text = 'Loading...',
  subText,
  fullScreen = false,
  className = '',
}) => {
  const [delayed, setDelayed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setDelayed(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  const content = (
    <div className={`flex flex-col items-center justify-center p-4 ${className}`}>
      <SpinnerIcon size={size} />
      <LoadingText
        text={text}
        subText={delayed ? subText || 'Please be patient, this might take a few seconds...' : subText}
        size={size}
      />
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/90 backdrop-blur-sm z-50">
        {content}
      </div>
    );
  }

  return content;
};

export default LoadingSpinner;
