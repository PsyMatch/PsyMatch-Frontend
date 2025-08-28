'use client';

import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function OAuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const processOAuthCallback = async () => {
      try {
        // Obtener el token de los parámetros de la URL
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');

        if (token) {
          // Guardar token en las cookies del frontend
          Cookies.set('auth_token', token, {
            expires: 1, // El token expira en 1 día
            secure: process.env.NODE_ENV === 'production', // Solo HTTPS en producción
            sameSite: 'strict', // Protección CSRF
          });

          // Limpiar la URL (sacamos el query param)
          window.history.replaceState({}, document.title, window.location.pathname);

          // Redirigir al dashboard
          router.push('/dashboard/user');
        } else {
          console.error('No se recibió un token en la URL');
          router.push('/login?error=oauth_failed');
        }
      } catch (error) {
        console.error('Error al procesar el callback de OAuth:', error);
        router.push('/login?error=oauth_failed');
      }
    };

    processOAuthCallback();
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
