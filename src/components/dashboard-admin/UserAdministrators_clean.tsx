'use client';

import Image from 'next/image';
import { useState } from 'react';
import { adminService } from '@/services/admin';

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

interface UserAdministratorsProps {
    data: Paciente[];
}

const UserAdministrators = ({ data }: UserAdministratorsProps) => {
    const [loading, setLoading] = useState<string | null>(null);
    const [confirmAction, setConfirmAction] = useState<{
        userId: string;
        action: 'ban' | 'unban';
        userName: string;
    } | null>(null);

    const administradores = data.filter((u) => u.role === 'Administrador');

    const handleUserAction = async (userId: string, action: 'ban' | 'unban') => {
        setLoading(userId);
        
        try {
            let result;
            
            switch (action) {
                case 'ban':
                    result = await adminService.banUser(userId);
                    break;
                case 'unban':
                    result = await adminService.unbanUser(userId);
                    break;
                default:
                    return;
            }
            
            if (result.success) {
                const actionText = action === 'ban' ? 'baneado' : 'desbaneado';
                alert(`Usuario ${actionText} exitosamente`);
                window.location.reload();
            } else {
                alert(`Error: ${result.message}`);
            }
        } catch (error) {
            console.error('Error en la acción:', error);
            alert('Error al ejecutar la acción');
        } finally {
            setLoading(null);
            setConfirmAction(null);
        }
    };

    return (
        <div className="w-full min-h-[500px] flex flex-col">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-[#5046E7] rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm font-bold">👑</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Gestión de Administradores</h2>
                <div className="ml-auto bg-[#5046E7]/10 text-[#5046E7] px-3 py-1 rounded-full text-sm font-semibold">
                    {administradores.length} administradores
                </div>
            </div>
            
            <div className="flex-1">
                {administradores.length === 0 ? (
                    <div className="bg-gradient-to-r from-[#5046E7]/10 to-[#6366F1]/10 border border-[#5046E7]/20 rounded-lg p-12 text-center">
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-16 h-16 bg-[#5046E7]/20 rounded-full flex items-center justify-center">
                                <span className="text-2xl">👑</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-700">
                                No hay administradores adicionales
                            </h3>
                            <p className="text-gray-500 max-w-md">
                                Los administradores aparecerán aquí cuando sean promovidos desde otros roles.
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {administradores.map((admin) => (
                            <div key={admin.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all duration-200">
                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-row gap-4">
                                        <div className="w-16 h-16 bg-gray-200 rounded-full flex-shrink-0">
                                            <Image 
                                                src={admin.profile_picture || "/person-gray-photo-placeholder-woman.webp"} 
                                                alt={`Foto de ${admin.name}`} 
                                                width={64}
                                                height={64}
                                                className="object-cover w-full h-full rounded-full" 
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-[#5046E7] text-lg">{admin.name}</h3>
                                            <p className="text-gray-600 text-sm">📧 {admin.email}</p>
                                            <p className="text-gray-600 text-sm">📱 {admin.phone}</p>
                                        </div>
                                        <div className="flex-shrink-0">
                                            <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                                                admin.is_active !== false 
                                                    ? "bg-green-100 text-green-800" 
                                                    : "bg-red-100 text-red-800"
                                            }`}>
                                                {admin.is_active !== false ? "Activo" : "Baneado"}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-sm"><strong>DNI:</strong> {admin.dni}</p>
                                        <p className="text-sm"><strong>Fecha de Nacimiento:</strong> {admin.birthdate}</p>
                                        <div className="mt-3 p-3 bg-[#5046E7]/10 rounded-lg border border-[#5046E7]/20">   
                                            <p className="text-sm font-semibold text-[#5046E7] mb-1">Rol de Administrador</p>
                                            <p className="text-sm text-gray-600">Acceso completo al sistema de administración</p>
                                        </div>
                                    </div>
                                    
                                    {/* Botones de acción */}
                                    <div className="mt-4 flex gap-2">
                                        {admin.is_active !== false ? (
                                            <button
                                                onClick={() => setConfirmAction({
                                                    userId: admin.id,
                                                    action: 'ban',
                                                    userName: admin.name
                                                })}
                                                disabled={loading === admin.id}
                                                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm font-medium disabled:opacity-50"
                                            >
                                                {loading === admin.id ? 'Procesando...' : 'Banear Administrador'}
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => setConfirmAction({
                                                    userId: admin.id,
                                                    action: 'unban',
                                                    userName: admin.name
                                                })}
                                                disabled={loading === admin.id}
                                                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm font-medium disabled:opacity-50"
                                            >
                                                {loading === admin.id ? 'Procesando...' : 'Desbanear Administrador'}
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
                            {confirmAction.action === 'ban' && (
                                <>
                                    ¿Estás seguro de que quieres banear al administrador <strong>{confirmAction.userName}</strong>?
                                    <br /><br />
                                    <span className="text-red-600 font-medium">⚠️ Advertencia: Esto desactivará su cuenta y perderá acceso administrativo inmediatamente.</span>
                                </>
                            )}
                            {confirmAction.action === 'unban' && (
                                <>
                                    ¿Estás seguro de que quieres desbanear al administrador <strong>{confirmAction.userName}</strong>?
                                    <br /><br />
                                    <span className="text-green-600 font-medium">✅ Esto reactivará su cuenta y restaurará su acceso administrativo.</span>
                                </>
                            )}
                        </p>
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => setConfirmAction(null)}
                                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={() => handleUserAction(confirmAction.userId, confirmAction.action)}
                                className={`px-4 py-2 text-white rounded-md transition-colors ${
                                    confirmAction.action === 'ban' 
                                        ? 'bg-red-600 hover:bg-red-700' 
                                        : 'bg-green-600 hover:bg-green-700'
                                }`}
                            >
                                {confirmAction.action === 'ban' ? 'Banear Administrador' : 'Desbanear Administrador'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserAdministrators;
