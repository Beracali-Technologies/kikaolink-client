import React from 'react';
import { SMS_TEMPLATES, TimingLabel } from '../SmsTypes';

// Replaced Props for brevity in this response
interface SmsSendFormProps {
    timing: TimingLabel;
    message: string;
    isSending: boolean;
    statusMessage: string;
    onTimingChange: (timing: TimingLabel) => void;
    onMessageChange: (message: string) => void;
    onSend: () => void;
}

const SmsSendForm: React.FC<SmsSendFormProps> = ({
    timing,
    message,
    isSending,
    statusMessage,
    onTimingChange,
    onMessageChange,
    onSend,
}) => {

    // Tailwind Color helpers (Assuming a 'kikao-primary' or similar color is defined in tailwind.config.js)
    const isError = statusMessage.includes('Error');
    const alertClasses = isError ? 'bg-red-100 border-red-400 text-red-700' : 'bg-green-100 border-green-400 text-green-700';
    const messageLengthClass = message.length > 160 ? 'text-red-500 font-bold' : 'text-indigo-600';

    return (
        <div className="bg-white shadow-xl rounded-lg p-6 md:p-8 mb-10 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-6 border-b pb-3">Send Bulk SMS Campaign</h3>

            {/* Status Message Alert */}
            {statusMessage && (
                <div className={`p-4 mb-6 border-l-4 ${alertClasses} rounded-md`} role="alert">
                    <div className="flex items-center">
                        <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                           {/* Simplified icon logic - use actual heroicons or similar */}
                           <path fillRule="evenodd" d={isError ? "M8.257 3.099c.765-1.36 2.722-1.36 3.487 0l5.58 9.92c.765 1.36-.202 3.099-1.743 3.099H4.42c-1.54 0-2.508-1.739-1.743-3.099l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" : "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"} clipRule="evenodd"></path>
                        </svg>
                        <div>
                            <span className='font-semibold mr-2'>{isError ? 'Error Dispatching:' : 'Job Accepted:'}</span>
                            <span className='text-sm'>{statusMessage}</span>
                        </div>
                    </div>
                </div>
            )}

            <div className="grid md:grid-cols-2 gap-8">
                {/* COLUMN 1: Campaign Setup */}
                <div className="border-b md:border-b-0 md:border-r md:pr-8 pb-6 md:pb-0">
                    <h4 className='text-lg font-medium text-gray-700 mb-4'>1. Configure Campaign</h4>

                    {/* Timing/Template Select */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-600 mb-1">CAMPAIGN CONTEXT / TEMPLATE</label>
                        <select
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                            value={timing}
                            onChange={(e) => onTimingChange(e.target.value as TimingLabel)}
                        >
                            {Object.keys(SMS_TEMPLATES).map(key => (
                                <option key={key} value={key}>{key} Campaign</option>
                            ))}
                        </select>
                        <p className="text-xs text-gray-500 mt-1">
                            <i className="fas fa-info-circle mr-1"></i>
                            Choosing a timing loads a suggested template.
                        </p>
                    </div>

                    {/* Message Textarea */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-600 mb-1 flex justify-between">
                            MESSAGE CONTENT
                            <span className={`text-xs ${messageLengthClass}`}>
                                {message.length} / 160 CHARACTERS
                            </span>
                        </label>
                        <textarea
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                            rows={6}
                            value={message}
                            onChange={(e) => onMessageChange(e.target.value)}
                            maxLength={160}
                            placeholder="Enter your bulk SMS message here..."
                            style={{ resize: 'none' }}
                        />
                        <p className="text-xs text-red-500 mt-1 font-medium">
                            <i className="fas fa-exclamation-circle mr-1"></i>
                            Sending SMS is a paid, irreversible action. Confirm your message content before dispatch.
                        </p>
                    </div>
                </div>

                {/* COLUMN 2: Message Preview & Dispatch */}
                <div className="md:pl-8">
                    <h4 className='text-lg font-medium text-gray-700 mb-4'>2. Preview & Dispatch</h4>

                    {/* Preview Box (Mocking a phone screen) */}
                    <div className="p-4 mb-6 bg-gray-50 border border-gray-200 rounded-lg shadow-inner min-h-[150px]">
                        <div className="text-xs text-gray-500 mb-2 border-b pb-1 font-semibold">Kikaolink | {timing} Preview</div>
                        <p className="text-sm text-gray-800" style={{ whiteSpace: 'pre-wrap' }}
                           dangerouslySetInnerHTML={{
                                // Use innerHTML to style placeholders visually (Example for demo)
                                __html: message.replace(/\{\{(.*?)\}\}/g, (match, p1) => `<span class="bg-yellow-200 text-yellow-800 px-1 rounded text-xs font-semibold">[[${p1}]]</span>`)
                           }}
                        />
                    </div>

                    {/* Dispatch Button */}
                    <button
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg shadow-md transition duration-200 ease-in-out disabled:bg-indigo-400 disabled:cursor-not-allowed"
                        onClick={onSend}
                        disabled={isSending || message.length === 0 || message.length > 160}
                    >
                        {isSending ? (
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" viewBox="0 0 24 24"></svg>
                                DISPATCHING JOB...
                            </span>
                        ) : (
                            <span className="flex items-center justify-center">
                                <i className="fas fa-rocket mr-2"></i> DISPATCH BULK SMS CAMPAIGN
                            </span>
                        )}
                    </button>
                    <p className="text-xs text-gray-500 mt-2 text-center">
                        The job will be sent to the background queue and run immediately.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SmsSendForm;
