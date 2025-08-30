import React from 'react';
import { useZxing } from 'react-zxing';
import { useCamera } from '../contexts/CameraContext';

interface ScannerProps {
  onScanSuccess: (decodedText: string) => void;
}

const Scanner: React.FC<ScannerProps> = ({ onScanSuccess }) => {
  const { cameraId } = useCamera();

  const { ref } = useZxing({
    onDecodeResult: (result) => {
      console.log('✅ QR Code scanned successfully:', result.getText());
      onScanSuccess(result.getText());
    },
    constraints: {
      video: cameraId ? { deviceId: { exact: cameraId } } : { facingMode: 'environment' },
      audio: false,
    },
    onError: (error) => {
      console.error('❌ ZXing error:', error);
    },
  });

  return (
    <div className="relative w-full h-full max-w-lg mx-auto rounded-xl overflow-hidden bg-black flex items-center justify-center">
      <video
        ref={ref as React.RefObject<HTMLVideoElement>}
        className="w-full h-full object-cover"
        autoPlay
        playsInline
        onLoadedMetadata={() => console.log('🎬 Video metadata loaded')}
        onError={(e) => console.error('❌ Video error:', e)}
      />

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-64 h-64">
          <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-white rounded-tl-xl"/>
          <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-white rounded-tr-xl"/>
          <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-white rounded-bl-xl"/>
          <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-white rounded-br-xl"/>
        </div>
      </div>

      <p className="absolute bottom-4 text-white/70 text-sm pointer-events-none">
        Point camera at QR code
      </p>
    </div>
  );
};

export default Scanner;
