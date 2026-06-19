import React, { createContext, useContext, useEffect, useState } from 'react';
import { authService } from '../services/resources';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authService
      .me()
      .then((res) => setAdmin(res.admin))
      .catch(() => setAdmin(null))
      .finally(() => setLoading(false));
  }, []);

  async function login(email, password) {
    const res = await authService.login(email, password);
    if (res.token) localStorage.setItem('admin_token', res.token);
    setAdmin(res.admin);
    return res.admin;
  }

  async function logout() {
    try {
      await authService.logout();
    } catch {
      // ignoramos errores de red al cerrar sesión
    }
    localStorage.removeItem('admin_token');
    setAdmin(null);
  }

  return (
    <AuthContext.Provider value={{ admin, loading, login, logout, setAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de <AuthProvider>');
  return ctx;
}