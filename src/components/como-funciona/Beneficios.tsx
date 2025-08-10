import Cards_Beneficios from "./Cards_Beneficios"

const Beneficios = () => {
    return(
        <div className="flex flex-col justify-center w-full text-center bg-[#F2F2F2]">
            <h1 className="text-[25px] font-bold mt-16">Beneficios para Todos</h1>
            <span className="text-gray-700">Una plataforma diseñada tanto para pacientes como para profesionales</span>
            <Cards_Beneficios />
        </div>
    )
}

export default Beneficios