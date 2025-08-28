import { envs } from '@/config/envs.config';
import Cookies from 'js-cookie';

const getAuthToken = () => {
    const token = localStorage.getItem('authToken') || 
                  Cookies.get('authToken') || 
                  Cookies.get('auth_token');
    return token;
};

const getAuthHeaders = () => {
    const token = getAuthToken();
    return {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    };
};

export const adminService = {

    // Obtener psicólogos pendientes de aprobación
    getPendingPsychologists: async (): Promise<{ success: boolean; data?: unknown[]; message?: string }> => {
        try {
            const response = await fetch(`${envs.next_public_api_url}/admin`, {
                method: 'GET',
                headers: getAuthHeaders(),
            });
            
            if (response.ok) {
                const data = await response.json();
                return { success: true, data: data.data || data, message: 'Psicólogos pendientes obtenidos exitosamente' };
            } else {
                const errorData = await response.text();
                return { success: false, message: errorData };
            }
        } catch (error) {
            console.error('Error obteniendo psicólogos pendientes:', error);
            return { success: false, message: 'Error de conexión' };
        }
    },

    // Verificar/Aprobar psicólogo
    verifyPsychologist: async (psychologistId: string): Promise<{ success: boolean; message?: string; data?: unknown }> => {
        try {
            const response = await fetch(`${envs.next_public_api_url}/admin/${psychologistId}/verify`, {
                method: 'PUT',
                headers: getAuthHeaders(),
            });
            
            if (response.ok) {
                const data = await response.json();
                return { success: true, data, message: 'Psicólogo verificado exitosamente' };
            } else {
                const errorData = await response.text();
                return { success: false, message: errorData };
            }
        } catch (error) {
            console.error('Error verificando psicólogo:', error);
            return { success: false, message: 'Error de conexión' };
        }
    },

    // Rechazar psicólogo
    rejectPsychologist: async (psychologistId: string): Promise<{ success: boolean; message?: string; data?: unknown }> => {
        try {
            const response = await fetch(`${envs.next_public_api_url}/admin/${psychologistId}/reject`, {
                method: 'PUT',
                headers: getAuthHeaders(),
            });
            
            if (response.ok) {
                const data = await response.json();
                return { success: true, data, message: 'Psicólogo rechazado exitosamente' };
            } else {
                const errorData = await response.text();
                return { success: false, message: errorData };
            }
        } catch (error) {
            console.error('Error rechazando psicólogo:', error);
            return { success: false, message: 'Error de conexión' };
        }
    },

    // Promover usuario a un rol superior (según backend)
    promoteUser: async (userId: string): Promise<{ success: boolean; message?: string }> => {
        try {
            const response = await fetch(`${envs.next_public_api_url}/admin/${userId}/promote`, {
                method: 'PUT',
                headers: getAuthHeaders(),
            });
            if (response.ok) {
                return { success: true };
            } else {
                const errorData = await response.text();
                return { success: false, message: errorData };
            }
        } catch (error) {
            console.error('Error promoviendo usuario:', error);
            return { success: false, message: 'Error de conexión' };
        }
    },

    // Obtener lista de usuarios con filtros (rol, status, paginación)
    getUsers: async (params?: {
        limit?: number;
        page?: number;
        role?: string;
        status?: string;
    }): Promise<{ success: boolean; data?: unknown; message?: string }> => {
        try {
            const queryParams = new URLSearchParams();
            if (params?.limit) queryParams.append('limit', params.limit.toString());
            if (params?.page) queryParams.append('page', params.page.toString());
            if (params?.role) queryParams.append('role', params.role);
            if (params?.status) queryParams.append('status', params.status);
            
            // Nota: El backend actual no soporta include_inactive

            const url = `${envs.next_public_api_url}/users?${queryParams.toString()}`;
            const headers = getAuthHeaders();

            const response = await fetch(url, { headers });

            if (response.ok) {
                const result = await response.json();
                // El backend devuelve la estructura: { message, data: { data: [...], meta: {...} } }
                return { success: true, data: result.data.data }; // Extraemos el array de usuarios
            } else if (response.status === 401) {
                // Token expirado, limpiar storage
                localStorage.removeItem('authToken');
                document.cookie.split(";").forEach(function(c) { 
                    document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
                });
                return { success: false, message: 'Token expirado. Por favor, inicia sesión de nuevo.' };
            } else {
                const errorData = await response.text();
                return { success: false, message: errorData };
            }
        } catch (error) {
            console.error('Error obteniendo usuarios:', error);
            return { success: false, message: 'Error de conexión' };
        }
    },

    // Obtener pacientes específicamente
    getPatients: async (params?: {
        limit?: number;
        page?: number;
    }): Promise<{ success: boolean; data?: unknown; message?: string }> => {
        try {
            const queryParams = new URLSearchParams();
            if (params?.limit) queryParams.append('limit', params.limit.toString());
            if (params?.page) queryParams.append('page', params.page.toString());

            const url = `${envs.next_public_api_url}/users/patients?${queryParams.toString()}`;

            const response = await fetch(url, {
                headers: getAuthHeaders(),
            });

            if (response.ok) {
                const result = await response.json();
                return { success: true, data: result.data.data };
            } else {
                const errorData = await response.text();
                return { success: false, message: errorData };
            }
        } catch (error) {
            console.error('Error obteniendo pacientes:', error);
            return { success: false, message: 'Error de conexión' };
        }
    },

    // Obtener psicólogos específicamente  
    getPsychologists: async (params?: {
        limit?: number;
        page?: number;
    }): Promise<{ success: boolean; data?: unknown; message?: string }> => {
        try {
            const queryParams = new URLSearchParams();
            if (params?.limit) queryParams.append('limit', params.limit.toString());
            if (params?.page) queryParams.append('page', params.page.toString());

            const url = `${envs.next_public_api_url}/users/psychologists?${queryParams.toString()}`;

            const response = await fetch(url, {
                headers: getAuthHeaders(),
            });

            if (response.ok) {
                const result = await response.json();
                return { success: true, data: result.data.data };
            } else {
                const errorData = await response.text();
                return { success: false, message: errorData };
            }
        } catch (error) {
            console.error('Error obteniendo psicólogos:', error);
            return { success: false, message: 'Error de conexión' };
        }
    },

    // Obtener administradores (filtrando del endpoint general)
    getAdministrators: async (params?: {
        limit?: number;
        page?: number;
    }): Promise<{ success: boolean; data?: unknown; message?: string }> => {
        try {
            const queryParams = new URLSearchParams();
            if (params?.limit) queryParams.append('limit', params.limit.toString());
            if (params?.page) queryParams.append('page', params.page.toString());

            const url = `${envs.next_public_api_url}/users?${queryParams.toString()}`;

            const response = await fetch(url, {
                headers: getAuthHeaders(),
            });

            if (response.ok) {
                const result = await response.json();
                // Filtrar solo administradores
                const administrators = result.data.data.filter((user: { role: string }) => user.role === 'Administrador');
                return { success: true, data: administrators };
            } else {
                const errorData = await response.text();
                return { success: false, message: errorData };
            }
        } catch (error) {
            console.error('Error obteniendo administradores:', error);
            return { success: false, message: 'Error de conexión' };
        }
    },

    // Aprobar psicólogo
    approvePsychologist: async (psychologistId: string): Promise<{ success: boolean; message?: string }> => {
        try {
            const response = await fetch(`${envs.next_public_api_url}/psychologist/verification/${psychologistId}/verify`, {
                method: 'PUT',
                headers: getAuthHeaders(),
            });

            if (response.ok) {
                return { success: true };
            } else {
                const errorData = await response.text();
                return { success: false, message: errorData };
            }
        } catch (error) {
            console.error('Error aprobando psicólogo:', error);
            return { success: false, message: 'Error de conexión' };
        }
    },


    // Banear usuario
    banUser: async (userId: string, reason: string): Promise<{ success: boolean; message?: string }> => {
        try {
            const response = await fetch(`${envs.next_public_api_url}/admin/${userId}/ban`, {
                method: 'PUT',
                headers: getAuthHeaders(),
                body: JSON.stringify({ reason }),
            });

            if (response.ok) {
                const result = await response.json();
                return { success: true, message: result.message };
            } else {
                const errorData = await response.text();
                return { success: false, message: errorData };
            }
        } catch (error) {
            console.error('Error baneando usuario:', error);
            return { success: false, message: 'Error de conexión' };
        }
    },

    // Desbanear usuario
    unbanUser: async (userId: string): Promise<{ success: boolean; message?: string }> => {
        try {
            const response = await fetch(`${envs.next_public_api_url}/admin/${userId}/unban`, {
                method: 'PUT',
                headers: getAuthHeaders(),
            });

            if (response.ok) {
                const result = await response.json();
                return { success: true, message: result.message };
            } else {
                const errorData = await response.text();
                return { success: false, message: errorData };
            }
        } catch (error) {
            console.error('Error desbaneando usuario:', error);
            return { success: false, message: 'Error de conexión' };
        }
    },

    // Obtener usuarios baneados
    getBannedUsers: async (params?: {
        limit?: number;
        page?: number;
    }): Promise<{ success: boolean; data?: unknown; message?: string }> => {
        try {
            const queryParams = new URLSearchParams();
            if (params?.limit) queryParams.append('limit', params.limit.toString());
            if (params?.page) queryParams.append('page', params.page.toString());

            const url = `${envs.next_public_api_url}/admin/banned-users?${queryParams.toString()}`;

            const response = await fetch(url, {
                headers: getAuthHeaders(),
            });

            if (response.ok) {
                const result = await response.json();
                return { success: true, data: result.data };
            } else {
                const errorData = await response.text();
                return { success: false, message: errorData };
            }
        } catch (error) {
            console.error('Error obteniendo usuarios baneados:', error);
            return { success: false, message: 'Error de conexión' };
        }
    },

    // Obtener estadísticas de admin
    getAdminStats: async (): Promise<{ success: boolean; data?: unknown; message?: string }> => {
        try {
            const response = await fetch(`${envs.next_public_api_url}/admin/stats`, {
                headers: getAuthHeaders(),
            });

            if (response.ok) {
                const data = await response.json();
                return { success: true, data };
            } else {
                const errorData = await response.text();
                return { success: false, message: errorData };
            }
        } catch (error) {
            console.error('Error obteniendo estadísticas:', error);
            return { success: false, message: 'Error de conexión' };
        }
    },

    // Obtener reporte de pagos semanales
    getWeeklyPaymentsReport: async (): Promise<{ 
        success: boolean; 
        data?: Array<{
            week: string;
            total_payments: number;
            total_revenue: number;
            average_payment: number;
        }>; 
        message?: string 
    }> => {
        try {
            const response = await fetch(`${envs.next_public_api_url}/admin/reports/payments/weekly`, {
                headers: getAuthHeaders(),
            });

            if (response.ok) {
                const result = await response.json();
                return { success: true, data: result.data };
            } else {
                const errorData = await response.text();
                return { success: false, message: errorData };
            }
        } catch (error) {
            console.error('Error obteniendo reporte de pagos semanales:', error);
            return { success: false, message: 'Error de conexión' };
        }
    },
};
