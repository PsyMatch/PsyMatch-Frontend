import { envs } from '@/config/envs.config';

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
    // Obtener todos los psicólogos verificados para un paciente
    getPsychologistsForPatient: async (token: string): Promise<PsychologistsApiResponse> => {
        const response = await fetch(`${API_BASE_URL}/users/patient/professionals`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Error fetching psychologists: ${response.statusText}`);
        }

        return response.json();
    },

    // Función auxiliar para obtener un psicólogo por ID
    getPsychologistById: async (psychologists: PsychologistResponse[], id: string): Promise<PsychologistResponse | null> => {
        return psychologists.find((p) => p.id === id) || null;
    },
};
