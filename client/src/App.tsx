import React, { FC, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuthStore } from './lib/stores/authStore';
import { initializeApi } from './lib/axios';

// --- COMPONENTS & LAYOUTS ---
import ProtectedRoute from './Routes/ProtectedRoute';
import PublicRoutes from './Routes/PublicRoutes';
import PrivateRoutes from './Routes/PrivateRoutes';
import PublicLayout from './Layouts/PublicLayout/PublicLayout';
import DashboardLayout from './Layouts/DashboardLayout/DashboardLayout';
import NotFound from './Features/NotFound/NotFound';
import BrandedLoader from './Components/ui/BrandedLoader/BrandedLoader';

const App: FC = () => {
    const { isAuthLoading, checkAuth } = useAuthStore();

    useEffect(() => {
        const initializeApp = async () => {
            await initializeApi();
            await checkAuth();
        };
        initializeApp();
    }, []);

    if (isAuthLoading) {
        return <BrandedLoader />;
    }
    
    return (
        <Suspense fallback={<BrandedLoader />}>
            <Router>
                <Routes>
                    {/* Public Routes are children of the root path */}
                    <Route path="/" element={<PublicLayout />}>
                        {PublicRoutes()}
                    </Route>

                    {/* All private routes are nested under /dashboard */}
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <DashboardLayout />
                            </ProtectedRoute>
                        }
                    >
                        {PrivateRoutes()}
                    </Route>

                    {/* Top-level catch-all 404 */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
        </Suspense>
    );
};

export default App;
