import React, { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../lib/stores/authStore';
import BrandedLoader from '../Components/ui/BrandedLoader/BrandedLoader';
// import FiLoader from 'react-icons/fi'; // The FiLoader import is not used and can be removed.


const ProtectedRoute: React.FC = () => {
    const { isAuthenticated, isAuthLoading } = useAuthStore();


    if (isAuthLoading) {
        return <BrandedLoader />;
    }

    // Once the check is done, if not authenticated, redirect to login
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }


    return (
        <Suspense fallback={<BrandedLoader />}>
            <Outlet />
        </Suspense>
    );
};

export default ProtectedRoute;
