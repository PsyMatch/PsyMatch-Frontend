'use client';
import dynamic from 'next/dynamic';
const MenuNavegacion = dynamic(() => import('../../../components/dashboard-profesional/MenuNavegacion'), { ssr: false });
import Cookies from 'js-cookie';
import PendingProfessional from '../PendingProfessional';
import { useEffect, useState } from 'react';
import { envs } from '@/config/envs.config';

const DashboardProfessional = () => {
    const [verified, setVerified] = useState<string | null>(null);

    useEffect(() => {
        const token = Cookies.get('auth_token');
        if (!token) return;

        const fetchProfile = () => {
            fetch(`${envs.next_public_api_url}/psychologist/me`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => res.json())
                .then((response) => {
                    setVerified(response.data.verified);
                })
                .catch(() => {});
        };

        fetchProfile(); // primera llamada
        const interval = setInterval(fetchProfile, 5000); // cada 5s

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-[100%] flex justify-center pt-10 bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="w-[90%] mb-8">{verified === 'Pendiente' ? <PendingProfessional /> : <MenuNavegacion />}</div>
        </div>
    );
};

export default DashboardProfessional;
