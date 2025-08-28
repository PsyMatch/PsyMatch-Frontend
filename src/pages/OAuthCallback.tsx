'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function OAuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    if (token) {
      // Guardar token
      localStorage.setItem('auth_token', token);

      // Limpiar la URL (sacamos el query param)
      window.history.replaceState({}, document.title, window.location.pathname);

      // Redirigir al dashboard
      router.push('/dashboard/user');
    } else {
      router.push('/login?error=oauth_failed');
    }
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
