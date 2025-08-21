'use client';
import { useState, useEffect } from 'react';
import { usersApi, User, UpdateUserData } from '@/services/users';
import Cookies from 'js-cookie';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const token = Cookies.get('authToken') || Cookies.get('auth_token');
      
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      const response = await usersApi.getMe(token);
      setUser(response.data);
      setError(null);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
      setUser(null);
      // Si hay error de autenticación, limpiar tokens
      if (errorMessage.includes('401') || errorMessage.includes('Unauthorized')) {
        Cookies.remove('authToken');
        Cookies.remove('auth_token');
        Cookies.remove('role');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const updateUserProfile = async (userData: UpdateUserData) => {
    try {
      const token = Cookies.get('authToken') || Cookies.get('auth_token');
      if (!token) throw new Error('No authenticated');

      const response = await usersApi.updateMe(userData, token);
      
      // Actualizar el estado local inmediatamente con los datos actualizados
      setUser(response.data);
      
      // También refrescar desde el servidor para asegurar sincronización
      await fetchUserProfile();
      
      return response.data;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
      throw err;
    }
  };

  const logout = async () => {
    try {
      // Intentar hacer logout en el servidor primero
      const token = Cookies.get('authToken') || Cookies.get('auth_token');
      if (token) {
        await usersApi.logout(token);
      }
    } catch (error) {
      console.warn('Error en logout del servidor:', error);
      // Continuar con logout local aunque falle el servidor
    } finally {
      // Limpiar todas las cookies de autenticación
      Cookies.remove('authToken', { path: '/' });
      Cookies.remove('auth_token', { path: '/' });
      Cookies.remove('role', { path: '/' });
      
      // Limpiar localStorage
      localStorage.removeItem('authToken');
      localStorage.removeItem('auth_token');
      localStorage.removeItem('role');
      
      // Limpiar sessionStorage por si acaso
      sessionStorage.removeItem('authToken');
      sessionStorage.removeItem('auth_token');
      sessionStorage.removeItem('role');
      
      // Limpiar estado del usuario
      setUser(null);
      setError(null);
      
      // Redirigir a la página principal o login
      if (typeof window !== 'undefined') {
        window.location.href = '/';
      }
    }
  };

  const checkMissingData = (): boolean => {
    if (!user) return false;
    return usersApi.checkMissingData(user);
  };

  return {
    user,
    loading,
    error,
    updateUserProfile,
    logout,
    checkMissingData,
    refetchUser: fetchUserProfile,
  };
};
