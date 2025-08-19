'use client';
import MenuNavegacionAdmin from '@/components/dashboard-admin/MenuNavegacionAdmin';
import { envs } from '@/config/envs.config';
import { useEffect, useState } from 'react';

interface Psicologo {
    name: string;
    email: string;
    role: string;
}

export interface Paciente {
    id: string;
    name: string;
    profile_picture: string;
    phone: string;
    birthdate: string;
    dni: number;
    health_insurance: string;
    address: string;
    email: string;
    latitude: number;
    longitude: number;
    role: string;
    emergency_contact: string;
    personal_biography: string;
    languages: string[];
    professional_title: string;
    professional_experience: number;
    license_number: number;
    verified: string;
    office_address: string;
    specialities: string[];
    therapy_approaches: string[];
    session_types: string[];
    modality: string;
    insurance_accepted: string[];
    availability: string[];
    psychologists: Psicologo[];
}

interface Meta {
    hasNext: boolean;
    hasPrevious: boolean;
    limit: number;
    page: number;
    total: number;
    totalPages: number;
}

export interface IPaciente {
    data: Paciente[];
    meta: Meta;
}

export interface PacientesResponse {
    message: string;
    data: IPaciente;
}

const AdminDashboard = () => {
    const [users, setUsers] = useState<PacientesResponse | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            const token = localStorage.getItem('authToken');
            const res = await fetch(`${envs.next_public_api_url}/users?limit=50`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const result: PacientesResponse = await res.json();
            setUsers(result);
        };
        fetchUsers();
    }, []);

    console.log('Users:', users);
    console.log('Users.data:', users?.data);

    const totalPacientes = users?.data?.data?.filter((u) => u.role === 'Paciente').length ?? 0;
    const totalPsicologos = users?.data?.data?.filter((u) => u.role === 'Psicólogo').length ?? 0;
    const totalPsicologosAprobacion = users?.data?.data?.filter((u) => u.role === 'Psicólogo' && !u.verified).length ?? 0;

    return (
        <div className="flex flex-col items-center bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="grid grid-cols-4 gap-4 mt-16 mb-6">
                <div className="flex flex-col justify-center items-center h-32 w-72 rounded-xl bg-[#625bbe]">
                    <h1 className="text-[26px] font-bold text-white">{totalPacientes}</h1>
                    <span className="text-white">Total de usuarios pacientes</span>
                </div>
                <div className="flex flex-col justify-center items-center h-32 w-72 rounded-xl bg-[#625bbe]">
                    <h1 className="text-[26px] font-bold text-white">{totalPsicologos}</h1>
                    <span className="text-white">Total de usuarios psicólogos</span>
                </div>
                <div
                    className={`flex flex-col ${
                        totalPsicologosAprobacion === 0 ? 'items-center pl-0' : ''
                    } justify-center h-32 w-72 rounded-xl bg-[#625bbe]`}
                >
                    {totalPsicologosAprobacion === 0 ? (
                        <span className="text-center text-white">No hay psicólogos pendientes de aprobación</span>
                    ) : (
                        <>
                            <h1 className="text-[26px] font-bold text-white">{totalPsicologosAprobacion}</h1>
                            <span className="text-white">Cantidad de psicologos para aprobar</span>
                        </>
                    )}
                </div>
            </div>

            <MenuNavegacionAdmin data={users?.data?.data ?? []} />
        </div>
    );
};

export default AdminDashboard;
