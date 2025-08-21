'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function GoogleCallbackPage() {
    const router = useRouter();

    useEffect(() => {
        const checkAuthAndRedirect = () => {
            // Verificar si hay token de autenticación
            const authToken = Cookies.get('auth_token') || Cookies.get('authToken');

            if (authToken) {
                // Si hay token, redirigir al dashboard según el rol
                const userRole = Cookies.get('role');

                if (userRole === 'Psicólogo') {
                    router.push('/dashboard/professional');
                } else if (userRole === 'Administrador') {
                    router.push('/dashboard/admin');
                } else {
                    // Por defecto, redirigir al dashboard de usuario (paciente)
                    // El dashboard se encargará de mostrar el modal si faltan datos
                    router.push('/dashboard/user');
                }
            } else {
                // Si no hay token después de un tiempo, redirigir a login con error
                router.push('/?error=oauth_failed');
            }
        };

        // Dar tiempo para que se establezcan las cookies desde el backend
        const timer = setTimeout(checkAuthAndRedirect, 1500);

        return () => clearTimeout(timer);
    }, [router]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="text-center p-8 bg-white rounded-lg shadow-lg">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Iniciando sesión...</h2>
                <p className="text-gray-600">Te estamos redirigiendo a tu dashboard</p>
                <div className="mt-4 text-sm text-gray-500">
                    Esto puede tomar unos segundos
                </div>
            </div>
        </div>
    );
}
