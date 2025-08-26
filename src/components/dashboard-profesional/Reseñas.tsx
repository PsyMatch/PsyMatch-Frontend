'use client';
import { envs } from '@/config/envs.config';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useSearchParams, useRouter } from 'next/navigation';

const Reseñas = () => {
    interface Review {
        review_date?: string;
        comment?: string;
        rating?: number;
        [key: string]: unknown;
    }

    const [reseñas, setReseñas] = useState<Review[]>([]);
    const [userId, setUserId] = useState<string | null>(null);
    const [loader, setLoader] = useState<boolean>(true);
    
    // Estados para filtros
    const searchParams = useSearchParams();
    const router = useRouter();
    const filtroInicial = searchParams?.get('filtro') || 'todas';
    const [filtroActivo, setFiltroActivo] = useState<string>(filtroInicial);

    // Función para cambiar filtro y actualizar URL
    const cambiarFiltro = (nuevoFiltro: string) => {
        setFiltroActivo(nuevoFiltro);
        const params = new URLSearchParams(searchParams?.toString() || '');
        params.set('filtro', nuevoFiltro);
        router.push(`?${params.toString()}`);
    };

    // Función para filtrar reseñas por rating
    const filtrarReseñas = (reseñas: Review[], filtro: string) => {
        switch (filtro) {
            case 'altas':
                return reseñas.filter(reseña => (reseña.rating || 0) >= 4);
            case 'bajas':
                return reseñas.filter(reseña => (reseña.rating || 0) <= 3);
            default:
                return reseñas;
        }
    };

    // Aplicar filtros
    const reseñasFiltradas = filtrarReseñas(reseñas, filtroActivo);

    // Calcular contadores
    const contadores = {
        todas: reseñas.length,
        altas: reseñas.filter(reseña => (reseña.rating || 0) >= 4).length,
        bajas: reseñas.filter(reseña => (reseña.rating || 0) <= 3).length,
    };

    // Efecto para sincronizar con URL
    useEffect(() => {
        setFiltroActivo(filtroInicial);
    }, [filtroInicial]);

    useEffect(() => {
        const token = Cookies.get('auth_token');
        if (!token) return;

        fetch(`${envs.next_public_api_url}/psychologist/me`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => res.json())
            .then((response) => {
                if (response?.data?.id) setUserId(String(response.data.id));
            })
            .catch((e) => console.error(e));
    }, []);

    useEffect(() => {
        if (!userId) return;
        const token = Cookies.get('auth_token');
        if (!token) return;

        fetch(`${envs.next_public_api_url}/reviews/${userId}`, {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => res.json())
            .then((response) => {
                const reviews = response?.reviews?.reviews || [];
                setReseñas(Array.isArray(reviews) ? reviews : []);
                setLoader(false);
            })
            .catch((e) => {
                console.error(e);
                setLoader(false);
            });
    }, [userId]);

    return (
        <div className="flex flex-col gap-3 px-8 py-8 h-fit">
            <div>
                <h1 className="text-xl font-semibold text-black">Reseñas sobre vos</h1>
                {loader === true ? (
                    <span className="text-black">Cargando reseñas...</span>
                ) : (
                    <span className="text-black">Análisis de desempeño y temas de tus reseñas</span>
                )}
            </div>

            {/* Filtros de reseñas */}
            {!loader && (
                <div className="flex flex-wrap gap-2 mb-4">
                    <button
                        onClick={() => cambiarFiltro('todas')}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                            filtroActivo === 'todas'
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                    >
                        Todas ({contadores.todas})
                    </button>
                    <button
                        onClick={() => cambiarFiltro('altas')}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                            filtroActivo === 'altas'
                                ? 'bg-green-500 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                    >
                        ⭐ Altas (4-5 estrellas) ({contadores.altas})
                    </button>
                    <button
                        onClick={() => cambiarFiltro('bajas')}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                            filtroActivo === 'bajas'
                                ? 'bg-red-500 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                    >
                        ⭐ Bajas (1-3 estrellas) ({contadores.bajas})
                    </button>
                </div>
            )}

            <div>
                {reseñasFiltradas.length > 0 ? (
                    reseñasFiltradas?.map((res, index) => (
                        <div key={index} className="items-center w-full px-5 py-3 my-4 bg-gray-200 border-2 border-gray-300 rounded-lg ">
                            <div className="flex flex-row justify-between mb-3">
                                <span>{res.review_date}</span>
                                {res.rating && (
                                    <div className="flex items-center">
                                        <span className="text-yellow-500">
                                            {'⭐'.repeat(res.rating)}
                                        </span>
                                        <span className="ml-2 text-gray-600">({res.rating}/5)</span>
                                    </div>
                                )}
                            </div>
                            <p>{res.comment}</p>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-8">
                        <p className="text-gray-500 mb-4">
                            {filtroActivo === 'todas' 
                                ? 'No tienes reseñas aún'
                                : `No tienes reseñas ${filtroActivo === 'altas' ? 'con calificaciones altas (4-5 estrellas)' : 'con calificaciones bajas (1-3 estrellas)'}`
                            }
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Reseñas;
