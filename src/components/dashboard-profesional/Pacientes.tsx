import { dashboardProfesionalMock } from "@/helpers/dashboardProfesionalMock"

const Pacientes = () => {
    return(
        <div className="flex flex-col gap-3 px-8 py-8 h-fit">
            <div>
                <h1 className="text-xl font-semibold text-black">Lista de Pacientes</h1>
                <span className="text-black">Gestiona tu lista de pacientes activos y completados</span>
            </div>
            <div>
                {dashboardProfesionalMock.pacientes.map((pac, index) => (
                    <div key={index} className="grid bg-gray-200 border-2 border-gray-300 items-center py-3 px-5 rounded-lg w-full grid-cols-[0.2fr_2fr_0.2fr] my-4">
                        <div className="w-10 h-10 bg-white rounded-full"></div>
                        <div className="flex flex-col gap-1">
                            <span className="font-extrabold text-black">{pac.nombre}</span>
                            <span className="text-sm text-black">{pac.problema}</span>
                            <div className="flex flex-row gap-2">
                                <span className="text-xs text-black">{pac.sesiones} Sesiones -</span>
                                <span className="text-xs text-black">Última: {pac.ultimaSesion}</span>
                            </div>
                        </div>
                        <div className="flex items-end">
                            <button className="px-10 py-2 text-white rounded-md bg-[#4138CA]">
                                Mensaje
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Pacientes