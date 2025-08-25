import Link from 'next/link';

const Comenzar = () => {
    return (
        <section className="w-full py-16 md:py-20 bg-gradient-to-br from-blue-700 via-indigo-700 to-blue-800 relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-10 left-10 w-32 h-32 bg-white opacity-10 rounded-full animate-pulse"></div>
                <div className="absolute bottom-20 right-16 w-24 h-24 bg-white opacity-5 rounded-full animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white opacity-15 rounded-full animate-pulse delay-500"></div>
            </div>

            <div className="relative z-10 px-4 mx-auto text-center max-w-6xl sm:px-6 lg:px-8">
                <div className="mb-8">
                    <div className="inline-flex items-center px-4 py-2 bg-white bg-opacity-20 text-white text-sm font-semibold rounded-full shadow-lg mb-6 backdrop-blur-sm">
                        Empieza tu transformación hoy
                    </div>
                    <h3 className="mb-6 text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
                        ¿Listo para <span className="bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">Comenzar?</span>
                    </h3>
                    <p className="mb-8 text-lg sm:text-xl md:text-2xl text-indigo-100 max-w-4xl mx-auto leading-relaxed">
                        Únete a <span className="font-bold text-white">miles de personas</span> que ya han encontrado el apoyo que necesitan
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
                    <Link href="/register-user" className="w-full sm:w-auto">
                        <button className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 whitespace-nowrap text-sm sm:text-base font-bold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 ring-offset-blue-700 disabled:pointer-events-none disabled:opacity-50 bg-gradient-to-r from-white to-blue-100 text-blue-900 hover:from-blue-100 hover:to-cyan-100 h-12 sm:h-14 rounded-full px-8 sm:px-10 shadow-xl hover:shadow-2xl hover:scale-105 transform">
                            <span>Comenzar Ahora - Es Gratis</span>
                        </button>
                    </Link>
                    <Link href="/search-professionals" className="w-full sm:w-auto">
                        <button className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 whitespace-nowrap text-sm sm:text-base font-bold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 ring-offset-blue-700 disabled:pointer-events-none disabled:opacity-50 bg-white bg-opacity-20 text-white hover:bg-opacity-30 h-12 sm:h-14 rounded-full px-8 sm:px-10 shadow-lg hover:shadow-xl hover:scale-105 transform backdrop-blur-sm border border-white border-opacity-30">
                            <span>Explorar Terapeutas</span>
                        </button>
                    </Link>
                </div>

                <div className="mt-8 text-blue-200 text-sm">
                    <p>✅ Sin compromiso inicial • ✅ Proceso 100% confidencial • ✅ Soporte especializado</p>
                </div>
            </div>
        </section>
    );
};

export default Comenzar;