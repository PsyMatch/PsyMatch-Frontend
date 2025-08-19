'use client';
import { Paciente } from '@/app/dashboard/admin/page';
import Image from 'next/image';
import { useState } from 'react';

interface UserProfessionalsProps {
    data: Paciente[];
}
const UserProfessionals = ({ data }: UserProfessionalsProps) => {
    const handleAccept = async (id: string) => {
        const token = localStorage.getItem('authToken');
        const response = await fetch(`http://localhost:8080/psychologist/verification/${id}/verify `, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const result = await response.json();
        console.log(result);
    };

    const [filter, setFilter] = useState<'Pendiente' | 'Validado'>('Pendiente');

    const profesionales = data.filter((u) => u.role === 'Psicólogo');
    const filtrados = profesionales.filter((u) => u.verified === filter);
    const [alerta, setAlerta] = useState(false);

    return (
        <div className="w-[90%] h-fit bg-white rounded-xl flex flex-col items-center justify-center">
            <div className="grid items-center w-[80%] h-10 grid-cols-2 gap-3 px-1 mt-6 bg-white rounded-md">
                <button
                    type="button"
                    className={`h-[80%] rounded-md transition-colors ${filter === 'Pendiente' ? 'bg-violet-300' : 'bg-gray-200 hover:bg-gray-100'}`}
                    onClick={() => setFilter('Pendiente')}
                >
                    PENDIENTES
                </button>
                <button
                    type="button"
                    className={`h-[80%] rounded-md transition-colors ${filter === 'Validado' ? 'bg-violet-300' : 'bg-gray-200 hover:bg-gray-100'}`}
                    onClick={() => setFilter('Validado')}
                >
                    APROBADOS
                </button>
            </div>
            <ul className="grid grid-cols-2 gap-10 p-8">
                {filtrados?.map((psicologo) => (
                    <div key={psicologo.id}>
                        <div className="flex flex-col items-start justify-center w-full h-full gap-8 p-4 bg-gray-100 border-2 border-gray-200 rounded-md text-start">
                            <div className="grid grid-cols-[1fr,2fr,1fr] w-full">
                                <div className="w-24 h-24 bg-gray-200 rounded-full">
                                    <Image src={psicologo.profile_picture} alt="error" className="object-cover w-full h-full rounded-full" />
                                </div>
                                <div>
                                    <li className="font-bold text-violet-800">{psicologo.name}</li>
                                    <li>Mail: {psicologo.email}</li>
                                    <li>Teléfono: {psicologo.phone}</li>
                                </div>
                                <div className="flex flex-col items-end justify-start">
                                    <span className="px-4 font-bold rounded-full bg-violet-400">{psicologo.verified}</span>
                                </div>
                            </div>
                            <div className="flex flex-row justify-between w-full">
                                <div>
                                    <li>
                                        <strong>DNI:</strong> {psicologo.dni}
                                    </li>
                                    <li>
                                        <strong>Fecha de Nacimiento:</strong> {psicologo.birthdate}
                                    </li>
                                    <li>
                                        <strong>Años de Experiencia:</strong> {psicologo.professional_experience}
                                    </li>
                                </div>
                                <div className="flex flex-col justify-end gap-3">
                                    {psicologo.verified === 'Pendiente' && (
                                        <button
                                            onClick={() => setAlerta(true)}
                                            className="px-4 py-1 rounded-md bg-violet-300 hover:bg-violet-200"
                                            type="button"
                                        >
                                            Aceptar psicologo
                                        </button>
                                    )}
                                    <button
                                        className="px-4 py-1 rounded-md bg-violet-300 hover:bg-violet-200"
                                        type="button"
                                        onClick={() => (window.location.href = `/professionalProfile/${psicologo.id}`)}
                                    >
                                        Ver perfil completo
                                    </button>
                                </div>
                            </div>
                        </div>
                        {alerta && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                                <div className="p-6 bg-white shadow-lg rounded-xl w-80">
                                    <p className="mb-4 text-lg font-medium text-center">Estas seguro de que deseas aceptar a este psicologo?</p>
                                    <div className="flex justify-center gap-4">
                                        <button
                                            onClick={() => {
                                                handleAccept(psicologo.id);
                                                setAlerta(false);
                                                window.location.reload();
                                            }}
                                            className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                                        >
                                            Confirmar
                                        </button>
                                        <button onClick={() => setAlerta(false)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
                                            Cancelar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </ul>
        </div>
    );
};

export default UserProfessionals;
