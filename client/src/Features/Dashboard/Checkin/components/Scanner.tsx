import React, { useEffect, useState, useRef } from 'react';
import { useZxing } from 'react-zxing';
import { useCamera } from '../contexts/CameraContext';

interface ScannerProps {
  onScanSuccess: (decodedText: string) => void;
}

const Scanner: React.FC<ScannerProps> = ({ onScanSuccess }) => {
  const { cameraId, setAvailableCameras } = useCamera();
  const [scanning, setScanning] = useState(true);
  const hasCameraChanged = useRef(false);

  // Update constraints and restart scanner when camera changes
  useEffect(() => {
    if (hasCameraChanged.current && cameraId) {
      console.log('🔄 Camera changed, restarting scanner...');
      setScanning(false);
      const timer = setTimeout(() => {
        setScanning(true);
        hasCameraChanged.current = false;
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [cameraId]);

  // Set flag when cameraId changes (but not on initial mount)
  useEffect(() => {
    if (cameraId) {
      hasCameraChanged.current = true;
    }
  }, [cameraId]);

  // Simple type assertion for the ref
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
    paused: !scanning,
  });

  // Get available cameras on component mount
  useEffect(() => {
    console.log('📡 Attempting to get camera devices...');

    const getCameras = async () => {
      try {
        console.log('🔐 Requesting camera permission...');
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        console.log('✅ Camera permission granted');

        // Close the stream immediately since we just needed permission
        stream.getTracks().forEach(track => track.stop());

        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        console.log('📊 Found video devices:', videoDevices);

        setAvailableCameras(videoDevices);
      } catch (error) {
        console.error('❌ Error accessing cameras:', error);
        if (error instanceof DOMException) {
          console.error('🚫 Permission denied or camera not available');
        }
      }
    };

    getCameras();
  }, [setAvailableCameras]);

  return (
    <div className="relative w-full h-full max-w-lg mx-auto rounded-xl overflow-hidden bg-black flex items-center justify-center">
      {!scanning ? (
        <div className="text-white">Restarting camera...</div>
      ) : (
        <>
          <video
            ref={ref as React.RefObject<HTMLVideoElement>}
            className="w-full h-full object-cover"
            autoPlay
            playsInline
            onLoadedMetadata={() => console.log('🎬 Video metadata loaded')}
            onCanPlay={() => console.log('▶️ Video can play')}
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
        </>
      )}
    </div>
  );
};

export default Scanner;
