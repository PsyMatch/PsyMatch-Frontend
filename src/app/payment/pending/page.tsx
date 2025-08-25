'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Clock, AlertCircle, ArrowRight } from 'lucide-react';

function PaymentPendingContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [countdown, setCountdown] = useState(20);

    // Obtener parámetros de MercadoPago
    const paymentId = searchParams?.get('payment_id');
    const status = searchParams?.get('status');

    useEffect(() => {
        // Countdown para redirección automática
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    router.push('/dashboard/user');
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [router]);

    const handleGoToDashboard = () => {
        router.push('/dashboard/user');
    };

    const handleCheckStatus = () => {
        // Aquí podrías agregar lógica para verificar el estado del pago
        router.refresh();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
                {/* Icono de pendiente */}
                <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center">
                        <Clock className="w-12 h-12 text-yellow-600" />
                    </div>
                </div>

                {/* Título principal */}
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    Pago en Proceso
                </h1>
                
                <p className="text-gray-600 mb-6">
                    Tu pago está siendo procesado. Te notificaremos cuando esté confirmado.
                </p>

                {/* Información del pago */}
                {paymentId && (
                    <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                        <h3 className="font-semibold text-gray-800 mb-2">Detalles del Pago:</h3>
                        <div className="space-y-1 text-sm text-gray-600">
                            <p><span className="font-medium">ID de Pago:</span> {paymentId}</p>
                            <p><span className="font-medium">Estado:</span> {status}</p>
                        </div>
                    </div>
                )}

                {/* Información importante */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                    <div className="flex items-center justify-center mb-2">
                        <AlertCircle className="w-5 h-5 text-yellow-600 mr-2" />
                        <span className="font-semibold text-yellow-800">Importante</span>
                    </div>
                    <div className="text-yellow-700 text-sm text-left space-y-1">
                        <p>• Tu cita está reservada temporalmente</p>
                        <p>• El pago puede tardar unos minutos en procesarse</p>
                        <p>• Recibirás un email cuando se confirme</p>
                        <p>• No es necesario realizar otro pago</p>
                    </div>
                </div>

                {/* Botones de acción */}
                <div className="space-y-3">
                    <button
                        onClick={handleCheckStatus}
                        className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
                    >
                        <Clock className="w-4 h-4 mr-2" />
                        <span>Verificar Estado</span>
                    </button>
                    
                    <button
                        onClick={handleGoToDashboard}
                        className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
                    >
                        <span>Ir al Dashboard</span>
                        <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                </div>

                {/* Redirección automática */}
                <div className="mt-6 text-sm text-gray-500">
                    <p>Serás redirigido automáticamente en {countdown} segundos</p>
                </div>
            </div>
        </div>
    );
}

export default function PaymentPendingPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Cargando...</p>
                </div>
            </div>
        }>
            <PaymentPendingContent />
        </Suspense>
    );
}
