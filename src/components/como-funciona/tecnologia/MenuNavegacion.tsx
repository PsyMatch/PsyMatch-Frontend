"use client"

import { useState } from "react"
import BusquedaInteligente from "./EmparejamientoIA"
import SistemaDeReseñas from "./AnalisisdDeReseñas"
import SoporteEspecializado from "./SoporteInteligente"


const MenuNavegacion = () => {
    const [pestañaActiva, setpestañaActiva] = useState("BusquedaInteligente")

    const pestañas = [
        { id: "BusquedaInteligente", label: "Búsqueda Inteligente", component: <BusquedaInteligente />},
        { id: "SistemaDeReseñas", label: "Reseñas Verificadas", component: <SistemaDeReseñas />},
        { id: "SoporteEspecializado", label: "Soporte Especializado", component: <SoporteEspecializado />},
    ]

    return (
    <>
        <div className="flex flex-col sm:grid sm:grid-cols-3 items-center w-full max-w-4xl mx-auto gap-2 sm:gap-3 px-4 sm:px-1 mt-6 bg-[#F2F2F2] rounded-md p-2">
            {pestañas.map((pestaña) => (
                <button key={pestaña.id} className={`w-full sm:w-auto h-10 sm:h-8 rounded-md transition-colors text-xs sm:text-sm md:text-base px-2 ${
                    pestañaActiva === pestaña.id ? "bg-[#A5B5FC]" : "hover:bg-[#d3dbff]"
                }`}
                onClick={() => setpestañaActiva(pestaña.id)}
                >
                    {pestaña.label}
                </button>
            ))}
        </div>

        <div className="mt-6 lg:mt-10 border-2 mb-12 lg:mb-20 border-gray-300 bg-transparent w-full max-w-6xl rounded-md mx-auto h-fit px-4 sm:px-6 lg:px-8">
            {pestañas.find((pestaña) => pestaña.id === pestañaActiva)?.component}
        </div>
    </>
    )
}

export default MenuNavegacion