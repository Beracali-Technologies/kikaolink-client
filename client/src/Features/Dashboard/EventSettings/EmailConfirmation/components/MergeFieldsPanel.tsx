import React from 'react';
import { FiX, FiSearch, FiUser, FiCalendar, FiDollarSign, FiTag, FiInfo } from 'react-icons/fi';

interface MergeFieldsPanelProps {
    isOpen: boolean;
    onClose: () => void;
    onInsert: (fieldValue: string) => void;
}

export const MergeFieldsPanel: React.FC<MergeFieldsPanelProps> = ({
    isOpen,
    onClose,
    onInsert
}) => {
    const [searchTerm, setSearchTerm] = React.useState('');

    const mergeFields = [
        // Event Fields
        { value: '((eventInfo.title))', label: 'Event Title', category: 'Event', icon: FiCalendar },
        { value: '((eventInfo.date))', label: 'Event Date', category: 'Event', icon: FiCalendar },
        { value: '((eventInfo.location))', label: 'Event Location', category: 'Event', icon: FiCalendar },

        // Order Fields
        { value: '((order.firstName))', label: 'First Name', category: 'Order', icon: FiUser },
        { value: '((order.lastName))', label: 'Last Name', category: 'Order', icon: FiUser },
        { value: '((order.email))', label: 'Email', category: 'Order', icon: FiUser },
        { value: '((order.orderNo))', label: 'Order Number', category: 'Order', icon: FiTag },
        { value: '((order.totalAmount))', label: 'Total Amount', category: 'Order', icon: FiDollarSign },
        { value: '((order.date))', label: 'Order Date', category: 'Order', icon: FiCalendar },

        // Attendee Fields
        { value: '((attendee.fullName))', label: 'Attendee Full Name', category: 'Attendee', icon: FiUser },
        { value: '((attendee.firstName))', label: 'Attendee First Name', category: 'Attendee', icon: FiUser },
        { value: '((attendee.lastName))', label: 'Attendee Last Name', category: 'Attendee', icon: FiUser },
        { value: '((attendee.email))', label: 'Attendee Email', category: 'Attendee', icon: FiUser },
        { value: '((attendee.ticketName))', label: 'Ticket Type', category: 'Attendee', icon: FiTag },
        { value: '((attendee.issuedTicketCode))', label: 'Ticket Code', category: 'Attendee', icon: FiTag },

        // Custom Fields
        { value: '((attendees.[0].formDetails.firstname))', label: 'First Name (Attendee 1)', category: 'Custom Fields', icon: FiUser },
        { value: '((attendees.[0].formDetails.lastname))', label: 'Last Name (Attendee 1)', category: 'Custom Fields', icon: FiUser },
        { value: '((attendees.[0].formDetails.email))', label: 'Email (Attendee 1)', category: 'Custom Fields', icon: FiUser },
        { value: '((attendees.[0].formDetails.companyname))', label: 'Company Name', category: 'Custom Fields', icon: FiInfo },
        { value: '((attendees.[0].formDetails.115992_customfield1))', label: 'Guest Category', category: 'Custom Fields', icon: FiTag },
        { value: '((attendees.[0].formDetails.115993_customfield2))', label: 'Dietary Preference', category: 'Custom Fields', icon: FiInfo },
    ];

    const categories = Array.from(new Set(mergeFields.map(field => field.category)));

    const filteredFields = mergeFields.filter(field =>
        field.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
        field.value.toLowerCase().includes(searchTerm.toLowerCase()) ||
        field.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const groupedFields = filteredFields.reduce((acc, field) => {
        if (!acc[field.category]) {
            acc[field.category] = [];
        }
        acc[field.category].push(field);
        return acc;
    }, {} as Record<string, typeof mergeFields>);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[80vh] overflow-hidden flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800">Insert Merge Field</h2>
                        <p className="text-sm text-gray-600 mt-1">
                            Personalize your email with attendee information
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <FiX className="h-6 w-6" />
                    </button>
                </div>

                {/* Search Bar */}
                <div className="p-4 border-b border-gray-200">
                    <div className="relative">
                        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search merge fields..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto">
                    <div className="p-6">
                        {Object.entries(groupedFields).length === 0 ? (
                            <div className="text-center py-8">
                                <FiSearch className="mx-auto h-12 w-12 text-gray-400" />
                                <p className="mt-2 text-gray-600">No merge fields found</p>
                                <p className="text-sm text-gray-500">
                                    Try a different search term
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {Object.entries(groupedFields).map(([category, fields]) => (
                                    <div key={category}>
                                        <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                                            <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm">
                                                {category}
                                            </span>
                                            <span className="ml-2 text-xs text-gray-500">
                                                ({fields.length} fields)
                                            </span>
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            {fields.map((field) => {
                                                const IconComponent = field.icon;
                                                return (
                                                    <button
                                                        key={field.value}
                                                        onClick={() => onInsert(field.value)}
                                                        className="text-left p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group"
                                                    >
                                                        <div className="flex items-start space-x-3">
                                                            <div className="flex-shrink-0">
                                                                <IconComponent className="h-5 w-5 text-gray-400 group-hover:text-blue-600" />
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <p className="font-medium text-gray-800 text-sm truncate group-hover:text-blue-700">
                                                                    {field.label}
                                                                </p>
                                                                <p className="text-xs text-blue-600 font-mono mt-1 truncate">
                                                                    {field.value}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-gray-200 bg-gray-50">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <FiInfo className="h-4 w-4 text-gray-400" />
                            <p className="text-sm text-gray-600">
                                These fields will be replaced with actual information when emails are sent
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 text-sm"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
