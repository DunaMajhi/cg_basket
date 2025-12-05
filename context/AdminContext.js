'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const AdminContext = createContext();

export function AdminProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminUser, setAdminUser] = useState(null);
  const [adminToken, setAdminToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if admin is logged in on mount
  useEffect(() => {
    setIsLoading(true);
    const savedAdmin = localStorage.getItem('admin_user');
    const savedToken = localStorage.getItem('admin_token');
    if (savedAdmin) {
      try {
        setAdminUser(JSON.parse(savedAdmin));
        setIsAdmin(true);
      } catch (e) {
        console.error('Failed to parse admin data');
      }
    }
    if (savedToken) setAdminToken(savedToken);
    setIsLoading(false);
  }, []);

  const login = (username, password) => {
    // Simple hardcoded auth (in production, use a real backend)
    const ADMIN_USERNAME = 'admin';
    const ADMIN_PASSWORD = 'tribal@2024'; // Change this!

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      const user = { username, loginTime: new Date().toISOString() };
      // On successful login, store admin user and token (dev mode uses NEXT_PUBLIC_ADMIN_API_TOKEN or 'devtoken')
      const token = (typeof process !== 'undefined' && process.env && process.env.NEXT_PUBLIC_ADMIN_API_TOKEN) || 'devtoken';
      localStorage.setItem('admin_user', JSON.stringify(user));
      localStorage.setItem('admin_token', token);
      setAdminUser(user);
      setAdminToken(token);
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('admin_user');
    localStorage.removeItem('admin_token');
    setAdminUser(null);
    setIsAdmin(false);
  };

  return (
    <AdminContext.Provider value={{ isAdmin, adminUser, isLoading, login, logout, adminToken }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  return useContext(AdminContext);
}
