import api from '../lib/axios';
import { TLoginCredentials, TSignupCredentials } from '@/types/user';
import { storeAuthToken, getAuthToken } from '../lib/utils/tokenUtils';

export const registerUser = async (credentials: TSignupCredentials) => {
  const response = await api.post('/api/register', credentials);
  if (response.data.token) {
    storeAuthToken(response.data.token);
  } else if (response.data.access_token) {
    storeAuthToken(response.data.access_token);
  }
  return response.data;
};

export const loginUser = async (credentials: TLoginCredentials) => {
  const response = await api.post('/api/login', credentials);
  console.log('Login API Response:', response.data); // Debug the response
  if (response.data.token) {
    storeAuthToken(response.data.token);
  } else if (response.data.access_token) {
    storeAuthToken(response.data.access_token);
  } else {
    throw new Error('No token received from server');
  }
  return response.data;
};

export const checkAuthStatus = async () => {
  const token = getAuthToken();
  if (!token) {
    return null;
  }

  try {
    const { data } = await api.get('/api/user');
    return data;
  } catch (error) {
    return null;
  }
};

export const logoutUser = async () => {
  await api.post('/api/logout');
};
