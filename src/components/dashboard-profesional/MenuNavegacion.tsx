'use client';
import { useEffect, useState } from 'react';
import Pacientes from './Pacientes';
import Citas from './Citas';
import Reseñas from './Reseñas';
import Perfil from './Perfil';
import Finanzas from './Finanzas';
import { useRouter, useSearchParams } from 'next/navigation';

const MenuNavegacion = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pestañaInicial = searchParams?.get("tab") || "pacientes";
    const [pestañaActiva, setPestañaActiva] = useState(pestañaInicial);

    useEffect(() => {
        const tab = searchParams?.get('tab');
        if (tab) setPestañaActiva(tab);
    }, [searchParams]);

    const cambiarPestaña = (id: string) => {
        setPestañaActiva(id);
        router.replace(`?tab=${id}`);
    };

    const pestañas = [
        { id: 'pacientes', label: 'Pacientes', component: <Pacientes /> },
        { id: 'citas', label: 'Citas', component: <Citas /> },
        { id: 'reseñas', label: 'Reseñas', component: <Reseñas /> },
        { id: 'perfil', label: 'Perfil', component: <Perfil /> },
        { id: 'finanzas', label: 'Finanzas', component: <Finanzas /> },
    ];

    return (
        <>
            <div>
                <h1 className="text-[26px] font-semibold text-black">Perfil Profesional</h1>
                <span className="text-black">Bienvenida/o de vuelta</span>
            </div>
            <div className="grid items-center w-full h-10 grid-cols-5 gap-3 px-1 mt-6 bg-white rounded-md">
                {pestañas.map((pestaña) => (
                    <button
                        key={pestaña.id}
                        className={`h-[80%] rounded-md transition-colors ${pestañaActiva === pestaña.id ? 'bg-blue-200' : 'hover:bg-blue-100'}`}
                        onClick={() => cambiarPestaña(pestaña.id)}
                    >
                        {pestaña.label}
                    </button>
                ))}
            </div>

            <div className="mt-10 bg-white h-fit">{pestañas.find((pestaña) => pestaña.id === pestañaActiva)?.component}</div>
        </>
    );
};

export default MenuNavegacion;
