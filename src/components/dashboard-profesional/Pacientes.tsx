'use client';
import { useEffect, useState } from 'react';
import { appointmentsService, AppointmentResponse } from '@/services/appointments';

interface PatientInfo {
    id: string;
    name: string;
    email: string;
    totalAppointments: number;
    lastAppointment?: string;
    nextAppointment?: string;
}

const Pacientes = () => {
    const [patients, setPatients] = useState<PatientInfo[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPatients = async () => {
            try {
                setLoading(true);

                // Obtener todas las citas del psicólogo
                const appointments = await appointmentsService.getMyAppointments();

                // Extraer información única de pacientes
                const patientsMap = new Map<string, PatientInfo>();

                appointments.forEach((appointment: AppointmentResponse) => {
                    if (appointment.patient) {
                        const patientId = appointment.patient.id;

                        if (!patientsMap.has(patientId)) {
                            patientsMap.set(patientId, {
                                id: patientId,
                                name: appointment.patient.name,
                                email: appointment.patient.email,
                                totalAppointments: 0,
                                lastAppointment: undefined,
                                nextAppointment: undefined,
                            });
                        }

                        const patientInfo = patientsMap.get(patientId)!;
                        patientInfo.totalAppointments++;

                        const appointmentDate = new Date(appointment.date);
                        const now = new Date();

                        // Actualizar última cita (citas completadas o pasadas)
                        if (appointmentDate < now && (appointment.status === 'completed' || appointment.status === 'confirmed')) {
                            if (!patientInfo.lastAppointment || new Date(patientInfo.lastAppointment) < appointmentDate) {
                                patientInfo.lastAppointment = appointment.date;
                            }
                        }

                        // Actualizar próxima cita (citas futuras confirmadas o pendientes)
                        if (appointmentDate > now && (appointment.status === 'confirmed' || appointment.status === 'pending')) {
                            if (!patientInfo.nextAppointment || new Date(patientInfo.nextAppointment) > appointmentDate) {
                                patientInfo.nextAppointment = appointment.date;
                            }
                        }
                    }
                });

                setPatients(Array.from(patientsMap.values()));
            } catch (error) {
                console.error('Error loading patients:', error);

                const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
                if (errorMessage.includes('Authentication failed') || errorMessage.includes('Token expired')) {
                    alert('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.');
                    window.location.href = '/login';
                } else {
                    alert('Ocurrió un error al cargar la lista de pacientes. Por favor, recarga la página.');
                }
            } finally {
                setLoading(false);
            }
        };

        loadPatients();
    }, []);

    // Función para formatear la fecha
    const formatDate = (dateString: string): string => {
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
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
                    <h1 className="text-xl font-semibold text-black">Lista de Pacientes</h1>
                    <span className="text-black">Cargando tu lista de pacientes...</span>
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
                <h1 className="text-xl font-semibold text-black">Lista de Pacientes</h1>
                <span className="text-black">Gestiona tu lista de pacientes activos</span>
            </div>
            <div>
                {patients.length > 0 ? (
                    <div className="space-y-4">
                        {patients.map((patient) => (
                            <div key={patient.id} className="bg-white border rounded-lg p-6 shadow-sm">
                                <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] gap-4 items-center">
                                    {/* Avatar placeholder */}
                                    <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                                        <span className="text-white font-bold text-lg">{patient.name.charAt(0).toUpperCase()}</span>
                                    </div>

                                    {/* Información del paciente */}
                                    <div className="flex flex-col gap-2">
                                        <h3 className="font-bold text-lg text-black">{patient.name}</h3>
                                        <p className="text-gray-600 text-sm">{patient.email}</p>

                                        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                                            <div>
                                                <span className="font-semibold">Total de citas:</span> {patient.totalAppointments}
                                            </div>

                                            {patient.lastAppointment && (
                                                <div>
                                                    <span className="font-semibold">Última cita:</span> {formatDate(patient.lastAppointment)}
                                                </div>
                                            )}

                                            {patient.nextAppointment && (
                                                <div>
                                                    <span className="font-semibold">Próxima cita:</span> {formatDate(patient.nextAppointment)}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Botones de acción */}
                                    <div className="flex gap-2">
                                        <button
                                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
                                            onClick={() => {
                                                // TODO: Implementar funcionalidad de enviar mensaje
                                                alert('Funcionalidad de mensajería próximamente disponible');
                                            }}
                                        >
                                            Enviar Mensaje
                                        </button>

                                        <button
                                            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm font-medium"
                                            onClick={() => {
                                                // TODO: Implementar navegación al historial de citas del paciente
                                                alert('Funcionalidad de historial próximamente disponible');
                                            }}
                                        >
                                            Ver Historial
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <p className="text-gray-500 mb-4">No tienes pacientes registrados aún</p>
                        <p className="text-sm text-gray-400">Los pacientes aparecerán aquí cuando reserven citas contigo</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Pacientes;
