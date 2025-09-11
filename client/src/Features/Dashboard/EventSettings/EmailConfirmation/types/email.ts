export interface EmailSettings {
    fromName: string;
    replyTo: string;
    subject: string;
    showBanner: boolean;
    bannerText: string;
    greeting: string;
    message: string;
    closing: string;
}

export interface EmailSections {
    qrCode: boolean;
    attendeeInfo: boolean;
    aboutEvent: boolean;
    registrationSummary: boolean;
    attendeeDetails: boolean;
    viewRegistration: boolean;
}

export interface MergeField {
    id: string;
    label: string;
    value: string;
    category: string;
}
