import Link from 'next/link';

const Comenzar = () => {
    return (
        <section className="w-full py-16 bg-indigo-600">
            <div className="px-4 mx-auto text-center max-w-7xl sm:px-6 lg:px-8">
                <h3 className="mb-4 text-3xl font-bold text-white">¿Listo para Comenzar?</h3>
                <p className="mb-8 text-xl text-indigo-100">Únete a miles de personas que ya han encontrado el apoyo que necesitan</p>
                <Link href="/register-user" className="inline-block">
                    <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 ring-offset-indigo-600 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-white text-indigo-950 hover:bg-indigo-100 h-11 rounded-md px-8">
                        Comenzar Ahora - Es Gratis
                    </button>
                </Link>
                <Link href="/search-professionals" className="inline-block ml-4">
                    <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 ring-offset-indigo-600 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-white text-indigo-950 hover:bg-indigo-100 h-11 rounded-md px-8">
                        Explorar Terapeutas
                    </button>
                </Link>
            </div>
        </section>
    );
};

export default Comenzar;