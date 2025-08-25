import Cards_Beneficios from "./Cards_Beneficios"

const Beneficios = () => {
    return(
        <div className="flex flex-col justify-center w-full text-center bg-[#F2F2F2] py-12 md:py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">Beneficios para Todos</h1>
                <span className="text-gray-700 text-sm sm:text-base md:text-lg">Una plataforma diseñada tanto para pacientes como para profesionales</span>
            </div>
            <Cards_Beneficios />
        </div>
    )
}

export default Beneficios