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
            const token = Cookies.get('authToken');

            if (!token) {
                throw new Error('No authentication token found');
            }

            // Intentar obtener psicólogos del endpoint específico del usuario
            let response = await fetch(`${API_BASE_URL}/users/me/psychologists`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            // Si no funciona, intentar obtener todos los psicólogos verificados
            if (!response.ok) {
                response = await fetch(`${API_BASE_URL}/psychologist`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
            }

            if (!response.ok) {
                throw new Error(`Error fetching psychologists: ${response.statusText}`);
            }

            const result = await response.json();

            // Filtrar solo psicólogos verificados
            if (result.data) {
                result.data = result.data.filter((psychologist: PsychologistResponse) => psychologist.verified === 'VALIDATED');
            }

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
