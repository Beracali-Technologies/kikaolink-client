import React from 'react';
import ChartContainer from './ChartContainer';
import { SMSActivityProps } from './types';

const SMSActivity: React.FC<SMSActivityProps> = ({ data }) => {
  const hasData = Object.keys(data).length > 0;

  if (!hasData) {
    return (
      <ChartContainer title="SMS Activity" subtitle="Message Distribution">
        <div className="h-32 flex flex-col items-center justify-center text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
          <div className="text-2xl mb-2">📱</div>
          <p className="text-sm">No SMS activity data available</p>
        </div>
      </ChartContainer>
    );
  }

  return (
    <ChartContainer title="SMS Activity" subtitle="Message Distribution">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {Object.entries(data).map(([timing, count]) => (
          <div key={timing} className="text-center p-6 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl border border-indigo-100 hover:shadow-md transition-shadow">
            <div className="text-3xl font-bold text-indigo-600">{count}</div>
            <div className="text-sm font-medium text-indigo-700 capitalize mt-2">
              {timing.replace(/_/g, ' ')}
            </div>
            <div className="text-xs text-indigo-500 mt-1">SMS Sent</div>
          </div>
        ))}
      </div>
    </ChartContainer>
  );
};

export default SMSActivity;
