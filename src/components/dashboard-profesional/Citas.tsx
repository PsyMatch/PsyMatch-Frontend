'use client';
import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { appointmentsService, AppointmentResponse } from '@/services/appointments';
import { getAppointmentDisplayStatus, AppointmentWithPayment, StatusInfo } from '@/services/appointmentStatus';
import { useNotifications } from '@/hooks/useNotifications';
import showConfirm from '../ui/ConfirmToast';

const Citas = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [citas, setCitas] = useState<AppointmentResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const filtroInicial = (searchParams?.get('filter') as 'todos' | 'pendientes' | 'aceptadas' | 'canceladas') || 'todos';
    const [filtroActivo, setFiltroActivo] = useState<'todos' | 'pendientes' | 'aceptadas' | 'canceladas'>(filtroInicial);
    const notifications = useNotifications();

    useEffect(() => {
        const loadAppointments = async () => {
            try {
                setLoading(true);
                const appointments = await appointmentsService.getMyAppointments();

                // Para psicólogos, filtrar las citas donde ellos son el profesional
                // El servicio ya debería devolver las citas relevantes para el usuario autenticado
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

    // Función para obtener el estado con información completa (movida aquí para evitar errores de referencia)
    const getStatusInfo = (appointment: AppointmentResponse): StatusInfo => {
        // Convertir AppointmentResponse a AppointmentWithPayment
        const appointmentWithPayment: AppointmentWithPayment = {
            ...appointment,
            
        };
        return getAppointmentDisplayStatus(appointmentWithPayment);
    };

    // Sincronizar filtro con URL cuando cambien los searchParams
    useEffect(() => {
        const filter = searchParams?.get('filter') as 'todos' | 'pendientes' | 'aceptadas' | 'canceladas';
        if (filter && filter !== filtroActivo) {
            setFiltroActivo(filter);
        }
    }, [searchParams, filtroActivo]);

    // Función para cambiar filtro y actualizar URL
    const cambiarFiltro = (nuevoFiltro: 'todos' | 'pendientes' | 'aceptadas' | 'canceladas') => {
        setFiltroActivo(nuevoFiltro);
        // Preservar el parámetro tab si existe
        const currentTab = searchParams?.get('tab');
        const newSearchParams = new URLSearchParams();
        if (currentTab) newSearchParams.set('tab', currentTab);
        newSearchParams.set('filter', nuevoFiltro);
        router.replace(`?${newSearchParams.toString()}`, { scroll: false });
    };

    // Función para filtrar citas según el estado
    const filtrarCitas = (citas: AppointmentResponse[]) => {
        if (filtroActivo === 'todos') return citas;

        return citas.filter((cita) => {
            const statusInfo = getStatusInfo(cita);
            
            switch (filtroActivo) {
                case 'pendientes':
                    return statusInfo.status === 'pending_payment' || 
                           statusInfo.status === 'pending_approval';
                case 'aceptadas':
                    return statusInfo.status === 'confirmed' || 
                           statusInfo.status === 'completed';
                case 'canceladas':
                    return statusInfo.status === 'cancelled';
                default:
                    return true;
            }
        });
    };

    const citasFiltradas = filtrarCitas(citas);

    // Calcular contadores para los filtros
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

    // Función para aprobar cita (nuevo)
    const handleApproveAppointment = async (id: string) => {
        try {
            await appointmentsService.approveAppointment(id);

            // Actualizar la lista local
            setCitas((prev) => prev.map((cita) => (cita.id === id ? { ...cita, status: 'confirmed' } : cita)));

            notifications.success('Cita aprobada exitosamente.');
        } catch (error) {
            console.error('Error approving appointment:', error);

            const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
            if (errorMessage.includes('Authentication failed')) {
                notifications.error('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.');
                window.location.href = '/login';
            } else {
                notifications.error(errorMessage || 'Ocurrió un error al aprobar la cita. Intenta nuevamente.');
            }
        }
    };

    // Función para marcar como completada (nuevo)
    const handleMarkCompleted = async (id: string) => {
        try {
            await appointmentsService.markAsCompleted(id);

            // Actualizar la lista local
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

    // Función para cancelar cita (actualizada)
    const handleCancelAppointment = async (id: string) => {
        try {
            const confirmed = await showConfirm('¿Estás seguro que deseas cancelar esta cita? Esta acción no se puede deshacer.');
            if (!confirmed) return;

            await appointmentsService.cancelAppointment(id);

            // Actualizar la lista local
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

    if (loading) {
        return (
            <div className="flex flex-col gap-3 px-8 py-8 h-fit">
                <div>
                    <h1 className="text-xl font-semibold text-black">Gestión de Citas</h1>
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
                <h1 className="text-xl font-semibold text-black">Gestión de Citas</h1>
                <span className="text-black">Gestiona tus citas programadas y disponibilidad</span>
            </div>

            {/* Filtros */}
            <div className="flex flex-wrap gap-2 mb-4">
                <button
                    onClick={() => cambiarFiltro('todos')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        filtroActivo === 'todos'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                >
                    Todas ({contadores.todos})
                </button>
                <button
                    onClick={() => cambiarFiltro('pendientes')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        filtroActivo === 'pendientes'
                            ? 'bg-yellow-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                >
                    Pendientes ({contadores.pendientes})
                </button>
                <button
                    onClick={() => cambiarFiltro('aceptadas')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        filtroActivo === 'aceptadas'
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                >
                    Aceptadas ({contadores.aceptadas})
                </button>
                <button
                    onClick={() => cambiarFiltro('canceladas')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        filtroActivo === 'canceladas'
                            ? 'bg-red-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                >
                    Canceladas ({contadores.canceladas})
                </button>
            </div>

            <div>
                {citasFiltradas.length > 0 ? (
                    <ul className="space-y-4">
                        {citasFiltradas.map((cita, idx) => (
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

                                        {cita.patient && (
                                            <div className="mb-3">
                                                <span className="font-semibold">Paciente:</span>
                                                <span className="ml-2 text-gray-700">{cita.patient.name}</span>
                                                <br />
                                                <span className="text-sm text-gray-500">{cita.patient.email}</span>
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
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-semibold ${statusInfo.color}`}
                                                    title={statusInfo.description}
                                                >
                                                    {statusInfo.label}
                                                </span>
                                            );
                                        })()}

                                        {/* Botones según el estado de la cita */}
                                        {(() => {
                                            const statusInfo = getStatusInfo(cita);
                                            return (
                                                <div className="flex gap-2 flex-wrap">
                                                    {statusInfo.canApprove && (
                                                        <button
                                                            className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-sm font-medium"
                                                            onClick={() => handleApproveAppointment(cita.id)}
                                                            title="Aprobar cita pagada"
                                                        >
                                                            Aprobar
                                                        </button>
                                                    )}
                                                    {statusInfo.canConfirmCompletion && (
                                                        <button
                                                            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm font-medium"
                                                            onClick={() => handleMarkCompleted(cita.id)}
                                                            title="Confirmar que la sesión se realizó"
                                                        >
                                                            Confirmar realización
                                                        </button>
                                                    )}
                                                    {statusInfo.canCancel && (
                                                        <button
                                                            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm font-medium"
                                                            onClick={() => handleCancelAppointment(cita.id)}
                                                            title="Cancelar cita"
                                                        >
                                                            Cancelar
                                                        </button>
                                                    )}
                                                    {statusInfo.status === 'completed' && (
                                                        <div className="text-xs text-gray-500 mt-1">Sesión realizada</div>
                                                    )}
                                                    {statusInfo.status === 'cancelled' && (
                                                        <div className="text-xs text-gray-500 mt-1">Cita cancelada</div>
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
                        <p className="text-gray-500 mb-4">
                            {filtroActivo === 'todos' 
                                ? 'No tienes citas programadas'
                                : `No tienes citas ${filtroActivo === 'pendientes' ? 'pendientes' : 
                                                    filtroActivo === 'aceptadas' ? 'aceptadas' : 'canceladas'}`
                            }
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Citas;
