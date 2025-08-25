// Reviews service for managing user reviews
import { envs } from '@/config/envs.config';
import Cookies from 'js-cookie';

export interface ReviewResponse {
    id: string;
    rating: number;
    comment: string;
    review_date: string;
    userId: string;
    psychologist: {
        id: string;
        name: string;
        phone: string;
        birthdate: string;
        dni: string;
        email: string;
        password: string;
        profile_picture: string;
        role: string;
        is_active: boolean;
        created_at: string;
        last_login: string | null;
        updated_at: string;
        provider: string | null;
        provider_id: string | null;
        personal_biography: string;
        languages: string[];
        professional_experience: number;
        professional_title: string;
        license_number: string;
        verified: string;
        office_address: string;
        specialities: string[];
        therapy_approaches: string[];
        session_types: string[];
        modality: string;
        insurance_accepted: string[];
        availability: string[];
        consultation_fee: number;
    };
}

export interface UpdateReviewRequest {
    id: string;
    rating: number;
    comment: string;
}

export interface UpdateReviewResponse {
    message: string;
    review: ReviewResponse;
}

export interface CreateReviewRequest {
    psychologistId: string;
    rating: number;
    comment: string;
}

export interface CreateReviewResponse {
    message: string;
    review: {
        id: string;
        rating: number;
        comment: string;
        psychologistId: string;
        userId: string;
        review_date: string;
    };
}

export interface PsychologistReviewsResponse {
    message: string;
    reviews: {
        id: string;
        name: string;
        phone: string;
        birthdate: string;
        dni: string;
        email: string;
        password: string;
        profile_picture: string;
        role: string;
        is_active: boolean;
        created_at: string;
        last_login: string | null;
        updated_at: string;
        provider: string | null;
        provider_id: string | null;
        personal_biography: string;
        languages: string[];
        professional_experience: number;
        professional_title: string;
        license_number: string;
        verified: string;
        office_address: string;
        specialities: string[];
        therapy_approaches: string[];
        session_types: string[];
        modality: string;
        insurance_accepted: string[];
        availability: string[];
        consultation_fee: number;
        reviews: {
            id: string;
            rating: number;
            comment: string;
            review_date: string;
            userId: string;
        }[];
    };
}

class ReviewsService {
    private baseUrl = envs.next_public_api_url;

    // Función para obtener el token de autenticación
    private getAuthToken(): string | null {
        return Cookies.get('authToken') || Cookies.get('auth_token') || null;
    }

    async getMyReviews(): Promise<ReviewResponse[]> {
        try {
            const token = this.getAuthToken();

            const response = await fetch(`${this.baseUrl}/reviews/my-reviews`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token && { Authorization: `Bearer ${token}` }),
                },
            });

            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error('Authentication failed');
                }
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching reviews:', error);
            throw error;
        }
    }

    async createReview(reviewData: CreateReviewRequest): Promise<CreateReviewResponse> {
        try {
            const token = this.getAuthToken();

            if (!token) {
                throw new Error('Authentication required');
            }

            const response = await fetch(`${this.baseUrl}/reviews`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(reviewData),
            });

            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error('Authentication failed');
                }
                if (response.status === 400) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Bad request');
                }
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error creating review:', error);
            throw error;
        }
    }

    async updateReview(id: string, reviewData: { rating: number; comment: string }): Promise<UpdateReviewResponse> {
        try {
            const token = this.getAuthToken();

            const updateData: UpdateReviewRequest = {
                id,
                rating: reviewData.rating,
                comment: reviewData.comment,
            };

            const response = await fetch(`${this.baseUrl}/reviews/update`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token && { Authorization: `Bearer ${token}` }),
                },
                body: JSON.stringify(updateData),
            });

            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error('Authentication failed');
                }
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error updating review:', error);
            throw error;
        }
    }

    async deleteReview(id: string): Promise<void> {
        try {
            const token = this.getAuthToken();

            const response = await fetch(`${this.baseUrl}/reviews/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token && { Authorization: `Bearer ${token}` }),
                },
            });

            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error('Authentication failed');
                }
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error deleting review:', error);
            throw error;
        }
    }

    async getPsychologistReviews(psychologistId: string): Promise<PsychologistReviewsResponse> {
        try {
            const token = this.getAuthToken();

            const response = await fetch(`${this.baseUrl}/reviews/${psychologistId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token && { Authorization: `Bearer ${token}` }),
                },
            });

            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error('Authentication failed');
                }
                if (response.status === 404) {
                    throw new Error('No reviews found for this psychologist');
                }
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching psychologist reviews:', error);
            throw error;
        }
    }

    async hasUserReviewedPsychologist(psychologistId: string): Promise<boolean> {
        try {
            const token = this.getAuthToken();

            if (!token) {
                return false;
            }

            const myReviews = await this.getMyReviews();

            // Verificar si ya existe una reseña para este psicólogo
            const hasReviewed = myReviews.some((review) => review.psychologist.id === psychologistId);

            return hasReviewed;
        } catch (error) {
            console.error('Error checking if user has reviewed psychologist:', error);
            return false;
        }
    }
}

export const reviewsService = new ReviewsService();
