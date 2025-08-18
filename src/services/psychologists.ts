import { envs } from '@/config/envs.config';
import Cookies from 'js-cookie';

export interface PsychologistResponse {
    id: string;
    name: string;
    email: string;
    phone?: string;
    personal_biography?: string;
    languages?: string[];
    professional_experience?: number;
    professional_title?: string;
    license_number?: number;
    verified: 'PENDING' | 'VALIDATED' | 'REJECTED';
    office_address?: string;
    specialities?: string[];
    therapy_approaches?: string[];
    session_types?: string[];
    modality?: string;
    insurance_accepted?: string[];
    availability?: string[];
    profile_picture?: string;
    created_at: string;
    updated_at?: string;
}

export interface PsychologistsApiResponse {
    message: string;
    data: PsychologistResponse[];
}

const API_BASE_URL = envs.next_public_api_url;

export const psychologistsService = {
    // Obtener todos los psicólogos verificados
    getPsychologistsForPatient: async (): Promise<PsychologistsApiResponse> => {
        try {
            const token = Cookies.get('authToken') || Cookies.get('auth-token');

            console.log('Service - Checking for tokens:');
            console.log('authToken:', Cookies.get('authToken'));
            console.log('auth-token:', Cookies.get('auth-token'));
            console.log('Selected token:', token);

            if (!token) {
                throw new Error('No authentication token found');
            }

            // Verificar si el token ha expirado antes de hacer la petición
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                console.log('Token payload:', payload);
                if (payload.exp && payload.exp * 1000 < Date.now()) {
                    console.log('Token ha expirado');
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

            console.log('Making request to:', `${API_BASE_URL}/psychologist/verification/verified`);

            // Usar la ruta correcta para obtener psicólogos verificados
            const response = await fetch(`${API_BASE_URL}/psychologist/verification/verified`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            console.log('Response status:', response.status);
            console.log('Response ok:', response.ok);

            if (!response.ok) {
                if (response.status === 401) {
                    // Token inválido o expirado
                    Cookies.remove('authToken');
                    Cookies.remove('auth-token');
                    throw new Error('Authentication failed - please login again');
                }
                throw new Error(`Error fetching psychologists: ${response.statusText}`);
            }

            const result = await response.json();
            console.log('Psychologists result:', result);

            return result;
        } catch (error) {
            console.error('Error fetching psychologists:', error);
            throw error;
        }
    },

    // Función auxiliar para obtener un psicólogo por ID
    getPsychologistById: async (psychologists: PsychologistResponse[], id: string): Promise<PsychologistResponse | null> => {
        return psychologists.find((p) => p.id === id) || null;
    },
};
