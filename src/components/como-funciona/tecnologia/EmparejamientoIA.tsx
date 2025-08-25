import { Search, CheckCircle } from "lucide-react"

const array = [
    "Síntomas específicos y severidad",
    "Especialidades y enfoques terapéuticos",
    "Preferencias de comunicación y personalidad",
    "Ubicación, horarios y presupuesto"
]

const BusquedaInteligente = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5 py-6 lg:py-8">
            <div className="flex flex-col p-4 lg:p-8 text-start">
                <h1 className="mb-3 lg:mb-5 text-lg lg:text-xl font-bold">Sistema de Búsqueda Inteligente</h1>
                <span className="text-gray-600 text-sm lg:text-base mb-4 lg:mb-6">Nuestro sistema avanzado analiza múltiples factores para encontrar el terapeuta más compatible:</span>
                <ul className="flex flex-col gap-2 lg:gap-3">
                    {array.map((info, index) => (
                        <div key={index} className="flex flex-row items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-violet-950 flex-shrink-0 mt-0.5"/>
                            <li className="text-xs lg:text-sm text-gray-700">{info}</li>
                        </div>
                    ))}
                </ul>
            </div>

            <div className="bg-[#A5B5FC] mx-4 my-4 lg:m-10 rounded-xl flex items-center justify-center h-32 lg:h-auto min-h-[200px]">
                <Search className="w-12 h-12 lg:w-20 lg:h-20 text-[#4f46e5]"/>
            </div>
        </div>
    )
}

export default BusquedaInteligente