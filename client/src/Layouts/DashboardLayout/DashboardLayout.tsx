import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../Features/Dashboard/Components/Sidebar/Sidebar'; // Using your sidebar


//side bar wrap to protect against organizer pages
const DashboardLayout: React.FC = () => {
    return (
        <div className="flex h-screen bg-slate-100">
                <Sidebar />

                <div className="flex-1 flex flex-col overflow-hidden">
                        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-8">
                            <Outlet /> {/* This is where your nested routes will render */}
                        </main>
                </div>

      </div>
    );
};

export default DashboardLayout;
