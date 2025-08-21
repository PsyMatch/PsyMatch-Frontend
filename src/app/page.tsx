'use client';
import Information from '@/components/Home/Information/Information';
import Match from '@/components/Home/Match/Match';
import Profesionales from '@/components/Home/profesionales/Profesionales';
import Start from '@/components/Home/Start/Start';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

export default function Home() {
    const [token, setToken] = useState<string | undefined>(undefined);

    useEffect(() => {
        const cookieToken = Cookies.get('auth_token');
        setToken(cookieToken);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Match />
            {token && <Profesionales />}
            <Information />
            <Start />
        </div>
    );
}
