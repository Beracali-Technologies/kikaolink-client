import toast from 'react-hot-toast';

// Use ambient type declaration for USBDevice (provided by 'dom' lib)
declare global {
    interface Navigator {
        usb: {
            requestDevice(options: { filters: { vendorId: number }[] }): Promise<USBDevice>;
            requestDevice(options: { filters: [] }): Promise<USBDevice>;
        };
    }
    interface USBDevice {
        open(): Promise<void>;
        selectConfiguration(configurationValue: number): Promise<void>;
        claimInterface(interfaceNumber: number): Promise<void>;
        transferOut(endpointNumber: number, data: Uint8Array): Promise<void>;
        close(): Promise<void>;
        productName?: string;
        manufacturerName?: string;
        serialNumber?: string;
        vendorId?: number;
        productId?: number;
        opened: boolean;
        configuration?: USBConfiguration;
    }
    interface USBConfiguration {
        interfaces: USBInterface[];
    }
    interface USBInterface {
        alternate: {
            endpoints: USBEndpoint[];
        };
    }
    interface USBEndpoint {
        direction: 'out' | 'in';
        endpointNumber: number;
    }
}


// src/services/usb/UsbPrintService.ts
export class UsbPrintService {
    private device: USBDevice | null = null;
    private endpoint: number = 1; // Default OUT endpoint for Zebra ZD421T
    public isConnected = false; // Changed from private to public
    private readonly vendorId = 0x1504; // Zebra vendor ID

    private async establishConnection(): Promise<void> {
        if (this.isConnected) return;

        let attempt = 0;
        const maxAttempts = 3;

        while (attempt < maxAttempts && !this.isConnected) {
            attempt++;
            try {
                console.log(`Attempt ${attempt}: Requesting USB device with filters: [{ vendorId: ${this.vendorId} }]`);
                try {
                    this.device = await navigator.usb.requestDevice({ filters: [{ vendorId: this.vendorId }] });
                } catch (filterError) {
                    console.warn(`Attempt ${attempt}: Filter failed, falling back to manual selection:`, filterError);
                    this.device = await navigator.usb.requestDevice({ filters: [] }); // Allow manual selection
                }

                if (!this.device) throw new Error('No device selected or permission denied');

                console.log(`Attempt ${attempt}: Device selected:`, {
                    productName: this.device.productName,
                    manufacturerName: this.device.manufacturerName,
                    serialNumber: this.device.serialNumber,
                    vendorId: this.device.vendorId,
                    productId: this.device.productId,
                });

                console.log(`Attempt ${attempt}: Checking device state before open:`, {
                    opened: this.device.opened,
                    configuration: this.device.configuration,
                });

                console.log(`Attempt ${attempt}: Waiting 10 seconds before opening to ensure device readiness...`);
                await new Promise(resolve => setTimeout(resolve, 10000));

                console.log(`Attempt ${attempt}: Attempting to open device...`);
                await this.device.open();
                console.log(`Attempt ${attempt}: Selecting configuration 1...`);
                await this.device.selectConfiguration(1);
                console.log(`Attempt ${attempt}: New state:`, { opened: this.device.opened, configuration: this.device.configuration });

                console.log(`Attempt ${attempt}: Claiming interface 0...`);
                await this.device.claimInterface(0);

                const iface = this.device.configuration?.interfaces[0];
                const outEndpoint = iface?.alternate.endpoints.find((ep: USBEndpoint) => ep.direction === 'out')?.endpointNumber || 1;
                this.endpoint = outEndpoint;
                this.isConnected = true;
                console.log(`Attempt ${attempt}: Connected to Zebra on endpoint ${this.endpoint}`);
                toast.success('Printer connected successfully!');
                break; // Exit loop on success
            } catch (error) {
                const err = error as Error;
                console.error(`Attempt ${attempt}: USB connection failed at step: ${err.message}`, {
                    error: err,
                    device: this.device ? this.device.productName : 'No device',
                    state: {
                        opened: this.device?.opened,
                        configuration: this.device?.configuration,
                    },
                });
                this.device = null;
                if (attempt === maxAttempts) {
                    this.isConnected = false;
                    if (err.message.includes('Access denied') || err.message.includes('permission')) {
                        toast.error('Access denied. Please ensure the device is not in use and retry.');
                    } else {
                        toast.error(`Failed to connect to printer after ${maxAttempts} attempts: ${err.message}`);
                    }
                    throw err;
                }
                await new Promise(resolve => setTimeout(resolve, 2000));
            }
        }
    }

    async connect(): Promise<void> {
        await this.establishConnection();
    }

    async printZPL(zpl: string): Promise<void> {
        if (!this.isConnected) {
            console.warn('Printer not connected. Please connect the printer first.');
            throw new Error('Printer not connected');
        }

        console.log('Sending ZPL via USB:', zpl);
        const encoder = new TextEncoder();
        const data = encoder.encode(zpl);

        try {
            await this.device!.transferOut(this.endpoint, data);
            toast.success('Badge printed via USB!');
        } catch (error) {
            const err = error as Error;
            console.error('Print failed:', err);
            toast.error('Failed to print badge');
            this.isConnected = false;
            throw err;
        }
    }

    async disconnect(): Promise<void> {
        if (this.device && this.isConnected) {
            try {
                await this.device.close();
            } catch (error) {
                const err = error as Error;
                console.error('Disconnect failed:', err);
            } finally {
                this.device = null;
                this.isConnected = false;
                toast('Printer disconnected', { icon: 'ℹ️' });
            }
        }
    }
}

export const usbPrintService = new UsbPrintService();
