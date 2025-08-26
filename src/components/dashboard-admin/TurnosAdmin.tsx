import { envs } from '@/config/envs.config';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { getAppointmentDisplayStatus, AppointmentWithPayment, StatusInfo } from '@/services/appointmentStatus';

interface Patient {
    id: string;
    name: string;
    email: string;
    phone?: string;
    dni?: number;
    alias?: string;
    address?: string;
    health_insurance?: string;
    emergency_contact?: string;
}

interface Psychologist {
    id: string;
    name: string;
    email: string;
    phone?: string;
    personal_biography?: string;
    professional_experience?: number;
    session_price?: number;
    specialties?: string[];
    languages?: string[];
    verified_status?: string;
}

interface Appointment extends AppointmentWithPayment {
    patient: Patient;
    psychologist: Psychologist;
}

const TurnosAdmin = () => {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('authToken') || Cookies.get('authToken') || Cookies.get('auth_token');
        const fetchData = async () => {
            try {
                const response = await fetch(`${envs.next_public_api_url}/appointments`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const result = await response.json();
                setAppointments(result);
            } catch (error) {
                console.error('Error al cargar turnos:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const formatStatus = (appointment: Appointment): StatusInfo => {
        return getAppointmentDisplayStatus(appointment);
    };

    const formatModality = (modality: string) => {
        const modalityMap: { [key: string]: string } = {
            'ONLINE': '💻 Online',
            'IN_PERSON': '🏢 Presencial',
        };
        return modalityMap[modality] || modality;
    };

    // Función para obtener el precio real del turno
    const getRealPrice = (appointment: Appointment) => {
        // Priorizar el precio del turno específico sobre el precio base del psicólogo
        if (appointment.price) {
            return `$${appointment.price}`;
        }
        if (appointment.psychologist.session_price) {
            return `$${appointment.psychologist.session_price}`;
        }
        return 'No definido';
    };

    if (loading) {
        return (
            <div className="w-full min-h-[500px] flex items-center justify-center">
                <div className="flex items-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#5046E7]"></div>
                    <span className="ml-3 text-gray-600">Cargando turnos...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full min-h-[500px] flex flex-col">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-[#5046E7] rounded-lg flex items-center justify-center">
                    <span className="text-sm font-bold text-white">📅</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Gestión de Citas</h2>
                <div className="ml-auto bg-[#5046E7]/10 text-[#5046E7] px-3 py-1 rounded-full text-sm font-semibold">
                    {appointments.length} citas
                </div>
            </div>
            
            <div className="flex-1">
                {appointments.length === 0 ? (
                    <div className="flex items-center justify-center h-full">
                        <div className="bg-gradient-to-r from-[#5046E7]/10 to-[#6366F1]/10 border border-[#5046E7]/20 rounded-lg p-8 text-center w-full max-w-2xl">
                            <div className="flex flex-col items-center gap-4">
                                <div className="w-16 h-16 bg-[#5046E7]/20 rounded-full flex items-center justify-center">
                                    <span className="text-2xl">📋</span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-700">No hay citas registradas</h3>
                                <p className="max-w-md text-gray-500">
                                    Aún no se han programado citas en el sistema. Las citas aparecerán aquí cuando los pacientes las reserven.
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                            Paciente
                                        </th>
                                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                            Psicólogo / Precio
                                        </th>
                                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                            Fecha y Hora
                                        </th>
                                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                            Estado
                                        </th>
                                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                            Modalidad
                                        </th>
                                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                            Acciones
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {appointments.map((appointment) => {
                                        const statusInfo = formatStatus(appointment);
                                        return (
                                            <tr key={appointment.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {appointment.patient.name}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            {appointment.patient.email}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {appointment.psychologist.name}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            {getRealPrice(appointment)}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">
                                                        {formatDate(appointment.date)}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {appointment.hour} ({appointment.duration || 45} min)
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusInfo.color}`}>
                                                        {statusInfo.label}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                                                    {formatModality(appointment.modality)}
                                                </td>
                                                <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                                                    <div className="flex space-x-2 flex-wrap">
                                                        <button
                                                            onClick={() => setSelectedAppointment(appointment)}
                                                            className="text-blue-600 hover:text-blue-900 text-xs"
                                                        >
                                                            Ver
                                                        </button>
                                                        {statusInfo.canCancel && (
                                                            <button className="text-red-600 hover:text-red-900 text-xs">
                                                                Cancelar
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>

            {/* Modal de Detalles Completos */}
            {selectedAppointment && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-bold text-gray-800">Detalles Completos de la Cita</h3>
                                <button 
                                    onClick={() => setSelectedAppointment(null)}
                                    className="text-2xl text-gray-400 hover:text-gray-600"
                                >
                                    ×
                                </button>
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                                {/* Información Completa del Paciente */}
                                <div>
                                    <h4 className="flex items-center gap-2 mb-4 text-lg font-semibold text-gray-800">
                                        <span>👤</span>
                                        Información del Paciente
                                    </h4>
                                    <div className="space-y-3 text-sm">
                                        <div><strong>Nombre:</strong> {selectedAppointment.patient.name}</div>
                                        <div><strong>Email:</strong> {selectedAppointment.patient.email}</div>
                                        {selectedAppointment.patient.phone && <div><strong>Teléfono:</strong> {selectedAppointment.patient.phone}</div>}
                                        {selectedAppointment.patient.dni && <div><strong>DNI:</strong> {selectedAppointment.patient.dni}</div>}
                                        {selectedAppointment.patient.alias && <div><strong>Alias:</strong> {selectedAppointment.patient.alias}</div>}
                                        {selectedAppointment.patient.address && <div><strong>Dirección:</strong> {selectedAppointment.patient.address}</div>}
                                        {selectedAppointment.patient.health_insurance && <div><strong>Obra Social:</strong> {selectedAppointment.patient.health_insurance}</div>}
                                        {selectedAppointment.patient.emergency_contact && <div><strong>Contacto de Emergencia:</strong> {selectedAppointment.patient.emergency_contact}</div>}
                                    </div>
                                </div>

                                {/* Información Completa del Psicólogo */}
                                <div>
                                    <h4 className="flex items-center gap-2 mb-4 text-lg font-semibold text-gray-800">
                                        <span>👨‍⚕️</span>
                                        Información del Psicólogo
                                    </h4>
                                    <div className="space-y-3 text-sm">
                                        <div><strong>Nombre:</strong> {selectedAppointment.psychologist.name}</div>
                                        <div><strong>Email:</strong> {selectedAppointment.psychologist.email}</div>
                                        {selectedAppointment.psychologist.phone && <div><strong>Teléfono:</strong> {selectedAppointment.psychologist.phone}</div>}
                                        {selectedAppointment.psychologist.professional_experience && <div><strong>Experiencia:</strong> {selectedAppointment.psychologist.professional_experience} años</div>}
                                        {selectedAppointment.psychologist.session_price && <div><strong>Precio por Sesión:</strong> ${selectedAppointment.psychologist.session_price} ARS</div>}
                                        {selectedAppointment.psychologist.specialties && <div><strong>Especialidades:</strong> {selectedAppointment.psychologist.specialties.join(', ')}</div>}
                                        {selectedAppointment.psychologist.languages && <div><strong>Idiomas:</strong> {selectedAppointment.psychologist.languages.join(', ')}</div>}
                                        {selectedAppointment.psychologist.verified_status && <div><strong>Estado de Verificación:</strong> {selectedAppointment.psychologist.verified_status}</div>}
                                    </div>
                                </div>
                            </div>
                            
                            {/* Detalles Completos de la Cita */}
                            <div className="mt-8">
                                <h4 className="flex items-center gap-2 mb-4 text-lg font-semibold text-gray-800">
                                    <span>📅</span>
                                    Detalles de la Cita
                                </h4>
                                <div className="grid grid-cols-1 gap-6 text-sm md:grid-cols-2">
                                    <div>
                                        <div className="space-y-3">
                                            <div><strong>ID de Cita:</strong> {selectedAppointment.id}</div>
                                            <div><strong>Fecha:</strong> {formatDate(selectedAppointment.date)}</div>
                                            <div><strong>Hora:</strong> {selectedAppointment.hour}</div>
                                            <div><strong>Duración:</strong> {selectedAppointment.duration || 45} minutos</div>
                                            <div><strong>Estado:</strong> 
                                                <span className={`ml-2 px-2 py-1 rounded-full text-xs ${formatStatus(selectedAppointment).color}`}>
                                                    {formatStatus(selectedAppointment).label}
                                                </span>
                                            </div>
                                            <div><strong>Modalidad:</strong> {formatModality(selectedAppointment.modality)}</div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="space-y-3">
                                            {selectedAppointment.session_type && <div><strong>Tipo de Sesión:</strong> {selectedAppointment.session_type}</div>}
                                            {selectedAppointment.therapy_approach && <div><strong>Enfoque Terapéutico:</strong> {selectedAppointment.therapy_approach}</div>}
                                            {selectedAppointment.insurance && <div><strong>Seguro:</strong> {selectedAppointment.insurance}</div>}
                                            {selectedAppointment.price && <div><strong>Precio:</strong> ${selectedAppointment.price} ARS</div>}
                                        </div>
                                    </div>
                                </div>
                                
                                {selectedAppointment.notes && (
                                    <div className="mt-6">
                                        <strong className="block mb-2">Notas Adicionales:</strong>
                                        <div className="p-4 rounded-md bg-gray-50">
                                            {selectedAppointment.notes}
                                        </div>
                                    </div>
                                )}

                                {/* Acciones del Modal */}
                                <div className="flex gap-2 pt-4 mt-6 border-t border-gray-200">
                                    {selectedAppointment.status === 'PENDING' && (
                                        <>
                                            <button className="px-4 py-2 text-sm text-white transition-colors bg-red-600 rounded-md hover:bg-red-700">
                                                Cancelar Cita
                                            </button>
                                        </>
                                    )}
                                    <button 
                                        onClick={() => setSelectedAppointment(null)}
                                        className="px-4 py-2 ml-auto text-sm text-gray-700 transition-colors bg-gray-300 rounded-md hover:bg-gray-400"
                                    >
                                        Cerrar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TurnosAdmin;
