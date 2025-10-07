import { useEffect, useState } from 'react';
import { useAuthStore } from '../lib/stores/authStore';
import BrandedLoader from './ui/BrandedLoader/BrandedLoader';

export const AppInitializer = ({ children }: { children: React.ReactNode }) => {
  const { isAuthLoading, checkAuth } = useAuthStore();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        await checkAuth(); // Check authentication status
        setIsInitialized(true);
      } catch (error) {
        console.log('App initialization failed', error);
        setIsInitialized(true); // Proceed even on error
      }
    };

    initializeApp();
  }, [checkAuth]);

  if (isAuthLoading || !isInitialized) {
    return <BrandedLoader />;
  }

  return <>{children}</>;
};
