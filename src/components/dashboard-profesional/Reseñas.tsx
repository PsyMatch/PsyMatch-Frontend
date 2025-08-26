'use client';
import { envs } from '@/config/envs.config';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const Reseñas = () => {
    const [reseñas, setReseñas] = useState<any[]>([]);

    const idUser = useEffect(() => {
        const token = Cookies.get('auth_token');
        if (!token) return;
        fetch(`${envs.next_public_api_url}/psychologist/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((response) => {
                Cookies.set("id", response.data.id)
            })
            .catch(console.error);
    }, []);

    const [loader, setLoader] = useState(true)

    useEffect(() => {
        try{
            const token = Cookies.get('auth_token');
            if (!token) return;
    
            const id = Cookies.get("id")
    
            fetch(`${envs.next_public_api_url}/reviews/${id}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => res.json())
                .then((response) => {
                    setReseñas(response.reviews.reviews);
                    setLoader(false)
                })
                .catch(console.error);
        }catch(err){
            console.error(err)
            setLoader(false)
        }
    }, [idUser]);

    return (
        <div className="flex flex-col gap-3 px-8 py-8 h-fit">
            <div>
                <h1 className="text-xl font-semibold text-black">Reseñas sobre vos</h1>
                {loader === true ? <span className="text-black">Cargando reseñas...</span> : <span className="text-black">Análisis de desempeño y temas de tus reseñas</span>}
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
