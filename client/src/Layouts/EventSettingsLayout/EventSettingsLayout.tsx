// src/Layouts/EventSettingsLayout/EventSettingsLayout.tsx
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const EventSettingsLayout: React.FC = () => {
    return (
        // The two-tone background effect is created by this flex container.
        <div className="flex h-full flex-col lg:flex-row gap-0">
            {/* --- Secondary Sidebar (The "Mini Navigation Bar") --- */}
            <aside className="w-full lg:w-60 flex-shrink-0 bg-slate-50 p-6 rounded-t-xl lg:rounded-tr-none lg:rounded-l-xl">
                <nav className="space-y-6">
                    {/* Event Setup Group */}
                    <div>
                        <h3 className="px-3 text-xs font-bold uppercase text-slate-400 tracking-wider">
                            Event Setup
                        </h3>
                        <div className="mt-2 space-y-1">
                            <NavLink to="info" className={({isActive}) => `block rounded-md px-3 py-2 text-sm transition-colors ${isActive ? 'font-bold text-primary-blue bg-blue-100' : 'font-medium text-slate-700 hover:bg-slate-200'}`}>
                                Event Information
                            </NavLink>
                            <NavLink to="registration-form" className={({isActive}) => `block rounded-md px-3 py-2 text-sm transition-colors ${isActive ? 'font-bold text-primary-blue bg-blue-100' : 'font-medium text-slate-700 hover:bg-slate-200'}`}>
                                Registration Form
                            </NavLink>
                            <NavLink to="#" className="block rounded-md px-3 py-2 text-sm font-medium text-slate-400 cursor-not-allowed">
                                Confirmation Email
                            </NavLink>
                        </div>
                    </div>

                    {/* Badge Printing Group */}
                    <div>
                         <h3 className="px-3 text-xs font-bold uppercase text-slate-400 tracking-wider">
                            Badge Printing
                        </h3>
                        <div className="mt-2 space-y-1">
                            <NavLink to="#" className="block rounded-md px-3 py-2 text-sm font-medium text-slate-400 cursor-not-allowed">
                                Badge Designer
                            </NavLink>
                        </div>
                    </div>
                </nav>
            </aside>

            {/* --- Main Content Area for the selected setting --- */}
            <main className="flex-1 overflow-y-auto bg-white p-8 rounded-b-xl lg:rounded-bl-none lg:rounded-r-xl">
                 <Outlet />
            </main>
        </div>
    );
};

export default EventSettingsLayout;
