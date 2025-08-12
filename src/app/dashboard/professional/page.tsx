import { dashboardProfesionalMock } from "@/helpers/dashboardProfesionalMock"
import MenuNavegacion from "../../../components/dashboard-profesional/MenuNavegacion"
import Cards from "@/components/dashboard-profesional/Cards"

const dashboardProfessional = () => {
    return (
        <div className="w-[100%] flex justify-center pt-10 bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="w-[90%] mb-8">
                <div>
                    <h1 className="text-[26px] font-semibold text-black">Perfil Profesional</h1>
                    <span className="text-black">Bienvenida de vuelta, Dr/a {dashboardProfesionalMock.profesional.nombre}</span>
                </div>
                <Cards />
                <MenuNavegacion />
            </div>
        </div>
    )
}

export default dashboardProfessional