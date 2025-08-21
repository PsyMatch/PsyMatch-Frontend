'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ITherapist, therapistsService } from '@/services/therapists';

const Terapeutas = () => {
    const [terapeutas, setTerapeutas] = useState<ITherapist[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchTerapeutas();
    }, []);

    const fetchTerapeutas = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await therapistsService.getMyTherapists();
            setTerapeutas(data);

            if (data.length === 0) {
                setError('No tienes terapeutas asignados aún. Los terapeutas aparecerán aquí cuando reserves tu primera cita.');
            }
        } catch (error) {
            console.error('Error al cargar terapeutas:', error);
            setError('Error al cargar los terapeutas');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="px-8 py-8">Cargando terapeutas...</div>;
    }

    if (error) {
        return (
            <div className="px-8 py-8">
                <div className="text-gray-600 mb-4">{error}</div>
                <button onClick={fetchTerapeutas} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Reintentar
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-3 px-8 py-8 h-fit">
            <div>
                <h1 className="text-xl font-semibold text-black">Lista de Terapeutas</h1>
                <span className="text-black">Gestiona tu lista de terapeutas</span>
            </div>
            <div>
                {terapeutas.length === 0 ? (
                    <div className="text-gray-600 py-4">No hay terapeutas registrados para este usuario.</div>
                ) : (
                    terapeutas.map((terapeuta) => (
                        <div
                            key={terapeuta.id}
                            className="grid bg-stone-50 border-2 border-gray-300 items-center py-3 px-5 rounded-lg w-full grid-cols-[0.2fr_2fr_0.2fr] my-4"
                        >
                            <div className="w-10 h-10 bg-white rounded-full overflow-hidden">
                                <Image
                                    src={terapeuta.profile_picture || '/person-gray-photo-placeholder-woman.webp'}
                                    alt={terapeuta.name}
                                    width={40}
                                    height={40}
                                    className="w-full h-full object-cover"
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="font-bold text-black">
                                    {terapeuta.professional_title || 'Dr/a'} {terapeuta.name}
                                </span>
                                <span className="text-sm text-black">
                                    {terapeuta.professional_experience
                                        ? `${terapeuta.professional_experience} años de experiencia`
                                        : 'Psicólogo/a Profesional'}
                                </span>
                                <div className="flex flex-row gap-2">
                                    <span className="text-xs text-black">{terapeuta.total_sessions} Sesiones -</span>
                                    <span className="text-xs text-black">
                                        Última:{' '}
                                        {terapeuta.last_session
                                            ? (() => {
                                                  const date = new Date(terapeuta.last_session);
                                                  return isNaN(date.getTime()) ? 'Fecha inválida' : date.toLocaleDateString('es-ES');
                                              })()
                                            : 'Sin sesiones aún'}
                                    </span>
                                    {terapeuta.upcoming_session &&
                                        (() => {
                                            const date = new Date(terapeuta.upcoming_session);
                                            const isValidDate = !isNaN(date.getTime());

                                            if (!isValidDate) return null;

                                            // Verificar si la fecha incluye información de tiempo significativa
                                            const hasTime =
                                                terapeuta.upcoming_session.includes('T') && (date.getHours() !== 0 || date.getMinutes() !== 0);

                                            return (
                                                <>
                                                    <span className="text-xs text-black"> - Próxima: </span>
                                                    <span className="text-xs text-black">
                                                        {date.toLocaleDateString('es-ES')}
                                                        {hasTime && (
                                                            <>
                                                                {' '}
                                                                a las{' '}
                                                                {date.toLocaleTimeString('es-ES', {
                                                                    hour: '2-digit',
                                                                    minute: '2-digit',
                                                                    hour12: false,
                                                                })}
                                                            </>
                                                        )}
                                                    </span>
                                                </>
                                            );
                                        })()}
                                </div>
                                <div className="flex items-center gap-2">
                                    <span
                                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                                            terapeuta.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                        }`}
                                    >
                                        {terapeuta.status === 'active' ? 'Activo' : 'Inactivo'}
                                    </span>
                                    {terapeuta.location && <span className="text-xs text-gray-600">{terapeuta.location}</span>}
                                </div>
                            </div>
                            <div className="flex items-end">
                                <button className="px-10 py-2 text-white rounded-md bg-[#4138CA]">Mensaje</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Terapeutas;
