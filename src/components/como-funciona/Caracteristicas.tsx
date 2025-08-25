import Cards_Caracteristicas from "./Cards_Caracteristicas"

const Caracteristicas = () => {
    return (
        <div className="flex flex-col justify-center w-full py-12 md:py-20 text-center bg-gradient-to-br from-gray-50 to-blue-50">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-sm font-semibold rounded-full shadow-lg mb-6">
                        Lo que nos hace únicos
                    </div>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
                        Características Principales
                    </h1>
                    <p className="text-gray-600 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                        Tecnología avanzada y atención humana especializada 
                        <span className="font-semibold text-blue-700"> al servicio de tu bienestar mental</span>
                    </p>
                </div>       
            </div>
            <Cards_Caracteristicas />
        </div>
    )
}


export default Caracteristicas