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
    // Only check auth if not already authenticated and not already loading
    if (!isAuthenticated && isAuthLoading) {
      checkAuth();
    }
  }, [isAuthenticated, isAuthLoading, checkAuth]);

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
