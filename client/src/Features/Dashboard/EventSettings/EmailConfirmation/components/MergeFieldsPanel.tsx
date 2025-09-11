import React from 'react';

interface MergeFieldsPanelProps {
    isOpen: boolean;
    onClose: () => void;
    onInsert: (field: string) => void;
}

export const MergeFieldsPanel: React.FC<MergeFieldsPanelProps> = ({
    isOpen,
    onClose,
    onInsert
}) => {
    const mergeFields = [
        { value: '((eventInfo.title))', label: 'Event Title', category: 'Event' },
        { value: '((order.firstName))', label: 'First Name', category: 'Order' },
        { value: '((order.lastName))', label: 'Last Name', category: 'Order' },
        { value: '((order.email))', label: 'Email', category: 'Order' },
        { value: '((order.orderNo))', label: 'Order Number', category: 'Order' },
        { value: '((attendee.fullName))', label: 'Attendee Name', category: 'Attendee' },
        { value: '((attendee.ticketName))', label: 'Ticket Type', category: 'Attendee' },
        { value: '((attendee.email))', label: 'Attendee Email', category: 'Attendee' },
        { value: '((attendees.[0].formDetails.firstname))', label: 'First Name (Attendee 1)', category: 'Attendee Details' },
        { value: '((attendees.[0].formDetails.lastname))', label: 'Last Name (Attendee 1)', category: 'Attendee Details' },
        { value: '((attendees.[0].formDetails.email))', label: 'Email (Attendee 1)', category: 'Attendee Details' },
        { value: '((attendees.[0].formDetails.companyname))', label: 'Company Name', category: 'Attendee Details' },
        { value: '((attendees.[0].issuedTicketCode))', label: 'Ticket Code', category: 'Ticket' },
    ];

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl max-h-[80vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Available Merge Fields</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        ✕
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {mergeFields.map((field) => (
                        <button
                            key={field.value}
                            onClick={() => onInsert(field.value)}
                            className="text-left p-3 border border-gray-200 rounded-md hover:bg-gray-50 hover:border-blue-200"
                        >
                            <div className="text-sm font-medium text-gray-800">{field.label}</div>
                            <div className="text-xs text-blue-600 font-mono mt-1">{field.value}</div>
                            <div className="text-xs text-gray-500 mt-1">{field.category}</div>
                        </button>
                    ))}
                </div>

                <div className="mt-4 p-3 bg-blue-50 rounded-md">
                    <p className="text-sm text-blue-700">
                        Click on any field to insert it into your email content. These will be
                        replaced with actual information when emails are sent.
                    </p>
                </div>
            </div>
        </div>
    );
};
