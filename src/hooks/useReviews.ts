import { useState, useEffect, useCallback } from 'react';
import { reviewsService } from '@/services/reviews';
import type { Review } from '@/types/review';

interface UseReviewsReturn {
    reviews: Review[];
    loading: boolean;
    error: string | null;
    refetchReviews: () => Promise<void>;
}

export const useReviews = (psychologistId: string): UseReviewsReturn => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchReviews = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await reviewsService.getPsychologistReviews(psychologistId);
            setReviews(response.reviews.reviews || []);
        } catch (err) {
            console.error('Error fetching reviews:', err);
            if (err instanceof Error && err.message === 'No reviews found for this psychologist') {
                setReviews([]);
            } else {
                setError('Error al cargar las reseñas');
            }
        } finally {
            setLoading(false);
        }
    }, [psychologistId]);

    useEffect(() => {
        if (psychologistId) {
            fetchReviews();
        }
    }, [psychologistId, fetchReviews]);

    return {
        reviews,
        loading,
        error,
        refetchReviews: fetchReviews,
    };
};
