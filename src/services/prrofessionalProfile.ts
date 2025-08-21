import { envs } from '@/config/envs.config';

export interface IProfessional {
    id: string;
    name: string;
    birthdate: string;
    phone: string;
    dni: string;
    office_address: string;
    email: string;
    professional_title: string;
    license_number: string;
    personal_biography: string;
    professional_experience: number;
    languages: string[];
    therapy_approaches: string[];
    session_types: string[];
    modality: string;
    specialities: string[];
    insurance_accepted: string[];
    availability: string[];
    verified: string;
    role: string;
    profile_picture: null;
}

export interface IUser {
    name: string;
    email: string;
    phone: string;
    address: string;
    photoUrl: string;
    created_at: string;
    role: string;
    health_insurance: string;
}

export const getProfessionalById = async (id: string, token?: string): Promise<IProfessional | IUser | null> => {
    try {
        const res = await fetch(`${envs.next_public_api_url}/users/public/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
        });

        const data = await res.json();
        if (!data) {
            console.warn('Invalid product data format', data);
            return null;
        }

        if (!res.ok) {
            console.error('Backend error:', data);
            return null;
        }
        return data.data;
    } catch (error) {
        console.warn('Error fetching product', error);
        return null;
    }
};
