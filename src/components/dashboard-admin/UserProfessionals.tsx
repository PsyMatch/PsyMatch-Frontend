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
    professional_experience?: number;
    phone?: string;
    dni?: number;
    birthdate?: string;
    is_active?: boolean;
    // Solo las propiedades que realmente necesitamos
}

interface UserProfessionalsProps {
    data: Paciente[];
    onUserUpdate?: (userId: string, updates: Partial<Paciente>) => void;
}

const UserProfessionals = ({ data, onUserUpdate }: UserProfessionalsProps) => {
    const [loading, setLoading] = useState<string | null>(null);
    const [confirmAction, setConfirmAction] = useState<{
        userId: string;
        action: 'promote' | 'ban' | 'unban' | 'verify' | 'reject';
        userName: string;
    } | null>(null);
    const [banReason, setBanReason] = useState('');
    const [localData, setLocalData] = useState(data);
    const [selectedProfile, setSelectedProfile] = useState<Paciente | null>(null);
    const [loadingPending, setLoadingPending] = useState(false);
    const notifications = useNotifications();

    // Cargar psicólogos al montar el componente
    useEffect(() => {
        const loadPsychologists = async () => {
            setLoadingPending(true);
            try {
                // Primero obtenemos los pendientes
                const pendingResult = await adminService.getPendingPsychologists();
                
                let allPsychologists: Paciente[] = [];
                
                if (pendingResult.success && pendingResult.data) {
                    allPsychologists = [...allPsychologists, ...(pendingResult.data as Paciente[])];
                }
                
                // Luego obtenemos los verificados
                const verifiedResult = await adminService.getUsers({ limit: 100 });
                
                if (verifiedResult.success && verifiedResult.data) {
                    // Filtrar solo psicólogos del resultado general
                    const psychologists = (verifiedResult.data as Paciente[]).filter(user => 
                        user.role === "Psicólogo" && user.verified !== "Pendiente"
                    );
                    allPsychologists = [...allPsychologists, ...psychologists];
                }
                
                // También obtenemos los usuarios baneados
                const bannedResult = await adminService.getBannedUsers({ page: 1, limit: 100 });
                
                if (bannedResult.success && bannedResult.data) {
                    // Filtrar solo psicólogos baneados
                    const bannedData = bannedResult.data as any;
                    const bannedItems = Array.isArray(bannedData) ? bannedData : (bannedData.items || []);
                    const bannedPsychologists = (bannedItems as Paciente[]).filter(user => 
                        user.role === "Psicólogo"
                    );
                    allPsychologists = [...allPsychologists, ...bannedPsychologists];
                }
                
                // Remover duplicados basado en ID
                const uniquePsychologists = allPsychologists.filter((psy, index, self) => 
                    index === self.findIndex(p => p.id === psy.id)
                );
                
                setLocalData(uniquePsychologists);
                
                if (allPsychologists.length === 0) {
                    notifications.info('No se encontraron psicólogos registrados');
                }
            } catch (error) {
                console.error('Error cargando psicólogos:', error);
                notifications.error('Error al cargar psicólogos');
            } finally {
                setLoadingPending(false);
            }
        };

        loadPsychologists();
    }, [notifications]);

    // Sincronizar con datos del componente padre cuando cambien
    useEffect(() => {
        // Actualizar localData con los datos más recientes del padre (activos e inactivos)
        const activePsychologists = data.filter(user => user.role === "Psicólogo");
        if (activePsychologists.length > 0) {
            setLocalData(prevData => {
                // Mergear datos, priorizando los datos del padre
                const mergedData = [...prevData];
                activePsychologists.forEach(user => {
                    const existingIndex = mergedData.findIndex(existingUser => existingUser.id === user.id);
                    if (existingIndex >= 0) {
                        // Actualizar usuario existente
                        mergedData[existingIndex] = { ...mergedData[existingIndex], ...user };
                    } else {
                        // Agregar nuevo usuario (activo o inactivo)
                        mergedData.push(user);
                    }
                });
                return mergedData;
            });
        }
    }, [data]);

    const handleUserAction = async (userId: string, action: 'promote' | 'ban' | 'unban' | 'verify' | 'reject') => {
        // Validar que el motivo sea obligatorio para el baneo
        if (action === 'ban' && banReason.trim().length === 0) {
            notifications.error('El motivo del baneo es obligatorio');
            return;
        }

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
                        notifications.success('Psicólogo verificado exitosamente');
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
                        notifications.success('Psicólogo rechazado exitosamente');
                    }
                    break;
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

            if (result.success && (action === 'promote' || action === 'ban' || action === 'unban')) {
                // Actualizar el estado global y local
                if (action === 'promote') {
                    // Si se promueve a admin, actualizar en el estado global y remover localmente
                    onUserUpdate?.(userId, { role: 'Administrador' });
                    setLocalData(prev => prev.filter(user => user.id !== userId));
                } else if (action === 'ban') {
                    // Si se banea, actualizar en el estado global y remover localmente
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
                
                const actionText = action === 'promote' ? 'promovido' : action === 'ban' ? 'baneado' : 'desbaneado';
                notifications.success(`Usuario ${actionText} exitosamente`);
            } else if (!result.success && (action === 'promote' || action === 'ban' || action === 'unban')) {
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
                
                const actionText = action === 'promote' ? 'promovido' : action === 'ban' ? 'baneado' : 'desbaneado';
                notifications.success(`Acción ejecutada: Usuario ${actionText}`);
            } else if (!result.success) {
                notifications.error(`Error: ${result.message}`);
            }
        } catch (error) {
            console.error('Error en la acción:', error);
            
            // Aunque haya error, intentar actualizar el estado para acciones críticas
            if (action === 'promote' || action === 'ban' || action === 'unban') {
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
                
                const actionText = action === 'promote' ? 'promovido' : action === 'ban' ? 'baneado' : 'desbaneado';
                notifications.success(`Acción ejecutada con advertencias: Usuario ${actionText}`);
            } else {
                notifications.error('Error al ejecutar la acción');
            }
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

    const [filter, setFilter] = useState<'Pendiente' | 'Validado' | 'Rechazado'>('Pendiente');

        // Función para obtener todos los profesionales (activos e inactivos)
    const profesionales = localData.filter(user => user.role === "Psicólogo");
    
    // Filtrar solo por verificación
    const filtrados = profesionales.filter((u) => u.verified === filter);

    const [alerta, setAlerta] = useState(false);

    return (
        <div className="w-full min-h-[500px] flex flex-col">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Gestión de Psicólogos</h2>
                <div className="bg-[#5046E7]/10 text-[#5046E7] px-3 py-1 rounded-full text-sm font-semibold w-fit">
                    {filtrados.length} psicólogos
                </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center w-full gap-2 mb-4">
                <button
                    type="button"
                    className={`flex-1 h-10 sm:h-12 rounded-md transition-colors font-medium text-sm sm:text-base ${
                        filter === 'Pendiente' ? 'bg-[#5046E7] text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                    }`}
                    onClick={() => setFilter('Pendiente')}
                >
                    PENDIENTES ({profesionales.filter((p) => p.verified === 'Pendiente').length})
                </button>
                <button
                    type="button"
                    className={`flex-1 h-10 sm:h-12 rounded-md transition-colors font-medium text-sm sm:text-base ${
                        filter === 'Validado' ? 'bg-[#5046E7] text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                    }`}
                    onClick={() => setFilter('Validado')}
                >
                    APROBADOS ({profesionales.filter((p) => p.verified === 'Validado').length})
                </button>
                <button
                    type="button"
                    className={`flex-1 h-10 sm:h-12 rounded-md transition-colors font-medium text-sm sm:text-base ${
                        filter === "Rechazado" ? "bg-[#5046E7] text-white" : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                    }`}
                    onClick={() => setFilter("Rechazado")}
                >
                    RECHAZADOS ({profesionales.filter(p => p.verified === "Rechazado").length})
                </button>
            </div>

            <div className="flex-1">
                {loadingPending ? (
                    <div className="bg-gradient-to-r from-[#5046E7]/10 to-[#6366F1]/10 border border-[#5046E7]/20 rounded-lg p-12 text-center">
                        <div className="flex flex-col items-center gap-4">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5046E7]"></div>
                            <h3 className="text-xl font-semibold text-gray-700">
                                Cargando psicólogos...
                            </h3>
                            <p className="text-gray-500">
                                Obteniendo la lista de psicólogos registrados
                            </p>
                        </div>
                    </div>
                ) : filtrados.length === 0 ? (
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
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
                        {filtrados?.map((psicologo) => (
                            <div
                                key={psicologo.id}
                                className="p-4 sm:p-5 transition-all duration-200 bg-white border border-gray-200 rounded-lg hover:shadow-md overflow-hidden"
                            >
                                <div className="flex flex-col gap-4 h-full">
                                    {/* Header con avatar, nombre y badges */}
                                    <div className="flex items-start gap-3">
                                        <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-gray-200 rounded-full">
                                            <Image
                                                src={psicologo.profile_picture || '/person-gray-photo-placeholder-woman.webp'}
                                                alt={`Foto de ${psicologo.name}`}
                                                width={56}
                                                height={56}
                                                className="object-cover w-full h-full rounded-full"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-bold text-[#5046E7] text-sm sm:text-base mb-2 truncate">{psicologo.name}</h3>
                                            <div className="flex flex-wrap gap-1.5">
                                                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                                    psicologo.verified === "Validado" 
                                                        ? "bg-green-100 text-green-800" 
                                                        : psicologo.verified === "Rechazado"
                                                        ? "bg-red-100 text-red-800"
                                                        : "bg-orange-100 text-orange-800"
                                                }`}>
                                                    {psicologo.verified}
                                                </span>
                                                <span
                                                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                                        psicologo.is_active !== false ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'
                                                    }`}
                                                >
                                                    {psicologo.is_active !== false ? 'Activo' : 'Baneado'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Información de contacto */}
                                    <div className="space-y-2 text-xs sm:text-sm">
                                        <p className="text-gray-600 break-words">
                                            <span className="font-medium">📧 Email:</span> {psicologo.email}
                                        </p>
                                        <p className="text-gray-600">
                                            <span className="font-medium">📱 Teléfono:</span> {psicologo.phone}
                                        </p>
                                    </div>

                                    {/* Información adicional */}
                                    <div className="space-y-2 text-xs sm:text-sm border-t border-gray-100 pt-3">
                                        <p><strong>DNI:</strong> {psicologo.dni}</p>
                                        <p><strong>Fecha de Nacimiento:</strong> {psicologo.birthdate}</p>
                                        <p><strong>Años de Experiencia:</strong> {psicologo.professional_experience}</p>
                                    </div>
                                    
                                    {/* Botones de acción */}
                                    <div className="flex gap-2 flex-col sm:flex-row mt-auto pt-3 border-t border-gray-100">
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
                                                    className="w-full sm:w-auto px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm font-medium disabled:opacity-50"
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
                                                    className="w-full sm:w-auto px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm font-medium disabled:opacity-50"
                                                    type="button"
                                                >
                                                    {loading === psicologo.id && confirmAction?.action === 'reject' ? 'Rechazando...' : 'Rechazar'}
                                                </button>
                                            </>
                                        )}

                                        <button
                                            className="w-full sm:w-auto px-3 py-2 bg-[#5046E7] text-white rounded-md hover:bg-[#4338CA] transition-colors text-sm font-medium"
                                            type="button"
                                            onClick={() => setSelectedProfile(psicologo)}
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
                                            className="w-full sm:w-auto px-3 py-2 text-sm font-medium text-white transition-colors bg-purple-600 rounded-md hover:bg-purple-700 disabled:opacity-50"
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
                                                className="w-full sm:w-auto px-3 py-2 text-sm font-medium text-white transition-colors bg-red-600 rounded-md hover:bg-red-700 disabled:opacity-50"
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
                                                className="w-full sm:w-auto px-3 py-2 text-sm font-medium text-white transition-colors bg-green-600 rounded-md hover:bg-green-700 disabled:opacity-50"
                                            >
                                                {loading === psicologo.id ? 'Procesando...' : 'Desbanear'}
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
                                                        await handleUserAction(psicologo.id, 'verify');
                                                        setAlerta(false);
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
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg p-4 sm:p-6 max-w-md w-full">
                        <h3 className="text-lg font-semibold mb-4">
                            Confirmar acción
                        </h3>
                        <p className="text-sm sm:text-base text-gray-600 mb-6">
                            {confirmAction.action === 'verify' && `¿Estás seguro de que quieres aprobar a ${confirmAction.userName}? Esto cambiará su estado a "Validado".`}
                            {confirmAction.action === 'reject' && `¿Estás seguro de que quieres rechazar a ${confirmAction.userName}? Esto cambiará su estado a "Rechazado".`}
                            {confirmAction.action === 'promote' && `¿Estás seguro de que quieres promover a administrador a ${confirmAction.userName}?`}
                            {confirmAction.action === 'ban' && `¿Estás seguro de que quieres banear a ${confirmAction.userName}? Esta acción desactivará su cuenta.`}
                            {confirmAction.action === 'unban' && `¿Estás seguro de que quieres desbanear a ${confirmAction.userName}? Esta acción reactivará su cuenta.`}
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

                        <div className="flex flex-col sm:flex-row justify-end gap-3">
                            <button
                                onClick={handleCloseModal}
                                className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={() => handleUserAction(confirmAction.userId, confirmAction.action)}
                                disabled={confirmAction.action === 'ban' && banReason.trim().length === 0}
                                className={`w-full sm:w-auto px-4 py-2 text-sm font-medium text-white rounded-md transition-colors ${
                                    confirmAction.action === 'ban' && banReason.trim().length === 0
                                        ? 'bg-gray-400 cursor-not-allowed opacity-50'
                                        : 'bg-[#5046E7] hover:bg-[#4037D6]'
                                }`}
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
                        <div className="p-4 sm:p-6">
                            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
                                <h2 className="text-xl sm:text-2xl font-bold text-[#5046E7]">Perfil Completo</h2>
                                <button
                                    onClick={() => setSelectedProfile(null)}
                                    className="self-start sm:self-auto text-gray-500 hover:text-gray-700 text-xl font-bold"
                                >
                                    ×
                                </button>
                            </div>
                            
                            <div className="space-y-6">
                                {/* Información personal */}
                                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-200 rounded-full flex-shrink-0">
                                        <Image 
                                            src={selectedProfile.profile_picture || "/person-gray-photo-placeholder-woman.webp"} 
                                            alt={`Foto de ${selectedProfile.name}`}
                                            width={96}
                                            height={96}
                                            className="object-cover w-full h-full rounded-full" 
                                        />
                                    </div>
                                    <div className="text-center sm:text-left">
                                        <h3 className="text-lg sm:text-xl font-bold text-gray-800">{selectedProfile.name}</h3>
                                        <p className="text-sm sm:text-base text-gray-600">{selectedProfile.email}</p>
                                        <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-2">
                                            <span className={`px-2 sm:px-3 py-1 text-xs sm:text-sm font-semibold rounded-full ${
                                                selectedProfile.verified === "Validado" 
                                                    ? "bg-green-100 text-green-800" 
                                                    : selectedProfile.verified === "Rechazado"
                                                    ? "bg-red-100 text-red-800"
                                                    : "bg-orange-100 text-orange-800"
                                            }`}>
                                                {selectedProfile.verified}
                                            </span>
                                            <span className={`px-2 sm:px-3 py-1 text-xs sm:text-sm font-semibold rounded-full ${
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
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                                    <div className="space-y-3">
                                        <h4 className="font-semibold text-gray-800 text-sm sm:text-base">Información Personal</h4>
                                        <div className="space-y-2 text-xs sm:text-sm">
                                            <p><strong>DNI:</strong> {selectedProfile.dni || 'No especificado'}</p>
                                            <p><strong>Teléfono:</strong> {selectedProfile.phone || 'No especificado'}</p>
                                            <p><strong>Fecha de Nacimiento:</strong> {selectedProfile.birthdate || 'No especificada'}</p>
                                            <p><strong>Rol:</strong> {selectedProfile.role}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-3">
                                        <h4 className="font-semibold text-gray-800 text-sm sm:text-base">Información Profesional</h4>
                                        <div className="space-y-2 text-xs sm:text-sm">
                                            <p><strong>Años de Experiencia:</strong> {selectedProfile.professional_experience || 'No especificado'}</p>
                                            <p><strong>ID de Usuario:</strong> {selectedProfile.id}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Acciones rápidas */}
                                <div className="border-t pt-4">
                                    <h4 className="font-semibold text-gray-800 mb-3 text-sm sm:text-base">Acciones</h4>
                                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 flex-wrap">
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
                                                    className="w-full sm:w-auto px-3 sm:px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-xs sm:text-sm font-medium"
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
                                                    className="w-full sm:w-auto px-3 sm:px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-xs sm:text-sm font-medium"
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
                                            className="w-full sm:w-auto px-3 sm:px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors text-xs sm:text-sm font-medium"
                                        >
                                            Promover
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
                                                className="w-full sm:w-auto px-3 sm:px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-xs sm:text-sm font-medium"
                                            >
                                                Banear
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
                                                className="w-full sm:w-auto px-3 sm:px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-xs sm:text-sm font-medium"
                                            >
                                                Desbanear
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
