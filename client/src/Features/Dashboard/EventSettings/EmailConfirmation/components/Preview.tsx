import React from 'react';

interface PreviewProps {
    settings: {
        fromName: string;
        replyTo: string;
        subject: string;
        showBanner: boolean;
        bannerText: string;
        greeting: string;
        message: string;
        closing: string;
    };
    sections: {
        qrCode: boolean;
        attendeeInfo: boolean;
        registrationSummary: boolean;
        viewRegistration: boolean;
    };
}

export const Preview: React.FC<PreviewProps> = ({ settings, sections }) => {
    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Preview</h2>

            <div className="border border-gray-300 rounded-lg">
                {/* Email Header */}
                <div className="bg-gray-50 p-4 border-b">
                    <div className="text-sm text-gray-600">
                        <strong>From:</strong> {settings.fromName} &lt;{settings.replyTo}&gt;
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                        <strong>Subject:</strong> {settings.subject}
                    </div>
                </div>

                {/* Email Content */}
                <div className="p-6">
                    {/* Banner */}
                    {settings.showBanner && (
                        <div className="bg-blue-600 text-white p-6 text-center mb-6 rounded-lg">
                            <h3 className="font-bold text-lg uppercase tracking-wide">
                                {settings.bannerText}
                            </h3>
                        </div>
                    )}

                    {/* Header */}
                    <div className="text-center mb-6">
                        <h2 className="text-xl font-bold text-gray-800">N eventnook</h2>
                        <p className="text-sm text-gray-600">By the community builder</p>
                    </div>

                    {/* Main Content */}
                    <div className="space-y-4">
                        <div>
                            <h3 className="font-semibold text-gray-800 mb-2">Registration Confirmation</h3>
                            <p className="text-gray-800 whitespace-pre-wrap">{settings.greeting}</p>
                            <p className="text-gray-800 whitespace-pre-wrap mt-2">{settings.message}</p>
                            <p className="text-gray-800 whitespace-pre-wrap mt-2">{settings.closing}</p>
                        </div>

                        {/* QR Code Section */}
                        {sections.qrCode && (
                            <div className="border rounded-lg p-4">
                                <h4 className="font-semibold mb-3">Ticket #1</h4>
                                <div className="space-y-2 text-sm">
                                    <p><strong>Name:</strong> ((attendee.fullName))</p>
                                    <p><strong>Type:</strong> ((attendee.ticketName))</p>
                                    <p><strong>Email:</strong> ((attendee.email))</p>
                                    <p className="text-xs text-gray-500 mt-2">*((attendee.issuedTicketCode))*</p>
                                </div>
                                <button className="mt-3 text-blue-600 text-sm font-medium">
                                    View e-Ticket
                                </button>
                            </div>
                        )}

                        {/* Registration Summary */}
                        {sections.registrationSummary && (
                            <div className="border rounded-lg p-4">
                                <h4 className="font-semibold mb-3">Registration Summary</h4>
                                <div className="space-y-1 text-sm">
                                    <p><strong>Order #:</strong> ((order.orderNo))</p>
                                    <p><strong>Total Amount:</strong> ((order.totalAmount))</p>
                                </div>
                            </div>
                        )}

                        {/* View Registration */}
                        {sections.viewRegistration && (
                            <div className="text-center pt-4">
                                <button className="text-blue-600 font-semibold underline">
                                    View Registration / View Receipt
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="mt-8 pt-4 border-t border-gray-200">
                        <p className="text-xs text-gray-500 text-center">
                            This is an automated message. Please do not reply to this email.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
