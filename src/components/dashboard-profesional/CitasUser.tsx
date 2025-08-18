"use client"
import { useEffect, useState } from 'react';


type Appointment = {
    id: string;
    date: string;
    duration: number;
    status: string;
    modality: string;
    notes?: string;
    patient?: { id: string; name: string; email: string };
    psychologist?: { id: string; name: string; email: string };
};

const CitasUser = () => {
    const [citas, setCitas] = useState<Appointment[]>([]);
    const [userId, setUserId] = useState<string | null>(null);


    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (!token) return;

        // 1. Obtener el usuario logeado
        fetch("http://localhost:8080/users/me", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(res => res.json())
            .then(userRes => {
                if (!userRes || !userRes.data || !userRes.data.id) {
                    window.alert("No se pudo obtener el usuario. Por favor, vuelve a iniciar sesión.");
                    // window.location.href = "/login"; // Descomenta si quieres redirigir
                    return;
                }
                const id = userRes.data.id;
                setUserId(id);

                // 2. Obtener todas las citas
                return fetch("http://localhost:8080/appointments", {
                    headers: { Authorization: `Bearer ${token}` },
                })
                    .then(res => res.json())
                    .then(appointmentsRes => {
                        // 3. Filtrar solo las citas del usuario
                        const citasUsuario = Array.isArray(appointmentsRes)
                            ? appointmentsRes.filter((cita: Appointment) => cita.patient && cita.patient.id === id)
                            : [];
                        setCitas(citasUsuario);
                    });
            })
            .catch((err) => {
                console.error(err);
                window.alert("Ocurrió un error al cargar los datos del usuario.");
            });
    }, []);

    console.log(citas);

    // Función para cancelar cita
    const cancelarCita = (id: string) => {
        if (!window.confirm("¿Estás seguro que deseas cancelar esta cita? Esta acción no se puede deshacer.")) {
            return;
        }
        const token = localStorage.getItem("authToken");
        if (!token) return;
        fetch(`http://localhost:8080/appointments/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(res => res.json())
            .then(() => {
                setCitas(prev => prev.filter(cita => cita.id !== id));
                window.alert("Cita cancelada exitosamente.");
            })
            .catch(() => {
                window.alert("Ocurrió un error al cancelar la cita. Intenta nuevamente.");
            });
    };

    return (
        <div className="flex flex-col gap-3 px-8 py-8 h-fit">
            <div>
                <h1 className="text-xl font-semibold text-black">Mis Citas</h1>
                <span className="text-black">Aquí puedes ver y gestionar tus citas programadas</span>
            </div>
            <div>
                {citas.length > 0 ? (
                    <ul className="space-y-4">
                        {citas.map((cita, idx) => (
                            <li key={cita.id || idx} className="border rounded p-4 flex flex-col gap-2 bg-gray-50">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <span className="font-bold">Fecha:</span> {new Date(cita.date).toLocaleString()}
                                    </div>
                                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                                        cita.status === 'confirmed' ? 'bg-green-200 text-green-800' :
                                        cita.status === 'pending' ? 'bg-yellow-200 text-yellow-800' :
                                        cita.status === 'cancelled' ? 'bg-red-200 text-red-800' :
                                        'bg-gray-200 text-gray-800'
                                    }`}>
                                        {cita.status?.toUpperCase()}
                                    </span>
                                </div>
                                <div>
                                    <span className="font-bold">Modalidad:</span> {cita.modality}
                                </div>
                                <div>
                                    <span className="font-bold">Duración:</span> {cita.duration} min
                                </div>
                                {cita.psychologist && (
                                    <div>
                                        <span className="font-bold">Profesional:</span> {cita.psychologist.name}
                                    </div>
                                )}
                                {cita.notes && (
                                    <div>
                                        <span className="font-bold">Notas:</span> {cita.notes}
                                    </div>
                                )}
                                <button
                                    className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 w-fit"
                                    onClick={() => cancelarCita(cita.id)}
                                    disabled={cita.status === 'cancelled'}
                                >
                                    Cancelar cita
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : "Cargando citas..."}
            </div>
        </div>
    );
};

export default CitasUser;