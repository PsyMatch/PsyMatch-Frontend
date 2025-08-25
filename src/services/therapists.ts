import { envs } from '@/config/envs.config';
import Cookies from 'js-cookie';

export interface ITherapist {
    name: string;
    id: string;
    email: string;
    phone?: string;
    profile_picture?: string;
    professional_title?: string;
    professional_experience?: number;
    description?: string;
    location?: string;
    hourly_rate?: number;
    total_sessions: number;
    last_session?: string;
    upcoming_session?: string;
    status?: 'active' | 'inactive';
}

interface IAppointmentWithRelations {
    id: string;
    date: string;
    start_time: string;
    end_time: string;
    status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
    notes?: string;
    psychologist: {
        name: string;
        id: string;
        email: string;
        phone?: string;
        profile_picture?: string;
        professional_title?: string;
        professional_experience?: number;
        description?: string;
        location?: string;
        hourly_rate?: number;
    };
    patient: {
        id: string;
        name: string;
        email: string;
    };
}

class TherapistsService {
    private async getAuthHeaders() {
        const token = Cookies.get('auth_token');

        if (!token) {
            throw new Error('No authentication token found');
        }

        // Verificar si el token ha expirado
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            if (payload.exp * 1000 < Date.now()) {
                Cookies.remove('auth_token');
                throw new Error('Token expired');
            }
        } catch (tokenError) {
            console.error('Error verificando token:', tokenError);
            Cookies.remove('auth_token');
            throw new Error('Invalid token');
        }

        return {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        };
    }

    async getMyTherapists(): Promise<ITherapist[]> {
        try {
            const headers = await this.getAuthHeaders();

            // Obtener todas las citas del usuario
            const response = await fetch(`${envs.next_public_api_url}/appointments/me`, {
                headers,
            });

            if (!response.ok) {
                if (response.status === 401) {
                    // Token expirado o inválido
                    Cookies.remove('auth_token');
                    window.location.href = '/login';
                    return [];
                }
                throw new Error(`Error al obtener citas: ${response.status}`);
            }

            const appointments: IAppointmentWithRelations[] = await response.json();

            // Extraer terapeutas únicos de las citas donde el usuario es paciente
            const therapistsMap = new Map<string, ITherapist>();

            appointments.forEach((appointment) => {
                const { psychologist } = appointment;

                if (psychologist && !therapistsMap.has(psychologist.id)) {
                    // Calcular estadísticas para este terapeuta
                    const therapistAppointments = appointments.filter((a) => a.psychologist.id === psychologist.id);

                    const completedSessions = therapistAppointments.filter((a) => a.status === 'completed');

                    const upcomingSessions = therapistAppointments.filter((a) => a.status === 'confirmed' || a.status === 'pending');

                    // Encontrar la última sesión completada
                    const lastCompletedSession = completedSessions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

                    // Encontrar la próxima sesión programada
                    const nextSession = upcomingSessions.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];

                    // Función para crear fecha válida combinando date y start_time
                    const createValidDateTime = (session: IAppointmentWithRelations | undefined): string | undefined => {
                        if (!session || !session.date) return undefined;
                        
                        try {
                            // Si el campo date ya incluye la hora (formato ISO completo)
                            if (session.date.includes('T') && session.date.includes(':')) {
                                // Remover la 'Z' para evitar conversión de zona horaria
                                // y tratar la fecha como hora local
                                return session.date.replace('Z', '');
                            }
                            
                            // Si no hay start_time, usar solo la fecha
                            if (!session.start_time) {
                                return session.date;
                            }
                            
                            // Extraer solo la parte de fecha (sin tiempo) si viene en formato ISO
                            const datePart = session.date.includes('T') ? session.date.split('T')[0] : session.date;
                            
                            // Asegurar que start_time tenga el formato correcto (HH:MM:SS)
                            let timeStr = session.start_time;
                            if (timeStr && !timeStr.includes(':')) {
                                return session.date;
                            }
                            
                            // Si start_time solo tiene HH:MM, agregar :00
                            if (timeStr && timeStr.split(':').length === 2) {
                                timeStr += ':00';
                            }
                            
                            // Crear la fecha combinada
                            const combinedDateTime = `${datePart}T${timeStr}`;
                            
                            // Validar que la fecha es parseable
                            const testDate = new Date(combinedDateTime);
                            if (isNaN(testDate.getTime())) {
                                return session.date;
                            }
                            
                            return combinedDateTime;
                        } catch (error) {
                            console.error('Error creando fecha válida:', error);
                            return session.date;
                        }
                    };

                    therapistsMap.set(psychologist.id, {
                        name: psychologist.name,
                        id: psychologist.id,
                        email: psychologist.email,
                        phone: psychologist.phone,
                        profile_picture: psychologist.profile_picture,
                        professional_title: psychologist.professional_title,
                        professional_experience: psychologist.professional_experience,
                        description: psychologist.description,
                        location: psychologist.location,
                        hourly_rate: psychologist.hourly_rate,
                        total_sessions: completedSessions.length,
                        last_session: createValidDateTime(lastCompletedSession),
                        upcoming_session: createValidDateTime(nextSession),
                        status: therapistAppointments.some((a) => a.status === 'confirmed' || a.status === 'pending') ? 'active' : 'inactive',
                    });
                }
            });
            return Array.from(therapistsMap.values());
        } catch (error) {
            console.error('Error al obtener terapeutas:', error);
            throw error;
        }
    }
}

export const therapistsService = new TherapistsService();
