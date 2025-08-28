'use client';

import CardMatch from './CardMatch';
import { useAuthState } from '@/hooks/useAuthState';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

const Match = () => {
  const { isAuthenticated } = useAuthState();
  const [role, setRole] = useState<string | undefined>(undefined);

  useEffect(() => {
    setRole(Cookies.get("role"));
  }, []);

  return (
    <section className="relative py-20">
      <div className="px-4 mx-auto text-center max-w-7xl sm:px-6 lg:px-8">
        <div className={`relative ${!isAuthenticated ? 'filter blur-sm pointer-events-none' : ''}`}>
          <CardMatch />
        </div>

        {!isAuthenticated && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="max-w-md px-8 py-2 mx-4 border border-gray-200 rounded-lg shadow-lg bg-white/95 backdrop-blur-sm">
              <div className="text-center">
                <div className="mb-4">
                  <svg
                    className="w-12 h-12 mx-auto text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>

                {role === "Psicólogo" || role === "Administrador" ? (
                  <p className="mb-6 text-gray-600">
                    Debes ser un usuario paciente para usar nuestra herramienta de búsqueda de psicólogos
                  </p>
                ) : (
                  <>
                    <h3 className="mb-2 text-lg font-semibold text-gray-900">
                      Inicia sesión para continuar
                    </h3>
                    <p className="mb-6 text-gray-600">Debes estar logueado para usar nuestra herramienta de búsqueda de psicólogos</p>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Match;
