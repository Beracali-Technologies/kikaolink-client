import React from 'react';
import ChartContainer from './ChartContainer';
import { RevenueChartProps } from './types';

const RevenueChart: React.FC<RevenueChartProps> = ({ data }) => {
  const hasData = data.length > 0;
  const recentData = data.slice(-7);
  const maxRevenue = Math.max(...recentData.map(item => item.revenue), 1);

  if (!hasData) {
    return (
      <ChartContainer title="Revenue Trend" subtitle="Last 7 days">
        <div className="h-64 flex flex-col items-center justify-center text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
          <div className="text-4xl mb-4">📊</div>
          <p className="text-lg font-medium">No revenue data available</p>
          <p className="text-sm mt-2">Revenue data will appear here when available</p>
        </div>
      </ChartContainer>
    );
  }

  return (
    <ChartContainer title="Revenue Trend" subtitle="Last 7 days">
      <div className="h-80">
        {/* Y-axis labels */}
        <div className="flex h-64">
          <div className="flex flex-col justify-between mr-4 text-xs text-gray-500 w-12">
            {[100, 75, 50, 25, 0].map((percent) => (
              <div key={percent} className="text-right">
                ${Math.round((maxRevenue * percent) / 100).toLocaleString()}
              </div>
            ))}
          </div>

          {/* Chart area */}
          <div className="flex-1 relative">
            {/* Grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="border-t border-gray-200"></div>
              ))}
            </div>

            {/* Bars */}
            <div className="flex items-end justify-between h-48 gap-3 mt-4">
              {recentData.map((item, index) => {
                const heightPercent = (item.revenue / maxRevenue) * 100;
                return (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div
                      className="bg-gradient-to-t from-green-500 to-green-600 rounded-t w-full max-w-16 transition-all duration-300 hover:from-green-600 hover:to-green-700 relative group"
                      style={{
                        height: `${Math.max(8, heightPercent)}%`,
                        minHeight: '20px'
                      }}
                    >
                      {/* Tooltip */}
                      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                        ${item.revenue.toLocaleString()}
                        <br />
                        {item.tickets_sold} tickets
                      </div>
                    </div>

                    {/* X-axis labels */}
                    <div className="text-xs text-gray-500 mt-3 text-center">
                      {new Date(item.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                      })}
                    </div>
                    <div className="text-xs font-semibold text-gray-700 mt-1">
                      ${(item.revenue / 1000).toFixed(0)}K
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-6 mt-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gradient-to-t from-green-500 to-green-600 rounded"></div>
            <span className="text-gray-600">Revenue</span>
          </div>
        </div>
      </div>
    </ChartContainer>
  );
};

export default RevenueChart;
