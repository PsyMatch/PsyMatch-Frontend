'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { XCircle, RefreshCw, ArrowLeft } from 'lucide-react';

function PaymentFailureContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [countdown, setCountdown] = useState(15);

    // Obtener parámetros de MercadoPago
    const paymentId = searchParams?.get('payment_id');
    const status = searchParams?.get('status');

    useEffect(() => {
        // Countdown para redirección automática
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    router.back(); // Volver a la página anterior
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [router]);

    const handleTryAgain = () => {
        router.back(); // Volver a intentar el pago
    };

    const handleGoToDashboard = () => {
        router.push('/dashboard/user');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
                {/* Icono de error */}
                <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                        <XCircle className="w-12 h-12 text-red-600" />
                    </div>
                </div>

                {/* Título principal */}
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    Pago No Completado
                </h1>
                
                <p className="text-gray-600 mb-6">
                    No se pudo procesar tu pago. Tu cita se mantiene reservada temporalmente.
                </p>

                {/* Información del pago */}
                {paymentId && (
                    <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                        <h3 className="font-semibold text-gray-800 mb-2">Detalles:</h3>
                        <div className="space-y-1 text-sm text-gray-600">
                            <p><span className="font-medium">ID de Pago:</span> {paymentId}</p>
                            <p><span className="font-medium">Estado:</span> {status}</p>
                        </div>
                    </div>
                )}

                {/* Razones comunes */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                    <h3 className="font-semibold text-yellow-800 mb-2">Posibles razones:</h3>
                    <ul className="text-yellow-700 text-sm text-left space-y-1">
                        <li>• Fondos insuficientes</li>
                        <li>• Datos de tarjeta incorrectos</li>
                        <li>• Cancelaste el pago</li>
                        <li>• Problema técnico temporal</li>
                    </ul>
                </div>

                {/* Botones de acción */}
                <div className="space-y-3">
                    <button
                        onClick={handleTryAgain}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
                    >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        <span>Intentar Nuevamente</span>
                    </button>
                    
                    <button
                        onClick={handleGoToDashboard}
                        className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        <span>Volver al Dashboard</span>
                    </button>
                </div>

                {/* Información de ayuda */}
                <div className="mt-6 text-sm text-gray-500">
                    <p>¿Necesitas ayuda? Contacta a soporte</p>
                    <p className="mt-2">Redirección automática en {countdown} segundos</p>
                </div>
            </div>
        </div>
    );
}

export default function PaymentFailurePage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Cargando...</p>
                </div>
            </div>
        }>
            <PaymentFailureContent />
        </Suspense>
    );
}
