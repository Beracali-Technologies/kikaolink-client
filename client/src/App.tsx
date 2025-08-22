import { FC, Suspense, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useAuthStore } from './lib/stores/authStore';
import { initializeApi } from './lib/axios';

// --- THE SINGLE SOURCE OF TRUTH FOR ROUTES ---
import { routes } from './Routes/routeDefinitions';
import BrandedLoader from './Components/ui/BrandedLoader/BrandedLoader';

// --- Create the router instance ONCE, outside the component ---
const router = createBrowserRouter(routes);

const App: FC = () => {
    const { isAuthLoading, checkAuth } = useAuthStore();

    // This effect runs only once to initialize the application.
    useEffect(() => {
        const initializeApp = async () => {
            await initializeApi();
            await checkAuth();
        };
        initializeApp();
    }, []);

    // While checking authentication, show a branded loader.
    if (isAuthLoading) {
        return <BrandedLoader />;
    }

    // --- Render the app using the RouterProvider ---
    // Suspense handles the lazy loading of all our components defined in the router.
    return (
        <Suspense fallback={<BrandedLoader />}>
            <RouterProvider router={router} />
        </Suspense>
    );
};

export default App;
