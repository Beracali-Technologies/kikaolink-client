import { useEffect, useState } from 'react';
import { useAuthStore } from '../lib/stores/authStore';
import { initializeApi } from '../lib/axios';
import BrandedLoader from './ui/BrandedLoader/BrandedLoader';

export const AppInitializer = ({ children }: { children: React.ReactNode }) => {
  const { isAuthLoading, checkAuth, user } = useAuthStore();
  const [isInitialized, setIsInitialized] = useState(false);


  useEffect(() => {
    const initializeApp = async () => {
      try {
              //only to initilize csrf if the user is autheniticated
            if(user) {
                  const { user, checkAuth } = useAuthStore();
            }

        await checkAuth(); // Check authentication status
          setIsInitialized(true);
      } catch (error) {
        console.log('App initialization failed', error);
           setIsInitialized(true);
      }
    };

    initializeApp();
  }, [checkAuth]);

  if (isAuthLoading) {
    return <BrandedLoader />;
  }

  return <>{children}</>;
};
