import React from 'react';
import { ChartContainerProps } from './types';

const ChartContainer: React.FC<ChartContainerProps> = ({
  title,
  subtitle,
  children,
  className = ''
}) => {
  return (
    <div className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-100 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        {subtitle && (
          <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            {subtitle}
          </span>
        )}
      </div>
      {children}
    </div>
  );
};

export default ChartContainer;
