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
        action: 'promote' | 'ban' | 'unban';
        userName: string;
    } | null>(null);
    const notifications = useNotifications();

    const handleUserAction = async (userId: string, action: 'promote' | 'ban' | 'unban') => {
        setLoading(userId);

        try {
            let result;

            switch (action) {
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

    const [filter, setFilter] = useState<'Pendiente' | 'Validado'>('Pendiente');

    const profesionales = data.filter((u) => u.role === 'Psicólogo');

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
            </div>

            <div className="flex-1">
                {filtrados.length === 0 ? (
                    <div className="bg-gradient-to-r from-[#5046E7]/10 to-[#6366F1]/10 border border-[#5046E7]/20 rounded-lg p-12 text-center">
                        <div className="flex flex-col items-center gap-4">
                            <h3 className="text-xl font-semibold text-gray-700">No hay psicólogos {filter.toLowerCase()}</h3>
                            <p className="max-w-md text-gray-500">
                                {filter === 'Pendiente'
                                    ? 'No hay psicólogos esperando aprobación en este momento.'
                                    : 'No hay psicólogos aprobados aún.'}
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
                                                <span
                                                    className={`px-3 py-1 text-sm font-semibold rounded-full ${
                                                        psicologo.verified === 'Validado'
                                                            ? 'bg-green-100 text-green-800'
                                                            : 'bg-orange-100 text-orange-800'
                                                    }`}
                                                >
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

                                    <div className="flex flex-wrap gap-2 mt-4">
                                        {psicologo.verified === 'Pendiente' && (
                                            <button
                                                onClick={() => setAlerta(true)}
                                                className="px-4 py-2 text-sm font-medium text-white transition-colors bg-green-600 rounded-md hover:bg-green-700"
                                                type="button"
                                            >
                                                Aprobar
                                            </button>
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
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="w-full max-w-md p-6 mx-4 bg-white rounded-lg">
                        <h3 className="mb-4 text-lg font-semibold">Confirmar acción</h3>
                        <p className="mb-6 text-gray-600">
                            {confirmAction.action === 'promote' &&
                                `¿Estás seguro de que quieres promover a administrador a ${confirmAction.userName}?`}
                            {confirmAction.action === 'ban' &&
                                `¿Estás seguro de que quieres banear a ${confirmAction.userName}? Esta acción desactivará su cuenta.`}
                            {confirmAction.action === 'unban' &&
                                `¿Estás seguro de que quieres desbanear a ${confirmAction.userName}? Esta acción reactivará su cuenta.`}
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
        </div>
    );
};

export default UserProfessionals;
