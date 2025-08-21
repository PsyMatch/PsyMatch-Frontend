import MenuNavegacion from "@/components/dashboard-profesional/MenuNavegacion";


const dashboardProfessional = () => {
    return (
        <div className="w-[100%] flex justify-center pt-10 bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="w-[90%] mb-8">
                <MenuNavegacion />
            </div>
        </div>
    );
};

export default dashboardProfessional;
