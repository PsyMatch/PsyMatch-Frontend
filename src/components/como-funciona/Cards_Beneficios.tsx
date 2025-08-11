import { CheckCheckIcon, CheckCircle } from "lucide-react"

const paraPacientes = [
    "Encuentra el terapeuta perfecto en minutos",
    "Ahorra tiempo con emparejamiento inteligente",
    "Accede a reseñas verificadas y transparentes",
    "Reserva citas 24/7 desde cualquier lugar",
    "Soporte continuo durante tu tratamiento",
    "Precios transparentes sin sorpresas"
]

const paraTerapeutas = [
    "Conecta con pacientes ideales para tu especialidad",
    "Gestiona tu práctica con herramientas avanzadas",
    "Recibe feedback valioso para mejorar",
    "Aumenta tu visibilidad profesional",
    "Herramientas de comunicación seguras",
    "Análisis detallados de tu práctica"
]

const Cards_Beneficios = () => {

    return(
        <div className="grid w-full grid-cols-2 gap-20 px-40 mt-10 mb-20 justify-items-center">
            <div className="flex flex-col items-start gap-2 p-8 text-center bg-white border-2 border-gray-300 rounded-lg h-fit w-[90%]">
                <div className="ml-6 text-[24px] font-bold">Para Pacientes</div>
                <ul className="flex flex-col justify-between mt-2 h-44">
                    {paraPacientes.map((info, index) => (
                        <div key={index} className="flex flex-row items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-violet-950"/>
                            <li className="text-sm text-gray-700">{info}</li>
                        </div>
                    ))}
                </ul>
            </div>
            <div className="flex flex-col items-start gap-2 p-8 text-center bg-white border-2 border-gray-300 rounded-lg h-fit w-[90%]">
                <div className="ml-6 text-[24px] font-bold">Para Terapeutas</div>
                <ul className="flex flex-col justify-between mt-2 h-44">
                    {paraTerapeutas.map((info, index) => (
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

export default Cards_Beneficios