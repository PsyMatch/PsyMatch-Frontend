'use client';
import { envs } from '@/config/envs.config';
import Image from 'next/image';
import { useState } from 'react';
import Cookies from 'js-cookie';
import { adminService } from '@/services/admin';
import { useNotifications } from '@/hooks/useNotifications';

interface Paciente {
    id: string;
    name: string;
    email: string;
    role: string;
    profile_picture?: string;
    verified?: string;
    professional_experience?: number;
    phone?: string;
    dni?: number;
    birthdate?: string;
    is_active?: boolean;
    // Solo las propiedades que realmente necesitamos
}

interface UserProfessionalsProps {
    data: Paciente[];
}

const UserProfessionals = ({ data }: UserProfessionalsProps) => {
    const [loading, setLoading] = useState<string | null>(null);
    const [confirmAction, setConfirmAction] = useState<{
        userId: string;
        action: 'promote' | 'ban' | 'unban' | 'verify' | 'reject';
        userName: string;
    } | null>(null);
    const notifications = useNotifications();

    const handleUserAction = async (userId: string, action: 'promote' | 'ban' | 'unban' | 'verify' | 'reject') => {
        setLoading(userId);

        try {
            let result;

            switch (action) {
                case 'verify':
                    result = await adminService.verifyPsychologist(userId);
                    if (result.success) {
                        // Actualizar el estado local
                        setLocalData(prev => prev.map(user => 
                            user.id === userId 
                                ? { ...user, verified: 'Validado' }
                                : user
                        ));
                        alert('Psicólogo verificado exitosamente');
                    }
                    break;
                case 'reject':
                    result = await adminService.rejectPsychologist(userId);
                    if (result.success) {
                        // Actualizar el estado local
                        setLocalData(prev => prev.map(user => 
                            user.id === userId 
                                ? { ...user, verified: 'Rechazado' }
                                : user
                        ));
                        alert('Psicólogo rechazado exitosamente');
                    }
                    break;
                case 'promote':
                    result = await adminService.promoteUser(userId);
                    break;
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
                const actionText = action === 'promote' ? 'promovido' : action === 'ban' ? 'baneado' : 'desbaneado';
                notifications.success(`Usuario ${actionText} exitosamente`);
                window.location.reload(); // Recargar para ver cambios
            } else {
                notifications.error(`Error: ${result.message}`);
            }
        } catch (error) {
            console.error('Error en la acción:', error);
            notifications.error('Error al ejecutar la acción');
        } finally {
            setLoading(null);
            setConfirmAction(null);
        }
    };

    const handleAccept = async (id: string) => {
        const token = localStorage.getItem('authToken') || Cookies.get('authToken') || Cookies.get('auth_token');
        const response = await fetch(`${envs.next_public_api_url}/psychologist/verification/${id}/verify`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const _result = await response.json();
    };

    const [filter, setFilter] = useState<'Pendiente' | 'Validado' | 'Rechazado'>('Pendiente');

        // Función para obtener solo los profesionales (role === "Psicólogo")
    const profesionales = localData.filter(user => user.role === "Psicólogo");
    
    // Filtrar solo por verificación
    const filtrados = profesionales.filter((u) => u.verified === filter);

    const [alerta, setAlerta] = useState(false);

    return (
        <div className="w-full min-h-[500px] flex flex-col">
            <div className="flex items-center gap-3 mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Gestión de Psicólogos</h2>
                <div className="ml-auto bg-[#5046E7]/10 text-[#5046E7] px-3 py-1 rounded-full text-sm font-semibold">
                    {filtrados.length} psicólogos
                </div>
            </div>

            <div className="flex items-center w-full h-12 gap-2 mb-4">
                <button
                    type="button"
                    className={`flex-1 h-full rounded-md transition-colors font-medium ${
                        filter === 'Pendiente' ? 'bg-[#5046E7] text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                    }`}
                    onClick={() => setFilter('Pendiente')}
                >
                    PENDIENTES ({profesionales.filter((p) => p.verified === 'Pendiente').length})
                </button>
                <button
                    type="button"
                    className={`flex-1 h-full rounded-md transition-colors font-medium ${
                        filter === 'Validado' ? 'bg-[#5046E7] text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                    }`}
                    onClick={() => setFilter('Validado')}
                >
                    APROBADOS ({profesionales.filter((p) => p.verified === 'Validado').length})
                </button>
                <button
                    type="button"
                    className={`flex-1 h-full rounded-md transition-colors font-medium ${
                        filter === "Rechazado" ? "bg-[#5046E7] text-white" : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                    }`}
                    onClick={() => setFilter("Rechazado")}
                >
                    RECHAZADOS ({profesionales.filter(p => p.verified === "Rechazado").length})
                </button>
                <button
                    type="button"
                    className={`flex-1 h-full rounded-md transition-colors font-medium ${
                        filter === "Rechazado" ? "bg-[#5046E7] text-white" : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                    }`}
                    onClick={() => setFilter("Rechazado")}
                >
                    RECHAZADOS ({profesionales.filter(p => p.verified === "Rechazado").length})
                </button>
            </div>

            <div className="flex-1">
                {filtrados.length === 0 ? (
                    <div className="bg-gradient-to-r from-[#5046E7]/10 to-[#6366F1]/10 border border-[#5046E7]/20 rounded-lg p-12 text-center">
                        <div className="flex flex-col items-center gap-4">
                            <h3 className="text-xl font-semibold text-gray-700">
                                No hay psicólogos {filter.toLowerCase()}
                            </h3>
                            <p className="text-gray-500 max-w-md">
                                {filter === "Pendiente" 
                                    ? "No hay psicólogos esperando aprobación en este momento."
                                    : filter === "Validado"
                                    ? "No hay psicólogos aprobados aún."
                                    : "No hay psicólogos rechazados."
                                }
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        {filtrados?.map((psicologo) => (
                            <div
                                key={psicologo.id}
                                className="p-6 transition-all duration-200 bg-white border border-gray-200 rounded-lg hover:shadow-md"
                            >
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 w-16 h-16 bg-gray-200 rounded-full">
                                            <Image
                                                src={psicologo.profile_picture || '/person-gray-photo-placeholder-woman.webp'}
                                                alt={`Foto de ${psicologo.name}`}
                                                width={64}
                                                height={64}
                                                className="object-cover w-full h-full rounded-full"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-[#5046E7] text-lg">{psicologo.name}</h3>
                                            <p className="text-sm text-gray-600">📧 {psicologo.email}</p>
                                            <p className="text-sm text-gray-600">📱 {psicologo.phone}</p>
                                        </div>
                                        <div className="flex-shrink-0">
                                            <div className="flex flex-col gap-2">
                                                <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                                                    psicologo.verified === "Validado" 
                                                        ? "bg-green-100 text-green-800" 
                                                        : psicologo.verified === "Rechazado"
                                                        ? "bg-red-100 text-red-800"
                                                        : "bg-orange-100 text-orange-800"
                                                }`}>
                                                    {psicologo.verified}
                                                </span>
                                                <span
                                                    className={`px-3 py-1 text-sm font-semibold rounded-full ${
                                                        psicologo.is_active !== false ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'
                                                    }`}
                                                >
                                                    {psicologo.is_active !== false ? 'Activo' : 'Baneado'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <p className="text-sm">
                                            <strong>DNI:</strong> {psicologo.dni}
                                        </p>
                                        <p className="text-sm">
                                            <strong>Fecha de Nacimiento:</strong> {psicologo.birthdate}
                                        </p>
                                        <p className="text-sm">
                                            <strong>Años de Experiencia:</strong> {psicologo.professional_experience}
                                        </p>
                                    </div>
                                    
                                    <div className="flex gap-2 mt-4 flex-wrap">
                                        {/* Botones de verificación solo para psicólogos pendientes */}
                                        {psicologo.verified === "Pendiente" && (
                                            <>
                                                <button  
                                                    onClick={() => setConfirmAction({
                                                        userId: psicologo.id,
                                                        action: 'verify',
                                                        userName: psicologo.name
                                                    })}
                                                    disabled={loading === psicologo.id}
                                                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm font-medium disabled:opacity-50"
                                                    type="button"
                                                >
                                                    {loading === psicologo.id && confirmAction?.action === 'verify' ? 'Aprobando...' : 'Aprobar'}
                                                </button>
                                                
                                                <button  
                                                    onClick={() => setConfirmAction({
                                                        userId: psicologo.id,
                                                        action: 'reject',
                                                        userName: psicologo.name
                                                    })}
                                                    disabled={loading === psicologo.id}
                                                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm font-medium disabled:opacity-50"
                                                    type="button"
                                                >
                                                    {loading === psicologo.id && confirmAction?.action === 'reject' ? 'Rechazando...' : 'Rechazar'}
                                                </button>
                                            </>
                                        )}

                                        <button
                                            className="px-4 py-2 bg-[#5046E7] text-white rounded-md hover:bg-[#4338CA] transition-colors text-sm font-medium"
                                            type="button"
                                            onClick={() => {
                                                // Aquí podrías abrir un modal con el perfil completo
                                                // en lugar de navegar a otra página
                                                notifications.info(`Ver perfil completo de ${psicologo.name} - ID: ${psicologo.id}`);
                                            }}
                                        >
                                            Ver Perfil
                                        </button>

                                        {/* Botón de promoción (hacer admin) */}
                                        <button
                                            onClick={() =>
                                                setConfirmAction({
                                                    userId: psicologo.id,
                                                    action: 'promote',
                                                    userName: psicologo.name,
                                                })
                                            }
                                            disabled={loading === psicologo.id}
                                            className="px-4 py-2 text-sm font-medium text-white transition-colors bg-purple-600 rounded-md hover:bg-purple-700 disabled:opacity-50"
                                        >
                                            {loading === psicologo.id ? 'Procesando...' : 'Promover a Admin'}
                                        </button>

                                        {/* Botón de Ban/Unban dependiendo del estado is_active */}
                                        {psicologo.is_active !== false ? (
                                            <button
                                                onClick={() =>
                                                    setConfirmAction({
                                                        userId: psicologo.id,
                                                        action: 'ban',
                                                        userName: psicologo.name,
                                                    })
                                                }
                                                disabled={loading === psicologo.id}
                                                className="px-4 py-2 text-sm font-medium text-white transition-colors bg-red-600 rounded-md hover:bg-red-700 disabled:opacity-50"
                                            >
                                                {loading === psicologo.id ? 'Procesando...' : 'Banear Usuario'}
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() =>
                                                    setConfirmAction({
                                                        userId: psicologo.id,
                                                        action: 'unban',
                                                        userName: psicologo.name,
                                                    })
                                                }
                                                disabled={loading === psicologo.id}
                                                className="px-4 py-2 text-sm font-medium text-white transition-colors bg-green-600 rounded-md hover:bg-green-700 disabled:opacity-50"
                                            >
                                                {loading === psicologo.id ? 'Procesando...' : 'Desbanear Usuario'}
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {alerta && (
                                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                                        <div className="p-6 bg-white shadow-xl rounded-xl w-96">
                                            <h3 className="mb-4 text-lg font-semibold text-center text-gray-800">Confirmar Aprobación</h3>
                                            <p className="mb-6 text-center text-gray-600">¿Estás seguro de que deseas aprobar a este psicólogo?</p>
                                            <div className="flex justify-center gap-4">
                                                <button
                                                    onClick={async () => {
                                                        await handleAccept(psicologo.id);
                                                        setAlerta(false);
                                                        // En lugar de recargar la página, podrías actualizar el estado local
                                                        // setFilter(current => current === "Pendiente" ? "Validado" : current);
                                                    }}
                                                    className="px-6 py-2 text-white transition-colors bg-green-600 rounded-md hover:bg-green-700"
                                                >
                                                    Confirmar
                                                </button>
                                                <button
                                                    onClick={() => setAlerta(false)}
                                                    className="px-6 py-2 text-gray-700 transition-colors bg-gray-300 rounded-md hover:bg-gray-400"
                                                >
                                                    Cancelar
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
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
                            {confirmAction.action === 'verify' && `¿Estás seguro de que quieres aprobar a ${confirmAction.userName}? Esto cambiará su estado a "Validado".`}
                            {confirmAction.action === 'reject' && `¿Estás seguro de que quieres rechazar a ${confirmAction.userName}? Esto cambiará su estado a "Rechazado".`}
                            {confirmAction.action === 'promote' && `¿Estás seguro de que quieres promover a administrador a ${confirmAction.userName}?`}
                            {confirmAction.action === 'ban' && `¿Estás seguro de que quieres banear a ${confirmAction.userName}? Esta acción desactivará su cuenta.`}
                            {confirmAction.action === 'unban' && `¿Estás seguro de que quieres desbanear a ${confirmAction.userName}? Esta acción reactivará su cuenta.`}
                        </p>
                        <div className="flex justify-end gap-4">
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

            {/* Modal de perfil completo */}
            {selectedProfile && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-6">
                                <h2 className="text-2xl font-bold text-[#5046E7]">Perfil Completo</h2>
                                <button
                                    onClick={() => setSelectedProfile(null)}
                                    className="text-gray-500 hover:text-gray-700 text-xl font-bold"
                                >
                                    ×
                                </button>
                            </div>
                            
                            <div className="space-y-6">
                                {/* Información personal */}
                                <div className="flex items-center gap-6">
                                    <div className="w-24 h-24 bg-gray-200 rounded-full flex-shrink-0">
                                        <Image 
                                            src={selectedProfile.profile_picture || "/person-gray-photo-placeholder-woman.webp"} 
                                            alt={`Foto de ${selectedProfile.name}`}
                                            width={96}
                                            height={96}
                                            className="object-cover w-full h-full rounded-full" 
                                        />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-800">{selectedProfile.name}</h3>
                                        <p className="text-gray-600">{selectedProfile.email}</p>
                                        <div className="flex gap-2 mt-2">
                                            <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                                                selectedProfile.verified === "Validado" 
                                                    ? "bg-green-100 text-green-800" 
                                                    : selectedProfile.verified === "Rechazado"
                                                    ? "bg-red-100 text-red-800"
                                                    : "bg-orange-100 text-orange-800"
                                            }`}>
                                                {selectedProfile.verified}
                                            </span>
                                            <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                                                selectedProfile.is_active !== false 
                                                    ? "bg-blue-100 text-blue-800" 
                                                    : "bg-red-100 text-red-800"
                                            }`}>
                                                {selectedProfile.is_active !== false ? "Activo" : "Baneado"}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Información detallada */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-3">
                                        <h4 className="font-semibold text-gray-800">Información Personal</h4>
                                        <div className="space-y-2 text-sm">
                                            <p><strong>DNI:</strong> {selectedProfile.dni || 'No especificado'}</p>
                                            <p><strong>Teléfono:</strong> {selectedProfile.phone || 'No especificado'}</p>
                                            <p><strong>Fecha de Nacimiento:</strong> {selectedProfile.birthdate || 'No especificada'}</p>
                                            <p><strong>Rol:</strong> {selectedProfile.role}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-3">
                                        <h4 className="font-semibold text-gray-800">Información Profesional</h4>
                                        <div className="space-y-2 text-sm">
                                            <p><strong>Años de Experiencia:</strong> {selectedProfile.professional_experience || 'No especificado'}</p>
                                            <p><strong>ID de Usuario:</strong> {selectedProfile.id}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Acciones rápidas */}
                                <div className="border-t pt-4">
                                    <h4 className="font-semibold text-gray-800 mb-3">Acciones</h4>
                                    <div className="flex gap-2 flex-wrap">
                                        {selectedProfile.verified === "Pendiente" && (
                                            <>
                                                <button  
                                                    onClick={() => {
                                                        setConfirmAction({
                                                            userId: selectedProfile.id,
                                                            action: 'verify',
                                                            userName: selectedProfile.name
                                                        });
                                                        setSelectedProfile(null);
                                                    }}
                                                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm font-medium"
                                                >
                                                    Aprobar
                                                </button>
                                                
                                                <button  
                                                    onClick={() => {
                                                        setConfirmAction({
                                                            userId: selectedProfile.id,
                                                            action: 'reject',
                                                            userName: selectedProfile.name
                                                        });
                                                        setSelectedProfile(null);
                                                    }}
                                                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm font-medium"
                                                >
                                                    Rechazar
                                                </button>
                                            </>
                                        )}
                                        
                                        <button
                                            onClick={() => {
                                                setConfirmAction({
                                                    userId: selectedProfile.id,
                                                    action: 'promote',
                                                    userName: selectedProfile.name
                                                });
                                                setSelectedProfile(null);
                                            }}
                                            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors text-sm font-medium"
                                        >
                                            Promover a Admin
                                        </button>
                                        
                                        {selectedProfile.is_active !== false ? (
                                            <button
                                                onClick={() => {
                                                    setConfirmAction({
                                                        userId: selectedProfile.id,
                                                        action: 'ban',
                                                        userName: selectedProfile.name
                                                    });
                                                    setSelectedProfile(null);
                                                }}
                                                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm font-medium"
                                            >
                                                Banear Usuario
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => {
                                                    setConfirmAction({
                                                        userId: selectedProfile.id,
                                                        action: 'unban',
                                                        userName: selectedProfile.name
                                                    });
                                                    setSelectedProfile(null);
                                                }}
                                                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm font-medium"
                                            >
                                                Desbanear Usuario
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserProfessionals;
