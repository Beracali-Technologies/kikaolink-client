// src/Layouts/EventSettingsLayout/EventSettingsLayout.tsx
import React, { useState, useEffect, useMemo } from 'react';
import { Outlet, useParams, useLocation } from 'react-router-dom';
import { useEventStore } from '../../lib/stores/eventStore';
import BrandedLoader from '../../components/ui/BrandedLoader/BrandedLoader';
import { FiMenu, FiX, FiSettings, FiFileText, FiMail, FiPrinter, FiCheckSquare, FiInfo, FiCreditCard } from 'react-icons/fi';
import { SideBarGroup } from './components/SideBarGroup';
import { SideBarLink } from './components/SideBarLink';
import { StepIndicator } from './components/StepIndicator';

interface NavLinkItem {
    name: string;
    to: string;
    icon: React.ComponentType<{ className?: string }>;
    disabled?: boolean;
}

interface NavLinkGroup {
    title: string;
    icon: React.ComponentType<{ className?: string }>;
    links: NavLinkItem[];
}

const EventSettingsLayout: React.FC = () => {
    const { eventId } = useParams<{ eventId: string }>();
    const { pathname } = useLocation();
    const { currentEvent, fetchEventById, isLoading } = useEventStore();
    const [isNavOpen, setIsNavOpen] = useState(true);

    useEffect(() => {
        if (eventId) {
            fetchEventById(eventId);
        }
    }, [eventId, fetchEventById]);

    // Enhanced current step detection
    const currentStep = useMemo(() => {
        if (pathname.includes('/registration-form')) return 1;
        if (pathname.includes('/email')) return 2;
        if (pathname.includes('/tickets')) return 3;

        return 0; // Event Information
    }, [pathname]);

    const eventSteps = ['Event Info', 'Registration', 'Email', 'Tickets', ];

    // Navigation data
    const settingsNavigation: NavLinkGroup[] = [
        {
            title: 'EVENT SETUP',
            icon: FiSettings,
            links: [
                {
                    name: 'Event Information',
                    to: `/dashboard/events/${eventId}/info`,
                    icon: FiInfo,
                    disabled: false
                },
                {
                    name: 'Registration Form',
                    to: `/dashboard/events/${eventId}/registration-form`,
                    icon: FiFileText,
                    disabled: false
                },
                {
                    name: 'Email Confirmation',
                    to: `/dashboard/events/${eventId}/email`,
                    icon: FiMail,
                    disabled: false
                },
                {
                    name: 'Tickets & Pricing',
                    to: `/dashboard/events/${eventId}/tickets`,
                    icon: FiCreditCard,
                    disabled: false
                }
            ]
        },
        {
            title: 'BADGE PRINTING',
            icon: FiPrinter,
            links: [
                    {
                        name: 'Badge Designer',
                        to: '#',
                        icon: FiPrinter,
                        disabled: true
                    }
            ]
        },
        {
            title: 'CHECK-IN',
            icon: FiCheckSquare,
            links: [
                      {
                    name: 'Multi-Session',
                    to: '#',
                    icon: FiCheckSquare,
                    disabled: true
                },
                {
                    name: 'App Login QR',
                    to: '#',
                    icon: FiCheckSquare,
                    disabled: true
                },
            ]
        },
    ];

    if (isLoading && !currentEvent) {
        return <div className="w-full h-full flex items-center justify-center"><BrandedLoader /></div>;
    }

    return (
        <div className="relative w-full h-full flex">
            {/* Settings Sidebar */}
            <aside className={`transition-all duration-300 flex-shrink-0 bg-white border-r border-gray-200 shadow-sm ${isNavOpen ? 'w-80' : 'w-0'}`}>
                <div className={`overflow-hidden h-full flex flex-col transition-opacity ${isNavOpen ? 'opacity-100' : 'opacity-0'}`}>
                    {/* Header */}
                    <div className="px-6 py-5 flex items-center justify-between border-b border-gray-100 bg-gray-50">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800">Event Settings</h2>
                            {currentEvent && (
                                <p className="text-sm text-gray-500 mt-1">{currentEvent.title}</p>
                            )}
                        </div>
                        <button
                            onClick={() => setIsNavOpen(false)}
                            className="p-1.5 rounded-md hover:bg-gray-200 text-gray-500 lg:hidden"
                        >
                            <FiX className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-grow px-4 py-6 space-y-8 overflow-y-auto">
                        {settingsNavigation.map(group => (
                            <SideBarGroup key={group.title} title={group.title} icon={group.icon}>
                                {group.links.map(link => (
                                    <SideBarLink
                                        key={link.name}
                                        to={link.to}
                                        icon={link.icon}
                                        disabled={link.disabled}
                                        end={link.to.endsWith('/info')}
                                    >
                                        {link.name}
                                    </SideBarLink>
                                ))}
                            </SideBarGroup>
                        ))}
                    </nav>

                    {/* Current Step Indicator in Sidebar */}
                    <div className="px-4 py-4 border-t border-gray-100 bg-gray-50">
                        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                            Current Step
                        </div>
                        <div className="text-sm font-medium text-blue-600">
                            {eventSteps[currentStep]}
                        </div>
                        <div className="mt-2 flex items-center">
                            {eventSteps.map((_, index) => (
                                <div
                                    key={index}
                                    className={`h-1 rounded-full mx-0.5 ${
                                        index === currentStep
                                            ? 'w-6 bg-blue-600'
                                            : index < currentStep
                                            ? 'w-4 bg-blue-400'
                                            : 'w-2 bg-gray-300'
                                    }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col overflow-y-auto bg-gray-50">
                {/* Top Bar */}
                <div className="flex-shrink-0 h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between">
                    <div className="flex items-center">
                        <button
                            onClick={() => setIsNavOpen(!isNavOpen)}
                            className="p-2.5 rounded-lg hover:bg-gray-100 mr-4"
                        >
                            <FiMenu className="h-5 w-5 text-gray-600"/>
                        </button>
                        <div className="hidden md:block">
                            <StepIndicator steps={eventSteps} currentStep={currentStep} />
                        </div>
                    </div>

                    {/* Progress indicator for mobile */}
                    <div className="md:hidden flex items-center">
                        <span className="text-sm text-gray-600 mr-2">Step {currentStep + 1} of {eventSteps.length}</span>
                        <div className="flex items-center">
                            {eventSteps.map((_, index) => (
                                <div
                                    key={index}
                                    className={`h-2 w-2 rounded-full mx-1 ${
                                        index === currentStep
                                            ? 'bg-blue-600'
                                            : index < currentStep
                                            ? 'bg-blue-400'
                                            : 'bg-gray-300'
                                    }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-grow p-6">
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <Outlet />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default EventSettingsLayout;
