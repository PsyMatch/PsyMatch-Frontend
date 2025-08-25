import MenuNavegacion from "./MenuNavegacion"

const Tecnologia = () => {
    return(
        <div className="flex flex-col justify-center w-full text-center bg-transparent py-12 md:py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">Tecnología de la Plataforma</h1>
                <span className="text-gray-700 text-sm sm:text-base md:text-lg">Cómo la tecnología mejora tu experiencia terapéutica</span>     
            </div>
            <MenuNavegacion />
        </div>
    )
}

export default Tecnologia