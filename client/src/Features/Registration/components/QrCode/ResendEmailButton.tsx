import React, { useState } from 'react';
import api from '@/lib/axios'; 

interface Props {
  attendeeId: number;
}

const ResendEmailButton: React.FC<Props> = ({ attendeeId }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleResend = async () => {
    console.log('Resend request for attendeeId:', attendeeId);
    setLoading(true);
    setMessage(null);
    try {
      const res = await api.post(`/attendees/${attendeeId}/resend-qr`);
      console.log('Resend response:', res.data);
      setMessage(res.data.message);
    } catch (err: any) {
      console.error('Resend error:', err.response?.data || err);
      setMessage(err.response?.data?.message || 'Failed to resend email. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-2">
      <button
        onClick={handleResend}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        {loading ? 'Sending...' : 'Resend QR Email'}
      </button>
      {message && <p className="mt-1 text-sm text-gray-700">{message}</p>}
    </div>
  );
};

export default ResendEmailButton;
