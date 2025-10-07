import React from 'react';
import ResendEmailButton from './ResendEmailButton';


interface Props {
  qrCodeUrl: string;
  registrationCode?: string;
  qrPollUrl: string | null;

   attendeeId: number;
}

const QrCodeDisplay: React.FC<Props> = ({ qrCodeUrl, registrationCode, attendeeId }) => {
  if (!qrCodeUrl) return null;



  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = `ticket-${registrationCode || 'qr'}.png`;
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div className="p-4 mt-4 flex flex-col items-center">
      <img src={qrCodeUrl} alt="Your QR Code" className="w-40 h-40 border rounded" />
      <div className="mt-3 flex gap-3">


        <button onClick={handleDownload} className="px-3 py-1 bg-gray-800 text-white rounded">
          Download
        </button>
      </div>

          <ResendEmailButton attendeeId={attendeeId} />

    </div>
  );
};

export default QrCodeDisplay;
