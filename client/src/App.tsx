import { useEffect, Suspense, FC } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './lib/stores/authStore';
import { initializeApi } from './lib/axios';

// --- LAYOUTS ---
import PublicLayout from './Layouts/PublicLayout/PublicLayout';
import DashboardLayout from './Layouts/DashboardLayout/DashboardLayout';
import ProtectedRoute from './Routes/ProtectedRoute';

// --- ROUTE DEFINITIONS ---
import { publicRoutes, privateRoutes } from './Routes/routes'; // Assumes this is renamed to routeDefinitions.ts later

// --- FALLBACK COMPONENTS ---
import NotFound from './Features/NotFound/NotFound';
import BrandedLoader from './Components/ui/BrandedLoader/BrandedLoader';

type AppRoute = {
    path?: string;
    element: JSX.Element;
    index?: boolean;
    children?: AppRoute[];
};

const App: FC = () => {
    const { checkAuth, isAuthLoading } = useAuthStore();

    useEffect(() => {
        const initializeApp = async () => {
            try {
                await initializeApi();
                console.log('Sanctum CSRF cookie initialized');
                await checkAuth();
                console.log('Authentication status checked');
            } catch (error) {
                console.error('App initialization failed:', error);
            }
        };
        initializeApp();
        // An empty dependency array ensures this runs exactly ONCE on app startup.
    }, []);

    // Helper function to render nested routes
    const renderRoutes = (routes: AppRoute[]) => {
        return routes.map((route) => {
            const { path, element, children, index } = route;
            const key = path || (index ? 'index-route' : 'default-key');

            // --- THIS IS THE KEY FIX ---
            // The Route component is created dynamically based on whether it's an index route.
            if (index) {
                return <Route key={key} index element={element} />;
            }

            return (
                <Route key={key} path={path} element={element}>
                    {children && renderRoutes(children)}
                </Route>
            );
        });
    };

    // Show a loader during the initial app load and auth check
    if (isAuthLoading) {
        return <BrandedLoader />;
    }

    return (
        <Suspense fallback={<BrandedLoader />}>
            <Router>
                <Routes>
                    <Route element={<PublicLayout />}>
                        {renderRoutes(publicRoutes as AppRoute[])}
                    </Route>

                    <Route path="/dashboard" element={<ProtectedRoute />}>
                        <Route element={<DashboardLayout />}>
                            {renderRoutes(privateRoutes as AppRoute[])}
                            <Route index element={<Navigate to="/dashboard/events" replace />} />
                        </Route>
                    </Route>

                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
        </Suspense>
    );
};

export default App;
