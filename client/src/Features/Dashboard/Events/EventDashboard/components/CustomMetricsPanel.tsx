import React, { useState } from 'react';
import { dashboardService } from '@/services/dashboardService';

interface CustomMetricsPanelProps {
    eventId: number;
    onUpdate: () => void;
}

const CustomMetricsPanel: React.FC<CustomMetricsPanelProps> = ({ eventId, onUpdate }) => {
    const [metrics, setMetrics] = useState<Record<string, any>>({});

    const handleAddMetric = (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const name = (form.elements.namedItem('name') as HTMLInputElement).value;
        const type = (form.elements.namedItem('type') as HTMLSelectElement).value;

        setMetrics(prev => ({ ...prev, [name]: type }));
        dashboardService.updateCustomMetrics(eventId, metrics);
        onUpdate();

        form.reset();
    };

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-medium text-gray-900 mb-4">Custom Metrics</h3>

            <form onSubmit={handleAddMetric} className="space-y-4 mb-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Metric Name
                    </label>
                    <input
                        name="name"
                        placeholder="e.g., VIP Registrations, Workshop Attendance"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0E2344] focus:border-transparent"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Metric Type
                    </label>
                    <select
                        name="type"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0E2344] focus:border-transparent"
                    >
                        <option value="registrations_by_field">Registrations by Field</option>
                        <option value="revenue_by_type">Revenue by Type</option>
                        <option value="attendance_by_session">Attendance by Session</option>
                        <option value="custom_field">Custom Field</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="w-full bg-[#FF4444] text-white py-3 rounded-lg hover:bg-[#ff6666] transition-colors font-medium"
                >
                    Add Custom Metric
                </button>
            </form>

            {Object.keys(metrics).length > 0 && (
                <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Active Metrics</h4>
                    <div className="space-y-2">
                        {Object.entries(metrics).map(([key, value]) => (
                            <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <span className="text-sm text-gray-700">{key}</span>
                                <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded">
                                    {value}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomMetricsPanel;
