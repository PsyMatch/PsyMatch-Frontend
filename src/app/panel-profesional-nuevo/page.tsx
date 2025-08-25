'use client';

import Link from 'next/link';
import { 
    Users, 
    Calendar, 
    FileText, 
    BarChart3, 
    Video, 
    Shield, 
    Clock, 
    ExternalLink,
    ChevronRight,
    MessageSquare,
    Stethoscope,
    CreditCard,
    Bell,
    Settings
} from 'lucide-react';

export default function PanelProfesionalPage() {
    const panelFeatures = [
        {
            icon: Users,
            title: 'Gestión de Pacientes',
            description: 'Administra tu lista de pacientes, historiales clínicos y comunicación directa de forma segura y eficiente.',
            features: [
                'Lista completa de pacientes activos e inactivos',
                'Historiales médicos protegidos con encriptación',
                'Sistema de mensajería integrado y seguro',
                'Notas de sesión y seguimiento personalizado'
            ]
        },
        {
            icon: Calendar,
            title: 'Calendario Inteligente',
            description: 'Organiza tu agenda profesional con herramientas avanzadas de programación y gestión de tiempo.',
            features: [
                'Calendario interactivo con vista mensual y semanal',
                'Recordatorios automáticos para pacientes',
                'Gestión de disponibilidad y horarios',
                'Integración con Google Calendar y Outlook'
            ]
        },
        {
            icon: Video,
            title: 'Videoconsultas HD',
            description: 'Realiza sesiones virtuales con tecnología de punta, segura y de alta calidad para tus pacientes.',
            features: [
                'Plataforma de videollamadas con encriptación end-to-end',
                'Grabación de sesiones con consentimiento',
                'Calidad HD garantizada y audio cristalino',
                'Sala de espera virtual para pacientes'
            ]
        },
        {
            icon: BarChart3,
            title: 'Analytics y Reportes',
            description: 'Analiza tu práctica profesional con métricas detalladas, reportes y estadísticas de rendimiento.',
            features: [
                'Dashboard personalizado con métricas clave',
                'Reportes de productividad y eficiencia',
                'Análisis financiero y de ingresos',
                'Estadísticas de satisfacción del paciente'
            ]
        },
        {
            icon: FileText,
            title: 'Documentación Digital',
            description: 'Crea, gestiona y almacena documentos clínicos de forma digital con máxima seguridad.',
            features: [
                'Plantillas personalizables para diferentes tipos de sesión',
                'Almacenamiento seguro en la nube',
                'Firma digital válida legalmente',
                'Exportación a PDF y otros formatos'
            ]
        },
        {
            icon: CreditCard,
            title: 'Gestión de Pagos',
            description: 'Administra cobros, facturas y pagos de forma automática y transparente.',
            features: [
                'Procesamiento automático de pagos',
                'Generación de facturas digitales',
                'Reportes financieros detallados',
                'Integración con sistemas contables'
            ]
        },
        {
            icon: Bell,
            title: 'Notificaciones Inteligentes',
            description: 'Mantente al día con alertas personalizadas y recordatorios importantes.',
            features: [
                'Recordatorios de citas próximas',
                'Alertas de pagos pendientes',
                'Notificaciones de mensajes de pacientes',
                'Resúmenes diarios y semanales'
            ]
        },
        {
            icon: Shield,
            title: 'Seguridad Avanzada',
            description: 'Protección total de datos con los más altos estándares internacionales de seguridad.',
            features: [
                'Encriptación end-to-end de toda la información',
                'Cumplimiento total con GDPR y HIPAA',
                'Backups automáticos y seguros',
                'Autenticación de dos factores'
            ]
        }
    ];

    const estadisticas = [
        { numero: '500+', texto: 'Profesionales Activos' },
        { numero: '10,000+', texto: 'Sesiones Completadas' },
        { numero: '98%', texto: 'Satisfacción del Cliente' },
        { numero: '24/7', texto: 'Soporte Técnico' }
    ];

    const testimonios = [
        {
            nombre: "Dra. María González",
            especialidad: "Psicóloga Clínica",
            testimonio: "El panel de PsyMatch ha revolucionado mi práctica. La gestión de pacientes es increíblemente eficiente.",
            rating: 5
        },
        {
            nombre: "Dr. Carlos Mendoza",
            especialidad: "Psiquiatra",
            testimonio: "Las videoconsultas son de excelente calidad y mis pacientes se sienten cómodos con la plataforma.",
            rating: 5
        },
        {
            nombre: "Lic. Ana Torres",
            especialidad: "Terapia Familiar",
            testimonio: "Los reportes me ayudan a analizar mi práctica y mejorar constantemente la atención.",
            rating: 5
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
            {/* Hero Section */}
            <section className="relative pt-20 pb-16 px-6 md:px-12">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                            Panel Profesional
                            <span className="block text-blue-600">PsyMatch</span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                            La plataforma más completa y segura para profesionales de salud mental. 
                            Gestiona tu práctica, conecta con pacientes y haz crecer tu negocio con herramientas de última generación.
                        </p>
                        
                        <Link
                            href="/register-professional"
                            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                        >
                            Comenzar Gratis
                            <ExternalLink className="w-5 h-5 ml-2" />
                        </Link>
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

            {/* Panel Features */}
            <section className="py-16 px-6 md:px-12">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Herramientas Profesionales Completas
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Todo lo que necesitas para manejar tu práctica profesional en una sola plataforma
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {panelFeatures.map((feature, index) => (
                            <div key={index} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group">
                                <div className="flex items-center mb-6">
                                    <div className="bg-blue-100 p-3 rounded-xl group-hover:bg-blue-600 transition-colors duration-300">
                                        <feature.icon className="w-6 h-6 text-blue-600 group-hover:text-white" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 ml-4">{feature.title}</h3>
                                </div>
                                
                                <p className="text-gray-600 mb-6">{feature.description}</p>
                                
                                <ul className="space-y-2">
                                    {feature.features.map((item, idx) => (
                                        <li key={idx} className="flex items-start text-sm text-gray-700">
                                            <ChevronRight className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonios */}
            <section className="py-16 px-6 md:px-12 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Lo que dicen nuestros profesionales
                        </h2>
                        <p className="text-gray-600">
                            Más de 500 profesionales confían en PsyMatch para su práctica diaria
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {testimonios.map((testimonio, index) => (
                            <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
                                <div className="flex mb-4">
                                    {[...Array(testimonio.rating)].map((_, i) => (
                                        <span key={i} className="text-yellow-400 text-xl">★</span>
                                    ))}
                                </div>
                                <p className="text-gray-700 mb-4 italic">"{testimonio.testimonio}"</p>
                                <div>
                                    <p className="font-semibold text-gray-900">{testimonio.nombre}</p>
                                    <p className="text-blue-600 text-sm">{testimonio.especialidad}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 px-6 md:px-12 bg-gradient-to-r from-blue-600 to-blue-700">
                <div className="max-w-4xl mx-auto text-center text-white">
                    <Stethoscope className="w-16 h-16 mx-auto mb-6 opacity-80" />
                    <h2 className="text-3xl font-bold mb-4">
                        Únete a la Red de Profesionales PsyMatch
                    </h2>
                    <p className="text-blue-100 mb-8 text-lg max-w-2xl mx-auto">
                        Accede al panel profesional más avanzado del mercado. Comienza gratis y escala tu práctica 
                        con las herramientas que necesitas para ofrecer el mejor cuidado a tus pacientes.
                    </p>
                    
                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                            <Clock className="w-8 h-8 mx-auto mb-3 opacity-80" />
                            <h3 className="font-semibold mb-2">Setup en 5 minutos</h3>
                            <p className="text-blue-100 text-sm">Configuración rápida y fácil</p>
                        </div>
                        <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                            <Settings className="w-8 h-8 mx-auto mb-3 opacity-80" />
                            <h3 className="font-semibold mb-2">Totalmente Personalizable</h3>
                            <p className="text-blue-100 text-sm">Adapta el panel a tu estilo</p>
                        </div>
                        <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                            <MessageSquare className="w-8 h-8 mx-auto mb-3 opacity-80" />
                            <h3 className="font-semibold mb-2">Soporte 24/7</h3>
                            <p className="text-blue-100 text-sm">Ayuda cuando la necesites</p>
                        </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/register-professional"
                            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-xl hover:bg-blue-50 transition-colors duration-200 font-semibold shadow-lg"
                        >
                            Comenzar Ahora Gratis
                            <ChevronRight className="w-5 h-5 ml-2" />
                        </Link>
                        <Link
                            href="/login"
                            className="inline-flex items-center px-8 py-4 border-2 border-white text-white rounded-xl hover:bg-white hover:text-blue-600 transition-colors duration-200 font-semibold"
                        >
                            Iniciar Sesión
                            <ExternalLink className="w-5 h-5 ml-2" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Support Section */}
            <section className="py-16 px-6 md:px-12 bg-gray-50">
                <div className="max-w-4xl mx-auto text-center">
                    <MessageSquare className="w-12 h-12 text-blue-600 mx-auto mb-6" />
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        ¿Tienes preguntas sobre el panel?
                    </h2>
                    <p className="text-gray-600 mb-8">
                        Nuestro equipo de soporte está disponible para ayudarte con cualquier consulta 
                        sobre las funcionalidades del panel profesional.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/soporte"
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold"
                        >
                            Centro de Ayuda
                        </Link>
                        <a
                            href="mailto:psymatch.contact@gmail.com"
                            className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-200 font-semibold"
                        >
                            Contactar Soporte
                        </a>
                        <Link
                            href="/recursos"
                            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 font-semibold"
                        >
                            Ver Recursos
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
