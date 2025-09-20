import { FC, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from './Routes/routeDefinitions';
import BrandedLoader from './components/ui/BrandedLoader/BrandedLoader';


// --- Creating the router instance ONCE, outside the component ---
const router = createBrowserRouter(routes);


const App: FC = () => {

    // Suspense handles the lazy loading of all our components defined in the router.
    return (
        <Suspense fallback={<BrandedLoader />}>
            <RouterProvider router={router} />
        </Suspense>
    );
};

export default App;
