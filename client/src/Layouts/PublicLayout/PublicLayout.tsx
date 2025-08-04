import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../../Features/Landing/Components/Footer/Footer';

const PublicLayout: React.FC = () => {
    return (
        <div>
            {/* The Header is now part of HeroPage, but a global one could go here */}
            <main>
                <Outlet /> {/* This will render HeroPage, LoginPage, etc. */}
            </main>
            <Footer /> {/* Your reusable footer */}
        </div>
    );
};

export default PublicLayout;
