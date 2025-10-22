import React from 'react';
import { SmsLog } from '../SmsTypes';

interface SmsHistoryLogProps {
    logs: SmsLog[];
    isLoading: boolean;
}

// Tailwind color scheme for status badges
const getStatusBadgeClass = (status: SmsLog['status']) => {
    switch (status) {
        case 'Sent': return 'bg-green-100 text-green-800';
        case 'Failed': return 'bg-red-100 text-red-800';
        case 'Pending':
        case 'Processing':
        default: return 'bg-yellow-100 text-yellow-800';
    }
};

const SmsHistoryLog: React.FC<SmsHistoryLogProps> = ({ logs, isLoading }) => {
    return (
        <div className="bg-white shadow-lg rounded-lg p-6 md:p-8 border border-gray-100">
            <h4 className="text-xl font-bold text-gray-800 mb-6">SMS History & Audit Log</h4>

            {isLoading ? (
                // Loading State
                <div className="flex flex-col items-center justify-center p-12 text-gray-500">
                    <svg className="animate-spin h-6 w-6 text-indigo-500 mb-3" viewBox="0 0 24 24"></svg>
                    <p>Fetching historical records...</p>
                </div>
            ) : (
                // Table View
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Dispatch Time</th>
                                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Context</th>
                                <th className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'>Recipients</th>
                                <th className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'>Status</th>
                                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Message Snippet</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {logs.length > 0 ? (
                                logs.map((log) => (
                                    <tr key={log.id} className="hover:bg-gray-50 transition duration-150">
                                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{new Date(log.created_at).toLocaleString()}</td>
                                        <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>{log.timing_label}</td>
                                        <td className='px-6 py-4 whitespace-nowrap text-sm text-center font-bold text-gray-700'>{log.recipient_count}</td>
                                        <td className='px-6 py-4 whitespace-nowrap text-sm text-center'>
                                            <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(log.status)}`}>
                                                {log.status}
                                            </span>
                                        </td>
                                        <td className='px-6 py-4 text-sm text-gray-500 truncate max-w-xs' title={log.message}>{log.message.substring(0, 50)}{log.message.length > 50 ? '...' : ''}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="text-center text-gray-500 py-10">
                                        <i className="fas fa-journal-x text-2xl mb-2 block"></i>
                                        No bulk SMS campaigns have been dispatched for this event yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default SmsHistoryLog;
