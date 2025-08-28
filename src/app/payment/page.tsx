'use client';

import { useEffect, useState, useCallback, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { appointmentsService, type AppointmentResponse } from '@/services/appointments';
import { psychologistsService, type PsychologistResponse } from '@/services/psychologists';
import MercadoPagoPayment from '@/components/payments/MercadoPagoPayment';
import { CheckCircle, ArrowLeft, Calendar, Clock, User } from 'lucide-react';
import { useNotifications } from '@/hooks/useNotifications';

function PaymentPageContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const notifications = useNotifications();
    const appointmentId = searchParams?.get('appointmentId');

    const [appointment, setAppointment] = useState<AppointmentResponse | null>(null);
    const [psychologist, setPsychologist] = useState<PsychologistResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [paymentCompleted, setPaymentCompleted] = useState(false);

    const loadAppointmentData = useCallback(async () => {
        try {
            setLoading(true);
            
            // Cargar datos de la cita
            const appointmentData = await appointmentsService.getAppointmentById(appointmentId!);
            setAppointment(appointmentData);

            // Cargar datos del psicólogo
            if (appointmentData.psychologist?.id) {
                const psychologistData = await psychologistsService.getPsychologistByIdDirect(appointmentData.psychologist.id);
                setPsychologist(psychologistData);
            }
        } catch (error) {
            console.error('Error loading appointment data:', error);
            notifications.error('Error al cargar los datos de la cita');
            router.push('/dashboard/user');
        } finally {
            setLoading(false);
        }
    }, [appointmentId, notifications, router]);

    useEffect(() => {
        if (!appointmentId) {
            notifications.error('ID de cita no proporcionado');
            router.push('/dashboard/user');
            return;
        }

        loadAppointmentData();
    }, [appointmentId, loadAppointmentData, notifications, router]);

    const handlePaymentSuccess = () => {
        // Guardar appointmentId en sessionStorage para usar en payment success
        if (typeof window !== 'undefined') {
            sessionStorage.setItem('current_appointment_id', appointmentId!);
        }
        setPaymentCompleted(true);
        // El componente MercadoPagoPayment ya maneja la redirección automáticamente
    };

    const handlePaymentError = (error: string) => {
        notifications.error(`Error al procesar el pago: ${error}`);
    };

    const formatDisplayDate = (isoDate: string): string => {
        if (!isoDate) return '';

        try {
            const date = new Date(isoDate);
            return date.toLocaleDateString('es-ES', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            });
        } catch {
            return isoDate;
        }
    };

    const formatDisplayTime = (time: string): string => {
        if (!time) return '';

        try {
            const [hours, minutes] = time.split(':').map(Number);
            const hour12 = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
            const ampm = hours >= 12 ? 'PM' : 'AM';
            return `${hour12.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${ampm}`;
        } catch {
            return time;
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-8 h-8 mx-auto mb-4 border-2 border-blue-600 rounded-full animate-spin border-t-transparent"></div>
                    <p className="text-gray-600">Cargando datos de la cita...</p>
                </div>
            </div>
        );
    }

    if (!appointment || !psychologist) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 text-red-500">
                        <svg className="w-full h-full" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Cita no encontrada</h2>
                    <p className="text-gray-600 mb-6">No se pudo cargar la información de la cita</p>
                    <button
                        onClick={() => router.push('/dashboard/user')}
                        className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Volver al Dashboard
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* Header con botón de volver */}
                <div className="mb-8">
                    <button
                        onClick={() => router.push('/dashboard/user')}
                        className="flex items-center text-blue-600 hover:text-blue-800 transition-colors mb-4"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Volver al Dashboard
                    </button>
                    <h1 className="text-3xl font-bold text-gray-900">Pagar Cita</h1>
                </div>

                {paymentCompleted ? (
                    <div className="bg-white rounded-xl shadow-sm border border-green-200 p-8 text-center">
                        <div className="w-16 h-16 mx-auto mb-4 text-green-600">
                            <CheckCircle className="w-full h-full" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">¡Pago Exitoso!</h2>
                        <p className="text-gray-600 mb-6">
                            Tu pago ha sido procesado correctamente. Serás redirigido automáticamente a MercadoPago.
                        </p>
                        <button
                            onClick={() => router.push('/dashboard/user')}
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Volver al Dashboard
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Información de la cita */}
                        <div className="bg-white rounded-xl shadow-sm border p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-6">Detalles de la Cita</h2>
                            
                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <User className="w-5 h-5 text-gray-400 mr-3" />
                                    <div>
                                        <p className="text-sm text-gray-500">Psicólogo</p>
                                        <p className="font-medium text-gray-900">Dr/a {psychologist.name}</p>
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                                    <div>
                                        <p className="text-sm text-gray-500">Fecha</p>
                                        <p className="font-medium text-gray-900">{formatDisplayDate(appointment.date)}</p>
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <Clock className="w-5 h-5 text-gray-400 mr-3" />
                                    <div>
                                        <p className="text-sm text-gray-500">Hora</p>
                                        <p className="font-medium text-gray-900">{formatDisplayTime(appointment.hour)}</p>
                                    </div>
                                </div>

                                <div className="border-t pt-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-500">Modalidad:</span>
                                        <span className="font-medium text-gray-900">{appointment.modality}</span>
                                    </div>
                                    {appointment.session_type && (
                                        <div className="flex justify-between items-center mt-2">
                                            <span className="text-sm text-gray-500">Tipo de sesión:</span>
                                            <span className="font-medium text-gray-900">{appointment.session_type}</span>
                                        </div>
                                    )}
                                    {appointment.therapy_approach && (
                                        <div className="flex justify-between items-center mt-2">
                                            <span className="text-sm text-gray-500">Enfoque:</span>
                                            <span className="font-medium text-gray-900">{appointment.therapy_approach}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between items-center mt-4 pt-4 border-t">
                                        <span className="text-lg font-semibold text-gray-900">Total a pagar:</span>
                                        <span className="text-xl font-bold text-green-600">
                                            ${appointment.price || psychologist.consultation_fee || 5000} ARS
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Componente de pago */}
                        <div className="bg-white rounded-xl shadow-sm border">
                            <div className="p-6">
                                <MercadoPagoPayment
                                    amount={appointment.price || psychologist.consultation_fee || 5000}
                                    appointmentId={appointment.id}
                                    onSuccess={handlePaymentSuccess}
                                    onError={handlePaymentError}
                                    disabled={loading}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function PaymentPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Cargando...</p>
                </div>
            </div>
        }>
            <PaymentPageContent />
        </Suspense>
    );
}
