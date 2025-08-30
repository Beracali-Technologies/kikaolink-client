import React, { useEffect } from 'react';
import { useZxing } from 'react-zxing';
import { useCamera } from '../contexts/CameraContext';
// Define the shape of the component's props for type safety
interface ScannerProps {
    onScanSuccess: (decodedText: string) => void;
}

const Scanner: React.FC<ScannerProps> = ({ onScanSuccess }) => {
        const { cameraId, setAvailableCameras } = useCamera();

    const { ref } = useZxing({
        onDecodeResult: (result) => {
            onScanSuccess(result.getText());
        },
        constraints: {
            video: {
                facingMode: undefined, // using deviceId instead
                deviceId: cameraId ? { exact: cameraId } : undefined,
            },
            audio: false,
    },
    });

      useEffect(() => {
            const getCameras = async () => {
                  try {
                        const devices = await navigator.mediaDevices.enumerateDevices();
                        const videoDevices = devices.filter(device => device.kind === 'videoinput');
                        setAvailableCameras(videoDevices);
                  } catch (error) {
                        console.error('Error getting cameras:', error);
                  }
            };

                getCameras();
        }, [setAvailableCameras]);

    return (
        // The container holds the video feed and our custom UI overlay.
        <div className="relative w-full h-full max-w-lg mx-auto rounded-xl overflow-hidden bg-black flex items-center justify-center">

            {/* The library uses this video element to render the camera feed. */}
            {/* It is automatically managed by the 'ref' from the hook. */}
            <video ref={ref as React.RefObject<HTMLVideoElement>} className="w-full h-full object-cover" />

            {/* The professional targeting reticle from your screenshot */}
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
