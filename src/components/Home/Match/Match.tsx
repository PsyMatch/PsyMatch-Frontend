import CardMatch from './CardMatch';

const Match = () => {
    return (
        <section className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-5xl font-bold text-gray-900 mb-6">Encuentra Tu Psicólogo Ideal</h2>
                <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
                    Describe tus síntomas y deja que nuestra plataforma te conecte con el psicólogo adecuado. Obtén recomendaciones personalizadas
                    basadas en tus necesidades, ubicación y preferencias.
                </p>
                <CardMatch />
            </div>
        </section>
    );
};

export default Match;
