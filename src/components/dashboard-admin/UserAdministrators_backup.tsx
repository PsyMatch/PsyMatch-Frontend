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
    // Solo las propiedades que realmente necesitamos
}

interface UserAdministratorsProps {
    data: Paciente[];
}

const UserAdministrators = ({ data }: UserAdministratorsProps) => {
    const [loading, setLoading] = useState<string | null>(null);
    const [statusFilter, setStatusFilter] = useState<'todos' | 'activos' | 'baneados'>('todos');
    const [confirmAction, setConfirmAction] = useState<{
        userId: string;
        action: 'ban' | 'unban';
        userName: string;
    } | null>(null);

    const administradores = data.filter((u) => u.role === 'Administrador');
    
    // Aplicar filtro de estado
    const administradoresFiltrados = administradores.filter((admin) => {
        if (statusFilter === 'activos') return admin.is_active !== false;
        if (statusFilter === 'baneados') return admin.is_active === false;
        return true; // 'todos'
    });

    // Mostrar advertencia si se está filtrando por baneados pero no hay resultados
    const showBannedWarning = statusFilter === 'baneados' && administradoresFiltrados.length === 0;

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
                window.location.reload(); // Recargar para ver cambios
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
                    {administradoresFiltrados.length} administradores
                </div>
            </div>

            {/* Filtros de estado */}
            <div className="flex items-center w-full h-12 gap-2 mb-6">
                <button
                    type="button"
                    className={`flex-1 h-full rounded-md transition-colors font-medium ${
                        statusFilter === "todos" ? "bg-[#5046E7] text-white" : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                    }`}
                    onClick={() => setStatusFilter("todos")}
                >
                    Todos ({administradores.length})
                </button>
                <button
                    type="button"
                    className={`flex-1 h-full rounded-md transition-colors font-medium ${
                        statusFilter === "activos" ? "bg-green-600 text-white" : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                    }`}
                    onClick={() => setStatusFilter("activos")}
                >
                    Activos ({administradores.filter(a => a.is_active !== false).length})
                </button>
                <button
                    type="button"
                    className={`flex-1 h-full rounded-md transition-colors font-medium ${
                        statusFilter === "baneados" ? "bg-red-600 text-white" : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                    }`}
                    onClick={() => setStatusFilter("baneados")}
                >
                    Baneados ({administradores.filter(a => a.is_active === false).length})
                </button>
            </div>
            
            <div className="flex-1">
                {/* Advertencia especial para filtro de baneados */}
                {showBannedWarning && (
                    <div className="mb-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-white text-sm font-bold">⚠</span>
                            </div>
                            <div className="flex-1">
                                <h4 className="text-yellow-800 font-semibold mb-1">
                                    Limitación del Sistema
                                </h4>
                                <p className="text-yellow-700 text-sm">
                                    Los administradores baneados no aparecen en esta lista debido a limitaciones del backend actual. 
                                    Sin embargo, las funciones de banear/desbanear siguen funcionando correctamente. 
                                    Los administradores baneados no podrán acceder a la plataforma.
                                </p>
                            </div>
                        </div>
                    </div>
                )}
                
                {administradoresFiltrados.length === 0 ? (
                    <div className="bg-gradient-to-r from-[#5046E7]/10 to-[#6366F1]/10 border border-[#5046E7]/20 rounded-lg p-12 text-center">
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-16 h-16 bg-[#5046E7]/20 rounded-full flex items-center justify-center">
                                <span className="text-2xl">
                                    {statusFilter === 'activos' ? '✅' : statusFilter === 'baneados' ? '�' : '�👑'}
                                </span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-700">
                                {statusFilter === 'todos' && 'No hay administradores adicionales'}
                                {statusFilter === 'activos' && 'No hay administradores activos'}
                                {statusFilter === 'baneados' && 'No hay administradores baneados'}
                            </h3>
                            <p className="text-gray-500 max-w-md">
                                {statusFilter === 'todos' && 'Los administradores aparecerán aquí cuando sean promovidos desde otros roles.'}
                                {statusFilter === 'activos' && 'Todos los administradores están baneados o no hay administradores adicionales.'}
                                {statusFilter === 'baneados' && 'Los administradores baneados no se muestran debido a limitaciones del backend. Las funciones de ban/unban funcionan correctamente.'}
                            </p>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Información estadística de administradores */}
                        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-4 mb-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
                                    <span className="text-white text-lg">📊</span>
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-semibold text-gray-800">Estadísticas de Administradores</h4>
                                    <p className="text-sm text-gray-600">
                                        {administradores.length} administrador{administradores.length !== 1 ? 'es' : ''} activo{administradores.length !== 1 ? 's' : ''} en el sistema
                                    </p>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-bold text-yellow-600">{administradores.length}</div>
                                    <div className="text-xs text-gray-500">TOTAL</div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {administradoresFiltrados.map((admin) => (
                            <div key={admin.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all duration-200">
                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-row gap-4">
                                        <div className="w-16 h-16 bg-gray-200 rounded-full flex-shrink-0 relative">
                                            <Image 
                                                src={admin.profile_picture || "/person-gray-photo-placeholder-woman.webp"} 
                                                alt={`Foto de ${admin.name}`} 
                                                width={64}
                                                height={64}
                                                className="object-cover w-full h-full rounded-full" 
                                            />
                                            {/* Insignia de admin */}
                                            <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                                                <span className="text-white text-xs">👑</span>
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <h3 className="font-bold text-[#5046E7] text-lg">{admin.name}</h3>
                                                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                                    ADMIN
                                                </span>
                                                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                                    admin.is_active !== false 
                                                        ? "bg-green-100 text-green-800" 
                                                        : "bg-red-100 text-red-800"
                                                }`}>
                                                    {admin.is_active !== false ? "Activo" : "Baneado"}
                                                </span>
                                            </div>
                                            <p className="text-gray-600 text-sm">📧 {admin.email}</p>
                                            <p className="text-gray-600 text-sm">📱 {admin.phone}</p>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-sm"><strong>DNI:</strong> {admin.dni}</p>
                                        <p className="text-sm"><strong>Fecha de Nacimiento:</strong> {admin.birthdate}</p>
                                        <div className="mt-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">   
                                            <p className="text-sm font-semibold text-yellow-800 mb-1">Permisos de Administrador:</p>
                                            <ul className="text-sm text-yellow-700 space-y-1">
                                                <li>• Gestión de usuarios</li>
                                                <li>• Aprobación de psicólogos</li>
                                                <li>• Acceso a métricas</li>
                                                <li>• Moderación de contenido</li>
                                            </ul>
                                        </div>
                                        
                                        <div className="flex gap-2 mt-4 flex-wrap">
                                            <button 
                                                className="px-4 py-2 bg-[#5046E7] text-white rounded-md hover:bg-[#4338CA] transition-colors text-sm font-medium" 
                                                type="button"
                                                onClick={() => {
                                                    alert(`Ver perfil completo de ${admin.name} - ID: ${admin.id}`);
                                                }}
                                            >
                                                Ver Perfil
                                            </button>
                                            
                                            {/* Botón de Ban/Unban dependiendo del estado is_active */}
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
                                                    {loading === admin.id ? 'Procesando...' : 'Banear Admin'}
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
                                                    {loading === admin.id ? 'Procesando...' : 'Desbanear Admin'}
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        </div>
                    </>
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
                            {confirmAction.action === 'ban' && `¿Estás seguro de que quieres banear al administrador ${confirmAction.userName}? Esta acción desactivará su cuenta.`}
                            {confirmAction.action === 'unban' && `¿Estás seguro de que quieres desbanear al administrador ${confirmAction.userName}? Esta acción reactivará su cuenta.`}
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

export default UserAdministrators;
