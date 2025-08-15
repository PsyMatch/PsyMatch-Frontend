"use client"
import { useEffect, useState } from 'react';


const Citas = () => {
    const [citas, setCitas] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (!token) return;

        fetch("http://localhost:8080/psychologist/appointments", {
            headers: { 
                Authorization: `Bearer ${token}` 
            },
        })
        .then(res => res.json())
            .then(response => {
            setCitas(response.message);
        })
        .catch(console.error);
    }, []);

    console.log(citas)

    return (
        <div className="flex flex-col gap-3 px-8 py-8 h-fit">
            <div>
                <h1 className="text-xl font-semibold text-black">Gestion de Citas</h1>
                <span className="text-black">Gestiona tus citas programadas y disponibilidad</span>
            </div>
            <div>
                {citas ? JSON.stringify(citas) : "Cargando citas..."}
            </div>
            {/* <div>
                {citas.map((cita, index) => (
                    <div key={index} className="relative items-center w-full px-5 py-3 my-4 bg-gray-200 border-2 border-gray-300 rounded-lg ">
                        <div className="absolute z-10 flex flex-row items-center gap-2 top-3 right-4">
                            <span
                                className={`px-3 py-1 rounded-full text-xs font-bold ${
                                    cita.estado === 'aceptado'
                                        ? 'bg-green-200 text-green-800'
                                        : cita.estado === 'pendiente'
                                        ? 'bg-yellow-200 text-yellow-800'
                                        : 'bg-red-200 text-red-800'
                                }`}
                            >
                                {cita.estado.charAt(0).toUpperCase() + cita.estado.slice(1)}
                            </span>
                            {(cita.estado === 'aceptado' || cita.estado === 'pendiente') && (
                                <button
                                    className="px-5 py-2 ml-2 text-base font-bold text-white transition-transform duration-150 border-2 border-red-700 rounded shadow-lg bg-gradient-to-r from-red-500 to-red-700 hover:scale-105"
                                    onClick={() => cancelarCita(index)}
                                    type="button"
                                >
                                    Cancelar turno
                                </button>
                            )}
                        </div>
                        <div className="flex flex-row gap-4">
                            <div className="w-10 font-bold text-center text-gray-500">
                                <span>{cita.fecha}</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="font-bold">
                                    {isUserDashboard ? `Con: ${cita.profesional || 'Profesional'}` : `Paciente: ${cita.paciente}`}
                                </span>
                                <div className="flex flex-row gap-2 text-sm">
                                    <span>{cita.horario} -</span>
                                    <span>{cita.duracion} -</span>
                                    <span>{cita.tipoSesion}</span>
                                </div>
                            </div>
                        </div>
                        <p className="mt-4 mb-0 ml-2">
                            <strong>Notas:</strong> {cita.Notas}
                        </p>
                        <div className="flex gap-4 mt-5">
                            <button className="flex flex-row gap-2 items-center px-10 py-2 text-white rounded-md bg-[#4138CA] hover:bg-[#4c42d4]">
                                <MessageCircle />
                                {isUserDashboard ? 'Contactar profesional' : 'Contactar usuario'}
                            </button>
                            <button className="flex flex-row gap-2 items-center px-10 py-2 text-white rounded-md bg-[#4138CA] hover:bg-[#4c42d4]">
                                Unirse a la sesión
                            </button>
                        </div>
                    </div>
                ))}
            </div> */}
        </div>
    );
};

export default Citas;