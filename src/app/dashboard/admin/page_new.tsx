'use client';
import MenuNavegacionAdmin from '@/components/dashboard-admin/MenuNavegacionAdmin';
import { envs } from '@/config/envs.config';
import { useEffect, useState } from 'react';
import DashboardWidget from '@/components/dashboard-admin/DashboardWidget';


export interface Paciente {
    id: string;
    name: string;
    profile_picture: string;
    phone: string;
    email: string;
    role: string;
}

interface UsersResponse {
    message: string;
    data: {
        data: Paciente[];
        pagination: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    };
}

const AdminDashboard = () => {
    const [users, setUsers] = useState<UsersResponse | null>(null);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPacientes, setTotalPacientes] = useState(0);
    const [totalPsicologos, setTotalPsicologos] = useState(0);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(`${envs.api_url}/users`, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                });
                
                if (response.ok) {
                    const data: UsersResponse = await response.json();
                    setUsers(data);
                    setTotalUsers(data.data.pagination.total);
                    
                    const pacientes = data.data.data.filter(user => user.role === 'patient');
                    const psicologos = data.data.data.filter(user => user.role === 'psychologist');
                    
                    setTotalPacientes(pacientes.length);
                    setTotalPsicologos(psicologos.length);
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    // Porcentajes reales
    const porcentajePacientes = totalUsers > 0 ? ((totalPacientes / totalUsers) * 100).toFixed(1) : '0';
    const porcentajePsicologos = totalUsers > 0 ? ((totalPsicologos / totalUsers) * 100).toFixed(1) : '0';

    // Datos reales para los gráficos y tablas (debes traerlos del backend si existen endpoints)
    // Tipado explícito para evitar errores TS
    // Formato correcto para los componentes (solo datos reales, aquí vacíos por defecto)


    return (
        <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen relative overflow-hidden">
            {/* Elementos decorativos de fondo más sutiles */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-indigo-100/30 to-purple-100/30 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-100/30 to-indigo-100/30 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-50/20 to-indigo-50/20 rounded-full blur-3xl"></div>
            </div>
            {/* Aquí puedes agregar el contenido principal del dashboard, por ejemplo las cards y tablas */}
            <div className="relative z-10 p-8">
                <DashboardWidget
                    title="USUARIOS TOTALES"
                    value={totalUsers}
                    change={`${porcentajePacientes}%`}
                    changeType="positive"
                    subtitle="% Pacientes"
                    icon={
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                        </svg>
                    }
                    color="from-[#5046E7] to-[#4338CA]"
                />
                <DashboardWidget
                    title="PACIENTES ACTIVOS"
                    value={totalPacientes}
                    change={`${porcentajePacientes}%`}
                    changeType="positive"
                    subtitle="% del total"
                    icon={
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                    }
                    color="from-[#6366F1] to-[#5046E7]"
                />
                <DashboardWidget
                    title="PSICÓLOGOS"
                    value={totalPsicologos}
                    change={`${porcentajePsicologos}%`}
                    changeType="positive"
                    subtitle="% del total"
                    icon={
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.80a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 0-2-.712V17a1 1 0 001 1z"/>
                        </svg>
                    }
                    color="from-[#8B5CF6] to-[#6366F1]"
                />
                {/* Aquí puedes agregar más widgets, gráficos o tablas si tienes datos reales */}
                <MenuNavegacionAdmin data={users?.data?.data as Paciente[] ?? []} />
            </div>
        </div>
    );
}

export default AdminDashboard;