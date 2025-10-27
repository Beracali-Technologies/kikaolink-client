import React from 'react';
import { Outlet } from 'react-router-dom';
import TopBar from '@/Features/Dashboard/components/TopBar/TopBar';

const LandingLayout: React.FC = () => {
    return (
        <div className="min-h-screen bg-[#0E2344]">
            <TopBar onMenuClick={() => {}} />
            <Outlet />
        </div>
    );
};

export default LandingLayout;
