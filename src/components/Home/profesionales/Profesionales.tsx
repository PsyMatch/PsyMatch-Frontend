import Cards from './Cards';

const Profesionales = () => {
    return (
        <div className="flex flex-col items-center justify-center w-[100%] pb-14">
            <h3 className="mb-12 text-3xl font-bold text-center text-gray-900">Profesionales Mejor Valorados</h3>
            <div className="flex flex-col gap-4 items-center md:flex-row md:w-[95%]">
                <Cards />
            </div>
        </div>
    );
};

export default Profesionales;
