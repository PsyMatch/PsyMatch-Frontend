"use client"
import { dashboardProfesionalMock } from "@/helpers/dashboardProfesionalMock"
import { useEffect, useState } from "react";

const Finanzas = () => {
    const [finanzas, setFinanzas] = useState(null);
        
            useEffect(() => {
                const token = localStorage.getItem("authToken");
                if (!token) return;
        
                fetch("http://localhost:8080/psychologist/payments", {
                    headers: { 
                        Authorization: `Bearer ${token}` 
                    },
                })
                .then(res => res.json())
                    .then(response => {
                    setFinanzas(response.message);
                })
                .catch(console.error);
            }, []);
    
            console.log(finanzas)
    return(
        <div className="flex flex-col gap-3 px-8 py-8 h-fit">
            <div className="flex flex-col justify-between">
                <div className="mb-8">
                    <h1 className="text-xl font-semibold text-black">Transacciones Recientes</h1>
                    <span className="text-black">Historial de pagos y facturación</span>
                </div>
                <div>
                    {finanzas ? JSON.stringify(finanzas) : "Cargando finanzas..."}
                </div>
                {/* <div>
                  {dashboardProfesionalMock.transacciones.map((tran, index) => (
                    <div key={index} className="flex flex-row items-center justify-between w-full px-6 py-4 mb-4 bg-gray-200 border-2 border-gray-300 rounded-xl">
                        <div className="flex flex-col gap-2">
                            <span className="font-bold">{tran.nombre}</span>
                            <div className="flex flex-row gap-1 text-sm">
                                <span>{tran.hora} -</span>
                                <span>{tran.tipo}</span>
                            </div>
                        </div>
                        <div>
                            <span className="font-bold">{tran.valor}</span>
                        </div>
                    </div>
                  ))}
                </div> */}
            </div>
        </div>
    )
}

export default Finanzas