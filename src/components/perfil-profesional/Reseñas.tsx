import { profesionales } from "@/helpers/professional"

type Profesional = typeof profesionales[0];

const Reseñas = ({ data }: { data: Profesional }) => {
    return (
        <div className="w-full p-8 mb-10 bg-white border-2 border-gray-200 h-fit rounded-xl">
            <div className="flex flex-col gap-1">
                <h3 className="text-xl font-bold text-black">Reseñas de Pacientes</h3>
                <span className="text-xs font-semibold text-black">Todas las reseñas son verificadas y analizadas.</span>
            </div>
            <div className="flex flex-col gap-3 mt-6">
                {data.reseñas.map((reseña, index) => (
                    <div key={index} className="w-full p-3 bg-gray-200 border-2 border-gray-300 h-fit rounded-xl">
                        <div className="flex flex-row gap-2">
                            <div className="w-10 h-10 bg-white rounded-full"></div>
                            <span className="font-bold">{reseña.autor}</span>
                        </div>
                        <p className="mt-4 font-semibold text-gray-700">{reseña.comentario}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Reseñas