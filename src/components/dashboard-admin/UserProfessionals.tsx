"use client"
import { Paciente } from "@/app/dashboard/admin/page";
import { envs } from "@/config/envs.config";
import Image from "next/image";
import { useState } from "react";
import Cookies from 'js-cookie';

interface UserProfessionalsProps {
  data: Paciente[];
}
const UserProfessionals = ({ data }: UserProfessionalsProps) => {

    const handleAccept = async (id: string) => {
        const token = localStorage.getItem('authToken') || Cookies.get('authToken') || Cookies.get('auth_token');
        const response = await fetch(`${envs.next_public_api_url}/psychologist/verification/${id}/verify`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const result = await response.json();
        console.log(result);
    };

    const [filter, setFilter] = useState<"Pendiente" | "Validado">("Pendiente");

    const profesionales = data.filter((u) => u.role === "Psicólogo");
    const filtrados = profesionales.filter((u) => u.verified === filter);
    const [ alerta, setAlerta] = useState(false);

    return (
        <div className="w-full min-h-[500px] flex flex-col">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-[#5046E7] rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm font-bold">👨‍⚕️</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Gestión de Psicólogos</h2>
                <div className="ml-auto bg-[#5046E7]/10 text-[#5046E7] px-3 py-1 rounded-full text-sm font-semibold">
                    {filtrados.length} psicólogos
                </div>
            </div>
            
            <div className="flex items-center w-full h-12 gap-2 mb-6">
                <button
                    type="button"
                    className={`flex-1 h-full rounded-md transition-colors font-medium ${
                        filter === "Pendiente" ? "bg-[#5046E7] text-white" : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                    }`}
                    onClick={() => setFilter("Pendiente")}
                >
                    PENDIENTES
                </button>
                <button
                    type="button"
                    className={`flex-1 h-full rounded-md transition-colors font-medium ${
                        filter === "Validado" ? "bg-[#5046E7] text-white" : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                    }`}
                    onClick={() => setFilter("Validado")}
                >
                    APROBADOS
                </button>
            </div>
            
            <div className="flex-1">
                {filtrados.length === 0 ? (
                    <div className="bg-gradient-to-r from-[#5046E7]/10 to-[#6366F1]/10 border border-[#5046E7]/20 rounded-lg p-12 text-center">
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-16 h-16 bg-[#5046E7]/20 rounded-full flex items-center justify-center">
                                <span className="text-2xl">👨‍⚕️</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-700">
                                No hay psicólogos {filter.toLowerCase()}
                            </h3>
                            <p className="text-gray-500 max-w-md">
                                {filter === "Pendiente" 
                                    ? "No hay psicólogos esperando aprobación en este momento."
                                    : "No hay psicólogos aprobados aún."
                                }
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {filtrados?.map((psicologo) => (
                            <div key={psicologo.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all duration-200">
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-start gap-4">
                                        <div className="w-16 h-16 bg-gray-200 rounded-full flex-shrink-0">
                                            <Image 
                                                src={psicologo.profile_picture || "/person-gray-photo-placeholder-woman.webp"} 
                                                alt={`Foto de ${psicologo.name}`}
                                                width={64}
                                                height={64}
                                                className="object-cover w-full h-full rounded-full" 
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-[#5046E7] text-lg">{psicologo.name}</h3>
                                            <p className="text-gray-600 text-sm">📧 {psicologo.email}</p>
                                            <p className="text-gray-600 text-sm">📱 {psicologo.phone}</p>
                                        </div>
                                        <div className="flex-shrink-0">
                                            <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                                                psicologo.verified === "Validado" 
                                                    ? "bg-green-100 text-green-800" 
                                                    : "bg-orange-100 text-orange-800"
                                            }`}>
                                                {psicologo.verified}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <p className="text-sm"><strong>DNI:</strong> {psicologo.dni}</p>
                                        <p className="text-sm"><strong>Fecha de Nacimiento:</strong> {psicologo.birthdate}</p>
                                        <p className="text-sm"><strong>Años de Experiencia:</strong> {psicologo.professional_experience}</p>
                                    </div>
                                    
                                    <div className="flex gap-2 mt-4">
                                        {psicologo.verified === "Pendiente" && (
                                            <button  
                                                onClick={() => setAlerta(true)} 
                                                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm font-medium"
                                                type="button"
                                            >
                                                Aprobar
                                            </button>                         
                                        )}
                                        <button 
                                            className="px-4 py-2 bg-[#5046E7] text-white rounded-md hover:bg-[#4338CA] transition-colors text-sm font-medium" 
                                            type="button"
                                            onClick={() => {
                                                // Aquí podrías abrir un modal con el perfil completo
                                                // en lugar de navegar a otra página
                                                alert(`Ver perfil completo de ${psicologo.name} - ID: ${psicologo.id}`);
                                            }}
                                        >
                                            Ver Perfil
                                        </button>
                                    </div>
                                </div>
                                
                                {alerta && (
                                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                                        <div className="p-6 bg-white shadow-xl rounded-xl w-96">
                                            <h3 className="mb-4 text-lg font-semibold text-center text-gray-800">
                                                Confirmar Aprobación
                                            </h3>
                                            <p className="mb-6 text-center text-gray-600">
                                                ¿Estás seguro de que deseas aprobar a este psicólogo?
                                            </p>
                                            <div className="flex justify-center gap-4">
                                                <button
                                                    onClick={async () => {
                                                        await handleAccept(psicologo.id);
                                                        setAlerta(false);
                                                        // En lugar de recargar la página, podrías actualizar el estado local
                                                        // setFilter(current => current === "Pendiente" ? "Validado" : current);
                                                    }}
                                                    className="px-6 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors"
                                                >
                                                    Confirmar
                                                </button>
                                                <button
                                                    onClick={() => setAlerta(false)}
                                                    className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                                                >
                                                    Cancelar
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default UserProfessionals
