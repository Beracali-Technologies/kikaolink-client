import React, { useState } from 'react';
import { FiSend, FiMail } from 'react-icons/fi';

const EmailCommunicationPage: React.FC = () => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [recipients, setRecipients] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [feedback, setFeedback] = useState('');

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!recipients.trim() || !subject.trim() || !message.trim()) {
      setFeedback('⚠️ Please fill in all fields before sending.');
      return;
    }

    setIsSending(true);
    setFeedback('');

    try {
      // TODO: Replace with your Laravel API endpoint
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recipients, subject, message }),
      });

      if (response.ok) {
        setFeedback('✅ Email sent successfully!');
        setRecipients('');
        setSubject('');
        setMessage('');
      } else {
        setFeedback('❌ Failed to send email. Try again later.');
      }
    } catch (error) {
      setFeedback('❌ Something went wrong. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-blue-50 rounded-lg">
          <FiMail className="text-blue-600 h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Send Email</h1>
          <p className="text-sm text-gray-500">
            Send bulk or targeted emails to event attendees.
          </p>
        </div>
      </div>

      {/* Email Form */}
      <form
        onSubmit={handleSendEmail}
        className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Recipients
          </label>
          <input
            type="text"
            placeholder="e.g. attendee1@example.com, attendee2@example.com"
            value={recipients}
            onChange={(e) => setRecipients(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
          />
          <p className="text-xs text-gray-500 mt-1">
            Separate multiple emails with commas.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Subject
          </label>
          <input
            type="text"
            placeholder="Enter email subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Message
          </label>
          <textarea
            rows={6}
            placeholder="Write your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
          ></textarea>
        </div>

        {/* Feedback */}
        {feedback && (
          <div
            className={`text-sm font-medium ${
              feedback.startsWith('✅') ? 'text-green-600' : 'text-red-500'
            }`}
          >
            {feedback}
          </div>
        )}

        {/* Action */}
        <button
          type="submit"
          disabled={isSending}
          className={`flex items-center justify-center px-5 py-2.5 rounded-lg text-white transition-all duration-200 ${
            isSending
              ? 'bg-blue-300 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          <FiSend className="h-4 w-4 mr-2" />
          {isSending ? 'Sending...' : 'Send Email'}
        </button>
      </form>
    </div>
  );
};

export default EmailCommunicationPage;
