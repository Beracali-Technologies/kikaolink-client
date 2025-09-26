import { useState } from 'react';
import { RegistrationData, RegistrationResponse } from '@/types';
import { registrationService } from '../../services/registrationService';



export const useRegistration = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<RegistrationResponse | null>(null);

  const register = async (registrationData: RegistrationData) => {
    setLoading(true);
    setError(null);

    try {
      const result = await registrationService.register(registrationData);
      setData(result);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    register,
    loading,
    error,
    data
  };
};
