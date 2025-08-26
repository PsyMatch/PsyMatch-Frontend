'use client';
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
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
    const searchParams = useSearchParams();
    const router = useRouter();
    const pestañaInicial = searchParams?.get("tab") || "pacientes";
    const [pestañaActiva, setpestañaActiva] = useState(pestañaInicial);
    const [usersData, setUsersData] = useState<Paciente[]>(data);

    // Sincronizar con nuevos datos cuando cambien las props
    useEffect(() => {
        setUsersData(data);
    }, [data]);

    useEffect(() => {
        const tab = searchParams?.get('tab');
        if (tab) setpestañaActiva(tab);
    }, [searchParams]);

    // Función para actualizar el estado global de usuarios
    const updateUserInGlobalState = (userId: string, updates: Partial<Paciente>) => {
        setUsersData(prevData => 
            prevData.map(user => 
                user.id === userId 
                    ? { ...user, ...updates }
                    : user
            )
        );
    };

    const cambiarPestaña = (id: string) => {
        setpestañaActiva(id);
        router.replace(`?tab=${id}`, { scroll: false });
    };

  const pestañas = [
    { id: "pacientes", label: "Pacientes", component: <UserPacientes data={usersData} onUserUpdate={updateUserInGlobalState} /> },
    { id: "profesionales", label: "Profesionales", component: <UserProfessionals data={usersData} onUserUpdate={updateUserInGlobalState} /> },
    { id: "reseñas", label: "Reseñas", component: <ReseñasAdmin /> },
    { id: "turnos", label: "Turnos", component: <TurnosAdmin /> },
    { id: "administradores", label: "Administradores", component: <UserAdministrators data={usersData} onUserUpdate={updateUserInGlobalState} /> },
    { id: "baneados", label: "Usuarios Baneados", component: <BannedUsers /> },
  ]

  const handleTabChange = (newTab: string) => {
    cambiarPestaña(newTab);
  }

  return (
    <div className="scroll-smooth">
      {/* Navegación móvil - dropdown */}
      <div className="block lg:hidden mb-4">
        <select
          value={pestañaActiva}
          onChange={(e) => handleTabChange(e.target.value)}
          className="w-full p-3 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-[#5046E7] focus:border-[#5046E7]"
        >
          {pestañas.map((pestaña) => (
            <option key={pestaña.id} value={pestaña.id}>
              {pestaña.label}
            </option>
          ))}
        </select>
      </div>

      {/* Navegación desktop - tabs horizontales */}
      <div className="hidden lg:block">
        <div className="flex items-center justify-center w-full min-h-12 bg-gray-50 rounded-lg border border-gray-200 p-1 flex-wrap gap-1">
          {pestañas.map((pestaña) => (
            <button
              key={pestaña.id}
              className={`flex-1 min-h-10 rounded-md transition-all duration-200 font-medium text-sm px-2 ${
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
      </div>

      {/* Contenido de las pestañas */}
      <div className="mt-4 lg:mt-6 bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden">
        <div className="max-h-[600px] overflow-y-auto transition-all duration-300 ease-in-out">
          <div className="p-4 sm:p-6">
            {pestañas.find((pestaña) => pestaña.id === pestañaActiva)?.component}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MenuNavegacionAdmin;
