'use client';
import { useEffect, useState } from 'react';
import { appointmentsService, AppointmentResponse } from '@/services/appointments';
import { useNotifications } from '@/hooks/useNotifications';

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
    const notifications = useNotifications();

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
                    notifications.error('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.');
                    window.location.href = '/login';
                } else {
                    notifications.error('Ocurrió un error al cargar la lista de pacientes. Por favor, recarga la página.');
                }
            } finally {
                setLoading(false);
            }
        };

        loadPatients();
    }, [notifications]);

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
                    <div className="w-8 h-8 border-b-2 border-blue-600 rounded-full animate-spin"></div>
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
                            <div key={patient.id} className="p-6 bg-white border rounded-lg shadow-sm">
                                <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] gap-4 items-center">
                                    {/* Avatar placeholder */}
                                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-600">
                                        <span className="text-lg font-bold text-white">{patient.name.charAt(0).toUpperCase()}</span>
                                    </div>

                                    {/* Información del paciente */}
                                    <div className="flex flex-col gap-2">
                                        <h3 className="text-lg font-bold text-black">{patient.name}</h3>
                                        <p className="text-sm text-gray-600">{patient.email}</p>

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
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="py-8 text-center">
                        <p className="mb-4 text-gray-500">No tienes pacientes registrados aún</p>
                        <p className="text-sm text-gray-400">Los pacientes aparecerán aquí cuando reserven citas contigo</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Pacientes;
