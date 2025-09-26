import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../../Features/Landing/components/Footer/Footer';

const PublicLayout: React.FC = () => {
        const location = useLocation();

        const hideFooter = location.pathname.startsWith(`/events/`) || location.pathname.startsWith('/register-attendee/')
                            || location.pathname.startsWith('/registration-success/');

    return (
        <div>
            {/* The Header is now part of HeroPage, but a global one could go here */}
            <main>
                <Outlet /> {/* This will render HeroPage, LoginPage, etc. */}
            </main>
                { !hideFooter && <Footer />  }
        </div>
    );
};

export default PublicLayout;
