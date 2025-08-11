import Cards_Caracteristicas from "./Cards_Caracteristicas"

const Caracteristicas = () => {
    return (
        <div className="flex flex-col justify-center w-full py-20 text-center bg-white">
            <h1 className="text-[25px] font-bold">Características Principales</h1>
            <span className="text-gray-700">Tecnología avanzada al servicio de tu bienestar mental</span>        
            <Cards_Caracteristicas />
        </div>
    )
}


export default Caracteristicas