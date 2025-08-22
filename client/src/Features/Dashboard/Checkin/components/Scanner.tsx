import React from 'react';
import { useQrScanner } from '../../../../Components/hooks/useQrScanner'; // Import our new hook
import { QrCodeSuccessCallback } from 'html5-qrcode';

interface ScannerProps {
    onScanResult: QrCodeSuccessCallback;
}

const Scanner: React.FC<ScannerProps> = ({ onScanResult }) => {
    // This single line of code activates the scanner and connects it to our handler
    useQrScanner(onScanResult);

    return (
        <div className="relative w-full max-w-lg mx-auto">
            {/* --- THIS IS THE MOUNT POINT --- */}
            {/* The QR library will find this ID and inject the camera view here */}
            <div id="qr-reader-container"></div>
        </div>
    );
};

export default Scanner;
