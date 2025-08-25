'use client';

import Link from 'next/link';
import { 
    BookOpen, 
    Award,
    ExternalLink,
    ChevronRight,
    Stethoscope,
    FileText,
    Users,
    Clock,
    Search,
    Filter
} from 'lucide-react';

export default function RecursosPage() {
    const recursos = [
        {
            categoria: 'Guías Clínicas',
            icon: BookOpen,
            descripcion: 'Manuales y protocolos actualizados para la práctica clínica',
            items: [
                { titulo: 'Manual de Terapia Cognitivo-Conductual', descripcion: 'Guía completa para la aplicación de TCC en diferentes trastornos' },
                { titulo: 'Protocolo de Evaluación Psicológica', descripcion: 'Procedimientos estandarizados para evaluación inicial' },
                { titulo: 'Guía de Intervención en Crisis', descripcion: 'Estrategias inmediatas para situaciones de crisis psicológica' },
                { titulo: 'Manual de Terapia Familiar Sistémica', descripcion: 'Enfoques y técnicas para terapia familiar' },
                { titulo: 'Protocolo de Trastornos de Ansiedad', descripcion: 'Diagnóstico y tratamiento de trastornos ansiosos' }
            ]
        },
        {
            categoria: 'Herramientas de Evaluación',
            icon: Stethoscope,
            descripcion: 'Tests y escalas validadas para diagnóstico y seguimiento',
            items: [
                { titulo: 'Inventario de Depresión de Beck (BDI-II)', descripcion: 'Escala para evaluar severidad de síntomas depresivos' },
                { titulo: 'Escala de Ansiedad de Hamilton', descripcion: 'Herramienta estándar para medir ansiedad' },
                { titulo: 'Test de Personalidad NEO-PI-R', descripcion: 'Evaluación comprensiva de personalidad basada en el modelo Big Five' },
                { titulo: 'Escala de Autoestima de Rosenberg', descripcion: 'Medición rápida y efectiva de autoestima global' },
                { titulo: 'Cuestionario de Calidad de Vida SF-36', descripcion: 'Evaluación multidimensional de calidad de vida relacionada con salud' }
            ]
        },
        {
            categoria: 'Capacitación Continua',
            icon: Award,
            descripcion: 'Cursos, webinars y talleres para desarrollo profesional',
            items: [
                { titulo: 'Webinar: Nuevas Técnicas en Terapia Online', descripcion: 'Adaptación de técnicas tradicionales al formato virtual' },
                { titulo: 'Curso: Ética en la Práctica Psicológica', descripcion: 'Principios éticos y dilemas comunes en la práctica clínica' },
                { titulo: 'Taller: Manejo del Estrés del Terapeuta', descripcion: 'Estrategias de autocuidado y prevención de burnout' },
                { titulo: 'Seminario: Terapia Breve Centrada en Soluciones', descripcion: 'Enfoques eficientes para terapia de corta duración' },
                { titulo: 'Workshop: Uso de Tecnología en Terapia', descripcion: 'Integración de herramientas digitales en la práctica clínica' }
            ]
        },
        {
            categoria: 'Plantillas y Formularios',
            icon: FileText,
            descripcion: 'Documentos listos para usar en tu práctica profesional',
            items: [
                { titulo: 'Formato de Historia Clínica', descripcion: 'Plantilla completa para registro de pacientes nuevos' },
                { titulo: 'Consentimiento Informado Terapia Online', descripcion: 'Documento legal para sesiones virtuales' },
                { titulo: 'Plan de Tratamiento Personalizable', descripcion: 'Estructura para objetivos y seguimiento terapéutico' },
                { titulo: 'Registro de Sesiones', descripcion: 'Hoja de cálculo para seguimiento de sesiones' },
                { titulo: 'Formulario de Derivación', descripcion: 'Documento para referencias entre profesionales' }
            ]
        }
    ];

    const estadisticas = [
        { numero: '150+', texto: 'Recursos Disponibles' },
        { numero: '25+', texto: 'Guías Actualizadas' },
        { numero: '50+', texto: 'Tests Validados' },
        { numero: 'Mensual', texto: 'Actualizaciones' }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
            {/* Hero Section */}
            <section className="relative pt-20 pb-16 px-6 md:px-12">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                            Biblioteca de
                            <span className="block text-blue-600">Recursos</span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                            Accede a una amplia colección de herramientas profesionales, guías clínicas, 
                            tests validados y recursos de capacitación para potenciar tu práctica en salud mental.
                        </p>
                        
                        {/* Barra de búsqueda */}
                        <div className="max-w-2xl mx-auto mb-8">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Buscar recursos, guías, tests..."
                                    className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                                    <Filter className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Estadísticas */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                        {estadisticas.map((stat, index) => (
                            <div key={index} className="text-center bg-white rounded-xl p-6 shadow-lg">
                                <div className="text-3xl font-bold text-blue-600 mb-2">{stat.numero}</div>
                                <div className="text-gray-600">{stat.texto}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Recursos */}
            <section className="py-16 px-6 md:px-12">
                <div className="max-w-7xl mx-auto">
                    <div className="space-y-16">
                        {recursos.map((categoria, index) => (
                            <div key={index} className="bg-white rounded-xl p-8 shadow-lg">
                                <div className="flex items-center mb-6">
                                    <div className="bg-blue-100 p-4 rounded-xl">
                                        <categoria.icon className="w-8 h-8 text-blue-600" />
                                    </div>
                                    <div className="ml-6">
                                        <h2 className="text-2xl font-bold text-gray-900">{categoria.categoria}</h2>
                                        <p className="text-gray-600 mt-1">{categoria.descripcion}</p>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {categoria.items.map((item, idx) => (
                                        <div key={idx} className="border border-gray-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-md transition-all duration-200 group">
                                            <h3 className="font-semibold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-200">
                                                {item.titulo}
                                            </h3>
                                            
                                            <p className="text-sm text-gray-600">{item.descripcion}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Acceso Premium */}
            <section className="py-16 px-6 md:px-12 bg-gradient-to-r from-blue-600 to-blue-700">
                <div className="max-w-4xl mx-auto text-center text-white">
                    <Users className="w-16 h-16 mx-auto mb-6 opacity-80" />
                    <h2 className="text-3xl font-bold mb-4">
                        Acceso Completo para Profesionales
                    </h2>
                    <p className="text-blue-100 mb-8 text-lg max-w-2xl mx-auto">
                        Como profesional registrado en PsyMatch, obtienes acceso ilimitado a todos nuestros recursos, 
                        actualizaciones mensuales y nuevos materiales exclusivos.
                    </p>
                    
                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                            <Clock className="w-8 h-8 mx-auto mb-3 opacity-80" />
                            <h3 className="font-semibold mb-2">Acceso 24/7</h3>
                            <p className="text-blue-100 text-sm">Disponible cuando lo necesites</p>
                        </div>
                        <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                            <BookOpen className="w-8 h-8 mx-auto mb-3 opacity-80" />
                            <h3 className="font-semibold mb-2">Acceso Completo</h3>
                            <p className="text-blue-100 text-sm">Todos los recursos disponibles</p>
                        </div>
                        <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                            <Award className="w-8 h-8 mx-auto mb-3 opacity-80" />
                            <h3 className="font-semibold mb-2">Contenido Exclusivo</h3>
                            <p className="text-blue-100 text-sm">Recursos premium mensuales</p>
                        </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/login"
                            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-xl hover:bg-blue-50 transition-colors duration-200 font-semibold shadow-lg"
                        >
                            Acceder a Recursos
                            <ChevronRight className="w-5 h-5 ml-2" />
                        </Link>
                        <Link
                            href="/register-professional"
                            className="inline-flex items-center px-8 py-4 border-2 border-white text-white rounded-xl hover:bg-white hover:text-blue-600 transition-colors duration-200 font-semibold"
                        >
                            Únete como Profesional
                            <ExternalLink className="w-5 h-5 ml-2" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Support Section */}
            <section className="py-16 px-6 md:px-12 bg-gray-50">
                <div className="max-w-4xl mx-auto text-center">
                    <BookOpen className="w-12 h-12 text-blue-600 mx-auto mb-6" />
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        ¿No encuentras lo que buscas?
                    </h2>
                    <p className="text-gray-600 mb-8">
                        Nuestro equipo está constantemente agregando nuevos recursos. Si necesitas algo específico, 
                        no dudes en contactarnos.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/soporte"
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold"
                        >
                            Solicitar Recurso
                        </Link>
                        <a
                            href="mailto:psymatch.contact@gmail.com"
                            className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-200 font-semibold"
                        >
                            Contactar Equipo
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
