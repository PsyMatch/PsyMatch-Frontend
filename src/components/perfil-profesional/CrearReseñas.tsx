'use client';

import type React from 'react';

import { useState } from 'react';
import { Star, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCreateReview } from '@/hooks/useCreateReview';
import { useCanReview } from '@/hooks/useCanReview';

interface CrearReseñasProps {
    psychologistId: string;
    psychologistName: string;
    onReviewCreated?: () => void;
}

interface ReviewFormData {
    rating: number;
    comment: string;
}

const CrearReseñas = ({ psychologistId, psychologistName, onReviewCreated }: CrearReseñasProps) => {
    const [formData, setFormData] = useState<ReviewFormData>({
        rating: 0,
        comment: '',
    });
    const [hoveredRating, setHoveredRating] = useState(0);
    const [errors, setErrors] = useState<Partial<ReviewFormData>>({});

    const { createReview, isSubmitting, submitStatus, error: submitError, resetStatus } = useCreateReview();
    const {
        canReview,
        loading: canReviewLoading,
        error: canReviewError,
        hasAlreadyReviewed,
        hasCompletedAppointments,
    } = useCanReview(psychologistId);

    const validateForm = (): boolean => {
        const newErrors: Partial<ReviewFormData> = {};

        if (formData.rating === 0) {
            newErrors.rating = 0;
        }

        if (!formData.comment.trim()) {
            newErrors.comment = 'El comentario es requerido';
        } else if (formData.comment.trim().length < 10) {
            newErrors.comment = 'El comentario debe tener al menos 10 caracteres';
        } else if (formData.comment.trim().length > 500) {
            newErrors.comment = 'El comentario no puede exceder 500 caracteres';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleRatingClick = (rating: number) => {
        setFormData((prev) => ({ ...prev, rating }));
        if (errors.rating !== undefined) {
            setErrors((prev) => ({ ...prev, rating: undefined }));
        }
    };

    const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const comment = e.target.value;
        setFormData((prev) => ({ ...prev, comment }));

        if (errors.comment && comment.trim().length >= 10) {
            setErrors((prev) => ({ ...prev, comment: undefined }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            await createReview({
                psychologistId,
                rating: formData.rating,
                comment: formData.comment.trim(),
            });

            // Limpiar el formulario tras el éxito
            setFormData({ rating: 0, comment: '' });
            onReviewCreated?.();
        } catch (error) {
            // El error se maneja en el hook
            console.error('Error creating review:', error);
        }
    };

    const resetForm = () => {
        setFormData({ rating: 0, comment: '' });
        setErrors({});
        resetStatus();
    };

    if (canReviewLoading) {
        return (
            <section className="w-full p-6 sm:p-8 mb-10 bg-white border border-gray-200 rounded-xl shadow-sm">
                <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                        <AlertCircle className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Verificando elegibilidad...</h3>
                    <p className="text-gray-600">Verificando si puedes escribir una reseña.</p>
                </div>
            </section>
        );
    }

    if (submitStatus === 'success') {
        return (
            <section className="w-full p-6 sm:p-8 mb-10 bg-white border border-gray-200 rounded-xl shadow-sm">
                <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">¡Reseña enviada!</h3>
                    <p className="text-gray-600 mb-4">Tu reseña ha sido enviada correctamente.</p>
                </div>
            </section>
        );
    }

    if (!canReview || canReviewError) {
        // Determinar el mensaje específico según el motivo
        let title = 'No se puede enviar la reseña';
        let message = '';

        if (canReviewError) {
            message = canReviewError;
        } else if (hasAlreadyReviewed) {
            title = 'Ya has dejado una reseña';
            message = 'Ya has enviado una reseña para este psicólogo. Solo puedes dejar una reseña por profesional.';
        } else if (!hasCompletedAppointments) {
            message = 'No puedes enviar una reseña porque no has tenido sesiones completadas con este psicólogo aún.';
        } else {
            message = 'No puedes enviar una reseña en este momento.';
        }

        return (
            <section className="w-full p-6 sm:p-8 mb-10 bg-white border border-gray-200 rounded-xl shadow-sm">
                <div className="text-center py-8">
                    <div
                        className={`w-16 h-16 ${
                            hasAlreadyReviewed ? 'bg-blue-100' : 'bg-red-100'
                        } rounded-full flex items-center justify-center mx-auto mb-4`}
                    >
                        {hasAlreadyReviewed ? <CheckCircle className="w-8 h-8 text-blue-600" /> : <AlertCircle className="w-8 h-8 text-red-600" />}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
                    <p className="text-gray-600 mb-4">{message}</p>
                </div>
            </section>
        );
    }

    return (
        <section className="w-full p-6 sm:p-8 mb-10 bg-white border border-gray-200 rounded-xl shadow-sm" aria-labelledby="create-review-heading">
            <header className="mb-6">
                <h3 id="create-review-heading" className="text-xl font-bold text-gray-900">
                    Escribir una reseña
                </h3>
                <p className="text-sm text-gray-600 mt-1">Comparte tu experiencia con {psychologistName}</p>
            </header>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Rating Section */}
                <div>
                    <label className="block text-sm font-medium text-gray-900 mb-3">Calificación *</label>
                    <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                onClick={() => handleRatingClick(star)}
                                onMouseEnter={() => setHoveredRating(star)}
                                onMouseLeave={() => setHoveredRating(0)}
                                className="p-1 rounded-md hover:bg-gray-100 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                                aria-label={`Calificar con ${star} estrella${star !== 1 ? 's' : ''}`}
                            >
                                <Star
                                    className={`w-8 h-8 transition-colors duration-150 ${
                                        star <= (hoveredRating || formData.rating)
                                            ? 'text-yellow-500 fill-current'
                                            : 'text-gray-300 hover:text-yellow-400'
                                    }`}
                                />
                            </button>
                        ))}
                        {formData.rating > 0 && <span className="ml-3 text-sm font-medium text-gray-600">({formData.rating}/5)</span>}
                    </div>
                    {errors.rating !== undefined && (
                        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            Por favor selecciona una calificación
                        </p>
                    )}
                </div>

                {/* Comment Section */}
                <div>
                    <label htmlFor="comment" className="block text-sm font-medium text-gray-900 mb-3">
                        Comentario *
                    </label>
                    <textarea
                        id="comment"
                        value={formData.comment}
                        onChange={handleCommentChange}
                        placeholder="Describe tu experiencia con este profesional..."
                        rows={4}
                        maxLength={500}
                        className={`w-full px-4 py-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 placeholder:text-gray-400 ${
                            errors.comment ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                        }`}
                        aria-describedby={errors.comment ? 'comment-error' : 'comment-help'}
                    />
                    <div className="flex justify-between items-center mt-2">
                        <div>
                            {errors.comment && (
                                <p id="comment-error" className="text-sm text-red-600 flex items-center gap-1">
                                    <AlertCircle className="w-4 h-4" />
                                    {errors.comment}
                                </p>
                            )}
                            {!errors.comment && (
                                <p id="comment-help" className="text-sm text-gray-500">
                                    Mínimo 10 caracteres
                                </p>
                            )}
                        </div>
                        <span className={`text-sm ${formData.comment.length > 450 ? 'text-red-600' : 'text-gray-500'}`}>
                            {formData.comment.length}/500
                        </span>
                    </div>
                </div>

                {/* Submit Section */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                Enviando...
                            </>
                        ) : (
                            <>
                                <Send className="w-4 h-4 mr-2" />
                                Enviar reseña
                            </>
                        )}
                    </Button>

                    {(formData.rating > 0 || formData.comment.trim()) && (
                        <Button
                            type="button"
                            variant="outline"
                            onClick={resetForm}
                            disabled={isSubmitting}
                            className="hover:bg-gray-50 transition-colors duration-200 bg-transparent"
                        >
                            Limpiar
                        </Button>
                    )}
                </div>

                {submitStatus === 'error' && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-sm text-red-700 flex items-center gap-2">
                            <AlertCircle className="w-4 h-4" />
                            {submitError || 'Hubo un error al enviar tu reseña. Por favor, inténtalo de nuevo.'}
                        </p>
                    </div>
                )}
            </form>
        </section>
    );
};

export default CrearReseñas;
