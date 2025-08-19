import { envs } from '@/config/envs.config';
import Cookies from 'js-cookie';

export interface AppointmentResponse {
    id: string;
    date: string; // ISO string
    hour: string; // HH:mm format
    duration: number;
    notes?: string;
    status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
    modality: 'Presencial' | 'En línea' | 'Híbrido';
    session_type?: string;
    therapy_approach?: string;
    insurance?: string;
    price?: number;
    patient?: {
        id: string;
        name: string;
        email: string;
    };
    psychologist?: {
        id: string;
        name: string;
        email: string;
    };
}

export interface CreateAppointmentRequest {
    date: string; // YYYY-MM-DD
    hour: string; // HH:mm
    notes?: string;
    user_id: string;
    psychologist_id: string;
    modality: 'Presencial' | 'En línea' | 'Híbrido';
    session_type?: string;
    therapy_approach?: string;
    insurance?: string;
    price?: number;
}

export interface UpdateAppointmentRequest {
    date?: string; // YYYY-MM-DD
    hour?: string; // HH:mm
    notes?: string;
    user_id?: string;
    psychologist_id?: string;
    status?: 'pending' | 'confirmed' | 'cancelled' | 'completed';
    modality?: 'Presencial' | 'En línea' | 'Híbrido';
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
            const token = Cookies.get('authToken') || Cookies.get('auth-token');

            if (!token) {
                throw new Error('No authentication token found');
            }

            // Verificar si el token ha expirado
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                if (payload.exp && payload.exp * 1000 < Date.now()) {
                    Cookies.remove('authToken');
                    Cookies.remove('auth-token');
                    throw new Error('Token expired');
                }
            } catch (tokenError) {
                console.error('Error verificando token:', tokenError);
                Cookies.remove('authToken');
                Cookies.remove('auth-token');
                throw new Error('Invalid token');
            }

            console.log('Creating appointment:', appointmentData);

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
                    Cookies.remove('authToken');
                    Cookies.remove('auth-token');
                    throw new Error('Authentication failed - please login again');
                } else if (response.status === 400) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Bad request');
                }
                throw new Error(`Error creating appointment: ${response.statusText}`);
            }

            const result = await response.json();
            console.log('Appointment created:', result);

            return result;
        } catch (error) {
            console.error('Error creating appointment:', error);
            throw error;
        }
    },

    // Obtener todas las citas del usuario autenticado
    getMyAppointments: async (): Promise<AppointmentResponse[]> => {
        try {
            const token = Cookies.get('authToken') || Cookies.get('auth-token');

            if (!token) {
                throw new Error('No authentication token found');
            }

            // Verificar si el token ha expirado
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                if (payload.exp && payload.exp * 1000 < Date.now()) {
                    Cookies.remove('authToken');
                    Cookies.remove('auth-token');
                    throw new Error('Token expired');
                }
            } catch (tokenError) {
                console.error('Error verificando token:', tokenError);
                Cookies.remove('authToken');
                Cookies.remove('auth-token');
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
                if (response.status === 401) {
                    Cookies.remove('authToken');
                    Cookies.remove('auth-token');
                    throw new Error('Authentication failed - please login again');
                }
                throw new Error(`Error fetching appointments: ${response.statusText}`);
            }

            const result = await response.json();
            console.log('My appointments:', result);

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
            const token = Cookies.get('authToken') || Cookies.get('auth-token');

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
                    Cookies.remove('authToken');
                    Cookies.remove('auth-token');
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

    // Cancelar una cita
    cancelAppointment: async (appointmentId: string): Promise<{ message: string; appointment_id: string }> => {
        try {
            const token = Cookies.get('authToken') || Cookies.get('auth-token');

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
                    Cookies.remove('authToken');
                    Cookies.remove('auth-token');
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

    // Actualizar una cita
    updateAppointment: async (appointmentId: string, updateData: UpdateAppointmentRequest): Promise<AppointmentResponse> => {
        try {
            const token = Cookies.get('authToken') || Cookies.get('auth-token');

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
                    Cookies.remove('authToken');
                    Cookies.remove('auth-token');
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
};
