import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchAttendees, fetchSmsLogs, sendBulkSms } from '../../../services/eventSmsService';
import { Attendee, SmsLog, SMS_TEMPLATES, TimingLabel } from './SmsTypes';
import RecipientSelector from './components/RecipientSelector';
import SmsEditor from './components/SmsEditor';
import SmsPreview from './components/SmsPreview';
import SmsHistoryLog from './components/SmsHistoryLog';

const SmsCommunicationPage: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();

  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [timing, setTiming] = useState<TimingLabel>('Pre-Event');
  const [message, setMessage] = useState<string>(SMS_TEMPLATES['Pre-Event']);
  const [logs, setLogs] = useState<SmsLog[]>([]);
  const [search] = useState(''); // Remove setSearch since it's not used

  const [logsLoading, setLogsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const loadAttendees = useCallback(async (searchTerm: string = '') => {
    if (!eventId) return;
    try {
      const data = await fetchAttendees(eventId, { search: searchTerm || undefined });
      setAttendees(data.attendees);
      // Removed setCounts since it doesn't exist
    } catch (err) {
      console.error(err);
    }
  }, [eventId]);

  const loadLogs = useCallback(async () => {
    if (!eventId) return;
    setLogsLoading(true);
    try {
      const data = await fetchSmsLogs(eventId);
      setLogs(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLogsLoading(false);
    }
  }, [eventId]);

  useEffect(() => {
    loadAttendees();
    loadLogs();
  }, [loadAttendees, loadLogs]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      loadAttendees(search);
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [search, loadAttendees]);

  const handleSend = async () => {
    if (!eventId) return;
    if (selectedIds.length === 0) {
      alert('Select at least one attendee or use the select-all button.');
      return;
    }
    if (!window.confirm('Send SMS to selected recipients? This action is immediate.')) return;
    setIsSending(true);
    setStatusMessage('');
    try {
      await sendBulkSms(eventId, message, timing, 'custom', selectedIds);
      setStatusMessage('SMS dispatched successfully. Refreshing history...');
      setSelectedIds([]);
      loadLogs();
    } catch (err: any) {
      console.error(err);
      setStatusMessage(err?.message || 'Failed to send SMS');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left sidebar */}
      <aside className="w-96 bg-white border-r border-gray-200 p-6 flex flex-col gap-6">
        <div>
          <h1 className="text-xl font-bold text-red-600">Recipients</h1>
          <p className="text-sm text-gray-500 mt-1">Select attendees to target. Use search or filters.</p>
        </div>

        {/* REMOVED: The duplicate filter buttons */}

        {/* The RecipientSelector now has its own filters */}
        <div className="flex-1">
          <RecipientSelector
            attendees={attendees}
            selected={selectedIds}
            onChange={setSelectedIds}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Timing</label>
          <select
            value={timing}
            onChange={e => {
              const val = e.target.value as TimingLabel;
              setTiming(val);
              setMessage(SMS_TEMPLATES[val]);
            }}
            className="w-full p-2 border rounded-md focus:ring-red-400 focus:border-red-400"
          >
            <option value="Pre-Event">Pre-Event</option>
            <option value="At-Event">At-Event</option>
            <option value="Post-Event">Post-Event</option>
          </select>
        </div>
      </aside>

      {/* Center */}
      <main className="flex-1 p-8 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <SmsEditor
              message={message}
              setMessage={setMessage}
              isSending={isSending}
              onSend={handleSend}
              selectedCount={selectedIds.length}
            />
            <div className="mt-3 text-sm text-gray-500">{statusMessage}</div>
          </div>

          <div className="space-y-6">
            <SmsPreview message={message} timing={timing} recipientsCount={selectedIds.length} />
            <div className="bg-white border rounded-md p-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Quick Tips</h3>
              <ul className="text-xs text-gray-500 list-disc ml-5 space-y-1">
                <li>Keep messages under 160 chars to avoid extra costs.</li>
                <li>Use {`{{FIRST_NAME}}`} to personalize messages.</li>
                <li>Check selected recipients before sending.</li>
                <li>Use the filters to target specific attendee groups.</li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">History</h3>
          <SmsHistoryLog logs={logs} isLoading={logsLoading} />
        </div>
      </main>
    </div>
  );
};

export default SmsCommunicationPage;
