'use client';

import Image from 'next/image';
import { useState } from 'react';
import { adminService } from '@/services/admin';
import { useNotifications } from '@/hooks/useNotifications';

interface Paciente {
    id: string;
    name: string;
    email: string;
    role: string;
    profile_picture?: string;
    phone?: string;
    dni?: number;
    birthdate?: string;
    emergency_contact?: string | null;
    is_active?: boolean;
}

interface UserPacientesProps {
    data: Paciente[];
}

const UserPacientes = ({ data }: UserPacientesProps) => {
    const notifications = useNotifications();
    const [loading, setLoading] = useState<string | null>(null);
    const [confirmAction, setConfirmAction] = useState<{
        userId: string;
        action: 'promote' | 'ban' | 'unban';
        userName: string;
    } | null>(null);

    const pacientes = data.filter((u) => u.role === 'Paciente');

    const handleUserAction = async (userId: string, action: 'promote' | 'ban' | 'unban') => {
        setLoading(userId);
        
        try {
            let result;
            
            if (action === 'promote') {
                result = await adminService.promoteUser(userId);
            } else if (action === 'ban') {
                result = await adminService.banUser(userId);
            } else if (action === 'unban') {
                result = await adminService.unbanUser(userId);
            }

            if (result?.success) {
                notifications.success(`Usuario ${action === 'promote' ? 'promovido' : action === 'ban' ? 'baneado' : 'desbaneado'} exitosamente`);
                setConfirmAction(null);
                window.location.reload();
            } else {
                notifications.error(result?.message || `Error al ${action === 'promote' ? 'promover' : action === 'ban' ? 'banear' : 'desbanear'} usuario`);
            }
        } catch (error) {
            console.error(`Error ${action}ing user:`, error);
            notifications.error(`Error de conexión al ${action === 'promote' ? 'promover' : action === 'ban' ? 'banear' : 'desbanear'} usuario`);
        } finally {
            setLoading(null);
        }
    };

    const renderActionButtons = (paciente: Paciente) => {
        return (
            <div className="flex gap-2">
                <button
                    onClick={() => setConfirmAction({
                        userId: paciente.id,
                        action: 'promote',
                        userName: paciente.name
                    })}
                    disabled={loading === paciente.id}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium disabled:opacity-50"
                >
                    {loading === paciente.id ? 'Procesando...' : 'Promover Usuario'}
                </button>
                
                {paciente.is_active !== false ? (
                    <button
                        onClick={() => setConfirmAction({
                            userId: paciente.id,
                            action: 'ban',
                            userName: paciente.name
                        })}
                        disabled={loading === paciente.id}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm font-medium disabled:opacity-50"
                    >
                        {loading === paciente.id ? 'Procesando...' : 'Banear Usuario'}
                    </button>
                ) : (
                    <button
                        onClick={() => setConfirmAction({
                            userId: paciente.id,
                            action: 'unban',
                            userName: paciente.name
                        })}
                        disabled={loading === paciente.id}
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm font-medium disabled:opacity-50"
                    >
                        {loading === paciente.id ? 'Procesando...' : 'Desbanear Usuario'}
                    </button>
                )}
            </div>
        );
    };

    return (
        <div className="w-full min-h-[500px] flex flex-col">
            <div className="flex items-center gap-3 mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Gestión de Pacientes</h2>
                <div className="ml-auto bg-[#5046E7]/10 text-[#5046E7] px-3 py-1 rounded-full text-sm font-semibold">
                    {pacientes.length} pacientes
                </div>
            </div>
            
            <div className="flex-1">
                {pacientes.length === 0 ? (
                    <div className="bg-gradient-to-r from-[#5046E7]/10 to-[#6366F1]/10 border border-[#5046E7]/20 rounded-lg p-12 text-center">
                        <div className="flex flex-col items-center gap-4">
                            <h3 className="text-xl font-semibold text-gray-700">
                                No hay pacientes registrados
                            </h3>
                            <p className="text-gray-500 max-w-md">
                                Los pacientes aparecerán aquí cuando se registren en la plataforma.
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                            <h3 className="font-bold text-[#5046E7] text-lg">{paciente.name}</h3>
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
                                        <div className="mt-3 p-3 bg-[#5046E7]/10 rounded-lg border border-[#5046E7]/20">   
                                            <p className="text-sm font-semibold text-[#5046E7] mb-1">Contacto de Emergencia:</p>
                                            {paciente.emergency_contact === null ? 
                                                <p className="text-sm text-gray-500">No registrado</p>
                                                : 
                                                <p className="text-sm">{paciente.emergency_contact}</p>
                                            }
                                        </div>
                                    </div>
                                    
                                    {/* Botones de acción */}
                                    <div className="mt-4 flex gap-2">
                                        {renderActionButtons(paciente)}
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
                            Confirmar acción
                        </h3>
                        <p className="text-gray-600 mb-6">
                            {confirmAction.action === 'promote' && `¿Estás seguro de que quieres promover a ${confirmAction.userName}?`}
                            {confirmAction.action === 'ban' && `¿Estás seguro de que quieres banear a ${confirmAction.userName}? Esta acción desactivará su cuenta.`}
                            {confirmAction.action === 'unban' && `¿Estás seguro de que quieres desbanear a ${confirmAction.userName}? Esta acción reactivará su cuenta.`}
                        </p>
                        <div className="flex gap-4 justify-end">
                            <button
                                onClick={() => setConfirmAction(null)}
                                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={() => handleUserAction(confirmAction.userId, confirmAction.action)}
                                className="px-4 py-2 bg-[#5046E7] text-white rounded-md hover:bg-[#4037D6]"
                            >
                                Confirmar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserPacientes;
