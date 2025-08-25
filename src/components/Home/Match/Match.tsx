'use client';

import CardMatch from './CardMatch';
import { useAuthState } from '@/hooks/useAuthState';
import Link from 'next/link';

const Match = () => {
    const { isAuthenticated } = useAuthState();

    return (
        <section className="py-20 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-5xl font-bold text-gray-900 mb-6">Encuentra Tu Psicólogo Ideal</h2>
                <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
                    Selecciona las especialidades que necesitas y deja que nuestra plataforma te conecte con el psicólogo adecuado. Obtén
                    recomendaciones personalizadas basadas en tus necesidades, ubicación y preferencias.
                </p>

                <div className={`relative ${!isAuthenticated ? 'filter blur-sm pointer-events-none' : ''}`}>
                    <CardMatch />
                </div>

                {!isAuthenticated && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white/95 backdrop-blur-sm rounded-lg p-8 shadow-lg border border-gray-200 max-w-md mx-4">
                            <div className="text-center">
                                <div className="mb-4">
                                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Inicia sesión para continuar</h3>
                                <p className="text-gray-600 mb-6">Debes estar logueado para usar nuestra herramienta de búsqueda de psicólogos</p>
                                <div className="space-y-3">
                                    <Link
                                        href="/login"
                                        className="w-full inline-flex justify-center px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
                                    >
                                        Iniciar Sesión
                                    </Link>
                                    <Link
                                        href="/register-user"
                                        className="w-full inline-flex justify-center px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors"
                                    >
                                        Crear Cuenta
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Match;
