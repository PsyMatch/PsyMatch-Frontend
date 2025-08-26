'use client';
import { envs } from '@/config/envs.config';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const Reseñas = () => {
    interface Review {
        review_date?: string;
        comment?: string;
        [key: string]: unknown;
    }

    const [reseñas, setReseñas] = useState<Review[]>([]);
    const [userId, setUserId] = useState<string | null>(null);
    const [loader, setLoader] = useState<boolean>(true);

    useEffect(() => {
        const token = Cookies.get('auth_token');
        if (!token) return;

        fetch(`${envs.next_public_api_url}/psychologist/me`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => res.json())
            .then((response) => {
                if (response?.data?.id) setUserId(String(response.data.id));
            })
            .catch((e) => console.error(e));
    }, []);

    useEffect(() => {
        if (!userId) return;
        const token = Cookies.get('auth_token');
        if (!token) return;

        fetch(`${envs.next_public_api_url}/reviews/${userId}`, {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => res.json())
            .then((response) => {
                const reviews = response?.reviews?.reviews || [];
                setReseñas(Array.isArray(reviews) ? reviews : []);
                setLoader(false);
            })
            .catch((e) => {
                console.error(e);
                setLoader(false);
            });
    }, [userId]);

    return (
        <div className="flex flex-col gap-3 px-8 py-8 h-fit">
            <div>
                <h1 className="text-xl font-semibold text-black">Reseñas sobre vos</h1>
                {loader === true ? (
                    <span className="text-black">Cargando reseñas...</span>
                ) : (
                    <span className="text-black">Análisis de desempeño y temas de tus reseñas</span>
                )}
            </div>
            <div>
                {reseñas?.map((res, index) => (
                    <div key={index} className="items-center w-full px-5 py-3 my-4 bg-gray-200 border-2 border-gray-300 rounded-lg ">
                        <div className="flex flex-row justify-between mb-3">
                            <span>{res.review_date}</span>
                        </div>
                        <p>{res.comment}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Reseñas;
