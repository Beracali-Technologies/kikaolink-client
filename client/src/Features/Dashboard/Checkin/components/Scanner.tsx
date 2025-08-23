import React, { useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

// Define the shape of the component's props for type safety
interface ScannerProps {
    onScanSuccess: (decodedText: string) => void;
    isScanningActive: boolean;
}

// A unique ID for the HTML element that the library will mount into.
const QR_READER_ELEMENT_ID = 'qr-code-scanner-mount-point';

const Scanner: React.FC<ScannerProps> = ({ onScanSuccess, isScanningActive }) => {
    // We use a ref to hold a stable, mutable reference to the scanner instance.
    // This survives re-renders without causing the useEffect to re-run.
    const scannerRef = useRef<Html5Qrcode | null>(null);

    // This effect runs only ONCE when the component first mounts.
    useEffect(() => {
        // --- THIS IS THE CRITICAL CHANGE ---
        // We create the scanner instance here. It is stable and will not be recreated.
        const scanner = new Html5Qrcode(QR_READER_ELEMENT_ID);
        scannerRef.current = scanner;

        const config = {
            fps: 10,
            qrbox: { width: 250, height: 250 },
            aspectRatio: 1.0,
        };

        // --- CAMERA START LOGIC ---
        // This function will be called to start the camera feed.
        const startCamera = async () => {
            try {
                await scanner.start(
                    { facingMode: "environment" },
                    config,
                    (decodedText, decodedResult) => {
                        // This callback is triggered on every successful scan frame
                        // We use the parent's `isScanningActive` to prevent duplicate processing
                        if (isScanningActive) {
                            onScanSuccess(decodedText);
                        }
                    },
                    (errorMessage) => { /* Ignore 'QR code not found' errors */ }
                );
            } catch (err) {
                console.error("Unable to start QR scanner", err);
            }
        };

        startCamera();

        // --- DEFINITIVE CLEANUP FUNCTION ---
        // This function is the KEY to fixing the bug.
        // It is called automatically by React when the component unmounts.
        return () => {
            const scannerInstance = scannerRef.current;
            if (scannerInstance && scannerInstance.isScanning) {
                // Check if the scanner is running before trying to stop it
                scannerInstance.stop()
                  .then(() => console.log("QR scanner stopped successfully."))
                  .catch(err => console.error("Error stopping QR scanner:", err));
            }
        };
    }, []); // <-- The empty array GUARANTEES this effect runs only once.

    return (
        // The container holds the scanner video feed and our custom UI overlays
        <div className="relative w-full h-full max-w-lg mx-auto rounded-lg overflow-hidden bg-black flex items-center justify-center">
            {/* The placeholder div that the scanner library will find and use */}
            <div id={QR_READER_ELEMENT_ID} className="w-full h-full" />

            {/* The professional targeting reticle from your screenshot */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="relative w-64 h-64">
                    <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-white rounded-tl-xl"/>
                    <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-white rounded-tr-xl"/>
                    <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-white rounded-bl-xl"/>
                    <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-white rounded-br-xl"/>
                </div>
            </div>
        </div>
    );
};

export default Scanner;
