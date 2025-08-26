import { envs } from '@/config/envs.config';
import Cookies from 'js-cookie';

export interface AppointmentResponse {
    id: string;
    date: string; // ISO string - el backend devuelve Date como ISO
    hour: string; // HH:mm format
    duration: number;
    notes?: string;
    status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
    modality: 'Presencial' | 'En línea' | 'Híbrido';
    session_type?: string;
    therapy_approach?: string;
    insurance?: string;
    price?: number;
    specialty?: string;
    isActive?: boolean;
    patient?: {
        id: string;
        name: string;
        email: string;
    };
    psychologist?: {
        id: string;
        name: string;
        email: string;
        personal_biography?: string;
        languages?: string[];
        professional_experience?: string;
        professional_title?: string;
        license_number?: string;
        verified?: boolean;
        office_address?: string;
        specialities?: string[];
        therapy_approaches?: string[];
        session_types?: string[];
        modality?: string[];
        insurance_accepted?: string[];
        availability?: string[];
        consultation_fee?: number;
        profile_picture?: string;
    };
}

export interface CreateAppointmentRequest {
    date: string; // YYYY-MM-DD
    hour: string; // HH:mm - Solo valores válidos: 09:00, 10:00, 11:00, 14:00, 15:00, 16:00
    notes?: string;
    user_id: string;
    psychologist_id: string;
    modality: 'Presencial' | 'En línea' | 'Híbrido';
    specialty?: string;
    session_type?: string;
    therapy_approach?: string;
    insurance?: string;
    price?: number;
}

export interface UpdateAppointmentRequest {
    date?: string; // YYYY-MM-DD
    hour?: string; // HH:mm - Solo valores válidos: 09:00, 10:00, 11:00, 14:00, 15:00, 16:00
    notes?: string;
    user_id?: string;
    psychologist_id?: string;
    status?: 'pending' | 'confirmed' | 'cancelled' | 'completed';
    modality?: 'Presencial' | 'En línea' | 'Híbrido';
    specialty?: string;
    session_type?: string;
    therapy_approach?: string;
    insurance?: string;
    price?: number;
}

export interface AppointmentsApiResponse {
    message?: string;
    data?: AppointmentResponse[];
}

const API_BASE_URL = envs.next_public_api_url;

