'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { adminService } from '@/services/admin';
import { useNotifications } from '@/hooks/useNotifications';

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    profile_picture?: string;
    phone?: string;
    dni?: number;
    is_active?: boolean;
    birthdate?: string;
    emergency_contact?: string | null;
    created_at?: string;
}

interface BannedUsersProps {
    onUserUpdate?: (userId: string, updates: Partial<User>) => void;
    onUserUnbanned?: () => void; // Nuevo callback específico para cuando se desbanea
}

const BannedUsers = ({ onUserUpdate, onUserUnbanned }: BannedUsersProps = {}) => {
    const [bannedUsers, setBannedUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState<string | null>(null);
    const notifications = useNotifications();
    const [error, setError] = useState<string | null>(null);
    const [confirmAction, setConfirmAction] = useState<{
        userId: string;
        action: 'unban';
        userName: string;
    } | null>(null);

    // Cargar usuarios baneados
    const loadBannedUsers = async () => {
        setLoading(true);
        setError(null);
        
        try {
            const result = await adminService.getBannedUsers({ limit: 100 });
            
            if (result.success && result.data) {
                setBannedUsers(result.data as User[]);
            } else {
                setError(result.message || 'Error al cargar usuarios baneados');
            }
        } catch (error) {
            console.error('Error cargando usuarios baneados:', error);
            setError('Error de conexión al cargar usuarios baneados');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadBannedUsers();
    }, []);

    const handleUnbanUser = async (userId: string) => {
        setActionLoading(userId);
        
        try {
            const result = await adminService.unbanUser(userId);
            
            if (result.success) {
                // Remover el usuario de la lista local
                setBannedUsers(prev => prev.filter(user => user.id !== userId));
                setConfirmAction(null);
                // Actualizar el estado global para que aparezca en su pestaña original
                onUserUpdate?.(userId, { is_active: true });
                // Callback específico para refrescar datos
                onUserUnbanned?.();
                notifications.success('Usuario desbaneado exitosamente');
            } else {
                // Aunque haya error, intentar actualizar el estado
                console.warn('Advertencia al desbanear:', result.message);
                setBannedUsers(prev => prev.filter(user => user.id !== userId));
                setConfirmAction(null);
                onUserUpdate?.(userId, { is_active: true });
                // Callback específico para refrescar datos
                onUserUnbanned?.();
                notifications.success('Usuario desbaneado (con advertencias)');
            }
        } catch (error) {
            console.error('Error desbaneando usuario:', error);
            // Aún así intentar actualizar el estado ya que la acción podría haberse ejecutado
            setBannedUsers(prev => prev.filter(user => user.id !== userId));
            setConfirmAction(null);
            onUserUpdate?.(userId, { is_active: true });
            // Callback específico para refrescar datos
            onUserUnbanned?.();
            notifications.success('Usuario desbaneado (con advertencias de conexión)');
        } finally {
            setActionLoading(null);
        }
    };

    if (loading) {
        return (
            <div className="w-full min-h-[400px] flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Usuarios Baneados</h2>
                </div>
                <div className="flex items-center justify-center flex-1 min-h-[200px]">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
                        <p className="text-gray-600">Cargando usuarios baneados...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full min-h-[400px] flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Usuarios Baneados</h2>
                </div>
                <div className="flex items-center justify-center flex-1 min-h-[200px]">
                    <div className="text-center">
                        <p className="text-red-600 mb-4">{error}</p>
                        <button
                            onClick={loadBannedUsers}
                            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                        >
                            Reintentar
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full min-h-[500px] flex flex-col">
            <div className="flex items-center gap-3 mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Usuarios Baneados</h2>
                <div className="ml-auto bg-red-600/10 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                    {bannedUsers.length} usuarios baneados
                </div>
            </div>

            {bannedUsers.length === 0 ? (
                <div className="flex items-center justify-center flex-1 min-h-[200px]">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-green-600 text-2xl">✅</span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">No hay usuarios baneados</h3>
                        <p className="text-gray-600">Todos los usuarios están activos en el sistema</p>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {bannedUsers.map((user) => (
                        <div key={user.id} className="bg-white border border-red-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center space-x-4 mb-4">
                                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                                    {user.profile_picture ? (
                                        <Image
                                            src={user.profile_picture}
                                            alt={user.name}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-red-100 flex items-center justify-center">
                                            <span className="text-red-600 text-lg font-bold">
                                                {user.name.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                                        {user.name}
                                    </h3>
                                    <p className="text-sm text-gray-600 truncate">{user.email}</p>
                                </div>
                                <div className="flex-shrink-0">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                        Baneado
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-2 mb-4">
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-500">Rol:</span>
                                    <span className="text-sm font-medium text-gray-900">{user.role}</span>
                                </div>
                                {user.phone && (
                                    <div className="flex justify-between">
                                        <span className="text-sm text-gray-500">Teléfono:</span>
                                        <span className="text-sm font-medium text-gray-900">{user.phone}</span>
                                    </div>
                                )}
                                {user.dni && (
                                    <div className="flex justify-between">
                                        <span className="text-sm text-gray-500">DNI:</span>
                                        <span className="text-sm font-medium text-gray-900">{user.dni}</span>
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-end">
                                <button
                                    onClick={() => setConfirmAction({
                                        userId: user.id,
                                        action: 'unban',
                                        userName: user.name
                                    })}
                                    disabled={actionLoading === user.id}
                                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm font-medium disabled:opacity-50"
                                >
                                    {actionLoading === user.id ? 'Desbaneando...' : 'Desbanear Usuario'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal de confirmación */}
            {confirmAction && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            Confirmar Acción
                        </h3>
                        <p className="text-gray-600 mb-6">
                            ¿Estás seguro de que quieres desbanear a <strong>{confirmAction.userName}</strong>?
                            Esta acción reactivará su cuenta inmediatamente.
                        </p>
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => setConfirmAction(null)}
                                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={() => handleUnbanUser(confirmAction.userId)}
                                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                            >
                                Desbanear Usuario
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BannedUsers;
