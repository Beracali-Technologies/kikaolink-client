import React from 'react';
import { NavLink, Outlet, useParams } from 'react-router-dom';

// Placeholder icons for the new sidebar
const SettingsIcon = () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.096 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const CheckinIcon = () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;

const EventSettingsLayout: React.FC = () => {
    // In a real app, you'd fetch the event title using this ID
    const { eventId } = useParams<{ eventId: string }>();

    const tabs = [
        { name: '1. Event Information', path: `/dashboard/events/${eventId}/info`},
        { name: '2. Registration Form', path: `/dashboard/events/${eventId}/registration-form-editor`}
    ];

    return (
        <div className="flex h-full gap-8">
            {/* Left Sidebar for Event Settings */}
            <aside className="w-56 flex-shrink-0">
                <h3 className="text-lg font-bold text-dark-text">[Demo] Leadership Conference</h3>
                <nav className="mt-6 space-y-1">
                     <div className="p-2">
                        <span className="text-xs font-semibold text-light-text uppercase">Setting</span>
                        <div className="mt-2 space-y-1">
                             <NavLink to={`/dashboard/events/${eventId}/info`} className="block text-sm p-2 rounded-md hover:bg-gray-100">Event Information</NavLink>
                             <NavLink to={`/dashboard/events/${eventId}/registration-form`} className="block text-sm p-2 rounded-md hover:bg-gray-100">Registration Form</NavLink>
                        </div>
                    </div>
                     <div className="p-2">
                        <span className="text-xs font-semibold text-light-text uppercase">Check-in</span>
                        <div className="mt-2 space-y-1">
                           <NavLink to={`/dashboard/events/${eventId}/checkin-app`} className="block text-sm p-2 rounded-md hover:bg-gray-100">App Login QR</NavLink>
                        </div>
                    </div>
                </nav>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 bg-white rounded-xl shadow-md p-6">
                {/* Tabs at the top */}
                <div className="border-b border-gray-200 mb-6">
                    <nav className="-mb-px flex space-x-6">
                        {tabs.map(tab => (
                             <NavLink key={tab.name} to={tab.path}
                                 className={({ isActive }) =>
                                    `whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${
                                        isActive
                                        ? 'border-primary-blue text-primary-blue'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`
                                }
                            >
                                {tab.name}
                            </NavLink>
                        ))}
                    </nav>
                </div>
                {/* Nested page content will be rendered here */}
                <Outlet />
            </div>
        </div>
    );
};

export default EventSettingsLayout;
