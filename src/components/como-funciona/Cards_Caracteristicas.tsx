import { Brain, FileText, MessageCircle, Shield, Star, Video } from "lucide-react"

const Cards_Caracteristicas = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 px-4 sm:px-6 lg:px-20 mt-6 md:mt-10 mb-6 md:mb-10 justify-items-center max-w-7xl mx-auto">
            <div className="group flex flex-col items-center h-auto md:h-56 gap-3 py-6 md:py-7 text-center bg-gradient-to-br from-white to-blue-50 border-2 border-blue-200 rounded-xl w-full max-w-sm shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:border-blue-300">
                <div className="p-3 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Brain className="w-8 md:w-10 h-8 md:h-10 text-white"/>
                </div>
                <h3 className="font-bold text-base md:text-lg text-gray-800">Búsqueda Inteligente</h3>
                <span className="w-[90%] md:w-[85%] text-gray-600 text-sm md:text-base leading-relaxed">Sistema avanzado que analiza síntomas, preferencias y necesidades para encontrar el mejor match</span>
            </div>
            <div className="group flex flex-col items-center h-auto md:h-56 gap-3 py-6 md:py-7 text-center bg-gradient-to-br from-white to-green-50 border-2 border-green-200 rounded-xl w-full max-w-sm shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:border-green-300">
                <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Shield className="w-8 md:w-10 h-8 md:h-10 text-white" />
                </div>
                <h3 className="font-bold text-base md:text-lg text-gray-800">Terapeutas Verificados</h3>
                <span className="w-[90%] md:w-[85%] text-gray-600 text-sm md:text-base leading-relaxed">Todos los profesionales pasan por un riguroso proceso de verificación de credenciales</span>
            </div>
            <div className="group flex flex-col items-center h-auto md:h-56 gap-3 py-6 md:py-7 text-center bg-gradient-to-br from-white to-yellow-50 border-2 border-yellow-200 rounded-xl w-full max-w-sm shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:border-yellow-300">
                <div className="p-3 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Star className="w-8 md:w-10 h-8 md:h-10 text-white"/>
                </div>
                <h3 className="font-bold text-base md:text-lg text-gray-800">Reseñas Auténticas</h3>
                <span className="text-gray-600 w-[90%] md:w-[85%] text-sm md:text-base leading-relaxed">Sistema de reseñas verificadas de pacientes reales con comentarios genuinos</span>
            </div>
            <div className="group flex flex-col items-center h-auto md:h-56 gap-3 py-6 md:py-7 text-center bg-gradient-to-br from-white to-blue-50 border-2 border-blue-200 rounded-xl w-full max-w-sm shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:border-blue-300">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <MessageCircle className="w-8 md:w-10 h-8 md:h-10 text-white"/>
                </div>
                <h3 className="font-bold text-base md:text-lg text-gray-800">Soporte Especializado</h3>
                <span className="text-gray-600 w-[90%] md:w-[85%] text-sm md:text-base leading-relaxed">Equipo de soporte especializado disponible para ayudarte en todo momento</span>
            </div>
            <div className="group flex flex-col items-center h-auto md:h-56 gap-3 py-6 md:py-7 text-center bg-gradient-to-br from-white to-slate-50 border-2 border-slate-200 rounded-xl w-full max-w-sm shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:border-slate-300">
                <div className="p-3 bg-gradient-to-br from-slate-600 to-gray-700 rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Video className="w-8 md:w-10 h-8 md:h-10 text-white"/>
                </div>
                <h3 className="font-bold text-base md:text-lg text-gray-800">Sesiones Flexibles</h3>
                <span className="text-gray-600 w-[90%] md:w-[85%] text-sm md:text-base leading-relaxed">Presencial, online o telefónica según tus preferencias y necesidades</span>
            </div>
            <div className="group flex flex-col items-center h-auto md:h-56 gap-3 py-6 md:py-7 text-center bg-gradient-to-br from-white to-orange-50 border-2 border-orange-200 rounded-xl w-full max-w-sm shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:border-orange-300">
                <div className="p-3 bg-gradient-to-br from-orange-500 to-red-600 rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <FileText className="w-8 md:w-10 h-8 md:h-10 text-white"/>
                </div>
                <h3 className="font-bold text-base md:text-lg text-gray-800">Seguimiento Continuo</h3>
                <span className="text-gray-600 w-[90%] md:w-[85%] text-sm md:text-base leading-relaxed">Herramientas para monitorear tu progreso y bienestar durante el tratamiento</span>
            </div>
        </div>
    )
}

export default Cards_Caracteristicas