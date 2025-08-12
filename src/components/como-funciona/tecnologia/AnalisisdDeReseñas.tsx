import { CheckCircle, Star } from "lucide-react"

const array = [
    "Análisis de sentimientos en tiempo real",
    "Detección de temas y patrones",
    "Verificación de autenticidad",
    "Resúmenes automáticos de fortalezas"
]

const AnalisisdDeReseñas = () => {
    return (
        <div className="grid grid-cols-2 gap-5">

            <div className="bg-[#fff1d0] m-10 rounded-xl flex items-center justify-center">
                <Star className="w-20 h-20 text-[#ca8a04]"/>
            </div>

            <div className="flex flex-col p-8 text-start">
                <h1 className="mb-5 text-xl font-bold">Análisis de Reseñas</h1>
                <span className="text-gray-600">Utilizamos procesamiento de lenguaje natural para analizar reseñas y proporcionar insights valiosos:</span>
                <ul className="flex flex-col justify-between h-32 mt-6">
                    {array.map((info, index) => (
                        <div key={index} className="flex flex-row items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-violet-950"/>
                            <li className="text-sm text-gray-700">{info}</li>
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default AnalisisdDeReseñas