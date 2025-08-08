import { dashboardProfesionalMock } from "@/helpers/dashboardProfesionalMock"
import { Video } from "lucide-react"
import { MessageCircle } from "lucide-react"

const Citas = () => {
    return(
        <div className="flex flex-col gap-3 px-8 py-8 h-fit">
            <div>
                <h1 className="text-xl font-semibold text-black">Gestion de Citas</h1>
                <span className="text-black">Gestiona tus citas programadas y disponibilidad</span>
            </div>
            <div>
                {dashboardProfesionalMock.citas.map((cita, index) => (
                    <div key={index} className="items-center w-full px-5 py-3 my-4 bg-gray-200 border-2 border-gray-300 rounded-lg ">
                        <div className="flex flex-row gap-4">
                            <div className="w-10 font-bold text-center text-gray-500">
                                <span>{cita.fecha}</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="font-bold">{cita.paciente}</span>
                                <div className="flex flex-row gap-2 text-sm">
                                    <span>{cita.horario} -</span>
                                    <span>{cita.duracion} -</span>
                                    <span>{cita.tipoSesion}</span>
                                </div>
                            </div>
                        </div>

                        <p className="my-4 ml-2"><strong>Notas:</strong> {cita.Notas}</p>

                        <div className="flex gap-4 mt-5">

                            <button className="flex flex-row gap-2 items-center px-10 py-2 text-white rounded-md bg-[#4138CA] hover:bg-[#4c42d4]">
                                <MessageCircle />
                                Contactar
                            </button>
                            <button className="flex flex-row gap-2 items-center px-10 py-2 text-white rounded-md bg-[#4138CA] hover:bg-[#4c42d4]">
                                <Video />
                                Unirse a la sesión
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Citas