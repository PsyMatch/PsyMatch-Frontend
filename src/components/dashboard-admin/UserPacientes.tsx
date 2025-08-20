"use client"

import { Paciente } from "@/app/dashboard/admin/page";
import Image from "next/image";

interface UserPacientesProps {
  data: Paciente[];
}
const UserPacientes = ({ data }: UserPacientesProps) => {
    const pacientes = data.filter((u) => u.role === "Paciente");

    return (
        <div className="w-full min-h-[500px] flex flex-col">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-[#5046E7] rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm font-bold">👥</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Gestión de Pacientes</h2>
                <div className="ml-auto bg-[#5046E7]/10 text-[#5046E7] px-3 py-1 rounded-full text-sm font-semibold">
                    {pacientes.length} pacientes
                </div>
            </div>
            
            <div className="flex-1">
                {pacientes.length === 0 ? (
                    <div className="bg-gradient-to-r from-[#5046E7]/10 to-[#6366F1]/10 border border-[#5046E7]/20 rounded-lg p-12 text-center">
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-16 h-16 bg-[#5046E7]/20 rounded-full flex items-center justify-center">
                                <span className="text-2xl">👥</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-700">No hay pacientes registrados</h3>
                            <p className="text-gray-500 max-w-md">
                                Los pacientes aparecerán aquí cuando se registren en la plataforma.
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {pacientes.map((paciente) => (
                            <div key={paciente.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all duration-200">
                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-row gap-4">
                                        <div className="w-16 h-16 bg-gray-200 rounded-full flex-shrink-0">
                                            <Image 
                                                src={paciente.profile_picture || "/person-gray-photo-placeholder-woman.webp"} 
                                                alt={`Foto de ${paciente.name}`} 
                                                width={64}
                                                height={64}
                                                className="object-cover w-full h-full rounded-full" 
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-[#5046E7] text-lg">{paciente.name}</h3>
                                            <p className="text-gray-600 text-sm">📧 {paciente.email}</p>
                                            <p className="text-gray-600 text-sm">📱 {paciente.phone}</p>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-sm"><strong>DNI:</strong> {paciente.dni}</p>
                                        <p className="text-sm"><strong>Fecha de Nacimiento:</strong> {paciente.birthdate}</p>
                                        <div className="mt-3 p-3 bg-[#5046E7]/10 rounded-lg border border-[#5046E7]/20">   
                                            <p className="text-sm font-semibold text-[#5046E7] mb-1">Contacto de Emergencia:</p>
                                            {paciente.emergency_contact === null ? 
                                                <p className="text-sm text-gray-500">No registrado</p>
                                                : 
                                                <p className="text-sm">{paciente.emergency_contact}</p>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default UserPacientes