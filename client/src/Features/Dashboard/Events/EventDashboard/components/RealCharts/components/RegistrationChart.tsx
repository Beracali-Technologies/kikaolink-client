import React from 'react';
import ChartContainer from './ChartContainer';
import { RegistrationChartProps } from './types';

const RegistrationChart: React.FC<RegistrationChartProps> = ({ data }) => {
  const hasData = data.length > 0;
  const recentData = data.slice(-7);
  const maxRegistrations = Math.max(...recentData.map(item => Math.max(item.registrations, item.checkins)), 1);

  if (!hasData) {
    return (
      <ChartContainer title="Registration Trend" subtitle="Last 7 days">
        <div className="h-64 flex flex-col items-center justify-center text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
          <div className="text-4xl mb-4">👥</div>
          <p className="text-lg font-medium">No registration data available</p>
          <p className="text-sm mt-2">Registration data will appear here when available</p>
        </div>
      </ChartContainer>
    );
  }

  return (
    <ChartContainer title="Registration Trend" subtitle="Last 7 days">
      <div className="h-80">
        {/* Y-axis labels */}
        <div className="flex h-64">
          <div className="flex flex-col justify-between mr-4 text-xs text-gray-500 w-12">
            {[100, 75, 50, 25, 0].map((percent) => (
              <div key={percent} className="text-right">
                {Math.round((maxRegistrations * percent) / 100)}
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
                const regHeight = (item.registrations / maxRegistrations) * 100;
                const checkinHeight = (item.checkins / maxRegistrations) * 100;

                return (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div className="flex gap-2 h-full items-end w-full justify-center">
                      {/* Registrations Bar */}
                      <div className="flex flex-col items-center">
                        <div
                          className="bg-gradient-to-t from-blue-500 to-blue-600 rounded-t w-8 transition-all duration-300 hover:from-blue-600 hover:to-blue-700 relative group"
                          style={{
                            height: `${Math.max(8, regHeight)}%`,
                            minHeight: '20px'
                          }}
                        >
                          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                            {item.registrations} registrations
                          </div>
                        </div>
                      </div>

                      {/* Check-ins Bar */}
                      <div className="flex flex-col items-center">
                        <div
                          className="bg-gradient-to-t from-purple-500 to-purple-600 rounded-t w-8 transition-all duration-300 hover:from-purple-600 hover:to-purple-700 relative group"
                          style={{
                            height: `${Math.max(8, checkinHeight)}%`,
                            minHeight: '20px'
                          }}
                        >
                          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                            {item.checkins} check-ins
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* X-axis labels */}
                    <div className="text-xs text-gray-500 mt-3 text-center">
                      {new Date(item.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                      })}
                    </div>
                    <div className="text-xs font-semibold text-gray-700 mt-1 text-center">
                      <div>R: {item.registrations}</div>
                      <div>C: {item.checkins}</div>
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
            <div className="w-4 h-4 bg-gradient-to-t from-blue-500 to-blue-600 rounded"></div>
            <span className="text-gray-600">Registrations</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gradient-to-t from-purple-500 to-purple-600 rounded"></div>
            <span className="text-gray-600">Check-ins</span>
          </div>
        </div>
      </div>
    </ChartContainer>
  );
};

export default RegistrationChart;
