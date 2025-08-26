import { envs } from '@/config/envs.config';
import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
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
    const searchParams = useSearchParams();
    const router = useRouter();
    const [reseñas, setReseñas] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const filtroInicial = (searchParams?.get('filter') as 'todas' | 'mas-valoradas' | 'menos-valoradas') || 'todas';
    const [filtroActivo, setFiltroActivo] = useState<'todas' | 'mas-valoradas' | 'menos-valoradas'>(filtroInicial);

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

    // Sincronizar filtro con URL cuando cambien los searchParams
    useEffect(() => {
        const filter = searchParams?.get('filter') as 'todas' | 'mas-valoradas' | 'menos-valoradas';
        if (filter && filter !== filtroActivo) {
            setFiltroActivo(filter);
        }
    }, [searchParams, filtroActivo]);

    // Función para cambiar filtro y actualizar URL
    const cambiarFiltro = (nuevoFiltro: 'todas' | 'mas-valoradas' | 'menos-valoradas') => {
        setFiltroActivo(nuevoFiltro);
        // Preservar el parámetro tab si existe
        const currentTab = searchParams?.get('tab');
        const newSearchParams = new URLSearchParams();
        if (currentTab) newSearchParams.set('tab', currentTab);
        newSearchParams.set('filter', nuevoFiltro);
        router.replace(`?${newSearchParams.toString()}`, { scroll: false });
    };

    // Función para filtrar reseñas según la valoración
    const filtrarReseñas = (reseñas: Review[]) => {
        let reseñasFiltradas = [...reseñas];

        // Aplicar filtro
        if (filtroActivo !== 'todas') {
            reseñasFiltradas = reseñasFiltradas.filter((reseña) => {
                switch (filtroActivo) {
                    case 'mas-valoradas':
                        return reseña.rating >= 4; // 4-5 estrellas
                    case 'menos-valoradas':
                        return reseña.rating <= 3; // 1-3 estrellas
                    default:
                        return true;
                }
            });
        }

        // Ordenar según el filtro activo
        if (filtroActivo === 'mas-valoradas') {
            reseñasFiltradas.sort((a, b) => b.rating - a.rating); // Mayor a menor
        } else if (filtroActivo === 'menos-valoradas') {
            reseñasFiltradas.sort((a, b) => a.rating - b.rating); // Menor a mayor
        }

        return reseñasFiltradas;
    };

    const reseñasFiltradas = filtrarReseñas(reseñas);

    // Calcular contadores para los filtros
    const contadores = {
        todas: reseñas.length,
        masValoradas: reseñas.filter((reseña) => reseña.rating >= 4).length,
        menosValoradas: reseñas.filter((reseña) => reseña.rating <= 3).length,
    };

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
                    {reseñasFiltradas.length} de {reseñas.length} reseñas
                </div>
            </div>

            {/* Filtros */}
            <div className="flex flex-wrap gap-2 mb-6">
                <button
                    onClick={() => cambiarFiltro('todas')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                        filtroActivo === 'todas'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                >
                    <span>Todas ({contadores.todas})</span>
                </button>
                <button
                    onClick={() => cambiarFiltro('mas-valoradas')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                        filtroActivo === 'mas-valoradas'
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                    title="Reseñas con 4 y 5 estrellas"
                >
                    <div className="flex">
                        <span className="text-yellow-400">⭐⭐</span>
                    </div>
                    <span>Más Valoradas ({contadores.masValoradas})</span>
                </button>
                <button
                    onClick={() => cambiarFiltro('menos-valoradas')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                        filtroActivo === 'menos-valoradas'
                            ? 'bg-orange-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                    title="Reseñas con 1, 2 y 3 estrellas"
                >
                    <div className="flex">
                        <span className="text-yellow-400">⭐</span>
                    </div>
                    <span>Menos Valoradas ({contadores.menosValoradas})</span>
                </button>
            </div>
            
            {reseñasFiltradas.length === 0 ? (
                <div className="flex-1 flex items-center justify-center">
                    <div className="bg-gradient-to-r from-[#5046E7]/10 to-[#6366F1]/10 border border-[#5046E7]/20 rounded-lg p-8 text-center w-full max-w-2xl">
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-16 h-16 bg-[#5046E7]/20 rounded-full flex items-center justify-center">
                                <span className="text-2xl">💬</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-700">
                                {filtroActivo === 'todas' 
                                    ? 'No hay reseñas disponibles'
                                    : filtroActivo === 'mas-valoradas'
                                    ? 'No hay reseñas con 4 o 5 estrellas'
                                    : 'No hay reseñas con 3 estrellas o menos'
                                }
                            </h3>
                            <p className="text-gray-500 max-w-md">
                                {filtroActivo === 'todas' 
                                    ? 'Aún no hay reseñas de pacientes en el sistema. Las reseñas aparecerán aquí cuando los pacientes las envíen.'
                                    : `No se encontraron reseñas con la valoración "${filtroActivo}".`
                                }
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {reseñasFiltradas.map((reseña) => (
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
