import React from 'react';
import { TimingLabel } from '../SmsTypes';
import SmsRecipientSelector from './SmsRecipientSelector';
import { Attendee } from '../SmsTypes';

interface Props {
    timing: TimingLabel;
    message: string;
    isSending: boolean;
    statusMessage: string;
    attendees: Attendee[];
    recipientGroup: string;
    selectedRecipients: string[];
    onTimingChange: (timing: TimingLabel) => void;
    onMessageChange: (msg: string) => void;
    onRecipientChange: (ids: string[], group: string) => void;
    onSend: () => void;
}

const SmsSendForm: React.FC<Props> = ({
    timing, message, isSending, statusMessage, attendees,
    recipientGroup, selectedRecipients, onTimingChange, onMessageChange,
    onRecipientChange, onSend
}) => {

    const messageLengthClass = message.length > 160 ? 'text-red-500 font-bold' : 'text-indigo-600';

    return (
        <div className="bg-white shadow-xl rounded-lg p-6 md:p-8 mb-10 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-6 border-b pb-3">Send Bulk SMS</h3>

            {statusMessage && (
                <div className={`p-4 mb-6 border-l-4 ${statusMessage.includes('Error') ? 'bg-red-100 border-red-400 text-red-700' : 'bg-green-100 border-green-400 text-green-700'} rounded-md`}>
                    {statusMessage}
                </div>
            )}

            <div className="grid md:grid-cols-2 gap-8">
                {/* Campaign Setup */}
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Timing / Template</label>
                    <select
                        className="w-full p-3 border border-gray-300 rounded-md mb-4"
                        value={timing}
                        onChange={(e) => onTimingChange(e.target.value as TimingLabel)}
                    >
                        <option value="Pre-Event">Pre-Event</option>
                        <option value="At-Event">At-Event</option>
                        <option value="Post-Event">Post-Event</option>
                    </select>

                    <SmsRecipientSelector attendees={attendees} onChange={onRecipientChange} />

                    <label className="block text-sm font-medium text-gray-600 mb-1 flex justify-between">
                        Message
                        <span className={`text-xs ${messageLengthClass}`}>{message.length}/160</span>
                    </label>
                    <textarea
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        rows={6}
                        value={message}
                        onChange={(e) => onMessageChange(e.target.value)}
                        maxLength={160}
                        placeholder="Write your SMS message here..."
                    />
                </div>

                {/* Preview & Send */}
                <div>
                    <h4 className="text-lg font-medium text-gray-700 mb-4">Preview</h4>
                    <div className="p-4 bg-gray-50 border rounded-lg mb-4 min-h-[150px]">
                        <p className="text-sm text-gray-800 whitespace-pre-wrap">{message}</p>
                        <p className="text-xs text-gray-500 mt-2">Timing: {timing}</p>
                        <p className="text-xs text-gray-500 mt-1">Recipients: {recipientGroup === 'custom' ? selectedRecipients.length : recipientGroup}</p>
                    </div>
                    <button
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg shadow-md disabled:bg-indigo-400"
                        onClick={onSend}
                        disabled={isSending || message.length === 0 || message.length > 160}
                    >
                        {isSending ? 'Dispatching...' : 'Dispatch SMS'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SmsSendForm;
