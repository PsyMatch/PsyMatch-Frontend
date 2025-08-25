import { useState } from 'react';
import { reviewsService, type CreateReviewRequest } from '@/services/reviews';

interface UseCreateReviewReturn {
    createReview: (reviewData: CreateReviewRequest) => Promise<void>;
    isSubmitting: boolean;
    submitStatus: 'idle' | 'success' | 'error';
    error: string | null;
    resetStatus: () => void;
}

export const useCreateReview = (): UseCreateReviewReturn => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [error, setError] = useState<string | null>(null);

    const createReview = async (reviewData: CreateReviewRequest) => {
        try {
            setIsSubmitting(true);
            setSubmitStatus('idle');
            setError(null);

            await reviewsService.createReview(reviewData);

            setSubmitStatus('success');
        } catch (err) {
            console.error('Error creating review:', err);
            setSubmitStatus('error');

            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Error al crear la reseña');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const resetStatus = () => {
        setSubmitStatus('idle');
        setError(null);
    };

    return {
        createReview,
        isSubmitting,
        submitStatus,
        error,
        resetStatus,
    };
};
