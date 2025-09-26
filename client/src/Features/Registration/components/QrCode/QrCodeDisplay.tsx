// src/components/QrAwaitDisplay.tsx
import React from 'react';
import { usePollQr } from '@/lib/hooks/usePollQr';
import api from '@/lib/axios'; // use central api instance

interface Props {
  qrPollUrl: string | null;
  initialMessage?: string;
}


const QrCodeDisplay: React.FC<Props> = ({ qrPollUrl, initialMessage }) => {
  const { data, loading, error } = usePollQr(qrPollUrl);

  const handleOpenQr = () => {
    if (data?.qr?.url) window.open(data.qr.url, '_blank');
  };

  const handleDownload = () => {
    if (!data?.qr?.url) return;
    const link = document.createElement('a');
    link.href = data.qr.url;
    link.download = `ticket-${data.attendee?.uuid || 'qr'}.png`;
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const handleResendEmail = async () => {
    if (!data?.attendee?.id) return;
    try {
      await api.post(`/attendees/${data.attendee.id}/resend-qr`);
      alert('Email resend requested.');
    } catch {
      alert('Failed to resend email. Try later.');
    }
  };

  if (!qrPollUrl) return null;

  return (
    <div className="p-4">
      <div className="mb-4 text-sm text-gray-600">
        {initialMessage || 'Generating your QR — this usually takes a few seconds.'}
      </div>

      {loading && (
        <div className="flex items-center gap-3">
          <div className="animate-spin w-6 h-6 border-2 border-blue-500 rounded-full border-t-transparent"></div>
          <div>Generating QR code...</div>
        </div>
      )}

      {error && (
        <div className="text-red-600">
          <p>{error}</p>
          <button
            onClick={handleResendEmail}
            className="mt-2 px-3 py-1 bg-blue-600 text-white rounded"
          >
            Send QR by Email
          </button>
        </div>
      )}

      {data?.qr?.url && (
        <div className="mt-4">
          <img
            src={data.qr.url}
            alt="Your ticket QR"
            className="max-w-xs border rounded"
          />
          <div className="mt-3 flex gap-3">
            <button
              onClick={handleOpenQr}
              className="px-3 py-1 bg-green-600 text-white rounded"
            >
              Open
            </button>
            <button
              onClick={handleDownload}
              className="px-3 py-1 bg-gray-800 text-white rounded"
            >
              Download
            </button>
            <button
              onClick={handleResendEmail}
              className="px-3 py-1 bg-blue-600 text-white rounded"
            >
              Resend Email
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QrCodeDisplay;
