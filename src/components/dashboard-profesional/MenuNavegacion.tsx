"use client"

import { useState } from "react"
import Pacientes from "./Pacientes"
import Citas from "./Citas"
import Reseñas from "./Reseñas"
import Perfil from "./Perfil"
import Finanzas from "./Finanzas"

const MenuNavegacion = () => {
    const [pestañaActiva, setpestañaActiva] = useState("pacientes")

    const pestañas = [
        { id: "pacientes", label: "Pacientes", component: <Pacientes /> },
        { id: "citas", label: "Citas", component: <Citas /> },
        { id: "reseñas", label: "Reseñas", component: <Reseñas /> },
        { id: "perfil", label: "Perfil", component: <Perfil /> },
        { id: "finanzas", label: "Finanzas", component: <Finanzas /> },
    ]

    return (
    <>
        <div className="grid items-center w-full h-10 grid-cols-5 gap-3 px-1 mt-6 bg-white rounded-md">
            {pestañas.map((pestaña) => (
                <button key={pestaña.id} className={`h-[80%] rounded-md transition-colors ${
                    pestañaActiva === pestaña.id ? "bg-violet-300" : "hover:bg-violet-200"
                }`}
                onClick={() => setpestañaActiva(pestaña.id)}
                >
                    {pestaña.label}
                </button>
            ))}
        </div>

        <div className="mt-10 bg-white h-fit">
            {pestañas.find((pestaña) => pestaña.id === pestañaActiva)?.component}
        </div>
    </>
    )
}

export default MenuNavegacion