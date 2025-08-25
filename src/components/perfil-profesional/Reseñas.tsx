'use client';

import type { IProfessional } from '@/services/prrofessionalProfile';
import { useReviews } from '@/hooks/useReviews';
import type { Review } from '@/types/review';
import { useMemo, useState } from 'react';
import { Star, User } from 'lucide-react';

interface ReviewCardProps {
    review: Review;
    index: number;
}

const ReviewCard = ({ review, index }: ReviewCardProps) => {
    const reviewDate = new Date(review.review_date);

    return (
        <article
            className="w-full p-4 bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-xl shadow-sm"
            aria-label={`Reseña ${index + 1} con ${review.rating} estrellas`}
        >
            <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-blue-600" aria-hidden="true" />
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <h4 className="font-semibold text-gray-900">Usuario anónimo</h4>
                        <time className="text-sm text-gray-500 flex-shrink-0" dateTime={reviewDate.toISOString()}>
                            {reviewDate.toLocaleDateString('es-ES', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                            })}
                        </time>
                    </div>

                    <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center" role="img" aria-label={`${review.rating} de 5 estrellas`}>
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={`w-4 h-4 ${i < review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
                                    aria-hidden="true"
                                />
                            ))}
                        </div>
                        <span className="text-sm font-medium text-gray-600">({review.rating}/5)</span>
                    </div>
                </div>
            </div>

            <blockquote className="mt-4 text-gray-700 leading-relaxed">&ldquo;{review.comment}&rdquo;</blockquote>
        </article>
    );
};

const Reseñas = ({ data }: { data: IProfessional }) => {
    const { reviews, loading, error } = useReviews(data.id);
    const [showAllReviews, setShowAllReviews] = useState(false);

    const averageRating = useMemo(() => {
        if (reviews.length === 0) return 0;
        const sum = reviews.reduce((acc: number, review: Review) => acc + review.rating, 0);
        return (sum / reviews.length).toFixed(1);
    }, [reviews]);

    const reviewsToShow = showAllReviews ? reviews : reviews.slice(0, 2);
    const hasMoreReviews = reviews.length > 2;

    if (loading) {
        return (
            <section className="w-full p-8 mb-10 bg-white border border-gray-200 rounded-xl shadow-sm">
                <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                        <Star className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Cargando reseñas...</h3>
                    <p className="text-gray-600">Por favor espera mientras cargamos las reseñas.</p>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="w-full p-8 mb-10 bg-white border border-gray-200 rounded-xl shadow-sm">
                <div className="text-center py-8">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Star className="w-8 h-8 text-red-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Error al cargar reseñas</h3>
                    <p className="text-gray-600">{error}</p>
                </div>
            </section>
        );
    }

    if (reviews.length === 0) {
        return (
            <section className="w-full p-8 mb-10 bg-white border border-gray-200 rounded-xl shadow-sm">
                <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Star className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Sin reseñas aún</h3>
                    <p className="text-gray-600">Este profesional aún no tiene reseñas de pacientes.</p>
                </div>
            </section>
        );
    }

    return (
        <section className="w-full p-6 sm:p-8 mb-10 bg-white border border-gray-200 rounded-xl shadow-sm" aria-labelledby="reviews-heading">
            <header className="mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                        <h3 id="reviews-heading" className="text-xl font-bold text-gray-900">
                            Reseñas de Pacientes
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">Todas las reseñas son verificadas y analizadas.</p>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                        <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="ml-1 font-semibold text-gray-900">{averageRating}</span>
                        </div>
                        <span className="text-gray-500">
                            ({reviews.length} {reviews.length === 1 ? 'reseña' : 'reseñas'})
                        </span>
                    </div>
                </div>
            </header>

            <div className="space-y-4">
                {reviewsToShow.map((review: Review, index: number) => (
                    <ReviewCard key={review.id} review={review} index={index} />
                ))}
            </div>

            {hasMoreReviews && !showAllReviews && (
                <div className="mt-6 text-center">
                    <button
                        onClick={() => setShowAllReviews(true)}
                        className="px-6 py-3 bg-black text-white font-medium rounded-lg hover:bg-neutral-900 transition-colors duration-200"
                    >
                        Mostrar más
                    </button>
                </div>
            )}

            {showAllReviews && hasMoreReviews && (
                <div className="mt-6 text-center">
                    <button
                        onClick={() => setShowAllReviews(false)}
                        className="px-6 py-3 bg-black text-white font-medium rounded-lg hover:bg-neutral-900 transition-colors duration-200"
                    >
                        Mostrar menos
                    </button>
                </div>
            )}
        </section>
    );
};

export default Reseñas;
