import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { sendBulkSms, fetchSmsLogs } from '../../../services/eventSmsService';
import SmsSendForm from './components/SmsSendForm';
import SmsHistoryLog from './components/SmsHistoryLog';
import { SmsLog, SMS_TEMPLATES, TimingLabel } from './SmsTypes';

const SmsCommunicationPage: React.FC = () => {
    const { eventId } = useParams<{ eventId: string }>();

    // --- State Management ---
    const [timing, setTiming] = useState<TimingLabel>('Pre-Event');
    const [message, setMessage] = useState(SMS_TEMPLATES[timing]);
    const [isSending, setIsSending] = useState(false);
    const [statusMessage, setStatusMessage] = useState('');
    const [logs, setLogs] = useState<SmsLog[]>([]);
    const [logsLoading, setLogsLoading] = useState(true);

    // --- Data Fetching Logic ---
    const fetchLogs = useCallback(async () => {
        if (!eventId) return;
        setLogsLoading(true);
        try {
            const data = await fetchSmsLogs(eventId);
            setLogs(data);
        } catch (error: any) {
            console.error("Failed to fetch SMS logs:", error);
        } finally {
            setLogsLoading(false);
        }
    }, [eventId]);

    useEffect(() => {
        fetchLogs();
    }, [fetchLogs]);

    // --- Action Handler ---
    const handleSend = async () => {
        if (!eventId) return;

        if (!window.confirm('CRITICAL ACTION: You are about to send a bulk SMS to ALL attendees. This is a paid, non-cancellable action that will be processed immediately. Proceed?')) {
            return;
        }

        setIsSending(true);
        setStatusMessage('');

        try {
            const response = await sendBulkSms(eventId, message, timing);
            setStatusMessage(`Job Dispatched: ${response.message} The queue will process this shortly.`);
            fetchLogs(); // Refresh logs to show the new 'Pending' entry
        } catch (error: any) {
            console.error("SMS Send Error:", error.response || error);
            const apiErrorMessage = error.response?.data?.message || error.message;
            setStatusMessage(`Error: Failed to dispatch SMS. (${apiErrorMessage})`);
        } finally {
            setIsSending(false);
        }
    };

    const handleTimingChange = (selectedTiming: TimingLabel) => {
        setTiming(selectedTiming);
        setMessage(SMS_TEMPLATES[selectedTiming]);
    };

    return (
        <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">SMS Communication Center</h1>
            <p className="text-lg text-gray-600 border-b pb-4 mb-8">
                Leverage high-impact, low-latency SMS to communicate critical updates to your entire attendee list.
                Messages are queued and processed asynchronously via Beem Africa.
            </p>

            {/* Campaign Setup and Dispatch (SmsSendForm) */}
            <SmsSendForm
                timing={timing}
                message={message}
                isSending={isSending}
                statusMessage={statusMessage}
                onTimingChange={handleTimingChange}
                onMessageChange={setMessage}
                onSend={handleSend}
            />

            {/* Audit Log (SmsHistoryLog) */}
            <SmsHistoryLog
                logs={logs}
                isLoading={logsLoading}
            />
        </div>
    );
};

export default SmsCommunicationPage;
