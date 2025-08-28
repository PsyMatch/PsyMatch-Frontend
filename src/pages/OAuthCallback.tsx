'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function OAuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleAuth = async () => {
      // Leer token de la URL (query param)
      const params = new URLSearchParams(window.location.search);
      const token = params.get('token');

      if (token) {
        // Guardar el token en localStorage (o en un cookie client-side)
        localStorage.setItem('auth_token', token);

        // Redirigir al dashboard
        router.push('/dashboard/user');
      } else {
        // Si no hay token, mandar al login
        router.push('/login?error=oauth_failed');
      }
    };

    handleAuth();
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
