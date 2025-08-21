'use client';
import { envs } from '@/config/envs.config';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

interface Payment {
    id: string;
    amount: number;
    date: string;
    description?: string;
    status?: string;
}

interface FinanzasProps {
    userType?: 'psychologist' | 'user';
}

const Finanzas = ({ userType = 'psychologist' }: FinanzasProps) => {
    const [finanzas, setFinanzas] = useState<Payment[] | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('authToken') || Cookies.get('authToken') || Cookies.get('auth_token');
        if (!token) return;

        let endpoint = '';
        if (userType === 'psychologist') {
            endpoint = `${envs.next_public_api_url}/psychologist/payments`;
        } else {
            endpoint = `${envs.next_public_api_url}/users/patient/payments`;
        }

        fetch(endpoint, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((response) => {
                // Si la respuesta es un array, úsala directamente, si no, intenta acceder a response.message
                if (Array.isArray(response)) {
                    setFinanzas(response);
                } else if (Array.isArray(response.message)) {
                    setFinanzas(response.message);
                } else {
                    setFinanzas([]);
                }
            })
            .catch(() => setFinanzas([]));
    }, [userType]);

    return (
        <div className="flex flex-col gap-3 px-8 py-8 h-fit">
            <div className="flex flex-col justify-between">
                <div className="mb-8">
                    <h1 className="text-xl font-semibold text-black">Transacciones Recientes</h1>
                    <span className="text-black">Historial de pagos y facturación</span>
                </div>
                <div>
                    {!finanzas && 'Cargando finanzas...'}
                    {finanzas && finanzas.length === 0 && <div className="text-gray-500">No hay transacciones registradas.</div>}
                    {finanzas && finanzas.length > 0 && (
                        <div className="flex flex-col gap-2">
                            {finanzas.map((pago) => (
                                <div
                                    key={pago.id}
                                    className="flex flex-row items-center justify-between w-full px-6 py-4 mb-2 bg-gray-200 border-2 border-gray-300 rounded-xl"
                                >
                                    <div className="flex flex-col gap-1">
                                        <span className="font-bold">{pago.description || 'Pago'}</span>
                                        <span className="text-sm text-gray-600">{new Date(pago.date).toLocaleString()}</span>
                                        {pago.status && <span className="text-xs text-gray-500">Estado: {pago.status}</span>}
                                    </div>
                                    <div>
                                        <span className="font-bold text-green-700">${pago.amount.toFixed(2)}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Finanzas;
