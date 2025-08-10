'use client'
import { useState } from "react"
import Terapeutas from "./Terapeutas"
import Citas from "./Citas"
import PerfilUser from "./PerfilUser"
import Finanzas from "./Finanzas"

const MenuNavegacionUser = () => {
    const [pestanaActiva, setPestanaActiva] = useState("terapeutas")

    const pestanas = [
        { id: "terapeutas", label: "Terapeutas", component: <Terapeutas /> },
        { id: "citas", label: "Turnos", component: <Citas isUserDashboard={true} /> },
        { id: "perfil", label: "Perfil", component: <PerfilUser /> },
        { id: "finanzas", label: "Finanzas", component: <Finanzas /> },
    ]

    return (
        <>
            <div className="grid items-center w-full h-10 grid-cols-4 gap-3 px-1 mt-6 bg-white rounded-md">
                {pestanas.map((pestana) => (
                    <button key={pestana.id} className={`h-[80%] rounded-md transition-colors ${
                        pestanaActiva === pestana.id ? "bg-blue-200" : "hover:bg-blue-100"
                    }`}
                    onClick={() => setPestanaActiva(pestana.id)}
                    >
                        {pestana.label}
                    </button>
                ))}
            </div>

            <div className="mt-10 bg-white h-fit">
                {pestanas.find((pestana) => pestana.id === pestanaActiva)?.component}
            </div>
        </>
    )
}

export default MenuNavegacionUser
