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
        const name = (e.target as any).name.value;
        const type = (e.target as any).type.value;
        setMetrics(prev => ({ ...prev, [name]: type }));
        dashboardService.updateCustomMetrics(eventId, metrics);
        onUpdate();
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="font-bold text-lg mb-4">Customize Metrics</h3>
            <form onSubmit={handleAddMetric} className="space-y-2">
                <input name="name" placeholder="Metric Name (e.g., Custom Field)" className="border p-2 rounded w-full" required />
                <select name="type" className="border p-2 rounded w-full">
                    <option value="registrations_by_field">Registrations by Field</option>
                    <option value="revenue_by_type">Revenue by Type</option>
                </select>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add Metric</button>
            </form>
            <div className="mt-4">
                {Object.entries(metrics).map(([key, value]) => (
                    <p key={key} className="text-sm text-gray-600">{key}: {value}</p>
                ))}
            </div>
        </div>
    );
};

export default CustomMetricsPanel;
