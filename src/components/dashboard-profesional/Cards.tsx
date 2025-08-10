import { dashboardProfesionalMock } from "@/helpers/dashboardProfesionalMock"

const Cards = () => {
    return (
        <div className="grid grid-cols-4 gap-4 mt-4">
            <div className="flex flex-col px-12 py-6 text-start bg-[#fefefe] h-fit rounded-xl">
                <span className="text-[24px] text-black font-bold">{dashboardProfesionalMock.panel.pacientesActivos}</span>
                <span className="text-sm text-black">Pacientes activos</span>
            </div>
            <div className="flex flex-col px-12 py-6 text-start bg-[#ffffff] h-fit rounded-xl">
                <span className="text-[24px] text-black font-bold">{dashboardProfesionalMock.panel.citasProximas}</span>
                <span className="text-sm text-black">Citas Proximas</span>
            </div>
            <div className="flex flex-col px-12 py-6 text-start bg-[#ffffff] h-fit rounded-xl">
                <span className="text-[24px] text-black font-bold">{dashboardProfesionalMock.panel.valoracionMedida}</span>
                <span className="text-sm text-black">Valoración media</span>
            </div>
            <div className="flex flex-col px-12 py-6 text-start bg-[#ffffff] h-fit rounded-xl">
                <span className="text-[24px] text-black font-bold">{dashboardProfesionalMock.panel.ingresos}</span>
                <span className="text-sm text-black">Ingresos del Mes</span>
            </div>
        </div>
    )
}

export default Cards