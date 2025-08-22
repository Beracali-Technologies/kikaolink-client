import React, { FC, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../lib/stores/authStore';
import { initializeApi } from '../lib/axios';
import BrandedLoader from '../Components/ui/BrandedLoader/BrandedLoader';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
    const { isAuthenticated, isAuthLoading, checkAuth } = useAuthStore();
    const location = useLocation();

    // --- THIS IS THE NEW LOGIC ---
    // The auth check is now triggered here, ONLY when a protected route is accessed.
    useEffect(() => {
        const initializeAndCheck = async () => {
            await initializeApi();
            await checkAuth();
        };
        initializeAndCheck();
    }, []); // Runs once when this component first tries to load

    // 1. While the check is in progress, show a full-screen loader.
    if (isAuthLoading) {
        return <BrandedLoader />;
    }

    // 2. Once the check is complete, if the user is NOT authenticated, redirect them to login.
    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // 3. If the check is complete and the user IS authenticated, show the requested dashboard content.
    return <>{children}</>;
};

export default ProtectedRoute;
