'use client'
import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Terapeutas from "./Terapeutas"
import CitasUser from "./CitasUser"
import PerfilUser from "./PerfilUser"
import Finanzas from "./Finanzas"
import ReviewsUser from "./ReviewsUser"

const MenuNavegacionUser = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pestañaInicial = searchParams?.get("tab") || "terapeutas";
    const [pestanaActiva, setPestanaActiva] = useState(pestañaInicial);

    useEffect(() => {
        const tab = searchParams?.get('tab');
        if (tab) setPestanaActiva(tab);
    }, [searchParams]);

    const cambiarPestaña = (id: string) => {
        setPestanaActiva(id);
        router.replace(`?tab=${id}`, { scroll: false });
    };

    const pestanas = [
        { id: "terapeutas", label: "Terapeutas", component: <Terapeutas /> },
        { id: "citas", label: "Turnos", component: <CitasUser /> },
        { id: "reseñas", label: "Reseñas", component: <ReviewsUser /> },
        { id: "perfil", label: "Perfil", component: <PerfilUser /> },
        { id: "finanzas", label: "Finanzas", component: <Finanzas /> },
    ]

    return (
        <>
            {/* Navegación móvil - dropdown */}
            <div className="block sm:hidden">
                <select
                    value={pestanaActiva}
                    onChange={(e) => cambiarPestaña(e.target.value)}
                    className="w-full p-3 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                    {pestanas.map((pestana) => (
                        <option key={pestana.id} value={pestana.id}>
                            {pestana.label}
                        </option>
                    ))}
                </select>
            </div>

            {/* Navegación desktop - tabs horizontales */}
            <div className="hidden sm:block">
                <div className="grid items-center w-full min-h-12 grid-cols-2 md:grid-cols-5 gap-2 p-2 mt-6 bg-white rounded-lg shadow-sm border border-gray-200">
                    {pestanas.map((pestana) => (
                        <button
                            key={pestana.id}
                            className={`h-10 px-3 rounded-md transition-all duration-200 font-medium text-sm whitespace-nowrap ${
                                pestanaActiva === pestana.id
                                    ? "bg-blue-500 text-white shadow-md"
                                    : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                            }`}
                            onClick={() => cambiarPestaña(pestana.id)}
                        >
                            {pestana.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Contenido de las pestañas */}
            <div className="mt-4 sm:mt-6 bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 sm:p-6">
                    {pestanas.find((pestana) => pestana.id === pestanaActiva)?.component}
                </div>
            </div>
        </>
    )
}

export default MenuNavegacionUser