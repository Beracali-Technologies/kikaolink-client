import React from 'react';

interface RevenueTrendChartProps {
    hasData: boolean;
}

const RevenueTrendChart: React.FC<RevenueTrendChartProps> = ({ hasData }) => {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-medium text-gray-900">Revenue Trend</h3>
                <span className="text-sm text-gray-500">
                    {hasData ? 'Last 30 days' : 'Sample preview'}
                </span>
            </div>

            {hasData ? (
                <div className="h-64 flex items-center justify-center">
                    {/* Actual chart would go here */}
                    <div className="text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl text-green-600">📈</span>
                        </div>
                        <p className="text-gray-600">Revenue trend chart will appear here with real data</p>
                    </div>
                </div>
            ) : (
                <div className="h-64 flex flex-col items-center justify-center">
                    {/* Animated Chart Placeholder */}
                    <div className="w-full h-32 mb-4 relative">
                        {/* Grid Background */}
                        <div className="absolute inset-0 opacity-20">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="absolute w-full h-px bg-gray-300 top-0"
                                     style={{ top: `${i * 20}%` }}></div>
                            ))}
                            {[...Array(8)].map((_, i) => (
                                <div key={i} className="absolute h-full w-px bg-gray-300 left-0"
                                     style={{ left: `${i * 14.28}%` }}></div>
                            ))}
                        </div>

                        {/* Animated Line */}
                        <div className="absolute bottom-0 left-0 w-full">
                            <svg width="100%" height="100%" viewBox="0 0 400 120" className="opacity-60">
                                <path
                                    d="M0,100 C50,80 100,120 150,60 C200,0 250,40 300,20 C350,0 400,60 400,60"
                                    stroke="#0E2344"
                                    strokeWidth="3"
                                    fill="none"
                                    strokeDasharray="10,5"
                                >
                                    <animate
                                        attributeName="stroke-dashoffset"
                                        from="100"
                                        to="0"
                                        dur="2s"
                                        repeatCount="indefinite"
                                    />
                                </path>

                                {/* Data Points */}
                                <circle cx="0" cy="100" r="4" fill="#0E2344" opacity="0.6">
                                    <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
                                </circle>
                                <circle cx="150" cy="60" r="4" fill="#FF4444" opacity="0.6">
                                    <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" begin="0.5s" />
                                </circle>
                                <circle cx="300" cy="20" r="4" fill="#3B82F6" opacity="0.6">
                                    <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" begin="1s" />
                                </circle>
                            </svg>
                        </div>
                    </div>

                    <div className="text-center">
                        <h4 className="font-medium text-gray-900 mb-2">Revenue Analytics</h4>
                        <p className="text-sm text-gray-500 max-w-sm">
                            Track your event revenue trends and financial performance over time.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RevenueTrendChart;
