import { toast } from 'react-toastify';
import { useCallback, useMemo } from 'react';

export const useNotifications = () => {
    const success = useCallback((message: string) => {
        toast.success(message, {
            position: 'top-right',
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            closeButton: true,
        });
    }, []);

    const error = useCallback((message: string) => {
        toast.error(message, {
            position: 'top-right',
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            closeButton: true,
        });
    }, []);

    const warning = useCallback((message: string) => {
        toast.warning(message, {
            position: 'top-right',
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            closeButton: true,
        });
    }, []);

    const info = useCallback((message: string) => {
        toast.info(message, {
            position: 'top-right',
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            closeButton: true,
        });
    }, []);

    // Devolver un objeto memoizado para mantener la referencia estable
    return useMemo(
        () => ({
            success,
            error,
            warning,
            info,
        }),
        [success, error, warning, info]
    );
};
