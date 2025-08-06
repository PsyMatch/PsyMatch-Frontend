import Cards from "./Cards"

const Profesionales = () => {
    return(
        <div className="flex flex-col items-center justify-center w-screen pb-14">
            <h1 className="my-12 text-xl font-extrabold">Profesionales Mejor Valorados</h1>
            <div className="flex flex-col gap-4 items-center md:flex-row md:w-[95%]">
                <Cards />
            </div>
        </div>
    )
}

export default Profesionales