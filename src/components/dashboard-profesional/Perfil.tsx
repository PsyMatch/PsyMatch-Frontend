"use client"
import { Pencil } from "lucide-react"
import Input from "../ui/input"
import { useState } from "react"

import { dashboardProfesionalMock } from "@/helpers/dashboardProfesionalMock"
import { profesionales } from "@/helpers/professional"

const Perfil = () => {
    const [editable, setEditable] = useState(false)
    return(
        <div className="flex flex-col gap-3 px-8 py-8 h-fit">
            <div className="flex flex-row justify-between">
                <div>
                    <h1 className="text-xl font-semibold text-black">Gestion de Perfil</h1>
                    <span className="text-black">Actualiza tu información profesional y configuración</span>
                </div>
                <button onClick={() => setEditable(!editable)} className="flex flex-row gap-2 px-4 py-2 font-bold rounded-md h-fit bg-violet-600 hover:bg-violet-400">
                    {editable ? "Guardar" : <><Pencil /> Editar</>}
                </button>
            </div>
                <div className="flex flex-col gap-6">
                    <div className="grid grid-cols-2 gap-20 mt-8">
                        <div className="flex flex-col">
                            <label className="font-bold">Nombre Completo</label>
                            <Input 
                                className={`border rounded px-3 py-2 
                                    ${editable ? "bg-white" : "bg-violet-400 text-gray-500 cursor-not-allowed"}`}
                                placeholder={dashboardProfesionalMock.profesional.nombre}
                                readOnly={!editable}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="font-bold">Titulo Profesional</label>
                            <Input 
                                className={`border rounded px-3 py-2 
                                    ${editable ? "bg-white" : "bg-violet-400 text-gray-500 cursor-not-allowed"}`}
                                placeholder={dashboardProfesionalMock.profesional.titulo}
                                readOnly={!editable}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <label className="font-bold">Biografía Profeisonal</label>
                        <textarea 
                            className={`border rounded px-3 py-2 resize-none
                                ${editable ? "bg-white" : "bg-violet-400 text-gray-500 cursor-not-allowed"}`}
                            readOnly={!editable}
                            placeholder={dashboardProfesionalMock.profesional.biografia}
                        />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-20 mt-8">
                        <div className="flex flex-col">
                            <label className="font-bold">Precio por Sesión ($)</label>
                            <Input 
                                className={`border rounded px-3 py-2 
                                    ${editable ? "bg-white" : "bg-violet-400 text-gray-500 cursor-not-allowed"}`}
                                placeholder="Morena"
                                readOnly={!editable}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="font-bold">Disponibilidad</label>
                            <textarea 
                                className={`border rounded px-3 py-2 text-wrap h-28 resize-none
                                    ${editable ? "bg-white" : "bg-violet-400 text-gray-500 cursor-not-allowed"}`}
                                placeholder={dashboardProfesionalMock.diasDisponibles.join()}
                                readOnly={!editable}
                            />
                        </div>
                    </div>
                        <div className="flex flex-col">
                            <label className="font-bold">Especialidades</label>
                            <div className="flex flex-row gap-4 mt-2">
                                {dashboardProfesionalMock.profesional.serviciosYEspecialidades.map((serv, index) => (
                                    <span key={index} className="bg-violet-400 px-4 py-[2px] text-sm  font-bold rounded-xl">{serv}</span>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <label className="font-bold">Idioma</label>
                            <div className="flex flex-row gap-4 mt-2">
                                {dashboardProfesionalMock.profesional.idioma.map((idioma, index) => (
                                    <span key={index} className="bg-violet-400 px-4 py-[2px] text-sm font-bold rounded-xl">{idioma}</span>
                                ))}
                            </div>
                        </div>
                </div>
        </div>
    )
}

export default Perfil