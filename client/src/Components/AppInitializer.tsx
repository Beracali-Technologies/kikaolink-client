import { useEffect } from 'react';
import { useAuthStore } from '../lib/stores/authStore';
import { initializeApi } from '../lib/axios';
import BrandedLoader from './ui/BrandedLoader/BrandedLoader';

export const AppInitializer = ({ children }: { children: React.ReactNode }) => {
  const { isAuthLoading, checkAuth } = useAuthStore();

  useEffect(() => {
    const initializeApp = async () => {
      try {
        await initializeApi(); // Setup CSRF
        await checkAuth(); // Check authentication status
      } catch (error) {
        console.log('App initialization completed');
      }
    };

    initializeApp();
  }, [checkAuth]);

  if (isAuthLoading) {
    return <BrandedLoader />;
  }

  return <>{children}</>;
};
