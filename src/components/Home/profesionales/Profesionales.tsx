import Cards from './Cards';

const Profesionales = () => {
    return (
        <section className="flex flex-col items-center p-16 bg-white">
            <h3 className="mb-12 text-3xl font-bold text-center text-gray-900">Profesionales con Mayor Experiencia</h3>
            <div className="flex flex-col gap-4 items-center md:flex-row md:w-[95%]">
                <Cards />
            </div>
        </section>
    );
};

export default Profesionales;
