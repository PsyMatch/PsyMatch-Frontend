'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function OAuthCallback() {
    const router = useRouter();

    useEffect(() => {
        // Dar tiempo para que se establezcan las cookies del backend
        const timer = setTimeout(() => {
            const authToken = Cookies.get('auth_token');

            if (authToken) {
                // Si hay token de Google OAuth, redirigir al dashboard de usuario
                router.push('/dashboard/user');
            } else {
                // Si no hay token, redirigir a login con error
                router.push('/login?error=oauth_failed');
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, [router]);

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-lg">Procesando autenticación con Google...</p>
            </div>
        </div>
    );
}
