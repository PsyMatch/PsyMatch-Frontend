import { envs } from '@/config/envs.config';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

interface Review {
    id: string;
    comment: string;
    rating: number;
    psychologist?: {
        name: string;
        id: string;
    };
    patient?: {
        name: string;
        id: string;
    };
}

const ReseñasAdmin = () => {
    const [reseñas, setReseñas] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const token = localStorage.getItem('authToken') || Cookies.get('authToken') || Cookies.get('auth_token');
                const response = await fetch(`${envs.next_public_api_url}/admin/dashboard/reviews`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                
                if (!response.ok) {
                    throw new Error('Error al cargar las reseñas');
                }
                
                const result = await response.json();
                setReseñas(result.reviews || []);
            } catch (error) {
                console.error('Error fetching reviews:', error);
                setError('Error al cargar las reseñas');
            } finally {
                setLoading(false);
            }
        };
        
        fetchReviews();
    }, []);

    if (loading) {
        return (
            <div className="w-full min-h-[500px] flex items-center justify-center">
                <span className="text-xl font-semibold text-[#5046E7]">Cargando reseñas...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full min-h-[500px] flex items-center justify-center">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className="w-full min-h-[500px] flex flex-col">
            <div className="flex items-center gap-3 mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Gestión de Reseñas</h2>
                <div className="ml-auto bg-[#5046E7]/10 text-[#5046E7] px-3 py-1 rounded-full text-sm font-semibold">
                    {reseñas.length} reseñas
                </div>
            </div>
            
            {reseñas.length === 0 ? (
                <div className="flex-1 flex items-center justify-center">
                    <div className="bg-gradient-to-r from-[#5046E7]/10 to-[#6366F1]/10 border border-[#5046E7]/20 rounded-lg p-8 text-center w-full max-w-2xl">
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-16 h-16 bg-[#5046E7]/20 rounded-full flex items-center justify-center">
                                <span className="text-2xl">💬</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-700">No hay reseñas disponibles</h3>
                            <p className="text-gray-500 max-w-md">
                                Aún no hay reseñas de pacientes en el sistema. Las reseñas aparecerán aquí cuando los pacientes las envíen.
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {reseñas.map((reseña) => (
                        <div key={reseña.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                            <div className="flex items-start gap-3">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="font-medium text-gray-700">
                                            {reseña.patient?.name || 'Paciente'}
                                        </span>
                                        <div className="flex text-yellow-400">
                                            <span className="text-sm font-medium">{reseña.rating}/5</span>
                                        </div>
                                    </div>
                                    <p className="text-gray-600 text-sm mb-2">{reseña.comment}</p>
                                    <div className="text-xs text-gray-400 space-y-1">
                                        <p><strong>Psicólogo:</strong> {reseña.psychologist?.name || 'No especificado'}</p>
                                        <p><strong>Calificación:</strong> {reseña.rating}/5</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ReseñasAdmin;
