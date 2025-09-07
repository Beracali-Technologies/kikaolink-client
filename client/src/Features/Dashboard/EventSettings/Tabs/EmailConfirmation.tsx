import React, { useState } from 'react';
//import { useParams } from 'react-router-dom';
import { useEventStore } from '../../../../lib/stores/eventStore';

interface EmailSettings {
    fromName: string;
    replyTo: string;
    subject: string;
    banner: boolean;
    sections: {
        qrCode: boolean;
        attendeeInfo: boolean;
        aboutEvent: boolean;
        registrationSummary: boolean;
        attendeeDetails: boolean;
        viewRegistration: boolean;
    };
}

const EmailConfirmation: React.FC = () => {
    //const { eventId } = useParams<{ eventId: string }>();
    const { currentEvent } = useEventStore();

    const [emailSettings, setEmailSettings] = useState<EmailSettings>({
        fromName: "Test Event Pte Ltd.",
        replyTo: "noreply@eventnook.com",
        subject: `[${currentEvent?.title || 'Event'}] Registration Confirmation (#{order.orderNo})`,
        banner: true,
        sections: {
            qrCode: false,
            attendeeInfo: true,
            aboutEvent: false,
            registrationSummary: true,
            attendeeDetails: false,
            viewRegistration: false
        }
    });

    const handleSaveSettings = async () => {
        // In a real app, you would save these settings to your backend
        console.log('Saving email settings:', emailSettings);
        // await updateEventEmailSettings(eventId, emailSettings);
        alert('Email settings saved successfully!');
    };

    return (
        <div className="max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Confirmation Email</h1>
            <p className="mb-6 text-gray-600">
                This email will be sent when the registration is confirmed.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Settings Form */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold mb-4">Email Settings</h2>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                From Name
                            </label>
                            <input
                                type="text"
                                value={emailSettings.fromName}
                                onChange={(e) => setEmailSettings({
                                    ...emailSettings,
                                    fromName: e.target.value
                                })}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Reply To Email
                            </label>
                            <input
                                type="email"
                                value={emailSettings.replyTo}
                                onChange={(e) => setEmailSettings({
                                    ...emailSettings,
                                    replyTo: e.target.value
                                })}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Custom Email Subject
                            </label>
                            <input
                                type="text"
                                value={emailSettings.subject}
                                onChange={(e) => setEmailSettings({
                                    ...emailSettings,
                                    subject: e.target.value
                                })}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>

                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="removeBanner"
                                checked={!emailSettings.banner}
                                onChange={() => setEmailSettings({
                                    ...emailSettings,
                                    banner: !emailSettings.banner
                                })}
                                className="mr-2"
                            />
                            <label htmlFor="removeBanner" className="text-sm font-medium text-gray-700">
                                Remove Email Banner
                            </label>
                        </div>

                        <div className="pt-4 border-t">
                            <h3 className="text-lg font-semibold mb-3">Email Sections</h3>
                            <div className="grid grid-cols-1 gap-2">
                                {Object.entries(emailSettings.sections).map(([key, value]) => (
                                    <div key={key} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id={key}
                                            checked={value}
                                            onChange={() => setEmailSettings({
                                                ...emailSettings,
                                                sections: {
                                                    ...emailSettings.sections,
                                                    [key]: !value
                                                }
                                            })}
                                            className="mr-2"
                                        />
                                        <label htmlFor={key} className="text-sm font-medium text-gray-700 capitalize">
                                            {key.replace(/([A-Z])/g, ' $1').trim()}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="pt-4">
                            <button
                                onClick={handleSaveSettings}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            >
                                Save Settings
                            </button>
                        </div>
                    </div>
                </div>

                {/* Email Preview */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold mb-4">Email Preview</h2>

                    <div className="border p-4 rounded-md bg-gray-50">
                        {emailSettings.banner && (
                            <div className="bg-blue-600 text-white p-4 text-center mb-4">
                                <h3 className="font-bold">CONNECTING THE COMMUNITY WITH INSPIRING EVENTS</h3>
                            </div>
                        )}

                        <div className="text-center mb-4">
                            <h2 className="text-xl font-bold">N eventnook</h2>
                            <p className="text-sm text-gray-600">By the community builder</p>
                        </div>

                        <div className="mb-4">
                            <h3 className="text-lg font-semibold">Registration Confirmation</h3>
                            <p>Dear ((attendee.firstName)) ((attendee.lastName)),</p>
                            <p className="mt-2">
                                Thank you for your registration! Your registration for {currentEvent?.title || 'Event'} is complete.
                            </p>
                        </div>

                        {emailSettings.sections.qrCode && (
                            <div className="mb-4 p-3 border rounded">
                                <h4 className="font-semibold mb-2">QR Code Ticket</h4>
                                <div className="bg-gray-200 h-32 flex items-center justify-center">
                                    <p>QR Code Image</p>
                                </div>
                            </div>
                        )}

                        {emailSettings.sections.attendeeInfo && (
                            <div className="mb-4 p-3 border rounded">
                                <h4 className="font-semibold mb-2">Attendee Information</h4>
                                <p><strong>Name:</strong> ((attendee.fullName))</p>
                                <p><strong>Email:</strong> ((attendee.email))</p>
                                <p><strong>Ticket Type:</strong> ((attendee.ticketName))</p>
                            </div>
                        )}

                        {emailSettings.sections.registrationSummary && (
                            <div className="mb-4 p-3 border rounded">
                                <h4 className="font-semibold mb-2">Registration Summary</h4>
                                <p><strong>Order #:</strong> ((order.orderNo))</p>
                                <p><strong>Total Amount:</strong> ((order.totalAmount))</p>
                            </div>
                        )}

                        {emailSettings.sections.viewRegistration && (
                            <div className="mt-4 text-center">
                                <button className="text-blue-600 font-semibold underline">
                                    View Registration / View Receipt
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="mt-6">
                        <h3 className="font-semibold mb-2">Available Merge Fields</h3>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                            <div className="p-2 bg-gray-100 rounded">((eventInfo.title))</div>
                            <div className="p-2 bg-gray-100 rounded">((order.firstName))</div>
                            <div className="p-2 bg-gray-100 rounded">((order.lastName))</div>
                            <div className="p-2 bg-gray-100 rounded">((order.email))</div>
                            <div className="p-2 bg-gray-100 rounded">((attendees.0.formDetails.firstname))</div>
                            <div className="p-2 bg-gray-100 rounded">((attendees.0.formDetails.lastname))</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmailConfirmation;
