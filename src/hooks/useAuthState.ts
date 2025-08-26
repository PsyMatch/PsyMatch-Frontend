'use client';
import { useEffect, useState, useCallback } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

interface AuthState {
    token: string | null;
    userRole: string | null;
    isAuthenticated: boolean;
}

export const useAuthState = () => {
    const [authState, setAuthState] = useState<AuthState>({
        token: null,
        userRole: null,
        isAuthenticated: false,
    });

    const _router = useRouter();

    const updateAuthState = useCallback(() => {
        const token = Cookies.get('auth_token') || null;
        const userRole = Cookies.get('role') || null;

        setAuthState({
            token,
            userRole,
            isAuthenticated: !!token,
        });
    }, []);

    useEffect(() => {
        updateAuthState();
    }, [updateAuthState]);

    useEffect(() => {
        const handleAuthChange = () => {
            updateAuthState();
        };

        window.addEventListener('authStateChange', handleAuthChange);

        return () => {
            window.removeEventListener('authStateChange', handleAuthChange);
        };
    }, [updateAuthState]);

    const triggerAuthChange = useCallback(() => {
        updateAuthState();
        window.dispatchEvent(new CustomEvent('authStateChange'));
    }, [updateAuthState]);

    return {
        ...authState,
        triggerAuthChange,
        updateAuthState,
    };
};
