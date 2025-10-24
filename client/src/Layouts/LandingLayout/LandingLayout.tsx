// Layouts/LandingLayout/LandingLayout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import TopBar from '../../Features/Dashboard/components/Header/TopBar';

const LandingLayout: React.FC = () => {
    return (
        <div className="min-h-screen bg-[#0E2344]">
            <TopBar />
            <Outlet />
        </div>
    );
};

export default LandingLayout;
