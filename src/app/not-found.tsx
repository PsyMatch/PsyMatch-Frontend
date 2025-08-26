'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Home, AlertTriangle } from 'lucide-react';

export default function NotFound() {
    const [countdown, setCountdown] = useState(10);
    const router = useRouter();

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => {
                const newValue = prev - 1;
                if (newValue <= 0) {
                    clearInterval(timer);
                    setTimeout(() => {
                        router.push('/');
                    }, 0);
                    return 0;
                }
                return newValue;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [router]);

    const handleGoHome = () => {
        router.push('/');
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
            <div className="max-w-md w-full text-center">
                {/* Error Icon */}
                <div className="mb-8 flex justify-center">
                    <div className="relative">
                        <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center">
                            <AlertTriangle className="w-12 h-12 text-red-500" />
                        </div>
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-sm">404</span>
                        </div>
                    </div>
                </div>

                {/* Error Message */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Página no encontrada</h1>
                    <p className="text-gray-600 mb-6">Lo sentimos, la página que estás buscando no existe o ha sido movida.</p>
                </div>

                {/* Countdown */}
                <div className="mb-8 p-4 bg-white rounded-lg shadow-sm border">
                    <p className="text-sm text-gray-600 mb-2">Serás redirigido automáticamente en:</p>
                    <div className="text-2xl font-bold text-primary">
                        {countdown} segundo{countdown !== 1 ? 's' : ''}
                    </div>
                    <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                        <div
                            className="bg-primary h-2 rounded-full transition-all duration-1000 ease-linear"
                            style={{ width: `${((10 - countdown) / 10) * 100}%` }}
                        />
                    </div>
                </div>

                {/* Action Button */}
                <Button onClick={handleGoHome} className="w-full" size="lg">
                    <Home className="w-4 h-4 mr-2" />
                    Ir a la página de inicio
                </Button>

                {/* Additional Help */}
                <p className="text-xs text-gray-500 mt-6">Si crees que esto es un error, por favor contacta al soporte técnico.</p>
            </div>
        </main>
    );
}
