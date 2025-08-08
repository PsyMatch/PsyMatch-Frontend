import { dashboardProfesionalMock } from "@/helpers/dashboardProfesionalMock"

const Cards = () => {
    return (
        <div className="grid grid-cols-4 gap-4 mt-4">
            <div className="flex flex-col px-12 py-6 text-start bg-[#4138CA] h-fit rounded-xl">
                <span className="text-[24px] font-bold">{dashboardProfesionalMock.panel.pacientesActivos}</span>
                <span className="text-sm text-white">Pacientes activos</span>
            </div>
            <div className="flex flex-col px-12 py-6 text-start bg-[#4138CA] h-fit rounded-xl">
                <span className="text-[24px] font-bold">{dashboardProfesionalMock.panel.citasProximas}</span>
                <span className="text-sm text-white">Citas Proximas</span>
            </div>
            <div className="flex flex-col px-12 py-6 text-start bg-[#4138CA] h-fit rounded-xl">
                <span className="text-[24px] font-bold">{dashboardProfesionalMock.panel.valoracionMedida}</span>
                <span className="text-sm text-white">Valoración media</span>
            </div>
            <div className="flex flex-col px-12 py-6 text-start bg-[#4138CA] h-fit rounded-xl">
                <span className="text-[24px] font-bold">{dashboardProfesionalMock.panel.ingresos}</span>
                <span className="text-sm text-white">Ingresos del Mes</span>
            </div>
        </div>
    )
}

export default Cards