import { Check, Star, Users, Clock, Shield } from 'lucide-react';
import Link from 'next/link';

const PreciosPage = () => {
    const tiposSesiones = [
        {
            tipo: "Consulta Inicial",
            precio: "$15,000 - $25,000",
            duracion: "60-90 minutos",
            descripcion: "Primera consulta para evaluación y diagnóstico inicial",
            caracteristicas: [
                "Evaluación psicológica completa",
                "Historia clínica detallada",
                "Plan de tratamiento personalizado",
                "Orientación sobre el proceso terapéutico",
                "Entrega de informe inicial"
            ],
            destacado: false,
            color: "blue"
        },
        {
            tipo: "Sesión Individual",
            precio: "$12,000 - $20,000",
            duracion: "50 minutos",
            descripcion: "Sesión terapéutica individual estándar",
            caracteristicas: [
                "Terapia psicológica individual",
                "Seguimiento del progreso",
                "Técnicas especializadas según necesidad",
                "Modalidad presencial o virtual",
                "Flexibilidad de horarios"
            ],
            destacado: true,
            color: "indigo"
        },
        {
            tipo: "Sesión de Pareja",
            precio: "$18,000 - $30,000",
            duracion: "60 minutos",
            descripcion: "Terapia especializada para parejas",
            caracteristicas: [
                "Terapia de pareja especializada",
                "Técnicas de comunicación",
                "Resolución de conflictos",
                "Fortalecimiento de vínculos",
                "Seguimiento personalizado"
            ],
            destacado: false,
            color: "purple"
        },
        {
            tipo: "Sesión Familiar",
            precio: "$20,000 - $35,000",
            duracion: "60-75 minutos",
            descripcion: "Terapia familiar y sistémica",
            caracteristicas: [
                "Terapia familiar sistémica",
                "Dinámicas familiares",
                "Comunicación intrafamiliar",
                "Resolución de conflictos familiares",
                "Orientación parental"
            ],
            destacado: false,
            color: "green"
        },
        {
            tipo: "Sesión Grupal",
            precio: "$8,000 - $12,000",
            duracion: "90 minutos",
            descripcion: "Terapia en grupo con temáticas específicas",
            caracteristicas: [
                "Grupos de apoyo temáticos",
                "Máximo 8 participantes",
                "Facilitación profesional",
                "Dinámicas grupales",
                "Apoyo entre pares"
            ],
            destacado: false,
            color: "orange"
        },
        {
            tipo: "Sesión de Emergencia",
            precio: "$18,000 - $28,000",
            duracion: "45-60 minutos",
            descripcion: "Atención inmediata para crisis emocionales",
            caracteristicas: [
                "Disponibilidad inmediata",
                "Intervención en crisis",
                "Contención emocional",
                "Plan de acción inmediato",
                "Seguimiento post-crisis"
            ],
            destacado: false,
            color: "red"
        }
    ];

    const factoresQueInfluyen = [
        {
            factor: "Experiencia del Profesional",
            descripcion: "Psicólogos con más años de experiencia y especializaciones pueden tener tarifas más altas"
        },
        {
            factor: "Especialización",
            descripcion: "Terapias especializadas (trauma, trastornos específicos, etc.) pueden tener costos diferenciados"
        },
        {
            factor: "Modalidad",
            descripcion: "Sesiones presenciales vs. virtuales pueden tener variaciones en el precio"
        },
        {
            factor: "Ubicación",
            descripcion: "La zona geográfica del consultorio puede influir en el costo de la sesión"
        }
    ];

    const beneficios = [
        {
            icono: <Users className="w-8 h-8 text-blue-600" />,
            titulo: "Psicólogos Certificados",
            descripcion: "Todos nuestros profesionales están debidamente certificados y especializados"
        },
        {
            icono: <Clock className="w-8 h-8 text-green-600" />,
            titulo: "Horarios Flexibles",
            descripcion: "Agenda tu sesión en el horario que mejor se adapte a tu rutina"
        },
        {
            icono: <Shield className="w-8 h-8 text-purple-600" />,
            titulo: "100% Confidencial",
            descripcion: "Tu privacidad está protegida con los más altos estándares de seguridad"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-24">
            {/* Hero Section */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-sm font-semibold rounded-full shadow-lg mb-6">
                        Planes y Precios
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                        Precios de <span className="bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">Sesiones</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Conoce las tarifas de nuestros psicólogos certificados. 
                        <span className="font-semibold text-blue-700"> Precios transparentes según el tipo de sesión que necesites.</span>
                    </p>
                </div>

                {/* Tarjetas de Tipos de Sesiones */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                    {tiposSesiones.map((sesion, index) => (
                        <div 
                            key={index}
                            className={`relative bg-white rounded-2xl shadow-xl p-8 transform transition-all duration-300 hover:scale-105 ${
                                sesion.destacado 
                                    ? 'border-2 border-indigo-500 ring-4 ring-indigo-100' 
                                    : 'border border-gray-200 hover:border-blue-300'
                            }`}
                        >
                            {sesion.destacado && (
                                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                                        <Star className="w-4 h-4" />
                                        Más Común
                                    </div>
                                </div>
                            )}

                            <div className="text-center mb-8">
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">{sesion.tipo}</h3>
                                <div className="mb-4">
                                    <span className="text-3xl font-bold text-gray-900">{sesion.precio}</span>
                                    <span className="text-gray-600 ml-2">por sesión</span>
                                </div>
                                <div className="text-sm text-gray-500 mb-2">Duración: {sesion.duracion}</div>
                                <p className="text-gray-600">{sesion.descripcion}</p>
                            </div>

                            <ul className="space-y-4 mb-8">
                                {sesion.caracteristicas.map((caracteristica, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                        <span className="text-gray-700">{caracteristica}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Factores que Influyen en los Precios */}
                <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            ¿Qué influye en el precio de las sesiones?
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Los precios pueden variar según diferentes factores que determinan la calidad y especialización del servicio
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {factoresQueInfluyen.map((factor, index) => (
                            <div key={index} className="p-6 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-300">
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">{factor.factor}</h3>
                                <p className="text-gray-600">{factor.descripcion}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Beneficios Adicionales */}
                <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            ¿Por qué elegir PsyMatch?
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Más que precios competitivos, ofrecemos una experiencia completa de bienestar mental
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {beneficios.map((beneficio, index) => (
                            <div key={index} className="text-center p-6 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-300">
                                <div className="flex justify-center mb-4">
                                    {beneficio.icono}
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">{beneficio.titulo}</h3>
                                <p className="text-gray-600">{beneficio.descripcion}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA Final */}
                <div className="text-center mt-16">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 md:p-12 text-white">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            ¿Listo para encontrar tu psicólogo ideal?
                        </h2>
                        <p className="text-xl mb-8 text-blue-100">
                            Conecta con profesionales certificados que se ajusten a tu presupuesto
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/register-user">
                                <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-700 transition-all duration-300">
                                    Registrarse
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PreciosPage;