export const appointmentsService = {
    // Crear una nueva cita
    createAppointment: async (appointmentData: CreateAppointmentRequest): Promise<AppointmentResponse> => {
        try {
            const token = Cookies.get('auth_token');

            if (!token) {
                throw new Error('No authentication token found');
            }

            // Verificar si el token ha expirado
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                if (payload.exp && payload.exp * 1000 < Date.now()) {
                    Cookies.remove('auth_token');
                    throw new Error('Token expired');
                }
            } catch (tokenError) {
                console.error('Error verificando token:', tokenError);
                Cookies.remove('auth_token');
                throw new Error('Invalid token');
            }

            const response = await fetch(`${API_BASE_URL}/appointments`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(appointmentData),
            });

            if (!response.ok) {
                if (response.status === 401) {
                    Cookies.remove('auth_token');
                    throw new Error('Authentication failed - please login again');
                } else if (response.status === 400) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Bad request');
                }
                throw new Error(`Error creating appointment: ${response.statusText}`);
            }

            const result = await response.json();

            return result;
        } catch (error) {
            console.error('Error creating appointment:', error);
            throw error;
        }
    },

    // Obtener todas las citas del usuario autenticado
    getMyAppointments: async (): Promise<AppointmentResponse[]> => {
        try {
            const token = Cookies.get('auth_token');

            if (!token) {
                throw new Error('No authentication token found');
            }

            // Verificar si el token ha expirado
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                if (payload.exp && payload.exp * 1000 < Date.now()) {
                    Cookies.remove('auth_token');
                    throw new Error('Token expired');
                }
            } catch (tokenError) {
                console.error('Error verificando token:', tokenError);
                Cookies.remove('auth_token');
                throw new Error('Invalid token');
            }

            const response = await fetch(`${API_BASE_URL}/appointments/me`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                console.error('Response status:', response.status);
                console.error('Response statusText:', response.statusText);
                console.error('Response headers:', response.headers);

                if (response.status === 401) {
                    Cookies.remove('auth_token');
                    throw new Error('Authentication failed - please login again');
                }
                throw new Error(`Error fetching appointments: Status ${response.status} - ${response.statusText}`);
            }

            const result = await response.json();

            // El backend devuelve un array directamente
            return Array.isArray(result) ? result : [];
        } catch (error) {
            console.error('Error fetching my appointments:', error);
            throw error;
        }
    },

    // Obtener citas disponibles para un psicólogo en una fecha específica
    getAvailableSlots: async (
        psychologistId: string,
        date: string,
        slotMinutes = 30
    ): Promise<{ date: string; hour: string; available: boolean }[]> => {
        try {
            const token = Cookies.get('auth_token');

            if (!token) {
                throw new Error('No authentication token found');
            }

            const response = await fetch(
                `${API_BASE_URL}/appointments/available?psychologistId=${psychologistId}&date=${date}&slotMinutes=${slotMinutes}`,
                {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (!response.ok) {
                if (response.status === 401) {
                    Cookies.remove('auth_token');
                    throw new Error('Authentication failed - please login again');
                }
                throw new Error(`Error fetching available slots: ${response.statusText}`);
            }

            const result = await response.json();
            return result;
        } catch (error) {
            console.error('Error fetching available slots:', error);
            throw error;
        }
    },

    // Cancelar una cita (deshabilitar)
    cancelAppointment: async (appointmentId: string): Promise<{ message: string; appointment_id: string }> => {
        try {
            const token = Cookies.get('auth_token');

            if (!token) {
                throw new Error('No authentication token found');
            }

            const response = await fetch(`${API_BASE_URL}/appointments/${appointmentId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                if (response.status === 401) {
                    Cookies.remove('auth_token');
                    throw new Error('Authentication failed - please login again');
                }
                throw new Error(`Error cancelling appointment: ${response.statusText}`);
            }

            const result = await response.json();
            return result;
        } catch (error) {
            console.error('Error cancelling appointment:', error);
            throw error;
        }
    },

    // Confirmar una cita (solo psicólogos)
    confirmAppointment: async (appointmentId: string): Promise<{ message: string; appointment_id: string; status: string }> => {
        try {
            const token = Cookies.get('auth_token');

            if (!token) {
                throw new Error('No authentication token found');
            }

            const response = await fetch(`${API_BASE_URL}/appointments/${appointmentId}/confirm`, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                if (response.status === 401) {
                    Cookies.remove('auth_token');
                    throw new Error('Authentication failed - please login again');
                } else if (response.status === 403) {
                    throw new Error('Solo el psicólogo asignado puede confirmar la cita');
                } else if (response.status === 400) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Solo se pueden confirmar citas con estado PENDING');
                }
                throw new Error(`Error confirming appointment: ${response.statusText}`);
            }

            const result = await response.json();
            return result;
        } catch (error) {
            console.error('Error confirming appointment:', error);
            throw error;
        }
    },

    // Completar una cita (solo psicólogos)
    completeAppointment: async (appointmentId: string): Promise<{ message: string; appointment_id: string; status: string }> => {
        try {
            const token = Cookies.get('auth_token');

            if (!token) {
                throw new Error('No authentication token found');
            }

            const response = await fetch(`${API_BASE_URL}/appointments/${appointmentId}/complete`, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                if (response.status === 401) {
                    Cookies.remove('auth_token');
                    throw new Error('Authentication failed - please login again');
                } else if (response.status === 403) {
                    throw new Error('Solo el psicólogo asignado puede completar la cita');
                } else if (response.status === 400) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Solo se pueden completar citas con estado CONFIRMED');
                }
                throw new Error(`Error completing appointment: ${response.statusText}`);
            }

            const result = await response.json();
            return result;
        } catch (error) {
            console.error('Error completing appointment:', error);
            throw error;
        }
    },

    // Actualizar una cita
    updateAppointment: async (appointmentId: string, updateData: UpdateAppointmentRequest): Promise<AppointmentResponse> => {
        try {
            const token = Cookies.get('auth_token');

            if (!token) {
                throw new Error('No authentication token found');
            }

            const response = await fetch(`${API_BASE_URL}/appointments/${appointmentId}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateData),
            });

            if (!response.ok) {
                if (response.status === 401) {
                    Cookies.remove('auth_token');
                    throw new Error('Authentication failed - please login again');
                }
                throw new Error(`Error updating appointment: ${response.statusText}`);
            }

            const result = await response.json();
            return result;
        } catch (error) {
            console.error('Error updating appointment:', error);
            throw error;
        }
    },

    // Verificar si el usuario tiene citas completadas con un psicólogo específico
    hasCompletedAppointmentsWith: async (psychologistId: string): Promise<boolean> => {
        try {
            const appointments = await appointmentsService.getMyAppointments();

            // Buscar si hay alguna cita completada con este psicólogo
            const hasCompleted = appointments.some(
                (appointment) => appointment.psychologist?.id === psychologistId && appointment.status === 'completed'
            );

            return hasCompleted;
        } catch (error) {
            console.error('Error checking completed appointments:', error);
            return false;
        }
    },

    // Obtener una cita específica por ID
    getAppointmentById: async (appointmentId: string): Promise<AppointmentResponse> => {
        try {
            const token = Cookies.get('auth_token');

            if (!token) {
                throw new Error('No authentication token found');
            }

            const response = await fetch(`${API_BASE_URL}/appointments/${appointmentId}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                if (response.status === 401) {
                    Cookies.remove('auth_token');
                    throw new Error('Authentication failed - please login again');
                } else if (response.status === 403) {
                    throw new Error('No tenés permiso para ver esta cita');
                } else if (response.status === 404) {
                    throw new Error('Cita no encontrada');
                }
                throw new Error(`Error fetching appointment: ${response.statusText}`);
            }

            const result = await response.json();
            return result;
        } catch (error) {
            console.error('Error fetching appointment by ID:', error);
            throw error;
        }
    },

    // Validar horarios disponibles
    validateAppointmentTime: (hour: string): boolean => {
        const validHours = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];
        return validHours.includes(hour);
    },

    // Validar si la fecha está en el futuro
    validateAppointmentDate: (date: string, hour: string): boolean => {
        const appointmentDateTime = new Date(`${date}T${hour}:00`);
        return appointmentDateTime.getTime() > Date.now();
    },
};
