import { envs } from '@/config/envs.config';
import Cookies from 'js-cookie';

export interface PatientResponse {
    id: string;
    name: string;
    email: string;
    phone?: string;
    created_at: string;
    updated_at?: string;
    // Información adicional del paciente
    totalAppointments?: number;
    lastAppointment?: string;
    nextAppointment?: string;
}

export interface PatientsApiResponse {
    message: string;
    data: PatientResponse[];
}

const API_BASE_URL = envs.next_public_api_url;

export const patientsService = {
    // Obtener todos los pacientes de un psicólogo
    getMyPatients: async (): Promise<PatientResponse[]> => {
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

            console.log('Fetching patients for psychologist');

            const response = await fetch(`${API_BASE_URL}/psychologist/patients`, {
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
                throw new Error(`Error fetching patients: ${response.statusText}`);
            }

            const result = await response.json();
            console.log('Patients result:', result);

            // Verificar el formato de la respuesta del backend
            if (result.data && Array.isArray(result.data)) {
                return result.data;
            } else if (Array.isArray(result)) {
                return result;
            } else {
                console.error('Unexpected response format:', result);
                return [];
            }
        } catch (error) {
            console.error('Error fetching patients:', error);
            throw error;
        }
    },
};
