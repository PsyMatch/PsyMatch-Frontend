import { CheckCircle, Star } from "lucide-react"

const array = [
    "Verificación de autenticidad de reseñas",
    "Análisis de comentarios constructivos",
    "Identificación de fortalezas del terapeuta",
    "Resúmenes claros de experiencias reales"
]

const SistemaDeReseñas = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5 py-6 lg:py-8">

            <div className="bg-[#fff1d0] mx-4 my-4 lg:m-10 rounded-xl flex items-center justify-center h-32 lg:h-auto min-h-[200px] order-first lg:order-first">
                <Star className="w-12 h-12 lg:w-20 lg:h-20 text-[#ca8a04]"/>
            </div>

            <div className="flex flex-col p-4 lg:p-8 text-start">
                <h1 className="mb-3 lg:mb-5 text-lg lg:text-xl font-bold">Sistema de Reseñas Verificadas</h1>
                <span className="text-gray-600 text-sm lg:text-base mb-4 lg:mb-6">Nuestro sistema de reseñas está diseñado para proporcionar información auténtica y útil:</span>
                <ul className="flex flex-col gap-2 lg:gap-3">
                    {array.map((info, index) => (
                        <div key={index} className="flex flex-row items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-violet-950 flex-shrink-0 mt-0.5"/>
                            <li className="text-xs lg:text-sm text-gray-700">{info}</li>
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default SistemaDeReseñas