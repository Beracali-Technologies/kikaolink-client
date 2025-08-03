import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../Features/Dashboard/Components/Sidebar/Sidebar'; // Using your sidebar


//side bar wrap to protect against organizer pages
const DashboardLayout: React.FC = () => {
    return (
        <div className="flex h-screen bg-light-bg">
            <Sidebar />
            <main className="flex-1 p-8 overflow-y-auto">
                <Outlet /> {/* This is where your nested routes will render */}
            </main>
        </div>
    );
};

export default DashboardLayout;
