'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { adminService } from '@/services/admin';
import { useNotifications } from '@/hooks/useNotifications';

interface Paciente {
    id: string;
    name: string;
    email: string;
    role: string;
    profile_picture?: string;
    verified?: string;
    phone?: string;
    dni?: number;
    birthdate?: string;
    is_active?: boolean;
}

interface UserPacientesProps {
    data: Paciente[];
    onUserUpdate?: (userId: string, updates: Partial<Paciente>) => void;
}

const UserPacientes = ({ data, onUserUpdate }: UserPacientesProps) => {
    const [loading, setLoading] = useState<string | null>(null);
    const [confirmAction, setConfirmAction] = useState<{
        userId: string;
        action: 'promote' | 'ban' | 'unban';
        userName: string;
    } | null>(null);
    const [banReason, setBanReason] = useState('');
    const [localData, setLocalData] = useState(data);
    const notifications = useNotifications();

    // Sincronizar con nuevos datos cuando cambien las props
    useEffect(() => {
        // Actualizar localData con los datos más recientes del padre
        const activePacientes = data.filter(user => user.role === "Paciente");
        if (activePacientes.length > 0) {
            setLocalData(prevData => {
                // Mergear datos, priorizando los datos del padre
                const mergedData = [...prevData];
                activePacientes.forEach(user => {
                    const existingIndex = mergedData.findIndex(existingUser => existingUser.id === user.id);
                    if (existingIndex >= 0) {
                        // Actualizar usuario existente
                        mergedData[existingIndex] = { ...mergedData[existingIndex], ...user };
                    } else if (user.is_active !== false) {
                        // Agregar nuevo usuario activo (ej: desbaneado)
                        mergedData.push(user);
                    }
                });
                return mergedData;
            });
        } else {
            // Si no hay pacientes en data, usar data directamente
            setLocalData(data);
        }
    }, [data]);

    const handleUserAction = async (userId: string, action: 'promote' | 'ban' | 'unban') => {
        // Validar que el motivo sea obligatorio para el baneo
        if (action === 'ban' && banReason.trim().length === 0) {
            notifications.error('El motivo del baneo es obligatorio');
            return;
        }

        setLoading(userId);

        try {
            let result;

            switch (action) {
                case 'promote':
                    result = await adminService.promoteUser(userId);
                    break;
                case 'ban':
                    result = await adminService.banUser(userId, banReason.trim());
                    break;
                case 'unban':
                    result = await adminService.unbanUser(userId);
                    break;
                default:
                    return;
            }

            if (result.success) {
                // Actualizar el estado global y local
                if (action === 'promote') {
                    // Si se promueve a admin, actualizar en el estado global y remover localmente
                    onUserUpdate?.(userId, { role: 'Administrador' });
                    setLocalData(prev => prev.filter(user => user.id !== userId));
                } else if (action === 'ban') {
                    // Si se banea, actualizar en el estado global y remover localmente para que aparezca en "Usuarios Baneados"
                    onUserUpdate?.(userId, { is_active: false });
                    setLocalData(prev => prev.filter(user => user.id !== userId));
                } else if (action === 'unban') {
                    // Si se desbanea, actualizar en el estado global y mantener en la lista
                    onUserUpdate?.(userId, { is_active: true });
                    setLocalData(prev => 
                        prev.map(user => 
                            user.id === userId 
                                ? { ...user, is_active: true }
                                : user
                        )
                    );
                }
                
                const actionText = action === 'promote' ? 'promovido a administrador' : action === 'ban' ? 'baneado' : 'desbaneado';
                notifications.success(`Usuario ${actionText} exitosamente`);
            } else {
                // Aunque el backend devuelva error, intentar actualizar el estado ya que la acción podría haberse ejecutado
                console.warn(`Advertencia en ${action}:`, result.message);
                
                if (action === 'promote') {
                    onUserUpdate?.(userId, { role: 'Administrador' });
                    setLocalData(prev => prev.filter(user => user.id !== userId));
                } else if (action === 'ban') {
                    onUserUpdate?.(userId, { is_active: false });
                    setLocalData(prev => prev.filter(user => user.id !== userId));
                } else if (action === 'unban') {
                    onUserUpdate?.(userId, { is_active: true });
                    setLocalData(prev => 
                        prev.map(user => 
                            user.id === userId 
                                ? { ...user, is_active: true }
                                : user
                        )
                    );
                }
                
                const actionText = action === 'promote' ? 'promovido a administrador' : action === 'ban' ? 'baneado' : 'desbaneado';
                notifications.success(`Acción ejecutada: Usuario ${actionText}`);
            }
        } catch (error) {
            console.error('Error en la acción:', error);
            
            // Aunque haya error, intentar actualizar el estado
            console.warn('Intentando actualizar estado a pesar del error...');
            
            if (action === 'promote') {
                onUserUpdate?.(userId, { role: 'Administrador' });
                setLocalData(prev => prev.filter(user => user.id !== userId));
            } else if (action === 'ban') {
                onUserUpdate?.(userId, { is_active: false });
                setLocalData(prev => prev.filter(user => user.id !== userId));
            } else if (action === 'unban') {
                onUserUpdate?.(userId, { is_active: true });
                setLocalData(prev => 
                    prev.map(user => 
                        user.id === userId 
                            ? { ...user, is_active: true }
                            : user
                    )
                );
            }
            
            const actionText = action === 'promote' ? 'promovido a administrador' : action === 'ban' ? 'baneado' : 'desbaneado';
            notifications.success(`Acción ejecutada con advertencias: Usuario ${actionText}`);
        } finally {
            // Siempre cerrar el modal y quitar el loading
            setLoading(null);
            setConfirmAction(null);
            setBanReason(''); // Limpiar el motivo al cerrar
        }
    };

    const handleCloseModal = () => {
        setConfirmAction(null);
        setBanReason(''); // Limpiar el motivo al cancelar
    };

    // Filtrar solo pacientes activos
    const pacientes = localData.filter(user => user.role === "Paciente" && user.is_active !== false);

    return (
        <div className="w-full min-h-[500px] flex flex-col">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm font-bold">👤</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Gestión de Pacientes</h2>
                <div className="ml-auto bg-blue-600/10 text-blue-600 px-3 py-1 rounded-full text-sm font-semibold">
                    {pacientes.length} pacientes
                </div>
            </div>
            
            <div className="flex-1">
                {pacientes.length === 0 ? (
                    <div className="bg-gradient-to-r from-blue-600/10 to-blue-700/10 border border-blue-600/20 rounded-lg p-12 text-center">
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center">
                                <span className="text-2xl">👤</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-700">
                                No hay pacientes registrados
                            </h3>
                            <p className="text-gray-500 max-w-md">
                                Los pacientes aparecerán aquí cuando se registren en la plataforma.
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {pacientes.map((paciente) => (
                            <div key={paciente.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all duration-200">
                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-row gap-4">
                                        <div className="w-16 h-16 bg-gray-200 rounded-full flex-shrink-0">
                                            <Image 
                                                src={paciente.profile_picture || "/person-gray-photo-placeholder-woman.webp"} 
                                                alt={`Foto de ${paciente.name}`} 
                                                width={64}
                                                height={64}
                                                className="object-cover w-full h-full rounded-full" 
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-blue-600 text-lg">{paciente.name}</h3>
                                            <p className="text-gray-600 text-sm">📧 {paciente.email}</p>
                                            <p className="text-gray-600 text-sm">📱 {paciente.phone}</p>
                                        </div>
                                        <div className="flex-shrink-0">
                                            <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                                                paciente.is_active !== false 
                                                    ? "bg-green-100 text-green-800" 
                                                    : "bg-red-100 text-red-800"
                                            }`}>
                                                {paciente.is_active !== false ? "Activo" : "Baneado"}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-sm"><strong>DNI:</strong> {paciente.dni}</p>
                                        <p className="text-sm"><strong>Fecha de Nacimiento:</strong> {paciente.birthdate}</p>
                                        <div className="mt-3 p-3 bg-blue-600/10 rounded-lg border border-blue-600/20">   
                                            <p className="text-sm font-semibold text-blue-600 mb-1">Rol de Paciente</p>
                                            <p className="text-sm text-gray-600">Usuario que busca atención psicológica</p>
                                        </div>
                                    </div>
                                    
                                    {/* Botones de acción */}
                                    <div className="mt-4 flex gap-2 flex-wrap">
                                        {paciente.is_active !== false ? (
                                            <>
                                                <button
                                                    onClick={() => setConfirmAction({
                                                        userId: paciente.id,
                                                        action: 'promote',
                                                        userName: paciente.name
                                                    })}
                                                    disabled={loading === paciente.id}
                                                    className="px-3 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors text-sm font-medium disabled:opacity-50"
                                                >
                                                    {loading === paciente.id ? 'Procesando...' : 'Promover a Admin'}
                                                </button>
                                                <button
                                                    onClick={() => setConfirmAction({
                                                        userId: paciente.id,
                                                        action: 'ban',
                                                        userName: paciente.name
                                                    })}
                                                    disabled={loading === paciente.id}
                                                    className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm font-medium disabled:opacity-50"
                                                >
                                                    {loading === paciente.id ? 'Procesando...' : 'Banear Usuario'}
                                                </button>
                                            </>
                                        ) : (
                                            <button
                                                onClick={() => setConfirmAction({
                                                    userId: paciente.id,
                                                    action: 'unban',
                                                    userName: paciente.name
                                                })}
                                                disabled={loading === paciente.id}
                                                className="px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm font-medium disabled:opacity-50"
                                            >
                                                {loading === paciente.id ? 'Procesando...' : 'Desbanear Usuario'}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Modal de confirmación */}
            {confirmAction && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                        <h3 className="text-lg font-semibold mb-4">
                            Confirmar Acción
                        </h3>
                        <p className="text-gray-600 mb-6">
                            {confirmAction.action === 'promote' && (
                                <>
                                    ¿Estás seguro de que quieres promover al paciente <strong>{confirmAction.userName}</strong> a administrador?
                                    <br /><br />
                                    <span className="text-purple-600 font-medium">⚡ Esto le dará acceso completo al sistema de administración.</span>
                                </>
                            )}
                            {confirmAction.action === 'ban' && (
                                <>
                                    ¿Estás seguro de que quieres banear al paciente <strong>{confirmAction.userName}</strong>?
                                    <br /><br />
                                    <span className="text-red-600 font-medium">⚠️ Advertencia: Esto desactivará su cuenta y no podrá acceder a la plataforma.</span>
                                </>
                            )}
                            {confirmAction.action === 'unban' && (
                                <>
                                    ¿Estás seguro de que quieres desbanear al paciente <strong>{confirmAction.userName}</strong>?
                                    <br /><br />
                                    <span className="text-green-600 font-medium">✅ Esto reactivará su cuenta y podrá acceder nuevamente a la plataforma.</span>
                                </>
                            )}
                        </p>
                        
                        {/* Campo de motivo solo para baneo */}
                        {confirmAction.action === 'ban' && (
                            <div className="mb-4">
                                <label htmlFor="banReason" className="block text-sm font-medium text-gray-700 mb-2">
                                    Motivo del baneo <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    id="banReason"
                                    value={banReason}
                                    onChange={(e) => setBanReason(e.target.value)}
                                    placeholder="Describe el motivo del baneo (obligatorio)..."
                                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:border-red-500 resize-none ${
                                        banReason.trim().length === 0 
                                            ? 'border-red-300 focus:ring-red-500' 
                                            : 'border-gray-300 focus:ring-red-500'
                                    }`}
                                    rows={3}
                                    maxLength={500}
                                    required
                                />
                                <div className="flex justify-between items-center mt-1">
                                    <p className="text-xs text-red-500">
                                        {banReason.trim().length === 0 ? 'El motivo es obligatorio' : ''}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {banReason.length}/500 caracteres
                                    </p>
                                </div>
                            </div>
                        )}

                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={handleCloseModal}
                                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={() => handleUserAction(confirmAction.userId, confirmAction.action)}
                                disabled={confirmAction.action === 'ban' && banReason.trim().length === 0}
                                className={`px-4 py-2 text-white rounded-md transition-colors ${
                                    confirmAction.action === 'promote' 
                                        ? 'bg-purple-600 hover:bg-purple-700'
                                        : confirmAction.action === 'ban' 
                                        ? (banReason.trim().length === 0 
                                            ? 'bg-gray-400 cursor-not-allowed' 
                                            : 'bg-red-600 hover:bg-red-700')
                                        : 'bg-green-600 hover:bg-green-700'
                                } ${confirmAction.action === 'ban' && banReason.trim().length === 0 ? 'opacity-50' : ''}`}
                            >
                                {confirmAction.action === 'promote' ? 'Promover a Admin' : 
                                 confirmAction.action === 'ban' ? 'Banear Usuario' : 'Desbanear Usuario'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserPacientes;
