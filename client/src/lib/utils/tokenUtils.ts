// Simple token management utilities
export const storeAuthToken = (token: string): void => {
  localStorage.setItem('token', token);
  console.log('Token stored in localStorage');
};

export const getAuthToken = (): string | null => {
  return localStorage.getItem('token');
};

export const clearAuthToken = (): void => {
  localStorage.removeItem('token');
  console.log('Token cleared from localStorage');
};
