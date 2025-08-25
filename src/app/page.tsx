'use client';
import Information from '@/components/Home/Information/Information';
import Match from '@/components/Home/Match/Match';
import Profesionales from '@/components/Home/profesionales/Profesionales';
import Start from '@/components/Home/Start/Start';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

export default function Home() {
    const [token, setToken] = useState<string | undefined>(undefined);

    useEffect(() => {
        const cookieToken = Cookies.get('auth_token');
        setToken(cookieToken);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <section className="pt-20 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-5xl font-bold text-gray-900 mb-6">Encuentra Tu Psicólogo Ideal</h2>
                    <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
                        Selecciona las especialidades que necesitas y deja que nuestra plataforma te conecte con el psicólogo adecuado. Obtén recomendaciones
                        personalizadas basadas en tus necesidades, ubicación y preferencias.
                    </p>
                </div>
            </section>
            <Match />
            <Information />
            {token && <Profesionales />}
            {!token && <Start />}
        </div>
    );
}
