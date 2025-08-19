import { useEffect, Suspense, FC } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { initializeCsrfCookie } from './services/eventService'; // Ensure this path is correct
import { useAuthStore } from './lib/stores/authStore';


// --- LAYOUTS ---
import PublicLayout from './Layouts/PublicLayout/PublicLayout';
import DashboardLayout from './Layouts/DashboardLayout/DashboardLayout';
import ProtectedRoute from './Routes/ProtectedRoute'; // Your security guard

// --- ROUTE DEFINITIONS ---
import { publicRoutes, privateRoutes } from './Routes/routes';

// --- FALLBACK COMPONENTS ---
import NotFound from './Features/NotFound/NotFound';
import BrandedLoader from './Components/ui/BrandedLoader/BrandedLoader';

// A helper type for our route objects to make TypeScript happy
interface AppRoute {
  path: string;
  element: JSX.Element;
  children?: AppRoute[];
}

const App: FC = () => {

    const { checkAuth, isAuthLoading } = useAuthStore();

    useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    // This runs once when the app loads to get the Sanctum security cookie
    initializeCsrfCookie()
      .then(() => console.log('Sanctum CSRF cookie initialized'))
      .catch(error => console.error('Failed to initialize CSRF cookie:', error));
  }, []);

  // Helper function to render nested routes recursively
  const renderRoutes = (routes: AppRoute[]) => {
    return routes.map(({ path, element, children }) => (
      <Route key={path} path={path} element={element}>
        {children && renderRoutes(children)}
      </Route>
    ));
  };

  return (
    // Suspense is the key to making lazy loading work with a fallback UI
    <Suspense fallback={<BrandedLoader />}>
      <Router>
        <Routes>
          {/* --- PUBLIC ROUTES --- */}
          {/* All public routes are rendered inside the PublicLayout */}
          <Route element={<PublicLayout />}>
            {renderRoutes(publicRoutes)}
          </Route>

          {/* --- PRIVATE DASHBOARD ROUTES (The key change is here) --- */}
          <Route path="/dashboard" element={<ProtectedRoute />}>
            {/* If the user is authenticated, they get access to the DashboardLayout */}
            <Route element={<DashboardLayout />}>
                {/* Now we render all the private routes inside the dashboard layout */}
                {renderRoutes(privateRoutes)}

                {/* Redirect from /dashboard to /dashboard/events */}
                <Route index element={<Navigate to="/dashboard/events" replace />} />
            </Route>
          </Route>

          {/* --- 404 NOT FOUND PAGE --- */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </Suspense>
  );
};

export default App;
