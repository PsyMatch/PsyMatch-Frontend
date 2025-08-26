import React from 'react';
import { toast } from 'react-toastify';

/**
 * Muestra un toast con botones de Confirmar/Cancelar y retorna una Promise<boolean>
 * que se resuelve según la elección del usuario.
 */
export const showConfirm = (message: string): Promise<boolean> => {
    return new Promise<boolean>((resolve) => {
        let toastId: React.ReactText | null = null;

        const handleConfirm = () => {
            if (toastId !== null) toast.dismiss(toastId);
            resolve(true);
        };

        const handleCancel = () => {
            if (toastId !== null) toast.dismiss(toastId);
            resolve(false);
        };

        const Content = () => (
            <div className="flex flex-col gap-2">
                <div className="text-sm">{message}</div>
                <div className="flex gap-2 mt-2">
                    <button onClick={handleConfirm} className="px-3 py-1 bg-red-600 text-white rounded text-sm">
                        Confirmar
                    </button>
                    <button onClick={handleCancel} className="px-3 py-1 bg-gray-200 text-gray-800 rounded text-sm">
                        Cancelar
                    </button>
                </div>
            </div>
        );

        toastId = toast.info(<Content />, {
            position: 'top-right',
            autoClose: false,
            closeOnClick: false,
            closeButton: false,
            draggable: true,
        });
    });
};

export default showConfirm;
