'use client';
import { useState } from 'react';
import UserProfessionals from './UserProfessionals';
import UserPacientes from './UserPacientes';
import UserAdministrators from './UserAdministrators';
import BannedUsers from './BannedUsers';
import ReseñasAdmin from './ReseñasAdmin';
import TurnosAdmin from './TurnosAdmin';

interface Paciente {
    id: string;
    name: string;
    email: string;
    role: string;
    // Solo las propiedades que realmente necesitamos
}

interface MenuNavegacionAdminProps {
    data: Paciente[];
}

const MenuNavegacionAdmin = ({ data }: MenuNavegacionAdminProps) => {
    const [pestañaActiva, setpestañaActiva] = useState('pacientes');

  const pestañas = [
    { id: "pacientes", label: "Pacientes", component: <UserPacientes data={data} /> },
    { id: "profesionales", label: "Profesionales", component: <UserProfessionals data={data} /> },
    { id: "reseñas", label: "Reseñas", component: <ReseñasAdmin /> },
    { id: "turnos", label: "Turnos", component: <TurnosAdmin /> },
    { id: "administradores", label: "Administradores", component: <UserAdministrators data={data} /> },
    { id: "baneados", label: "Usuarios Baneados", component: <BannedUsers /> },
  ]

  const handleTabChange = (newTab: string) => {
    setpestañaActiva(newTab);
    // Prevenir el scroll automático
    setTimeout(() => {
      window.scrollTo({ top: window.scrollY, behavior: 'auto' });
    }, 50);
  }

  return (
    <div className="scroll-smooth">
      <div className="flex items-center justify-center w-full min-h-12 bg-gray-50 rounded-lg border border-gray-200 p-1 flex-wrap md:flex-nowrap gap-1">
        {pestañas.map((pestaña) => (
          <button
            key={pestaña.id}
            className={`flex-1 min-h-10 rounded-md transition-all duration-200 font-medium text-xs md:text-sm px-2 ${
              pestañaActiva === pestaña.id 
                ? "bg-[#5046E7] text-white shadow-md" 
                : "text-gray-600 hover:text-[#5046E7] hover:bg-[#5046E7]/10"
            }`}
            onClick={() => handleTabChange(pestaña.id)}
          >
            {pestaña.label}
          </button>
        ))}
      </div>

      <div className="mt-6 bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden">
        <div className="h-[600px] overflow-y-auto transition-all duration-300 ease-in-out">
          <div className="p-6">
            {pestañas.find((pestaña) => pestaña.id === pestañaActiva)?.component}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MenuNavegacionAdmin;
