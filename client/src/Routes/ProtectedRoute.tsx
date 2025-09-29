import React, { FC, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../lib/stores/authStore';
import BrandedLoader from '../components/ui/BrandedLoader/BrandedLoader';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
    const { isAuthenticated, isAuthLoading, checkAuth } = useAuthStore();
    const location = useLocation();

    useEffect(() => {
        // Only check auth if not already checked and loading
        if (!isAuthLoading && !isAuthenticated) {
            checkAuth();
        }
    }, [isAuthLoading, isAuthenticated, checkAuth]);

    // Show loader while checking auth
    if (isAuthLoading) {
        return <BrandedLoader />;
    }

    // Redirect to login if not authenticated
    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Render children if authenticated
    return <>{children}</>;
};

export default ProtectedRoute;
