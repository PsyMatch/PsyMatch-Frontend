import { dashboardProfesionalMock } from "@/helpers/dashboardProfesionalMock"

const Terapeutas = () => {
    // Simulación: usarías los datos de terapeutas del usuario aquí
    const terapeutas = dashboardProfesionalMock.pacientes.map((pac) => ({
        ...pac,
        nombre: pac.nombre.replace("Paciente", "Terapeuta"), // Solo para simular
        problema: "Especialidad: Psicología" // Simulación
    }));
    return(
        <div className="flex flex-col gap-3 px-8 py-8 h-fit">
            <div>
                <h1 className="text-xl font-semibold text-black">Lista de Terapeutas</h1>
                <span className="text-black">Gestiona tu lista de terapeutas</span>
            </div>
            <div>
                {terapeutas.map((ter, index) => (
                    <div key={index} className="grid bg-gray-200 border-2 border-gray-300 items-center py-3 px-5 rounded-lg w-full grid-cols-[0.2fr_2fr_0.2fr] my-4">
                        <div className="w-10 h-10 bg-white rounded-full"></div>
                        <div className="flex flex-col gap-1">
                            <span className="font-extrabold text-black">{ter.nombre}</span>
                            <span className="text-sm text-black">{ter.problema}</span>
                            <div className="flex flex-row gap-2">
                                <span className="text-xs text-black">{ter.sesiones} Sesiones -</span>
                                <span className="text-xs text-black">Última: {ter.ultimaSesion}</span>
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

export default Terapeutas
