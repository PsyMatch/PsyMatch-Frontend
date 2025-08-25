import Beneficios from '@/components/como-funciona/Beneficios';
import Caracteristicas from '@/components/como-funciona/Caracteristicas';
import Cards_ComoFunciona from '@/components/como-funciona/Cards_ComoFunciona';
import Comenzar from '@/components/como-funciona/Comenzar';
import Preguntas from '@/components/como-funciona/Preguntas';
import Tecnologia from '@/components/como-funciona/tecnologia/Tecnologia';

const Como_Funciona = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br pt-32 from-blue-50 via-indigo-50 to-blue-100">
            {/* Hero Section with Enhanced Design */}
            <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center items-center flex flex-col h-auto py-12 md:py-16 justify-center">
                {/* Decorative Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-10 animate-pulse"></div>
                    <div className="absolute top-32 right-16 w-16 h-16 bg-indigo-200 rounded-full opacity-10 animate-pulse delay-1000"></div>
                    <div className="absolute bottom-20 left-20 w-12 h-12 bg-blue-300 rounded-full opacity-10 animate-pulse delay-500"></div>
                    <div className="absolute bottom-32 right-12 w-24 h-24 bg-indigo-300 rounded-full opacity-10 animate-pulse delay-700"></div>
                </div>

                <div className="relative z-10 space-y-6">
                    {/* Main Title with Enhanced Typography */}
                    <div className="space-y-4">
                        <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-700 bg-opacity-90 text-white text-sm font-semibold rounded-full shadow-lg">
                            Encuentra tu terapeuta ideal
                        </div>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 bg-clip-text text-transparent">
                            ¿Cómo Funciona PsyMatch?
                        </h1>
                    </div>
                    
                    <p className="text-gray-700 text-lg sm:text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed font-light">
                        Descubre cómo nuestra plataforma te conecta con el 
                        <span className="font-semibold text-blue-700"> terapeuta perfecto</span> para 
                        tus necesidades específicas de manera 
                        <span className="font-semibold text-indigo-700"> rápida y sencilla</span>.
                    </p>
                </div>

                {/* Enhanced CTA Badge */}
                <div className="relative z-10 mt-8">
                    <div className="px-6 sm:px-8 md:px-12 py-3 font-bold rounded-full bg-gradient-to-r from-blue-600 to-indigo-700 bg-opacity-90 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                        <span className="text-sm sm:text-base md:text-lg">Proceso Simplificado en 4 Pasos</span>
                    </div>
                </div>
            </div>

            {/* Enhanced Section Divider */}
            <div className="flex flex-col justify-center mt-8 md:mt-16">
                <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
                    <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-semibold rounded-full shadow-lg mb-6">
                        Tu viaje personalizado
                    </div>
                    <h2 className="mb-4 text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        Tu Viaje hacia el Bienestar Mental
                    </h2>
                    <p className="text-gray-600 text-base sm:text-lg md:text-xl">
                        Desde la primera consulta hasta el seguimiento continuo
                    </p>
                </div>

                <div className="flex flex-col items-center justify-center">
                    <Cards_ComoFunciona />
                    <Caracteristicas />
                    <Beneficios />
                    <Tecnologia />
                    <Comenzar />
                    <Preguntas />
                </div>
            </div>
        </div>
    );
};

export default Como_Funciona;
