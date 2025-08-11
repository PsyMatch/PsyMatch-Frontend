import MenuNavegacion from "./MenuNavegacion"

const Tecnologia = () => {
    return(
        <div className="flex flex-col justify-center w-full text-center bg-white">
            <h1 className="text-[25px] font-bold mt-16">Tecnología de Vanguardia</h1>
            <span className="text-gray-700">Como la IA mejora tu experiencia terapéutica</span>     
            <MenuNavegacion />
        </div>
    )
}

export default Tecnologia