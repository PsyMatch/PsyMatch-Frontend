import { Brain, CheckCircle } from "lucide-react"

const array = [
    "Síntomas específicos y severidad",
    "Especialidades y enfoques terapéuticos",
    "Preferencias de comunicación y personalidad",
    "Ubicación, horarios y presupuesto"
]

const EmparejamientoIA = () => {
    return (
        <div className="grid grid-cols-2 gap-5">
            <div className="flex flex-col p-8 text-start">
                <h1 className="mb-5 text-xl font-bold">Algoritmo de Emparejamiento Inteligente</h1>
                <span className="text-gray-600">Nuestro algoritmo de IA analiza múltiples factores para encontrar el terapeuta más compatible:</span>
                <ul className="flex flex-col justify-between h-32 mt-6">
                    {array.map((info, index) => (
                        <div key={index} className="flex flex-row items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-violet-950"/>
                            <li className="text-sm text-gray-700">{info}</li>
                        </div>
                    ))}
                </ul>
            </div>

            <div className="bg-[#A5B5FC] m-10 rounded-xl flex items-center justify-center">
                <Brain className="w-20 h-20 text-[#4f46e5]"/>
            </div>
        </div>
    )
}

export default EmparejamientoIA