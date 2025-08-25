'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { CheckCircle, Clock, ArrowRight } from 'lucide-react';

function PaymentSuccessContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [countdown, setCountdown] = useState(10);

    // Obtener parámetros de MercadoPago
    const paymentId = searchParams?.get('payment_id');
    const status = searchParams?.get('status');
    const merchantOrderId = searchParams?.get('merchant_order_id');

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

    const handleConfirmAppointment = () => {
        // Aquí puedes agregar lógica adicional de confirmación si es necesario
        router.push('/dashboard/user');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
                {/* Icono de éxito */}
                <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-12 h-12 text-green-600" />
                    </div>
                </div>

                {/* Título principal */}
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    ¡Pago Exitoso!
                </h1>
                
                <p className="text-gray-600 mb-6">
                    Tu pago ha sido procesado correctamente. Tu cita ha sido confirmada automáticamente.
                </p>

                {/* Información del pago */}
                {paymentId && (
                    <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                        <h3 className="font-semibold text-gray-800 mb-2">Detalles del Pago:</h3>
                        <div className="space-y-1 text-sm text-gray-600">
                            <p><span className="font-medium">ID de Pago:</span> {paymentId}</p>
                            <p><span className="font-medium">Estado:</span> {status}</p>
                            {merchantOrderId && (
                                <p><span className="font-medium">Orden:</span> {merchantOrderId}</p>
                            )}
                        </div>
                    </div>
                )}

                {/* Mensaje de confirmación */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                    <div className="flex items-center justify-center mb-2">
                        <Clock className="w-5 h-5 text-green-600 mr-2" />
                        <span className="font-semibold text-green-800">Cita Confirmada</span>
                    </div>
                    <p className="text-green-700 text-sm">
                        Recibirás un email de confirmación con todos los detalles de tu cita.
                    </p>
                </div>

                {/* Botones de acción */}
                <div className="space-y-3">
                    <button
                        onClick={handleConfirmAppointment}
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
                    >
                        <span>Ver Mi Cita Confirmada</span>
                        <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                    
                    <button
                        onClick={handleGoToDashboard}
                        className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors"
                    >
                        Ir al Dashboard
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

export default function PaymentSuccessPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Cargando...</p>
                </div>
            </div>
        }>
            <PaymentSuccessContent />
        </Suspense>
    );
}
