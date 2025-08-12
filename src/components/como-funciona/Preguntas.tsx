// const arrayPreguntas = () => [
//
// ]

const Preguntas = () => {
    return (
        <>
            <div className="flex flex-col justify-center w-full mb-20 text-center bg-white">
                <h1 className="text-[25px] font-bold mt-16">Preguntas Frecuentes</h1>
                <span className="text-gray-700">Repuestas a las dudas más comunes sobre PsyMatch</span>

                <div className="w-[60%] mt-10 border-2 border-gray-300 m-auto text-start p-6 rounded-md ">
                    <h2 className="mb-2 text-xl font-bold">¿Cómo funciona el algoritmo de emparejamiento?</h2>
                    <p className="text-[#7c7c7c]">
                        Nuestro algoritmo analiza múltiples factores incluyendo tus síntomas específicos, preferencias de tratamiento, ubicación,
                        presupuesto y disponibilidad. Luego compara esta información con los perfiles de nuestros terapeutas verificados para generar
                        una puntuación de compatibilidad personalizada.
                    </p>
                </div>
                <div className="w-[60%] mt-10 border-2 border-gray-300 m-auto text-start p-6 rounded-md ">
                    <h2 className="mb-2 text-xl font-bold">¿Todos los terapeutas están verificados?</h2>
                    <p className="text-[#7c7c7c]">
                        Sí, todos nuestros terapeutas pasan por un riguroso proceso de verificación que incluye validación de licencias, verificación
                        de credenciales educativas y validación de seguro de mala praxis. Solo profesionales completamente verificados pueden unirse a
                        nuestra plataforma.
                    </p>
                </div>
                <div className="w-[60%] mt-10 border-2 border-gray-300 m-auto text-start p-6 rounded-md ">
                    <h2 className="mb-2 text-xl font-bold">¿Qué pasa si no me siento cómodo con mi terapeuta asignado?</h2>
                    <p className="text-[#7c7c7c]">
                        Entendemos que la compatibilidad es crucial para el éxito terapéutico. Si no te sientes cómodo con tu terapeuta, puedes
                        solicitar un nuevo emparejamiento en cualquier momento. Nuestro equipo de soporte te ayudará a encontrar una mejor opción sin
                        costo adicional.
                    </p>
                </div>
                <div className="w-[60%] mt-10 border-2 border-gray-300 m-auto text-start p-6 rounded-md ">
                    <h2 className="mb-2 text-xl font-bold">¿Mis datos personales están seguros?</h2>
                    <p className="text-[#7c7c7c]">
                        La privacidad y seguridad de tus datos es nuestra máxima prioridad. Utilizamos encriptación de grado militar, cumplimos con
                        todas las regulaciones de protección de datos y nunca compartimos tu información personal sin tu consentimiento explícito.
                        Toda la comunicación en la plataforma está completamente encriptada.
                    </p>
                </div>
            </div>
        </>
    );
};

export default Preguntas;
