"use client";

import { useEffect, useState } from 'react';
import MenuNavegacionUser from "@/components/dashboard-profesional/MenuNavegacionUser";
import { MissingDataModal } from "@/components/MissingDataModal";
import { useAuth } from "@/hooks/useAuth";
import { UpdateUserData } from "@/services/users";
import { useNotifications } from '@/hooks/useNotifications';

const DashboardUser = () => {
    const { user, loading, checkMissingData, updateUserProfile, refetchUser } = useAuth();
    const [showMissingDataModal, setShowMissingDataModal] = useState(false);
    const [dataCompleted, setDataCompleted] = useState(false);
    const notifications = useNotifications();

    useEffect(() => {
        if (!loading && user && !dataCompleted) {
            const hasMissingData = checkMissingData();
            setShowMissingDataModal(hasMissingData);
        }
    }, [user, loading, checkMissingData, dataCompleted]);

    const handleSaveMissingData = async (data: UpdateUserData) => {
        try {
            await updateUserProfile(data);
            await refetchUser();
            setDataCompleted(true);
            setShowMissingDataModal(false);
            notifications.success('¡Perfil completado exitosamente! Ahora puedes usar la aplicación.');
        } catch (error) {
            console.error('Error al actualizar perfil:', error);
            throw error;
        }
    };

    if (loading) {
        return (
           <div className="w-full flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 text-sm sm:text-base">Cargando tu dashboard...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="w-full flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
                <div className="text-center max-w-md">
                    <h2 className="text-lg sm:text-xl font-semibold text-red-600 mb-2">Error de autenticación</h2>
                    <p className="text-gray-600 text-sm sm:text-base">No se pudo cargar tu información. Por favor, inicia sesión nuevamente.</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="w-full flex justify-center pt-4 md:pt-10 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
                <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 mb-8">
                    <div className="mb-6">
                        <h1 className="text-xl sm:text-2xl md:text-[26px] font-semibold text-black mb-2">
                            Perfil Usuario
                        </h1>
                        <span className="text-sm sm:text-base text-gray-700 block sm:inline">
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
