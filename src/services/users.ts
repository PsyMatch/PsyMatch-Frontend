import { envs } from '@/config/envs.config';

const API_BASE_URL = envs.next_public_api_url;

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  birthdate?: string;
  address?: string;
  health_insurance?: string;
  emergency_contact?: string;
  role: string;
  profile_picture?: string;
  alias?: string;
  created_at: string;
  updated_at: string;
}

export interface UpdateUserData {
  name?: string;
  alias?: string;
  phone?: string;
  birthdate?: string;
  address?: string;
  health_insurance?: string;
  emergency_contact?: string;
  profile_picture?: File | string;
}

export const usersApi = {
  // Obtener mi perfil
  getMe: async (token: string): Promise<{ data: User }> => {
    const response = await fetch(`${API_BASE_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Error fetching user profile' }));
      throw new Error(error.message || 'Error fetching user profile');
    }

    return response.json();
  },

  // Cerrar sesión en el servidor
  logout: async (token: string): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      // No importa si falla, el logout local debe funcionar siempre
      if (!response.ok) {
        console.warn('Logout del servidor falló, pero continuando con logout local');
      }
    } catch (error) {
      console.warn('Error en logout del servidor:', error);
      // No lanzar error, permitir que el logout local continúe
    }
  },

  // Actualizar mi perfil
  updateMe: async (userData: UpdateUserData, token: string): Promise<{ data: User }> => {
    const formData = new FormData();

    // Agregar campos de texto
    Object.keys(userData).forEach((key) => {
      if (key !== 'profile_picture' && userData[key as keyof UpdateUserData] !== undefined) {
        const value = userData[key as keyof UpdateUserData];
        if (value !== null && value !== '') {
          formData.append(key, value as string);
        }
      }
    });

    // Agregar archivo si existe
    if (userData.profile_picture instanceof File) {
      formData.append('profile_picture', userData.profile_picture);
    }

    const response = await fetch(`${API_BASE_URL}/users/me`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Error updating user profile' }));
      throw new Error(error.message || 'Error updating user profile');
    }

    return response.json();
  },

  // Verificar si faltan datos obligatorios del perfil
  checkMissingData: (user: User): boolean => {
    if (!user) return false;
    
    const requiredFields = ['alias', 'phone', 'birthdate', 'address', 'emergency_contact', 'health_insurance'];
    
    const missingFields = requiredFields.filter(field => {
      const value = user[field as keyof User];
      return !value || value === '' || value === null || value === undefined || 
             (typeof value === 'string' && value.trim() === '');
    });
    
    // Debug: log para verificar qué campos faltan
    if (missingFields.length > 0) {
      console.log('Campos faltantes:', missingFields);
      console.log('Datos del usuario:', {
        alias: user.alias,
        phone: user.phone,
        birthdate: user.birthdate,
        address: user.address,
        emergency_contact: user.emergency_contact,
        health_insurance: user.health_insurance
      });
    }
    
    return missingFields.length > 0;
  },
};
