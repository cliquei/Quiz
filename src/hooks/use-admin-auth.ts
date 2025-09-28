import { useState, useEffect } from 'react';

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'password123'; // Por favor, use uma senha mais segura em um ambiente real!

export function useAdminAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('isAdminAuthenticated') === 'true';
    }
    return false;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('isAdminAuthenticated', String(isAuthenticated));
    }
  }, [isAuthenticated]);

  const login = (username: string, password: string): boolean => {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      return true;
    }
    setIsAuthenticated(false);
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return {
    isAuthenticated,
    login,
    logout,
    ADMIN_USERNAME,
    ADMIN_PASSWORD,
  };
}