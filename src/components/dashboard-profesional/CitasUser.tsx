'use client';
import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { appointmentsService, type AppointmentResponse } from '@/services/appointments';
import { getAppointmentDisplayStatus, type AppointmentWithPayment, type StatusInfo } from '@/services/appointmentStatus';
import { useNotifications } from '@/hooks/useNotifications';
import showConfirm from '@/components/ui/ConfirmToast';
import Link from 'next/link';

const CitasUser = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [citas, setCitas] = useState<AppointmentResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const filtroInicial = (searchParams?.get('filter') as 'todos' | 'pendientes' | 'aceptadas' | 'canceladas') || 'todos';
    const [filtroActivo, setFiltroActivo] = useState<'todos' | 'pendientes' | 'aceptadas' | 'canceladas'>(filtroInicial);
    const notifications = useNotifications();

    useEffect(() => {
        const filter = searchParams?.get('filter') as 'todos' | 'pendientes' | 'aceptadas' | 'canceladas';
        if (filter && filter !== filtroActivo) {
            setFiltroActivo(filter);
        }
    }, [searchParams, filtroActivo]);

    const cambiarFiltro = (nuevoFiltro: 'todos' | 'pendientes' | 'aceptadas' | 'canceladas') => {
        setFiltroActivo(nuevoFiltro);
        const currentTab = searchParams?.get('tab');
        const newSearchParams = new URLSearchParams();
        if (currentTab) newSearchParams.set('tab', currentTab);
        newSearchParams.set('filter', nuevoFiltro);
        router.replace(`?${newSearchParams.toString()}`, { scroll: false });
    };

    useEffect(() => {
        const loadAppointments = async () => {
            try {
                setLoading(true);
                const appointments = await appointmentsService.getMyAppointments();

                setCitas(appointments);
            } catch (error) {
                console.error('Error loading appointments:', error);

                const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
                if (errorMessage.includes('Authentication failed') || errorMessage.includes('Token expired')) {
                    notifications.error('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.');
                    window.location.href = '/login';
                } else {
                    notifications.error('Ocurrió un error al cargar las citas. Por favor, recarga la página.');
                }
            } finally {
                setLoading(false);
            }
        };

        loadAppointments();
    }, [notifications]);

    const handleMarkCompleted = async (id: string) => {
        try {
            await appointmentsService.markAsCompleted(id);

            setCitas((prev) => prev.map((cita) => (cita.id === id ? { ...cita, status: 'completed' } : cita)));

            notifications.success('Cita marcada como realizada exitosamente.');
        } catch (error) {
            console.error('Error marking appointment as completed:', error);

            const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
            if (errorMessage.includes('Authentication failed')) {
                notifications.error('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.');
                window.location.href = '/login';
            } else {
                notifications.error(errorMessage || 'Ocurrió un error al marcar la cita como realizada. Intenta nuevamente.');
            }
        }
    };

    const handleCancelAppointment = async (id: string) => {
        const confirmed = await showConfirm('¿Estás seguro que deseas cancelar esta cita? Esta acción no se puede deshacer.');
        if (!confirmed) return;

        try {
            await appointmentsService.deleteAppointment(id);
            setCitas((prev) => prev.map((cita) => (cita.id === id ? { ...cita, status: 'cancelled' } : cita)));
            notifications.success('Cita cancelada exitosamente.');
        } catch (error) {
            console.error('Error cancelling appointment:', error);

            const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
            if (errorMessage.includes('Authentication failed')) {
                notifications.error('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.');
                window.location.href = '/login';
            } else {
                notifications.error('Ocurrió un error al cancelar la cita. Intenta nuevamente.');
            }
        }
    };

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

    const getStatusInfo = (appointment: AppointmentResponse): StatusInfo => {
        const appointmentWithPayment: AppointmentWithPayment = {
            ...appointment,
        };
        return getAppointmentDisplayStatus(appointmentWithPayment);
    };

    const filtrarCitas = (citas: AppointmentResponse[]) => {
        if (filtroActivo === 'todos') return citas;

        return citas.filter((cita) => {
            const statusInfo = getStatusInfo(cita);

            switch (filtroActivo) {
                case 'pendientes':
                    return statusInfo.status === 'pending_payment' || statusInfo.status === 'pending_approval';
                case 'aceptadas':
                    return statusInfo.status === 'confirmed' || statusInfo.status === 'completed';
                case 'canceladas':
                    return statusInfo.status === 'cancelled';
                default:
                    return true;
            }
        });
    };

    const citasFiltradas = filtrarCitas(citas);

    const contadores = {
        todos: citas.length,
        pendientes: citas.filter((cita) => {
            const statusInfo = getStatusInfo(cita);
            return statusInfo.status === 'pending_payment' || statusInfo.status === 'pending_approval';
        }).length,
        aceptadas: citas.filter((cita) => {
            const statusInfo = getStatusInfo(cita);
            return statusInfo.status === 'confirmed' || statusInfo.status === 'completed';
        }).length,
        canceladas: citas.filter((cita) => {
            const statusInfo = getStatusInfo(cita);
            return statusInfo.status === 'cancelled';
        }).length,
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
        <div className="flex flex-col gap-3 px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 h-fit">
            <div>
                <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold text-black">Mis Citas</h1>
                <span className="text-sm sm:text-base text-black">Aquí puedes ver y gestionar tus citas programadas</span>
            </div>

            <div className="flex flex-wrap gap-2 mb-4 justify-start sm:justify-start">
                <button
                    onClick={() => cambiarFiltro('todos')}
                    className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors flex-shrink-0 ${
                        filtroActivo === 'todos' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                >
                    Todas ({contadores.todos})
                </button>
                <button
                    onClick={() => cambiarFiltro('pendientes')}
                    className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors flex-shrink-0 ${
                        filtroActivo === 'pendientes' ? 'bg-yellow-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                >
                    Pendientes ({contadores.pendientes})
                </button>
                <button
                    onClick={() => cambiarFiltro('aceptadas')}
                    className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors flex-shrink-0 ${
                        filtroActivo === 'aceptadas' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                >
                    Aceptadas ({contadores.aceptadas})
                </button>
                <button
                    onClick={() => cambiarFiltro('canceladas')}
                    className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors flex-shrink-0 ${
                        filtroActivo === 'canceladas' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                >
                    Canceladas ({contadores.canceladas})
                </button>
            </div>

            <div>
                {citasFiltradas.length > 0 ? (
                    <ul className="space-y-4">
                        {citasFiltradas.map((cita, idx) => {
                            const statusInfo = getStatusInfo(cita);
                            return (
                                <li key={cita.id || idx} className="border rounded-lg p-4 sm:p-6 flex flex-col gap-3 bg-white shadow-sm">
                                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
                                        <div className="flex-1">
                                            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-2">
                                                <span className="font-bold text-base sm:text-lg">Fecha y Hora:</span>
                                                <span className="text-gray-700 text-sm sm:text-base">{formatDate(cita.date)}</span>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-3">
                                                <div className="flex flex-col sm:flex-row sm:items-center">
                                                    <span className="font-semibold text-sm sm:text-base">Modalidad:</span>
                                                    <span className="sm:ml-2 text-gray-700 text-sm sm:text-base">{cita.modality}</span>
                                                </div>
                                                <div className="flex flex-col sm:flex-row sm:items-center">
                                                    <span className="font-semibold text-sm sm:text-base">Duración:</span>
                                                    <span className="sm:ml-2 text-gray-700 text-sm sm:text-base">{cita.duration} min</span>
                                                </div>
                                                {cita.session_type && (
                                                    <div className="flex flex-col sm:flex-row sm:items-center sm:col-span-2">
                                                        <span className="font-semibold text-sm sm:text-base">Tipo de Sesión:</span>
                                                        <span className="sm:ml-2 text-gray-700 text-sm sm:text-base">{cita.session_type}</span>
                                                    </div>
                                                )}
                                                {cita.therapy_approach && (
                                                    <div className="flex flex-col sm:flex-row sm:items-center sm:col-span-2">
                                                        <span className="font-semibold text-sm sm:text-base">Enfoque Terapéutico:</span>
                                                        <span className="sm:ml-2 text-gray-700 text-sm sm:text-base">{cita.therapy_approach}</span>
                                                    </div>
                                                )}
                                            </div>

                                            {cita.psychologist && (
                                                <div className="mb-3">
                                                    <span className="font-semibold text-sm sm:text-base">Profesional:</span>
                                                    <span className="ml-2 text-gray-700 text-sm sm:text-base">{cita.psychologist.name}</span>
                                                    <br />
                                                    <span className="text-xs sm:text-sm text-gray-500">{cita.psychologist.email}</span>
                                                </div>
                                            )}

                                            {cita.notes && (
                                                <div className="mb-3">
                                                    <span className="font-semibold text-sm sm:text-base">Notas:</span>
                                                    <p className="mt-1 text-gray-700 text-xs sm:text-sm">{cita.notes}</p>
                                                </div>
                                            )}

                                            {cita.price && (
                                                <div className="mb-3">
                                                    <span className="font-semibold text-sm sm:text-base">Precio:</span>
                                                    <span className="ml-2 text-gray-700 text-sm sm:text-base">${cita.price.toLocaleString()}</span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex flex-col items-start lg:items-end gap-2 w-full lg:w-auto">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-semibold ${statusInfo.color} self-start lg:self-end`}
                                                title={statusInfo.description}
                                            >
                                                {statusInfo.label}
                                            </span>

                                            <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
                                                {statusInfo.canPay && (
                                                    <button
                                                        className="w-full sm:w-auto px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                                                        onClick={() => {
                                                            window.location.href = `/payment?appointmentId=${cita.id}`;
                                                        }}
                                                    >
                                                        Pagar
                                                    </button>
                                                )}
                                                {statusInfo.canConfirmCompletion && (
                                                    <button
                                                        className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                                                        onClick={() => handleMarkCompleted(cita.id)}
                                                    >
                                                        Confirmar realización
                                                    </button>
                                                )}
                                                {statusInfo.canCancel && (
                                                    <button
                                                        className="w-full sm:w-auto px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                                                        onClick={() => handleCancelAppointment(cita.id)}
                                                    >
                                                        Cancelar cita
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                ) : (
                    <div className="text-center py-6 sm:py-8">
                        <p className="text-gray-500 mb-4 text-sm sm:text-base">
                            {filtroActivo === 'todos'
                                ? 'No tienes citas programadas'
                                : `No tienes citas ${
                                    filtroActivo === 'pendientes' ? 'pendientes' : filtroActivo === 'aceptadas' ? 'aceptadas' : 'canceladas'
                                }`}
                        </p>
                        {filtroActivo === 'todos' && (
                            <Link
                                href="/search-professionals"
                                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm sm:text-base"
                            >
                                Buscar Profesionales
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CitasUser;
