export interface EmailSettings {
    fromName: string;
    replyTo: string;
    subject: string;
    showBanner: boolean;
    bannerImage?: string;
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
