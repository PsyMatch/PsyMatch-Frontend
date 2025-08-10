"use client"

import { useState } from "react"
import EmparejamientoIA from "./EmparejamientoIA"
import AnalisisdDeReseñas from "./AnalisisdDeReseñas"
import SoporteInteligente from "./SoporteInteligente"


const MenuNavegacion = () => {
    const [pestañaActiva, setpestañaActiva] = useState("EmparejamientoIA")

    const pestañas = [
        { id: "EmparejamientoIA", label: "Emparejamiento IA", component: <EmparejamientoIA />},
        { id: "AnalisisdDeReseñas", label: "Análisis de Reseñas", component: <AnalisisdDeReseñas />},
        { id: "SoporteInteligente", label: "Soporte Inteligente", component: <SoporteInteligente />},
    ]

    return (
    <>
        <div className="grid items-center w-[60%] m-auto h-10 grid-cols-3 gap-3 px-1 mt-6 bg-[#F2F2F2] rounded-md">
            {pestañas.map((pestaña) => (
                <button key={pestaña.id} className={`h-[80%] rounded-md transition-colors ${
                    pestañaActiva === pestaña.id ? "bg-[#A5B5FC]" : "hover:bg-[#d3dbff]"
                }`}
                onClick={() => setpestañaActiva(pestaña.id)}
                >
                    {pestaña.label}
                </button>
            ))}
        </div>

        <div className="mt-10 border-2 mb-20 border-gray-300 bg-white w-[80%] rounded-md m-auto h-fit">
            {pestañas.find((pestaña) => pestaña.id === pestañaActiva)?.component}
        </div>
    </>
    )
}

export default MenuNavegacion