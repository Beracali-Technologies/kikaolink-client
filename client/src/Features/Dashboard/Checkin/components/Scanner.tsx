import React from 'react';
import { useZxing } from 'react-zxing'; // Import the new, reliable hook

// Define the shape of the component's props for type safety
interface ScannerProps {
    onScanSuccess: (decodedText: string) => void;
}

const Scanner: React.FC<ScannerProps> = ({ onScanSuccess }) => {
    // --- THIS IS THE ENTIRE LOGIC ---
    // The useZxing hook handles everything: camera start, stop, cleanup, and result decoding.
    // It is designed for React and will NOT cause the double scanner bug.
    const { ref } = useZxing({
        onResult(result) {
            onScanSuccess(result.getText());
        },
    });

    return (
        // The container holds the video feed and our custom UI overlay.
        <div className="relative w-full h-full max-w-lg mx-auto rounded-xl overflow-hidden bg-black flex items-center justify-center">

            {/* The library uses this video element to render the camera feed. */}
            {/* It is automatically managed by the 'ref' from the hook. */}
            <video ref={ref} className="w-full h-full object-cover" />

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
