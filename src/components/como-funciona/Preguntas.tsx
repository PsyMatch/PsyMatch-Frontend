// const arrayPreguntas = () => [
//
// ]

const Preguntas = () => {
    return (
        <>
            <div className="flex flex-col justify-center w-full mb-12 md:mb-20 text-center bg-gradient-to-br from-white to-indigo-50 py-16 md:py-20">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 md:mb-12">
                    <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-sm font-semibold rounded-full shadow-lg mb-6">
                        Resolvemos tus dudas
                    </div>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
                        Preguntas Frecuentes
                    </h1>
                    <p className="text-gray-600 text-base sm:text-lg md:text-xl max-w-3xl mx-auto">
                        Respuestas a las <span className="font-semibold text-blue-700">dudas más comunes</span> sobre PsyMatch
                    </p>
                </div>

                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 md:space-y-8">
                    <div className="group border-2 border-blue-200 text-start p-6 md:p-8 rounded-xl bg-gradient-to-br from-white to-blue-50 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:border-blue-300">
                        <h2 className="mb-4 text-lg md:text-xl font-bold text-gray-800 group-hover:text-blue-700 transition-colors duration-300">
                            ¿Cómo funciona el algoritmo de emparejamiento?
                        </h2>
                        <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                            Nuestro algoritmo analiza múltiples factores incluyendo tus síntomas específicos, preferencias de tratamiento, ubicación,
                            presupuesto y disponibilidad. Luego compara esta información con los perfiles de nuestros terapeutas verificados para generar
                            una puntuación de compatibilidad personalizada.
                        </p>
                    </div>
                    <div className="group border-2 border-green-200 text-start p-6 md:p-8 rounded-xl bg-gradient-to-br from-white to-green-50 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:border-green-300">
                        <h2 className="mb-4 text-lg md:text-xl font-bold text-gray-800 group-hover:text-green-700 transition-colors duration-300">
                            ¿Todos los terapeutas están verificados?
                        </h2>
                        <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                            Sí, todos nuestros terapeutas pasan por un riguroso proceso de verificación que incluye validación de licencias, verificación
                            de credenciales educativas y validación de seguro de mala praxis. Solo profesionales completamente verificados pueden unirse a
                            nuestra plataforma.
                        </p>
                    </div>
                    <div className="group border-2 border-slate-200 text-start p-6 md:p-8 rounded-xl bg-gradient-to-br from-white to-slate-50 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:border-slate-300">
                        <h2 className="mb-4 text-lg md:text-xl font-bold text-gray-800 group-hover:text-slate-700 transition-colors duration-300">
                            ¿Qué pasa si no me siento cómodo con mi terapeuta asignado?
                        </h2>
                        <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                            Entendemos que la compatibilidad es crucial para el éxito terapéutico. Si no te sientes cómodo con tu terapeuta, puedes
                            solicitar un nuevo emparejamiento en cualquier momento. Nuestro equipo de soporte te ayudará a encontrar una mejor opción sin
                            costo adicional.
                        </p>
                    </div>
                    <div className="group border-2 border-blue-200 text-start p-6 md:p-8 rounded-xl bg-gradient-to-br from-white to-blue-50 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:border-blue-300">
                        <h2 className="mb-4 text-lg md:text-xl font-bold text-gray-800 group-hover:text-blue-700 transition-colors duration-300">
                            ¿Mis datos personales están seguros?
                        </h2>
                        <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                            La privacidad y seguridad de tus datos es nuestra máxima prioridad. Utilizamos encriptación de grado militar, cumplimos con
                            todas las regulaciones de protección de datos y nunca compartimos tu información personal sin tu consentimiento explícito.
                            Toda la comunicación en la plataforma está completamente encriptada.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Preguntas;
