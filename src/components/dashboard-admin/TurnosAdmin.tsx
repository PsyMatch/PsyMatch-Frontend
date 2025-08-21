import { envs } from '@/config/envs.config';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

interface Turno {
    id: number;
    patient_name?: string;
    psychologist_name?: string;
    date?: string;
    time?: string;
    status?: string;
}

const TurnosAdmin = () => {
    const [turnos, setTurnos] = useState<Turno[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('authToken') || Cookies.get('authToken') || Cookies.get('auth_token');
        const fetchData = async () => {
            try {
                const response = await fetch(`${envs.next_public_api_url}/appointments`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const result = await response.json();
                console.log(result);
                setTurnos(result);
            } catch (error) {
                console.error('Error al cargar turnos:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="w-full min-h-[500px] flex items-center justify-center">
                <div className="flex items-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#5046E7]"></div>
                    <span className="ml-3 text-gray-600">Cargando turnos...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full min-h-[500px] flex flex-col">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-[#5046E7] rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm font-bold">📅</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Gestión de Citas</h2>
                <div className="ml-auto bg-[#5046E7]/10 text-[#5046E7] px-3 py-1 rounded-full text-sm font-semibold">
                    {turnos.length} citas
                </div>
            </div>
            
            <div className="flex-1">
                {turnos.length === 0 ? (
                    <div className="flex items-center justify-center h-full">
                        <div className="bg-gradient-to-r from-[#5046E7]/10 to-[#6366F1]/10 border border-[#5046E7]/20 rounded-lg p-8 text-center w-full max-w-2xl">
                            <div className="flex flex-col items-center gap-4">
                                <div className="w-16 h-16 bg-[#5046E7]/20 rounded-full flex items-center justify-center">
                                    <span className="text-2xl">📋</span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-700">No hay citas registradas</h3>
                                <p className="text-gray-500 max-w-md">
                                    Aún no se han programado citas en el sistema. Las citas aparecerán aquí cuando los pacientes las reserven.
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {turnos.map((turno) => (
                            <div key={turno.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                <div className="flex flex-col gap-3">
                                    <div className="flex items-center justify-between">
                                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                                            turno.status === 'confirmed' 
                                                ? 'bg-green-100 text-green-800'
                                                : turno.status === 'pending'
                                                ? 'bg-yellow-100 text-yellow-800'
                                                : 'bg-red-100 text-red-800'
                                        }`}>
                                            {turno.status || 'Pendiente'}
                                        </span>
                                        <span className="text-sm text-gray-500">
                                            #{turno.id}
                                        </span>
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <p className="font-medium text-gray-800">
                                            {turno.patient_name || 'Paciente no especificado'}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            <strong>Psicólogo:</strong> {turno.psychologist_name || 'No asignado'}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            <strong>Fecha:</strong> {turno.date || 'No especificada'}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            <strong>Hora:</strong> {turno.time || 'No especificada'}
                                        </p>
                                    </div>
                                    
                                    <div className="flex gap-2 mt-3">
                                        <button className="px-3 py-1 bg-[#5046E7] text-white rounded text-sm hover:bg-[#4338CA] transition-colors">
                                            Ver Detalles
                                        </button>
                                        {turno.status === 'pending' && (
                                            <button className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors">
                                                Confirmar
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TurnosAdmin;
