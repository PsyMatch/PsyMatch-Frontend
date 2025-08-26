'use client';
import { useEffect, useState } from 'react';
import { appointmentsService, AppointmentResponse } from '@/services/appointments';
import { getAppointmentDisplayStatus, AppointmentWithPayment, StatusInfo } from '@/services/appointmentStatus';

const CitasUser = () => {
    const [citas, setCitas] = useState<AppointmentResponse[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadAppointments = async () => {
            try {
                setLoading(true);
                const appointments = await appointmentsService.getMyAppointments();

                // Filtrar solo las citas donde el usuario actual es el paciente
                // En principio el servicio ya debería devolver solo las citas del usuario autenticado
                setCitas(appointments);
            } catch (error) {
                console.error('Error loading appointments:', error);

                // Manejar errores específicos
                const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
                if (errorMessage.includes('Authentication failed') || errorMessage.includes('Token expired')) {
                    alert('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.');
                    window.location.href = '/login';
                } else {
                    alert('Ocurrió un error al cargar las citas. Por favor, recarga la página.');
                }
            } finally {
                setLoading(false);
            }
        };

        loadAppointments();
    }, []);

    // Función para cancelar cita usando el nuevo servicio (legacy)
    const cancelarCita = async (id: string) => {
        return handleCancelAppointment(id);
    };

    // Función para marcar como completada (nuevo)
    const handleMarkCompleted = async (id: string) => {
        try {
            await appointmentsService.markAsCompleted(id);
            
            // Actualizar la lista local
            setCitas((prev) => prev.map((cita) => (cita.id === id ? { ...cita, status: 'completed' } : cita)));
            
            alert('Cita marcada como realizada exitosamente.');
        } catch (error) {
            console.error('Error marking appointment as completed:', error);
            
            const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
            if (errorMessage.includes('Authentication failed')) {
                alert('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.');
                window.location.href = '/login';
            } else {
                alert(errorMessage || 'Ocurrió un error al marcar la cita como realizada. Intenta nuevamente.');
            }
        }
    };

    // Función para cancelar cita (nueva versión)
    const handleCancelAppointment = async (id: string) => {
        if (!window.confirm('¿Estás seguro que deseas cancelar esta cita? Esta acción no se puede deshacer.')) {
            return;
        }

        try {
            await appointmentsService.cancelAppointment(id);

            // Actualizar la lista local - eliminar la cita cancelada
            setCitas((prev) => prev.filter((cita) => cita.id !== id));
            
            alert('Cita cancelada exitosamente.');
        } catch (error) {
            console.error('Error cancelling appointment:', error);

            const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
            if (errorMessage.includes('Authentication failed')) {
                alert('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.');
                window.location.href = '/login';
            } else {
                alert('Ocurrió un error al cancelar la cita. Intenta nuevamente.');
            }
        }
    };

    // Función para formatear la fecha
    const formatDate = (dateString: string): string => {
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('es-ES', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            });
        } catch (error) {
            console.error('Error formatting date:', error);
            return dateString;
        }
    };

    // Función para obtener el estado con información completa
    const getStatusInfo = (appointment: AppointmentResponse): StatusInfo => {
        // Convertir AppointmentResponse a AppointmentWithPayment
        const appointmentWithPayment: AppointmentWithPayment = {
            ...appointment,
            // Por ahora no tenemos info de payment en AppointmentResponse
            // En el futuro se podría hacer un join o fetch adicional
        };
        return getAppointmentDisplayStatus(appointmentWithPayment);
    };

    if (loading) {
        return (
            <div className="flex flex-col gap-3 px-8 py-8 h-fit">
                <div>
                    <h1 className="text-xl font-semibold text-black">Mis Citas</h1>
                    <span className="text-black">Cargando tus citas programadas...</span>
                </div>
                <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-3 px-8 py-8 h-fit">
            <div>
                <h1 className="text-xl font-semibold text-black">Mis Citas</h1>
                <span className="text-black">Aquí puedes ver y gestionar tus citas programadas</span>
            </div>
            <div>
                {citas.length > 0 ? (
                    <ul className="space-y-4">
                        {citas.map((cita, idx) => (
                            <li key={cita.id || idx} className="border rounded-lg p-6 flex flex-col gap-3 bg-white shadow-sm">
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="font-bold text-lg">Fecha y Hora:</span>
                                            <span className="text-gray-700">{formatDate(cita.date)}</span>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                                            <div>
                                                <span className="font-semibold">Modalidad:</span>
                                                <span className="ml-2 text-gray-700">{cita.modality}</span>
                                            </div>
                                            <div>
                                                <span className="font-semibold">Duración:</span>
                                                <span className="ml-2 text-gray-700">{cita.duration} min</span>
                                            </div>
                                            {cita.session_type && (
                                                <div>
                                                    <span className="font-semibold">Tipo de Sesión:</span>
                                                    <span className="ml-2 text-gray-700">{cita.session_type}</span>
                                                </div>
                                            )}
                                            {cita.therapy_approach && (
                                                <div>
                                                    <span className="font-semibold">Enfoque Terapéutico:</span>
                                                    <span className="ml-2 text-gray-700">{cita.therapy_approach}</span>
                                                </div>
                                            )}
                                        </div>

                                        {cita.psychologist && (
                                            <div className="mb-3">
                                                <span className="font-semibold">Profesional:</span>
                                                <span className="ml-2 text-gray-700">{cita.psychologist.name}</span>
                                                <br />
                                                <span className="text-sm text-gray-500">{cita.psychologist.email}</span>
                                            </div>
                                        )}

                                        {cita.notes && (
                                            <div className="mb-3">
                                                <span className="font-semibold">Notas:</span>
                                                <p className="mt-1 text-gray-700 text-sm">{cita.notes}</p>
                                            </div>
                                        )}

                                        {cita.price && (
                                            <div className="mb-3">
                                                <span className="font-semibold">Precio:</span>
                                                <span className="ml-2 text-gray-700">${cita.price.toLocaleString()}</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex flex-col items-end gap-2">
                                        {(() => {
                                            const statusInfo = getStatusInfo(cita);
                                            return (
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusInfo.color}`} title={statusInfo.description}>
                                                    {statusInfo.label}
                                                </span>
                                            );
                                        })()}

                                        {(() => {
                                            const statusInfo = getStatusInfo(cita);
                                            return (
                                                <div className="flex gap-2 flex-wrap">
                                                    {statusInfo.canPay && (
                                                        <button
                                                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                                                            onClick={() => {
                                                                // Redirigir a pago
                                                                window.location.href = `/payment?appointmentId=${cita.id}`;
                                                            }}
                                                        >
                                                            Pagar
                                                        </button>
                                                    )}
                                                    {statusInfo.canConfirmCompletion && (
                                                        <button
                                                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                                                            onClick={() => handleMarkCompleted(cita.id)}
                                                        >
                                                            Confirmar realización
                                                        </button>
                                                    )}
                                                    {statusInfo.canCancel && (
                                                        <button
                                                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                                                            onClick={() => handleCancelAppointment(cita.id)}
                                                        >
                                                            Cancelar cita
                                                        </button>
                                                    )}
                                                </div>
                                            );
                                        })()}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="text-center py-8">
                        <p className="text-gray-500 mb-4">No tienes citas programadas</p>
                        <a
                            href="/search-professionals"
                            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                        >
                            Buscar Profesionales
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CitasUser;
