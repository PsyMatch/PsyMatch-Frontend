import Cards from './Cards';

const Profesionales = () => {
    return (
        <div className="flex flex-col items-center justify-center w-screen pb-14">
            <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Profesionales Mejor Valorados</h3>
            <div className="flex flex-col gap-4 items-center md:flex-row md:w-[95%]">
                <Cards />
            </div>
        </div>
    );
};

export default Profesionales;
