"use client"
import { useState } from "react"
import UserProfessionals from "./UserProfessionals"
import UserPacientes from "./UserPacientes"
import ReseñasAdmin from "./ReseñasAdmin"
import TurnosAdmin from "./TurnosAdmin"
import { Paciente } from "@/app/dashboard/admin/page"


interface MenuNavegacionAdminProps {
  data: Paciente[];
}

const MenuNavegacionAdmin = ({ data }: MenuNavegacionAdminProps) => {
  const [pestañaActiva, setpestañaActiva] = useState("pacientes")

  const pestañas = [
    { id: "pacientes", label: "Pacientes", component: <UserPacientes data={data} /> },
    { id: "profesionales", label: "Profesionales", component: <UserProfessionals data={data} /> },
    { id: "reseñas", label: "Reseñas", component: <ReseñasAdmin /> },
    { id: "turnos", label: "Turnos", component: <TurnosAdmin /> },
  ]

  return (
    <>
      <div className="grid items-center w-[80%] h-10 grid-cols-4 gap-3 px-1 mt-6 bg-white rounded-md">
        {pestañas.map((pestaña) => (
          <button
            key={pestaña.id}
            className={`h-[80%] rounded-md transition-colors ${
              pestañaActiva === pestaña.id ? "bg-blue-200" : "hover:bg-blue-100"
            }`}
            onClick={() => setpestañaActiva(pestaña.id)}
          >
            {pestaña.label}
          </button>
        ))}
      </div>

      <div className="flex justify-center w-screen mt-10 bg-white h-fit bg-gradient-to-br from-blue-50 to-indigo-100">
        {pestañas.find((pestaña) => pestaña.id === pestañaActiva)?.component}
      </div>
    </>
  )
}

export default MenuNavegacionAdmin
