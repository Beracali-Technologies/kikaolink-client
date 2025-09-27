import React from 'react';

interface Props {
  qrCodeUrl: string;
  registrationCode?: string;
}

const QrCodeDisplay: React.FC<Props> = ({ qrCodeUrl, registrationCode }) => {
  if (!qrCodeUrl) return null;

  /*const handleOpenQr = () => {
    window.open(qrCodeUrl, '_blank');
  }; */

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

        {/*
          <button onClick={handleOpenQr} className="px-3 py-1 bg-green-600 text-white rounded">
            Open
          </button>
          */}
        <button onClick={handleDownload} className="px-3 py-1 bg-gray-800 text-white rounded">
          Download
        </button>
      </div>
    </div>
  );
};

export default QrCodeDisplay;
