"use client";

import { useEffect, useState } from 'react';
import MenuNavegacionUser from "@/components/dashboard-profesional/MenuNavegacionUser";
import { MissingDataModal } from "@/components/MissingDataModal";
import { useAuth } from "@/hooks/useAuth";
import { UpdateUserData } from "@/services/users";
import { toast } from 'react-toastify';

const DashboardUser = () => {
    const { user, loading, checkMissingData, updateUserProfile, refetchUser } = useAuth();
    const [showMissingDataModal, setShowMissingDataModal] = useState(false);
    const [dataCompleted, setDataCompleted] = useState(false); // Nuevo estado para controlar la completitud

    useEffect(() => {
        if (!loading && user && !dataCompleted) {
            // Verificar si faltan datos obligatorios
            const hasMissingData = checkMissingData();
            console.log('Dashboard - Verificando datos faltantes:', {
                hasMissingData,
                dataCompleted,
                user: {
                    alias: user.alias,
                    phone: user.phone,
                    birthdate: user.birthdate,
                    address: user.address,
                    emergency_contact: user.emergency_contact,
                    health_insurance: user.health_insurance
                }
            });
            setShowMissingDataModal(hasMissingData);
        }
    }, [user, loading, checkMissingData, dataCompleted]);

    const handleSaveMissingData = async (data: UpdateUserData) => {
        try {
            await updateUserProfile(data);
            
            // Refrescar los datos del usuario desde el backend
            await refetchUser();
            
            // Marcar como completado y cerrar modal
            setDataCompleted(true);
            setShowMissingDataModal(false);
            
            toast.success('¡Perfil completado exitosamente! Ahora puedes usar la aplicación.');
        } catch (error) {
            console.error('Error al actualizar perfil:', error);
            throw error; // Re-lanzar el error para que el modal lo maneje
        }
    };

    if (loading) {
        return (
            <div className="w-full flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Cargando tu dashboard...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="w-full flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
                <div className="text-center">
                    <h2 className="text-xl font-semibold text-red-600 mb-2">Error de autenticación</h2>
                    <p className="text-gray-600">No se pudo cargar tu información. Por favor, inicia sesión nuevamente.</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="w-[100%] flex justify-center pt-10 bg-gradient-to-br from-blue-50 to-indigo-100">
                <div className="w-[90%] mb-8">
                    <div>
                        <h1 className="text-[26px] font-semibold text-black">
                            Perfil Usuario
                        </h1>
                        <span className="text-black">
                            Bienvenido/a de vuelta, {user.name || user.email}
                        </span>
                    </div>
                    <MenuNavegacionUser />
                </div>
            </div>

            {/* Modal para datos faltantes */}
            <MissingDataModal
                open={showMissingDataModal}
                onSave={handleSaveMissingData}
                onClose={() => {
                    setDataCompleted(true);
                    setShowMissingDataModal(false);
                }}
            />
        </>
    );
};

export default DashboardUser;
