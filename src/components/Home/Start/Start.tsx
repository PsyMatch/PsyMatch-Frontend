import Link from 'next/link';

const Start = () => {
    return (
        <section className="py-16 bg-indigo-600">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h3 className="text-3xl font-bold text-white mb-4">¿Listo para Comenzar tu Viaje de Salud Mental?</h3>
                <p className="text-xl text-indigo-100 mb-8">Únete a miles de usuarios que han encontrado a su terapeuta perfecto</p>
                <Link href="/register-user" className="inline-block">
                    <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 ring-offset-indigo-600 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-white text-indigo-950 hover:bg-indigo-100 h-11 rounded-md px-8">
                        Comenzar como paciente
                    </button>
                </Link>
                <Link href="/professionals/register" className="inline-block ml-4">
                    <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 ring-offset-indigo-600 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-white text-indigo-950 hover:bg-indigo-100 h-11 rounded-md px-8">
                        Comenzar como profesional
                    </button>
                </Link>
            </div>
        </section>
    );
};

export default Start;
