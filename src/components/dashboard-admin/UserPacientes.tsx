"use client"

import { Paciente } from "@/app/dashboard/admin/page";

interface UserPacientesProps {
  data: Paciente[];
}
const UserPacientes = ({ data }: UserPacientesProps) => {
    const pacientes = data.filter((u) => u.role === "Paciente");

    return (
        <div className="w-[90%] h-fit bg-white rounded-xl">
            <ul className="grid grid-cols-2 gap-10 p-8">
                {pacientes.map((paciente) => (
                    <a key={paciente.id} href={`/professionalProfile/${paciente.id}`}>
                        <div className="flex flex-col items-start justify-center w-full h-full gap-2 p-4 bg-gray-100 border-2 border-gray-200 rounded-md text-start">
                            <div className="flex flex-row gap-5">
                                <div className="w-24 h-24 bg-gray-200 rounded-full">
                                        <img src={paciente.profile_picture} alt="error" className="object-cover w-full h-full rounded-full" />
                                    </div>
                                    <div>
                                        <li className="font-bold text-violet-800">{paciente.name}</li>
                                        <li>Mail: {paciente.email}</li>
                                        <li>Teléfono: {paciente.phone}</li>
                                    </div>
                                </div>
                                <div className="w-full">
                                    <li><strong>DNI:</strong> {paciente.dni}</li>
                                    <li><strong>Fecha de Nacimiento:</strong> {paciente.birthdate}</li>
                                    <div className="mt-3 text-center rounded-full bg-violet-200">   
                                        <li><strong>Contacto de Emergencia:</strong></li>
                                        {paciente.emergency_contact === null ? 
                                        <li>No tiene contacto de emergencia</li> 
                                        : 
                                        <li>{paciente.emergency_contact}</li>}
                                    </div>
                                </div>
                            </div>
                        </a>
                    ))}
            </ul>
        </div>
    )
}

export default UserPacientes