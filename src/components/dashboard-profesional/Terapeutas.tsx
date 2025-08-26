'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { type ITherapist, therapistsService } from '@/services/therapists';
import Link from 'next/link';
import { Loader2, RefreshCw, Calendar, MapPin, User, Clock } from 'lucide-react';

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
        return (
            <div className="flex flex-col items-center justify-center py-8 md:py-16 px-4 md:px-8">
                <Loader2 className="h-6 w-6 md:h-8 md:w-8 animate-spin text-blue-600 mb-3 md:mb-4" />
                <p className="text-sm md:text-base text-gray-600 text-center">Cargando terapeutas...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="px-4 md:px-8 py-8 md:py-16">
                <div className="max-w-md mx-auto bg-white rounded-lg border border-gray-200 p-4 md:p-6 text-center">
                    <div className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">{error}</div>
                    <button
                        onClick={fetchTerapeutas}
                        className="inline-flex items-center gap-2 px-3 md:px-4 py-2 bg-blue-600 text-white text-sm md:text-base rounded-md hover:bg-blue-700 transition-colors"
                    >
                        <RefreshCw className="h-4 w-4" />
                        Reintentar
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="px-4 md:px-8 py-6 md:py-8 max-w-6xl mx-auto">
            <div className="mb-6 md:mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Lista de Terapeutas</h1>
                <p className="text-gray-600 text-base md:text-lg">Gestiona tu lista de terapeutas y programa tus citas</p>
            </div>

            {terapeutas.length === 0 ? (
                <div className="max-w-md mx-auto bg-white rounded-lg border border-gray-200 p-4 md:p-6 text-center">
                    <User className="h-10 w-10 md:h-12 md:w-12 text-gray-400 mx-auto mb-3 md:mb-4" />
                    <p className="text-sm md:text-base text-gray-600">No hay terapeutas registrados para este usuario.</p>
                </div>
            ) : (
                <div className="grid gap-4 md:gap-6">
                    {terapeutas.map((terapeuta) => (
                        <div
                            key={terapeuta.id}
                            className="bg-white rounded-lg border border-gray-200 p-4 md:p-6"
                        >
                            <div className="flex flex-col sm:flex-row sm:items-start gap-4 md:gap-6">
                                <div className="flex-shrink-0 mx-auto sm:mx-0">
                                    <div className="w-20 h-20 sm:w-16 sm:h-16 md:w-16 md:h-16 rounded-full overflow-hidden ring-2 ring-gray-200">
                                        <Image
                                            src={terapeuta.profile_picture || '/person-gray-photo-placeholder-woman.webp'}
                                            alt={terapeuta.name}
                                            width={80}
                                            height={80}
                                            className="w-full h-full object-cover"
                                            style={{ objectFit: 'cover' }}
                                        />
                                    </div>
                                </div>

                                <div className="flex-1 min-w-0 text-center sm:text-left">
                                    <div className="mb-3">
                                        <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-1">
                                            {terapeuta.professional_title || 'Dr/a'} {terapeuta.name}
                                        </h3>
                                        <p className="text-sm md:text-base text-gray-600">
                                            {terapeuta.professional_experience
                                                ? `${terapeuta.professional_experience} años de experiencia`
                                                : 'Psicólogo/a Profesional'}
                                        </p>
                                    </div>

                                    <div className="flex flex-col sm:flex-row sm:flex-wrap items-center sm:items-start gap-2 sm:gap-4 mb-4 text-xs sm:text-sm text-gray-600">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                                            <span>{terapeuta.total_sessions} Sesiones</span>
                                        </div>

                                        <div className="flex items-center gap-1">
                                            <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                                            <span className="text-center sm:text-left">
                                                Última:{' '}
                                                {terapeuta.last_session
                                                    ? (() => {
                                                          const date = new Date(terapeuta.last_session);
                                                          return isNaN(date.getTime()) ? 'Fecha inválida' : date.toLocaleDateString('es-ES');
                                                      })()
                                                    : 'Sin sesiones aún'}
                                            </span>
                                        </div>

                                        {terapeuta.upcoming_session &&
                                            (() => {
                                                const date = new Date(terapeuta.upcoming_session);
                                                const isValidDate = !isNaN(date.getTime());

                                                if (!isValidDate) return null;

                                                const hasTime =
                                                    terapeuta.upcoming_session.includes('T') && (date.getHours() !== 0 || date.getMinutes() !== 0);

                                                return (
                                                    <div className="flex items-center gap-1">
                                                        <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
                                                        <span className="text-blue-600 font-medium text-center sm:text-left">
                                                            Próxima: {date.toLocaleDateString('es-ES')}
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
                                                    </div>
                                                );
                                            })()}
                                    </div>

                                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-3 mb-4">
                                        <span
                                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                                                terapeuta.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                            }`}
                                        >
                                            {terapeuta.status === 'active' ? 'Activo' : 'Inactivo'}
                                        </span>
                                        {terapeuta.location && (
                                            <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-600">
                                                <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                                                <span>{terapeuta.location}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-col gap-2 md:gap-3 w-full sm:w-auto sm:flex-shrink-0">
                                    <Link href={`/profile/${terapeuta.id}`} className="w-full">
                                        <button className="w-full sm:min-w-[120px] px-3 md:px-4 py-2 border border-gray-300 text-gray-700 text-sm md:text-base rounded-md hover:bg-gray-50 transition-colors">
                                            Ver Perfil
                                        </button>
                                    </Link>
                                    <Link href={`/session/${terapeuta.id}`} className="w-full">
                                        <button className="w-full sm:min-w-[120px] px-3 md:px-4 py-2 bg-blue-600 text-white text-sm md:text-base rounded-md hover:bg-blue-700 transition-colors">
                                            Reservar Cita
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Terapeutas;
