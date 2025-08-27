'use client';

import { useState, useEffect } from 'react';
import { AlertTriangle, X, CreditCard } from 'lucide-react';
import { appointmentsService, AppointmentResponse } from '@/services/appointments';
import { getAppointmentDisplayStatus } from '@/services/appointmentStatus';

interface PaymentPendingAlertProps {
    onPayClick?: (appointmentId: string) => void;
}

const PaymentPendingAlert = ({ onPayClick }: PaymentPendingAlertProps) => {
    const [pendingPayments, setPendingPayments] = useState<AppointmentResponse[]>([]);
    const [dismissed, setDismissed] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPendingPayments = async () => {
            try {
                const appointments = await appointmentsService.getMyAppointments();
                
                // Filtrar citas que necesitan pago
                const needingPayment = appointments.filter(appointment => {
                    const statusInfo = getAppointmentDisplayStatus(appointment);
                    return statusInfo.canPay && statusInfo.status === 'pending_payment';
                });

                setPendingPayments(needingPayment);
            } catch (error) {
                console.error('Error loading pending payments:', error);
            } finally {
                setLoading(false);
            }
        };

        loadPendingPayments();
    }, []);

    const handleDismiss = (appointmentId: string) => {
        setDismissed(prev => [...prev, appointmentId]);
        // Guardar en localStorage para que no se muestre de nuevo en esta sesión
        const dismissedAlerts = JSON.parse(localStorage.getItem('dismissedPaymentAlerts') || '[]');
        dismissedAlerts.push(appointmentId);
        localStorage.setItem('dismissedPaymentAlerts', JSON.stringify(dismissedAlerts));
    };

    const handlePayment = (appointmentId: string) => {
        if (onPayClick) {
            onPayClick(appointmentId);
        } else {
            // Redirigir a la pestaña de citas
            window.location.href = `/dashboard/user?tab=citas&filter=pendientes`;
        }
    };

    useEffect(() => {
        // Recuperar alertas previamente descartadas
        const dismissedAlerts = JSON.parse(localStorage.getItem('dismissedPaymentAlerts') || '[]');
        setDismissed(dismissedAlerts);
    }, []);

    if (loading) return null;

    const visibleAlerts = pendingPayments.filter(appointment => 
        !dismissed.includes(appointment.id)
    );

    if (visibleAlerts.length === 0) return null;

    return (
        <div className="space-y-3 mb-6">
            {visibleAlerts.map((appointment) => (
                <div
                    key={appointment.id}
                    className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-4 shadow-sm"
                >
                    <div className="flex items-start">
                        <div className="flex-shrink-0">
                            <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                        </div>
                        
                        <div className="ml-3 flex-1">
                            <h3 className="text-sm font-medium text-amber-800">
                                Pago Pendiente para tu Cita
                            </h3>
                            <div className="mt-1 text-xs text-amber-700">
                                <p>
                                    <span className="font-medium">Fecha:</span> {new Date(appointment.date).toLocaleDateString('es-ES', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric'
                                    })} a las {appointment.hour}
                                </p>
                                {appointment.psychologist && (
                                    <p>
                                        <span className="font-medium">Profesional:</span> {appointment.psychologist.name}
                                    </p>
                                )}
                                {appointment.price && (
                                    <p>
                                        <span className="font-medium">Monto:</span> ${appointment.price.toLocaleString()}
                                    </p>
                                )}
                            </div>
                            <p className="mt-2 text-xs text-amber-600">
                                Tu cita está reservada pero necesitas completar el pago para confirmarla.
                            </p>
                        </div>

                        <div className="ml-4 flex items-center space-x-2">
                            <button
                                onClick={() => handlePayment(appointment.id)}
                                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                            >
                                <CreditCard className="h-3 w-3 mr-1" />
                                Pagar Ahora
                            </button>
                            
                            <button
                                onClick={() => handleDismiss(appointment.id)}
                                className="inline-flex items-center p-1.5 border border-transparent rounded-md text-amber-400 hover:bg-amber-100 hover:text-amber-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors"
                            >
                                <X className="h-3 w-3" />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PaymentPendingAlert;
