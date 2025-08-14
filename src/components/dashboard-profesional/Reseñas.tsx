"use client"
import { useEffect, useState } from "react";

    const Reseñas = () => {
        const [reseñas, setReseñas] = useState(null);
    
        useEffect(() => {
            const token = localStorage.getItem("authToken");
            if (!token) return;
    
            fetch("http://localhost:8080/psychologist/reviews", {
                headers: { 
                    Authorization: `Bearer ${token}` 
                },
            })
            .then(res => res.json())
                .then(response => {
                setReseñas(response.message);
            })
            .catch(console.error);
        }, []);

        console.log(reseñas)
    return(
        <div className="flex flex-col gap-3 px-8 py-8 h-fit">
            <div>
                <h1 className="text-xl font-semibold text-black">Reseñas sobre vos</h1>
                <span className="text-black">Análisis de desempeño y temas de tus reseñas</span>
            </div>
            <div>
                {reseñas ? JSON.stringify(reseñas) : "Cargando reseñas..."}
            </div>
            {/* <div>
                {dashboardProfesionalMock.reseñas.map((res, index) => (
                    <div key={index} className="items-center w-full px-5 py-3 my-4 bg-gray-200 border-2 border-gray-300 rounded-lg ">
                        <div className="flex flex-row justify-between">
                            <span className="font-bold">{res.autor}</span>
                            <span>{res.fecha}</span>
                        </div>
                        <p>{res.comentario}</p>
                        <div className="flex flex-row mt-3">
                            {res.valores.map((val, index) => (
                                <div key={index} className="px-3 mr-3 text-white bg-[#5e55df] rounded-xl w-fit">
                                    <span>{val}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div> */}
        </div>
    )
}

export default Reseñas