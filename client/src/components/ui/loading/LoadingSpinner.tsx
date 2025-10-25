import React from 'react';

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
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-32 h-32'
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-xl',
    xl: 'text-2xl'
  };

  const content = (
    <div className={`flex flex-col items-center justify-center p-8 ${className}`}>
      {/* Fan Spinner */}
      <div className={`${sizeClasses[size]} relative mb-4`}>
        <div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-transparent border-t-blue-600 rounded-full animate-spin"></div>
        <div className="absolute inset-2 border-4 border-gray-300 rounded-full opacity-50"></div>
        <div
          className="absolute inset-4 border-4 border-transparent border-b-blue-500 rounded-full animate-spin"
          style={{ animationDelay: '0.1s' }}
        ></div>
      </div>

      {/* Text Content */}
      {(text || subText) && (
        <div className="text-center">
          {text && (
            <p className={`font-semibold text-gray-700 ${textSizes[size]} mb-2`}>
              {text}
            </p>
          )}
          {subText && (
            <p className="text-gray-500 text-sm max-w-sm">
              {subText}
            </p>
          )}
        </div>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        {content}
      </div>
    );
  }

  return content;
};

export default LoadingSpinner;
