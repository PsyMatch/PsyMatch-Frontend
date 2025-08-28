import { Mail, Phone, MapPin, Clock, MessageCircle, HelpCircle, Users, FileText } from 'lucide-react';

const SoportePage = () => {
    const preguntasFrecuentes = [
        {
            pregunta: "¿Cómo puedo agendar mi primera sesión?",
            respuesta: "Es muy fácil. Solo necesitas registrarte en nuestra plataforma, completar un breve cuestionario sobre tus necesidades, y nuestro algoritmo te conectará con los psicólogos más adecuados para ti. Luego puedes ver sus perfiles y agendar directamente."
        },
        {
            pregunta: "¿Las sesiones son presenciales o virtuales?",
            respuesta: "Ofrecemos ambas modalidades. Puedes elegir sesiones presenciales en el consultorio del psicólogo o sesiones virtuales desde la comodidad de tu hogar. La efectividad es la misma en ambos casos."
        },
        {
            pregunta: "¿Qué pasa si necesito cancelar una sesión?",
            respuesta: "Puedes cancelar tu sesión hasta 24 horas antes sin ningún costo adicional. Si cancelas con menos tiempo, se aplicará una tarifa del 50% del valor de la sesión."
        },
        {
            pregunta: "¿Cómo garantizan la confidencialidad?",
            respuesta: "Todos nuestros psicólogos están sujetos al secreto profesional. Además, nuestra plataforma cumple con todos los estándares de seguridad y privacidad de datos. Tu información personal y las sesiones están completamente protegidas."
        },
        {
            pregunta: "¿Puedo cambiar de psicólogo si no me siento cómodo?",
            respuesta: "Por supuesto. Entendemos que la conexión terapéutica es fundamental. Puedes cambiar de psicólogo en cualquier momento sin costo adicional."
        }
    ];

    const canalesContacto = [
        {
            icono: <Mail className="w-8 h-8 text-blue-600" />,
            titulo: "Email",
            descripcion: "psymatch.contact@gmail.com",
            contacto: "Enviar Email",
            accion: "https://mail.google.com/mail/?view=cm&fs=1&to=psymatch.contact@gmail.com"
        },
    ];

    const tiposSoporte = [
        {
            icono: <Users className="w-12 h-12 text-blue-600" />,
            titulo: "Soporte Técnico",
            descripcion: "Problemas con la plataforma, sesiones virtuales, pagos"
        },
        {
            icono: <HelpCircle className="w-12 h-12 text-green-600" />,
            titulo: "Consultas Generales",
            descripcion: "Información sobre servicios, precios, profesionales"
        },
        {
            icono: <FileText className="w-12 h-12 text-purple-600" />,
            titulo: "Facturación",
            descripcion: "Consultas sobre pagos y reembolsos"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-24">
            {/* Hero Section */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-sm font-semibold rounded-full shadow-lg mb-6">
                        Centro de Soporte
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                        ¿Necesitas <span className="bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">Ayuda?</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Estamos aquí para ayudarte en cada paso de tu proceso. 
                        <span className="font-semibold text-blue-700"> Encuentra respuestas rápidas o contáctanos directamente.</span>
                    </p>
                </div>

                {/* Tipos de Soporte */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    {tiposSoporte.map((tipo, index) => (
                        <div key={index} className="bg-white rounded-2xl shadow-xl p-8 text-center hover:shadow-2xl transition-all duration-300 hover:scale-105">
                            <div className="flex justify-center mb-6">
                                {tipo.icono}
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">{tipo.titulo}</h3>
                            <p className="text-gray-600">{tipo.descripcion}</p>
                        </div>
                    ))}
                </div>

                {/* Canales de Contacto */}
                <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Contacta con Nosotros
                        </h2>
                        <p className="text-xl text-gray-600">
                            Elige el canal que prefieras para recibir ayuda inmediata
                        </p>
                    </div>

                    <div className="flex justify-center">
                        <div className="grid grid-cols-1 gap-6 max-w-md">
                            {canalesContacto.map((canal, index) => (
                                <a 
                                    key={index}
                                    href={canal.accion}
                                    className="group p-6 rounded-xl border-2 border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-lg text-center"
                                >
                                    <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                        {canal.icono}
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{canal.titulo}</h3>
                                    <p className="text-sm text-gray-600 mb-3">{canal.descripcion}</p>
                                    <p className="text-blue-600 font-medium group-hover:text-blue-700">{canal.contacto}</p>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Preguntas Frecuentes */}
                <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Preguntas Frecuentes
                        </h2>
                        <p className="text-xl text-gray-600">
                            Encuentra respuestas a las consultas más comunes
                        </p>
                    </div>

                    <div className="space-y-6">
                        {preguntasFrecuentes.map((faq, index) => (
                            <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-300">
                                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-start gap-3">
                                    <HelpCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                                    {faq.pregunta}
                                </h3>
                                <p className="text-gray-700 leading-relaxed ml-8">{faq.respuesta}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Horarios de Atención */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 md:p-12 text-white mb-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <Clock className="w-8 h-8" />
                                <h2 className="text-3xl font-bold">Horarios de Atención</h2>
                            </div>
                            <div className="space-y-2 text-blue-100">
                                <p><strong className="text-white">Lunes a Viernes:</strong> 9:00 - 18:00</p>
                                <p><strong className="text-white">Sábados:</strong> 10:00 - 14:00</p>
                                <p><strong className="text-white">Domingos:</strong> Solo emergencias</p>
                            </div>
                        </div>
                        <div className="text-center md:text-right">
                            <p className="text-xl mb-6 text-blue-100">
                                ¿No encontraste lo que buscabas?
                            </p>
                            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=psymatch.contact@gmail.com">
                                <button className="bg-white text-blue-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300">
                                    Contactar Soporte
                                </button>
                            </a>
                        </div>
                    </div>
                </div>

                {/* CTA Final */}
                <div className="text-center">
                    <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            ¿Necesitas Ayuda Inmediata?
                        </h2>
                        <p className="text-xl text-gray-600 mb-8">
                            Nuestro equipo está disponible para asistirte en cualquier momento
                        </p>
                        <div className="flex justify-center">
                            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=psymatch.contact@gmail.com">
                                <button className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 shadow-lg hover:shadow-xl">
                                    Enviar Email
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SoportePage;
