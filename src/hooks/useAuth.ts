'use client';
import { useState, useEffect } from 'react';
import { usersApi, User, UpdateUserData } from '@/services/users';
import Cookies from 'js-cookie';
import { triggerAuthStateChange } from '@/utils/auth';

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

            setUser(response.data);

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
            const token = Cookies.get('authToken') || Cookies.get('auth_token');
            if (token) {
                await usersApi.logout(token);
            }
        } catch (error) {
            console.warn('Error en logout del servidor:', error);
        } finally {
            Cookies.remove('auth_token', { path: '/' });
            Cookies.remove('role', { path: '/' });

            setUser(null);
            setError(null);

            triggerAuthStateChange();

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
