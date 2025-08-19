import MenuNavegacionUser from "@/components/dashboard-profesional/MenuNavegacionUser";

const dashboardUser = () => {
    return (
        <div className="w-[100%] flex justify-center pt-10 bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="w-[90%] mb-8">
                <div>
                    <h1 className="text-[26px] font-semibold text-black">Perfil Usuario</h1>
                    <span className="text-black">Bienvenido/a de vuelta</span>
                </div>
                <MenuNavegacionUser />
            </div>
        </div>
    )
}

export default dashboardUser
