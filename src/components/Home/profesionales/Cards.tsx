import { Calendar } from "lucide-react";
import { Star } from "lucide-react";
import { Clock } from "lucide-react";
import { MapPin } from "lucide-react";
import { DollarSign } from "lucide-react";

const Cards = () => {
    const profesionales = [
        {
            id: 1,
            name: "Dra. Sarah Johnson",
            reseñas: "4.9 (127 reseñas)",
            especialidades: ["Ansiedad", "Depresión", "Duelo"],
            ubicacion: "Buenos Aires, Argentina",
            precio: "20.000",
            disponibilidad: "Disponible Hoy"
        },
        {
            id: 2,
            name: "Lic. Martín Pérez",
            reseñas: "4.8 (94 reseñas)",
            especialidades: ["Autoestima", "Estrés", "Relaciones"],
            ubicacion: "Córdoba, Argentina",
            precio: "18.500",
            disponibilidad: "Disponible Mañana"
        },
        {
            id: 3,
            name: "Dra. Camila Torres",
            reseñas: "5.0 (210 reseñas)",
            especialidades: ["Trauma", "Ataques de pánico", "Fobias"],
            ubicacion: "Rosario, Argentina",
            precio: "22.000",
            disponibilidad: "Disponible Hoy"
        }
    ]

    return(
        <>
            {profesionales.map((profesional) => (
                <div key={profesional.id} className="p-5 border-2 border-gray-300 md:mx-10 rounded-xl w-80 md:w-96 min-h-72 max-h-fit">
                    <div className="flex flex-row items-center gap-3">
                        <div className="bg-[#DFDFDF] rounded-full w-14 h-14"></div>
                        <div className="flex flex-col">
                            <span className="font-bold">{profesional.name}</span>
                            <div className="flex flex-row items-center">
                                <Star height={15} className="text-yellow-400"/>
                                <span className="text-[#3C3C3C] text-sm">{profesional.reseñas}</span>
                            </div>
                        </div>
                    </div>

                    <ul className="flex flex-row flex-wrap gap-3 mt-5">
                        {profesional.especialidades.map((especialidad, index) => (
                            <li key={index} className="py-1 text-[12px] px-2 w-fit text-black bg-[#DFDFDF] rounded-[50px]">{especialidad}</li>
                        ))}
                    </ul>

                    <div className="flex flex-col items-start text-[#3C3C3C] gap-1 text-sm mt-5 pl-3">
                        <div className="flex flex-row items-center gap-1">
                            <MapPin height={15}/>
                            <span>{profesional.ubicacion}</span>
                        </div>
                        <div className="flex flex-row items-center gap-1">
                            <DollarSign height={15}/>
                            <span>$ {profesional.precio}/sesión</span>
                        </div>
                        <div className="flex flex-row items-center gap-1">
                            <Clock height={15} className="text-green-700"/>
                            <span className="text-green-700">{profesional.disponibilidad}</span>
                        </div>
                    </div>
                    
                    <div className="flex flex-row gap-5 mt-5 ">
                        <button className="hover:bg-gray-200 px-3 w-[45%] py-1 border-2 border-gray-400 rounded-md text-md">Ver Perfil</button>
                        <button className="hover:bg-gray-900 flex flex-row gap-2 px-3 w-[45%] py-1 bg-black text-white items-center justify-center rounded-md text-md">
                            <Calendar height={20}/>
                            Reservar
                        </button>
                    </div>
                </div>
            ))}
        </>
    )
}

export default Cards;