'use client';

import { especialidades } from '@/constants/filters';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuthState } from '@/hooks/useAuthState';
import { useNotifications } from '@/hooks/useNotifications';

const CardMatch = () => {
    const router = useRouter();
    const { isAuthenticated } = useAuthState();
    const notifications = useNotifications();
    const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);

    const handleSpecialtyClick = (specialty: string) => {
        if (selectedSpecialties.includes(specialty)) {
            // Si ya está seleccionado, lo removemos
            const newSelectedSpecialties = selectedSpecialties.filter((spec) => spec !== specialty);
            setSelectedSpecialties(newSelectedSpecialties);
        } else {
            // Si no está seleccionado, lo agregamos
            const newSelectedSpecialties = [...selectedSpecialties, specialty];
            setSelectedSpecialties(newSelectedSpecialties);
        }
    };

    const handleFindPsychologist = () => {
        if (!isAuthenticated) {
            notifications.warning('Debes iniciar sesión para buscar psicólogos');
            return;
        }

        // Crear URL con filtros de especialidades aplicados
        const params = new URLSearchParams();
        if (selectedSpecialties.length > 0) {
            selectedSpecialties.forEach(specialty => {
                params.append('especialidades', specialty);
            });
        }
        
        const url = `/search-professionals${params.toString() ? `?${params.toString()}` : ''}`;
        router.push(url);
    };

    return (
        <div className="max-w-4xl mx-auto mb-12 text-black bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="flex flex-col space-y-1.5 p-6">
                <div className="flex items-center justify-center text-2xl font-semibold leading-none tracking-tight">
                    Selecciona las especialidades que necesitas
                </div>
                <div className="text-sm text-gray-500">Elige las áreas de especialización que mejor se adapten a tus necesidades</div>
            </div>

            <div className="p-6 pt-0 space-y-6">

                <div className="flex flex-wrap justify-center gap-2">
                    {especialidades.map((specialty) => (
                        <div
                            key={specialty}
                            onClick={() => handleSpecialtyClick(specialty)}
                            className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 cursor-pointer ${
                                selectedSpecialties.includes(specialty)
                                    ? 'bg-indigo-100 border-indigo-300 text-indigo-800'
                                    : 'border-gray-200 text-black hover:bg-indigo-50'
                            }`}
                        >
                            {specialty}
                        </div>
                    ))}
                </div>

                <button 
                    onClick={handleFindPsychologist}
                    className="inline-flex mt-4 items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-800 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-gray-900 text-white hover:bg-gray-900/90 h-11 rounded-md px-8 w-full sm:w-auto"
                >
                    <Search className="w-5 h-5 mr-2" />
                    Encontrar Mi Psicólogo
                </button>
            </div>
        </div>
    );
};

export default CardMatch;
