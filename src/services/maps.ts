import { envs } from '@/config/envs.config';
import Cookies from 'js-cookie';

export interface NearbyPsychologist {
    name: string;
    email: string;
    address: string;
    distance: number;
    link: string;
}

export interface NearbyPsychologistsResponse {
    message: string;
    psychologists: NearbyPsychologist[];
}

export interface DirectionsResponse {
    message: string;
    directions: {
        from: string;
        to: string;
        link: string;
    };
}

const API_BASE_URL = envs.next_public_api_url;

export const mapsService = {
    // Obtener psicólogos cercanos con distancia
    getNearbyPsychologists: async (maxDistance: number = 5): Promise<NearbyPsychologistsResponse> => {
        try {
            const token = Cookies.get('auth_token');

            if (!token) {
                throw new Error('No authentication token found');
            }

            const response = await fetch(`${API_BASE_URL}/maps/nearby?distance=${maxDistance}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error('Authentication failed');
                }
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error getting nearby psychologists:', error);
            throw error;
        }
    },

    // Obtener direcciones entre usuario y psicólogo
    getDirections: async (psychologistId: string): Promise<DirectionsResponse> => {
        try {
            const token = Cookies.get('auth_token');

            if (!token) {
                throw new Error('No authentication token found');
            }

            const response = await fetch(`${API_BASE_URL}/maps/directions/${psychologistId}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error('Authentication failed');
                }
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error getting directions:', error);
            throw error;
        }
    },
};
