import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { appointmentsService } from '@/services/appointments';
import { reviewsService } from '@/services/reviews';

interface UseCanReviewReturn {
    canReview: boolean;
    loading: boolean;
    error: string | null;
    hasAlreadyReviewed: boolean;
    hasCompletedAppointments: boolean;
}

export const useCanReview = (psychologistId: string): UseCanReviewReturn => {
    const [canReview, setCanReview] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [hasAlreadyReviewed, setHasAlreadyReviewed] = useState(false);
    const [hasCompletedAppointments, setHasCompletedAppointments] = useState(false);
    const { user } = useAuth();

    useEffect(() => {
        const checkCanReview = async () => {
            try {
                setLoading(true);
                setError(null);

                if (!user) {
                    setCanReview(false);
                    setHasAlreadyReviewed(false);
                    setHasCompletedAppointments(false);
                    return;
                }

                // Verificar si el usuario tuvo al menos una cita completada con este psicólogo
                const hasCompleted = await appointmentsService.hasCompletedAppointmentsWith(psychologistId);
                setHasCompletedAppointments(hasCompleted);

                // Verificar si ya ha dejado una reseña para este psicólogo
                const alreadyReviewed = await reviewsService.hasUserReviewedPsychologist(psychologistId);
                setHasAlreadyReviewed(alreadyReviewed);

                // Puede crear reseña si tiene citas completadas Y no ha dejado reseña aún
                setCanReview(hasCompleted && !alreadyReviewed);
            } catch (err) {
                console.error('Error checking review eligibility:', err);
                setError('Error al verificar elegibilidad para reseñas');
                setCanReview(false);
                setHasAlreadyReviewed(false);
                setHasCompletedAppointments(false);
            } finally {
                setLoading(false);
            }
        };

        if (psychologistId) {
            checkCanReview();
        }
    }, [psychologistId, user]);

    return {
        canReview,
        loading,
        error,
        hasAlreadyReviewed,
        hasCompletedAppointments,
    };
};
