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
    phone?: string;
    dni?: number;
    birthdate?: string;
    emergency_contact?: string | null;
    is_active?: boolean;
    // Solo las propiedades que realmente necesitamos
}

interface UserPacientesProps {
    data: Paciente[];
}
const UserPacientes = ({ data }: UserPacientesProps) => {
    const [loading, setLoading] = useState<string | null>(null);
    const [confirmAction, setConfirmAction] = useState<{
        userId: string;
        action: 'promote' | 'ban' | 'unban';
        userName: string;
    } | null>(null);
    const [filter, setFilter] = useState<'todos' | 'activos' | 'baneados'>('todos');
    const [showBannedWarning, _setShowBannedWarning] = useState(false);

    const pacientes = data.filter((u) => u.role === 'Paciente');

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

    const renderActionButtons = (paciente: Paciente) => {
        return (
            <div className="flex gap-2 mt-4 flex-wrap">
                <button
                    onClick={() =>
                        setConfirmAction({
                            userId: paciente.id,
                            action: 'promote',
                            userName: paciente.name,
                        })
                    }
                    disabled={loading === paciente.id}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium disabled:opacity-50"
                >
                    {loading === paciente.id ? 'Procesando...' : 'Promover Usuario'}
                </button>

                {/* Botón de Ban/Unban dependiendo del estado is_active */}
                {paciente.is_active !== false ? (
                    <button
                        onClick={() =>
                            setConfirmAction({
                                userId: paciente.id,
                                action: 'ban',
                                userName: paciente.name,
                            })
                        }
                        disabled={loading === paciente.id}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm font-medium disabled:opacity-50"
                    >
                        {loading === paciente.id ? 'Procesando...' : 'Banear Usuario'}
                    </button>
                ) : (
                    <button
                        onClick={() =>
                            setConfirmAction({
                                userId: paciente.id,
                                action: 'unban',
                                userName: paciente.name,
                            })
                        }
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
                <div className="w-8 h-8 bg-[#5046E7] rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm font-bold">👥</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Gestión de Pacientes</h2>
                <div className="ml-auto bg-[#5046E7]/10 text-[#5046E7] px-3 py-1 rounded-full text-sm font-semibold">
                    {pacientes.length} pacientes
                </div>
            </div>

            {/* Filtros de estado */}
            <div className="flex items-center w-full h-12 gap-2 mb-6">
                <button
                    type="button"
                    className={`flex-1 h-full rounded-md transition-colors font-medium ${
                        filter === 'todos' ? 'bg-[#5046E7] text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                    }`}
                    onClick={() => setFilter('todos')}
                >
                    Todos ({pacientes.length})
                </button>
                <button
                    type="button"
                    className={`flex-1 h-full rounded-md transition-colors font-medium ${
                        filter === 'activos' ? 'bg-green-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                    }`}
                    onClick={() => setFilter('activos')}
                >
                    Activos ({pacientes.filter((p) => p.is_active !== false).length})
                </button>
                <button
                    type="button"
                    className={`flex-1 h-full rounded-md transition-colors font-medium ${
                        filter === 'baneados' ? 'bg-red-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                    }`}
                    onClick={() => setFilter('baneados')}
                >
                    Baneados ({pacientes.filter((p) => p.is_active === false).length})
                </button>
            </div>

            <div className="flex-1">
                {/* Advertencia especial para filtro de baneados */}
                {showBannedWarning && (
                    <div className="mb-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-white text-sm font-bold">ℹ</span>
                            </div>
                            <div className="flex-1">
                                <h4 className="text-blue-800 font-semibold mb-1">Usuarios Baneados</h4>
                                <p className="text-blue-700 text-sm mb-2">
                                    Los usuarios baneados no aparecen en esta lista debido a limitaciones del backend actual. Para ver y gestionar
                                    todos los usuarios baneados, utiliza la pestaña dedicada
                                    <strong> &ldquo;Usuarios Baneados&rdquo;</strong> en el menú superior.
                                </p>
                                <p className="text-blue-600 text-xs">
                                    💡 Las funciones de banear/desbanear funcionan correctamente desde cualquier pestaña.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {pacientes.length === 0 ? (
                    <div className="bg-gradient-to-r from-[#5046E7]/10 to-[#6366F1]/10 border border-[#5046E7]/20 rounded-lg p-12 text-center">
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-16 h-16 bg-[#5046E7]/20 rounded-full flex items-center justify-center">
                                <span className="text-2xl">{filter === 'activos' ? '✅' : filter === 'baneados' ? '�' : '�👥'}</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-700">
                                {filter === 'todos' && 'No hay pacientes registrados'}
                                {filter === 'activos' && 'No hay pacientes activos'}
                                {filter === 'baneados' && 'No hay pacientes baneados'}
                            </h3>
                            <p className="text-gray-500 max-w-md">
                                {filter === 'todos' && 'Los pacientes aparecerán aquí cuando se registren en la plataforma.'}
                                {filter === 'activos' && 'Todos los pacientes están baneados o no hay pacientes registrados.'}
                                {filter === 'baneados' &&
                                    'Los usuarios baneados no se muestran debido a limitaciones del backend. Las funciones de ban/unban funcionan correctamente.'}
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {pacientes.map((paciente) => (
                            <div
                                key={paciente.id}
                                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all duration-200"
                            >
                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-row gap-4">
                                        <div className="w-16 h-16 bg-gray-200 rounded-full flex-shrink-0">
                                            <Image
                                                src={paciente.profile_picture || '/person-gray-photo-placeholder-woman.webp'}
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
                                            <span
                                                className={`px-3 py-1 text-sm font-semibold rounded-full ${
                                                    paciente.is_active !== false ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                }`}
                                            >
                                                {paciente.is_active !== false ? 'Activo' : 'Baneado'}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-sm">
                                            <strong>DNI:</strong> {paciente.dni}
                                        </p>
                                        <p className="text-sm">
                                            <strong>Fecha de Nacimiento:</strong> {paciente.birthdate}
                                        </p>
                                        <div className="mt-3 p-3 bg-[#5046E7]/10 rounded-lg border border-[#5046E7]/20">
                                            <p className="text-sm font-semibold text-[#5046E7] mb-1">Contacto de Emergencia:</p>
                                            {paciente.emergency_contact === null ? (
                                                <p className="text-sm text-gray-500">No registrado</p>
                                            ) : (
                                                <p className="text-sm">{paciente.emergency_contact}</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Botones de acción */}
                                    <div className="mt-4 flex gap-2">{renderActionButtons(paciente)}</div>
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
                        <h3 className="text-lg font-semibold mb-4">Confirmar acción</h3>
                        <p className="text-gray-600 mb-6">
                            {confirmAction.action === 'promote' && `¿Estás seguro de que quieres promover a ${confirmAction.userName}?`}
                            {confirmAction.action === 'ban' &&
                                `¿Estás seguro de que quieres banear a ${confirmAction.userName}? Esta acción desactivará su cuenta.`}
                            {confirmAction.action === 'unban' &&
                                `¿Estás seguro de que quieres desbanear a ${confirmAction.userName}? Esta acción reactivará su cuenta.`}
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
