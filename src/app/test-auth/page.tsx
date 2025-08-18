'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function TestAuthPage() {
    const router = useRouter();

    useEffect(() => {
        // Establecer cookies de prueba
        const testToken =
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJwYXRpZW50LXRlc3QtdXVpZCIsInVzZXJJZCI6InBhdGllbnQtdGVzdC11dWlkIiwiaWQiOiJwYXRpZW50LXRlc3QtdXVpZCIsInJvbGUiOiJQYWNpZW50ZSIsImVtYWlsIjoidGVzdEBleGFtcGxlLmNvbSIsImlhdCI6MTc1NTUyMjcwNywiZXhwIjoxNzU1NjA5MTA3fQ==.fake-signature-for-testing';

        Cookies.set('authToken', testToken, { path: '/' });
        Cookies.set('role', 'Paciente', { path: '/' });

        // También guardarlo en localStorage
        localStorage.setItem('authToken', testToken);

        console.log('Cookies establecidas para pruebas');
        console.log('authToken:', Cookies.get('authToken'));
        console.log('role:', Cookies.get('role'));

        // Redirigir automáticamente después de 2 segundos
        setTimeout(() => {
            router.push('/session/psychologist-ana-garcia-uuid');
        }, 2000);
    }, [router]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
                <h1 className="text-2xl font-bold text-center mb-6">Configurando Autenticación de Prueba</h1>
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Estableciendo cookies de autenticación...</p>
                    <p className="text-sm text-gray-500 mt-2">Serás redirigido a la página de sesión en unos segundos.</p>
                </div>
                <div className="mt-6 p-4 bg-gray-100 rounded-lg">
                    <h3 className="font-semibold text-sm text-gray-700 mb-2">Datos de prueba establecidos:</h3>
                    <ul className="text-xs text-gray-600">
                        <li>• Usuario: Paciente de prueba</li>
                        <li>• Token: JWT válido por 24h</li>
                        <li>• Rol: Paciente</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
