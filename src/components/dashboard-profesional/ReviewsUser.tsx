'use client';
import { useEffect, useState } from 'react';
import { reviewsService, type ReviewResponse } from '@/services/reviews';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Edit, Trash2 as _Trash2, Save, X } from 'lucide-react';
import { useNotifications } from '@/hooks/useNotifications';

type EditFormData = {
    rating: number;
    comment: string;
};

function ReviewsUser() {
    const [editingReview, setEditingReview] = useState<string | null>(null);
    const [editForm, setEditForm] = useState<EditFormData>({
        rating: 5,
        comment: '',
    });
    const [loading, setLoading] = useState(true);
    const [reviews, setReviews] = useState<ReviewResponse[]>([]);
    const notifications = useNotifications();

    useEffect(() => {
        const loadReviews = async () => {
            try {
                setLoading(true);
                const userReviews = await reviewsService.getMyReviews();
                setReviews(userReviews);
            } catch (error) {
                console.error('Error loading reviews:', error);

                const errorMessage = error instanceof Error ? error.message : 'Error desconocido';

                if (errorMessage.includes('Authentication failed') || errorMessage.includes('Token expired') || errorMessage.includes('401')) {
                    notifications.error('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.');
                    window.location.href = '/auth/login';
                } else if (errorMessage.includes('fetch')) {
                    // Error de conexión
                    notifications.error('No se pudo conectar al servidor. Verifica tu conexión a internet.');
                } else {
                    // Otros errores
                    notifications.error('Ocurrió un error al cargar las reseñas. Por favor, recarga la página.');
                }
            } finally {
                setLoading(false);
            }
        };

        loadReviews();
    }, [notifications]);

    const formatDate = (dateString: string): string => {
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('es-ES', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            });
        } catch (error) {
            console.error('Error formatting date:', error);
            return dateString;
        }
    };

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, index) => (
            <Star key={index} className={`w-4 h-4 ${index < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
        ));
    };

    const startEditing = (review: ReviewResponse) => {
        setEditingReview(review.id);
        setEditForm({
            rating: review.rating,
            comment: review.comment,
        });
    };

    const cancelEditing = () => {
        setEditingReview(null);
        setEditForm({ rating: 5, comment: '' });
    };

    const saveReview = async (reviewId: string) => {
        try {
            await reviewsService.updateReview(reviewId, editForm);

            setReviews((prev) =>
                prev.map((review) => (review.id === reviewId ? { ...review, rating: editForm.rating, comment: editForm.comment } : review))
            );

            setEditingReview(null);
            notifications.success('Reseña actualizada exitosamente.');
        } catch (error) {
            console.error('Error updating review:', error);

            const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
            if (errorMessage.includes('Authentication failed') || errorMessage.includes('401')) {
                notifications.error('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.');
                window.location.href = '/auth/login';
            } else {
                notifications.error('Ocurrió un error al actualizar la reseña. Intenta nuevamente.');
            }
        }
    };

    // const deleteReview = async (reviewId: string) => {
    //   if (!window.confirm("¿Estás seguro que deseas eliminar esta reseña? Esta acción no se puede deshacer.")) {
    //     return
    //   }

    //   try {
    //     await reviewsService.deleteReview(reviewId)

    //     setReviews((prev) => prev.filter((review) => review.id !== reviewId))
    //     alert("Reseña eliminada exitosamente.")
    //   } catch (error) {
    //     console.error("Error deleting review:", error)

    //     const errorMessage = error instanceof Error ? error.message : "Error desconocido"
    //     if (errorMessage.includes("Authentication failed") || errorMessage.includes("401")) {
    //       alert("Tu sesión ha expirado. Por favor, inicia sesión nuevamente.")
    //       window.location.href = "/auth/login"
    //     } else {
    //       alert("Ocurrió un error al eliminar la reseña. Intenta nuevamente.")
    //     }
    //   }
    // }

    if (loading) {
        return (
            <div className="flex flex-col gap-3 px-8 py-8 h-fit">
                <div>
                    <h1 className="text-xl font-semibold text-foreground">Mis Reseñas</h1>
                    <span className="text-muted-foreground">Cargando tus reseñas...</span>
                </div>
                <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-3 px-8 py-8 h-fit">
            <div>
                <h1 className="text-xl font-semibold text-foreground">Mis Reseñas</h1>
                <span className="text-muted-foreground">Aquí puedes ver y editar las reseñas que has realizado a los psicólogos</span>
            </div>

            <div>
                {reviews.length > 0 ? (
                    <div className="space-y-4">
                        {reviews.map((review) => (
                            <Card key={review.id} className="w-full">
                                <CardHeader className="pb-3">
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <CardTitle className="text-lg font-semibold">{review.psychologist.name}</CardTitle>
                                            <p className="text-sm text-muted-foreground mt-1">{review.psychologist.professional_title}</p>
                                            <p className="text-xs text-muted-foreground">{formatDate(review.review_date)}</p>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Badge variant="secondary" className="flex items-center gap-1">
                                                <div className="flex">
                                                    {renderStars(editingReview === review.id ? editForm.rating : review.rating)}
                                                </div>
                                                <span className="ml-1">{editingReview === review.id ? editForm.rating : review.rating}/5</span>
                                            </Badge>
                                        </div>
                                    </div>
                                </CardHeader>

                                <CardContent>
                                    {editingReview === review.id ? (
                                        <div className="space-y-4">
                                            {/* Rating selector */}
                                            <div>
                                                <label className="text-sm font-medium mb-2 block">Calificación:</label>
                                                <div className="flex gap-1">
                                                    {Array.from({ length: 5 }, (_, index) => (
                                                        <button
                                                            key={index}
                                                            onClick={() => setEditForm((prev) => ({ ...prev, rating: index + 1 }))}
                                                            className="p-1 hover:bg-muted rounded"
                                                        >
                                                            <Star
                                                                className={`w-6 h-6 ${
                                                                    index < editForm.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                                                                }`}
                                                            />
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Comment editor */}
                                            <div>
                                                <label className="text-sm font-medium mb-2 block">Comentario:</label>
                                                <textarea
                                                    value={editForm.comment}
                                                    onChange={(e) => setEditForm((prev) => ({ ...prev, comment: e.target.value }))}
                                                    className="w-full p-3 border border-input rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-ring placeholder:text-gray-400"
                                                    rows={4}
                                                    placeholder="Escribe tu comentario sobre la sesión..."
                                                />
                                            </div>

                                            {/* Action buttons */}
                                            <div className="flex gap-2 justify-end">
                                                <Button variant="outline" size="sm" onClick={cancelEditing}>
                                                    <X className="w-4 h-4 mr-1" />
                                                    Cancelar
                                                </Button>
                                                <Button size="sm" onClick={() => saveReview(review.id)}>
                                                    <Save className="w-4 h-4 mr-1" />
                                                    Guardar
                                                </Button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="space-y-3">
                                            <p className="text-foreground leading-relaxed">{review.comment}</p>

                                            {/* Psychologist info */}
                                            <div className="bg-muted/50 p-3 rounded-lg">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                                                    <div>
                                                        <span className="font-medium">Especialidades:</span>
                                                        <span className="ml-2 text-muted-foreground">
                                                            {review.psychologist.specialities.join(', ')}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <span className="font-medium">Modalidad:</span>
                                                        <span className="ml-2 text-muted-foreground">{review.psychologist.modality}</span>
                                                    </div>
                                                    <div>
                                                        <span className="font-medium">Experiencia:</span>
                                                        <span className="ml-2 text-muted-foreground">
                                                            {review.psychologist.professional_experience} años
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <span className="font-medium">Tarifa:</span>
                                                        <span className="ml-2 text-muted-foreground">
                                                            ${review.psychologist.consultation_fee.toLocaleString()}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex gap-2 justify-end pt-2">
                                                <Button variant="outline" size="sm" onClick={() => startEditing(review)}>
                                                    <Edit className="w-4 h-4 mr-1" />
                                                    Editar
                                                </Button>
                                                {/* <Button variant="destructive" size="sm" onClick={() => deleteReview(review.id)}>
                          <Trash2 className="w-4 h-4 mr-1" />
                          Eliminar
                        </Button> */}
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <p className="text-muted-foreground mb-4">No has realizado ninguna reseña aún</p>
                        <a href="/search-professionals">
                            <Button>Buscar Profesionales</Button>
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ReviewsUser;
