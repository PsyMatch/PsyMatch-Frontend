// Reviews service for managing user reviews
import { envs } from '@/config/envs.config';
import Cookies from 'js-cookie';

export interface ReviewResponse {
  id: string
  rating: number
  comment: string
  review_date: string
  userId: string
  psychologist: {
    id: string
    name: string
    phone: string
    birthdate: string
    dni: string
    email: string
    password: string
    profile_picture: string
    role: string
    is_active: boolean
    created_at: string
    last_login: string | null
    updated_at: string
    provider: string | null
    provider_id: string | null
    personal_biography: string
    languages: string[]
    professional_experience: number
    professional_title: string
    license_number: string
    verified: string
    office_address: string
    specialities: string[]
    therapy_approaches: string[]
    session_types: string[]
    modality: string
    insurance_accepted: string[]
    availability: string[]
    consultation_fee: number
  }
}

export interface UpdateReviewRequest {
  id: string
  rating: number
  comment: string
}

export interface UpdateReviewResponse {
  message: string
  review: ReviewResponse
}

class ReviewsService {
  private baseUrl = envs.next_public_api_url

  // Función para obtener el token de autenticación
  private getAuthToken(): string | null {
    return Cookies.get('authToken') || Cookies.get('auth_token') || null;
  }

  async getMyReviews(): Promise<ReviewResponse[]> {
    try {
      const token = this.getAuthToken();
      
      const response = await fetch(`${this.baseUrl}/reviews/my-reviews`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token && { "Authorization": `Bearer ${token}` }),
        },
      })

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Authentication failed")
        }
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error("Error fetching reviews:", error)
      throw error
    }
  }

  async updateReview(id: string, reviewData: { rating: number; comment: string }): Promise<UpdateReviewResponse> {
    try {
      const token = this.getAuthToken();
      
      const updateData: UpdateReviewRequest = {
        id,
        rating: reviewData.rating,
        comment: reviewData.comment
      };
      
      const response = await fetch(`${this.baseUrl}/reviews/update`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...(token && { "Authorization": `Bearer ${token}` }),
        },
        body: JSON.stringify(updateData),
      })

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Authentication failed")
        }
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error("Error updating review:", error)
      throw error
    }
  }

  async deleteReview(id: string): Promise<void> {
    try {
      const token = this.getAuthToken();
      
      const response = await fetch(`${this.baseUrl}/reviews/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...(token && { "Authorization": `Bearer ${token}` }),
        },
      })

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Authentication failed")
        }
        throw new Error(`HTTP error! status: ${response.status}`)
      }
    } catch (error) {
      console.error("Error deleting review:", error)
      throw error
    }
  }
}

export const reviewsService = new ReviewsService()
