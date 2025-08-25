import { useReviews } from './useReviews';
import { useCreateReview } from './useCreateReview';
import type { CreateReviewRequest } from '@/services/reviews';
import type { Review } from '@/types/review';

interface UseReviewsManagementProps {
    psychologistId: string;
}

interface UseReviewsManagementReturn {
    // Reviews data
    reviews: Review[];
    loading: boolean;
    error: string | null;
    refetchReviews: () => Promise<void>;

    // Create review
    createReview: (reviewData: CreateReviewRequest) => Promise<void>;
    isSubmitting: boolean;
    submitStatus: 'idle' | 'success' | 'error';
    submitError: string | null;
    resetStatus: () => void;
}

export const useReviewsManagement = ({ psychologistId }: UseReviewsManagementProps): UseReviewsManagementReturn => {
    const { reviews, loading, error, refetchReviews } = useReviews(psychologistId);

    const { createReview: createReviewAction, isSubmitting, submitStatus, error: submitError, resetStatus } = useCreateReview();

    const createReview = async (reviewData: CreateReviewRequest) => {
        await createReviewAction(reviewData);
        // Refrescar las reseñas después de crear una nueva
        if (submitStatus === 'success') {
            await refetchReviews();
        }
    };

    return {
        reviews,
        loading,
        error,
        refetchReviews,
        createReview,
        isSubmitting,
        submitStatus,
        submitError,
        resetStatus,
    };
};
