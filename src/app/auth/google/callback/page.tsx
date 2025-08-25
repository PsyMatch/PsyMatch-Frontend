'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { triggerAuthStateChange } from '@/utils/auth';

export default function GoogleCallbackPage() {
    const router = useRouter();

    useEffect(() => {
        const checkAuthAndRedirect = () => {
            const auth_token = Cookies.get('auth_token');

            if (auth_token) {
                triggerAuthStateChange();

                const userRole = Cookies.get('role');

                if (userRole === 'Psicólogo') {
                    router.push('/dashboard/professional');
                } else if (userRole === 'Administrador') {
                    router.push('/dashboard/admin');
                } else {
                    router.push('/dashboard/user');
                }
            } else {
                router.push('/?error=oauth_failed');
            }
        };

        const timer = setTimeout(checkAuthAndRedirect, 1500);

        return () => clearTimeout(timer);
    }, [router]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="text-center p-8 bg-white rounded-lg shadow-lg">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Iniciando sesión...</h2>
                <p className="text-gray-600">Te estamos redirigiendo a tu dashboard</p>
                <div className="mt-4 text-sm text-gray-500">Esto puede tomar unos segundos</div>
            </div>
        </div>
    );
}
