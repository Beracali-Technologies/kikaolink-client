import { useEffect, useRef } from 'react';
import { Html5QrcodeScanner, QrCodeSuccessCallback } from 'html5-qrcode';

// This custom hook manages the entire lifecycle of the QR scanner
export const useQrScanner = (onScanSuccess: QrCodeSuccessCallback) => {
    const scannerRef = useRef<Html5QrcodeScanner | null>(null);

    useEffect(() => {
        // Only initialize the scanner if it hasn't been already
        if (!scannerRef.current) {
            const scanner = new Html5QrcodeScanner(
                'qr-reader-container', // The ID of the div where the scanner will mount
                {
                    qrbox: {
                        width: 250,
                        height: 250,
                    },
                    fps: 10,
                    rememberLastUsedCamera: true,
                },
                /* verbose= */ false
            );

            // Start the render process
            scanner.render(onScanSuccess, (error) => {
                // We can ignore scan errors for a cleaner UI
                // console.warn("QR Scan Error:", error);
            });

            // Store the scanner instance in a ref
            scannerRef.current = scanner;
        }

        // --- Cleanup function ---
        // This is crucial. It runs when the component unmounts.
        return () => {
            if (scannerRef.current) {
                // scanner.clear() would unmount the component entirely, which can cause issues.
                // It's often better to just stop scanning if the component might be re-rendered.
                 if (scannerRef.current.getState() === 2) { // 2 = SCANNING
                    scannerRef.current.stop();
                }
            }
        };
    }, [onScanSuccess]); // Rerun the effect if the success handler changes
};
