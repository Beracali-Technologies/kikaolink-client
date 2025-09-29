export const storeAuthToken = (token: string) => {
  localStorage.setItem('authToken', token);
  console.log('Token stored:', token); // Debug
};

export const getAuthToken = (): string | null => {
  const token = localStorage.getItem('authToken');
  console.log('Token retrieved:', token); // Debug
  return token;
};

export const clearAuthToken = () => {
  localStorage.removeItem('authToken');
};
