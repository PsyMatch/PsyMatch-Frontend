'use client';
import MenuNavegacion from '../../../components/dashboard-profesional/MenuNavegacion';

import Cookies from 'js-cookie';
import PendingProfessional from '../PendingProfessional';
import { useEffect, useState } from 'react';

const DashboardProfessional = () => {
    const [verified, setVerified] = useState<string | null>(null);

    useEffect(() => {
        const verifiedCookie = Cookies.get('verified');
        console.log('Estado de verificación:', verifiedCookie);
        setVerified(verifiedCookie || null);
    }, []);

    return (
        <div className="w-[100%] flex justify-center pt-10 bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="w-[90%] mb-8">{verified === 'Pendiente' ? <PendingProfessional /> : <MenuNavegacion />}</div>
        </div>
    );
};

export default DashboardProfessional;
