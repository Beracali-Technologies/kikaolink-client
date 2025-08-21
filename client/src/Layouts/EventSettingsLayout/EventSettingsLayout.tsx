import React, { useState, useEffect, useMemo } from 'react';
import { NavLink, Outlet, useParams, useLocation } from 'react-router-dom';
import { useEventStore } from '../../lib/stores/eventStore'; // Ensure path is correct
import BrandedLoader from '../../Components/ui/BrandedLoader/BrandedLoader'; // Your loader
import { ArrowStepper } from '../../Features/Dashboard/Components/Stepper/Stepper'; // The Stepper we just created
import { FiMenu } from 'react-icons/fi';

const EventSettingsLayout: React.FC = () => {
    const { eventId } = useParams<{ eventId: string }>();
    const { pathname } = useLocation();
    const { currentEvent, fetchEventById, isLoading } = useEventStore();
    const [isNavOpen, setIsNavOpen] = useState(true); // State for the settings sidebar

    // Fetch the specific event's data when the component loads
    useEffect(() => {
        if (eventId) {
            fetchEventById(eventId);
        }
    }, [eventId, fetchEventById]);

    // Logic to control the active step in the ArrowStepper
    const currentStep = useMemo(() => {
        if (pathname.includes('/registration-form')) return 1;
        if (pathname.includes('/tickets')) return 2;
        return 0; // Default step is Event Information
    }, [pathname]);

    const eventSteps = ['Event Information', 'Registration Form', 'Tickets & Pricing'];

    // Data for the nested sidebar links
    const settingsNavigation = [
        { title: 'Event Setup', links: [
            { name: 'Event Information', to: `/dashboard/events/${eventId}/info` },
            { name: 'Registration Form', to: `/dashboard/events/${eventId}/registration-form` },
            { name: 'Confirmation Email', to: '#', disabled: true },
        ]},
        { title: 'Badge Printing', links: [{ name: 'Badge Designer', to: '#', disabled: true }] },
        { title: 'Check-in', links: [
            { name: 'Multi-Session', to: '#', disabled: true },
            { name: 'App Login QR', to: '#', disabled: true },
        ]},
    ];

    // While fetching the event, show a full-page loader
    if (isLoading && !currentEvent) {
        return <div className="w-full h-full flex items-center justify-center"><BrandedLoader /></div>;
    }

    return (
        <div className="relative w-full h-full flex">
            {/* --- COLUMN 2: The Collapsible, Light Gray Settings Sidebar --- */}
            <aside className={`transition-all duration-300 flex-shrink-0 bg-slate-100 border-r border-slate-200 ${isNavOpen ? 'w-72' : 'w-0'}`}>
                <div className={`overflow-hidden h-full flex flex-col pt-5 transition-opacity ${isNavOpen ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="px-6 flex items-center justify-between">
                         <h2 className="text-sm font-bold uppercase text-slate-500">Setting</h2>
                         <button onClick={() => setIsNavOpen(false)} className="p-1 rounded-md hover:bg-slate-200 lg:hidden">
                            {/* Mobile close button if needed */}
                         </button>
                    </div>
                    <nav className="flex-grow mt-6 px-6 space-y-6">
                        {settingsNavigation.map(group => (
                            <div key={group.title}>
                                <h3 className="px-3 text-xs font-semibold uppercase text-slate-500 tracking-tight">{group.title}</h3>
                                <div className="mt-2 space-y-1">
                                    {group.links.map(link => (
                                        <NavLink key={link.name} to={link.to} end
                                            className={({ isActive }) =>
                                                `block rounded-md px-3 py-2 text-sm font-medium
                                                 ${isActive ? 'bg-green-100 text-green-700' : 'text-slate-600 hover:bg-slate-200'}
                                                 ${link.disabled ? 'text-slate-400 cursor-not-allowed hover:bg-transparent' : ''}`
                                            }>
                                            {link.name}
                                        </NavLink>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </nav>
                </div>
            </aside>

            {/* --- COLUMN 3: The Main White Content Area --- */}
            <main className="flex-1 flex flex-col overflow-y-auto">
                <div className="flex-shrink-0 h-[60px] bg-white border-b px-6 flex items-center gap-4">
                    <button onClick={() => setIsNavOpen(!isNavOpen)} className="p-2 rounded-md hover:bg-gray-100 -ml-2">
                        <FiMenu className="h-5 w-5 text-gray-600"/>
                    </button>
                    <ArrowStepper steps={eventSteps} currentStep={currentStep} />
                </div>
                <div className="flex-grow p-6 md:p-8 bg-slate-50">
                    <Outlet /> {/* This renders your EventForm, RegistrationFormEditor, etc. */}
                </div>
            </main>
        </div>
    );
};

export default EventSettingsLayout;
