'use client';

import Link from 'next/link';
import { 
    Shield, 
    FileText, 
    Users, 
    AlertTriangle,
    CheckCircle,
    Scale,
    Clock,
    Mail,
    ArrowLeft,
    Book
} from 'lucide-react';

export default function TerminosDeServicioPage() {
    const secciones = [
        {
            id: 'aceptacion',
            titulo: 'Aceptación de los Términos',
            icono: CheckCircle,
            contenido: [
                'Al acceder y utilizar PsyMatch, usted acepta estar sujeto a estos Términos de Servicio y todas las leyes y regulaciones aplicables.',
                'Si no está de acuerdo con alguno de estos términos, tiene prohibido usar o acceder a este sitio.',
                'Los materiales contenidos en este sitio web están protegidos por las leyes de derechos de autor y marcas comerciales aplicables.'
            ]
        },
        {
            id: 'descripcion',
            titulo: 'Descripción del Servicio',
            icono: Users,
            contenido: [
                'PsyMatch es una plataforma digital que facilita la conexión entre usuarios que buscan servicios de salud mental y profesionales licenciados en psicología.',
                'Nuestro servicio incluye: búsqueda de profesionales, programación de citas, videoconsultas seguras, y gestión de historiales clínicos.',
                'PsyMatch actúa como intermediario tecnológico y no proporciona directamente servicios de salud mental.'
            ]
        },
        {
            id: 'usuarios',
            titulo: 'Responsabilidades del Usuario',
            icono: Shield,
            contenido: [
                'Los usuarios deben proporcionar información precisa y actualizada durante el registro.',
                'Es responsabilidad del usuario mantener la confidencialidad de sus credenciales de acceso.',
                'Los usuarios se comprometen a usar la plataforma únicamente para fines legítimos y de acuerdo con estos términos.',
                'Está prohibido compartir contenido inapropiado, difamatorio o que viole los derechos de terceros.'
            ]
        },
        {
            id: 'profesionales',
            titulo: 'Responsabilidades de los Profesionales',
            icono: FileText,
            contenido: [
                'Los profesionales deben estar debidamente licenciados y autorizados para ejercer la psicología.',
                'Deben mantener actualizada su información profesional y credenciales en la plataforma.',
                'Los profesionales son responsables de la calidad y ética de los servicios que proporcionan.',
                'Deben cumplir con todas las normativas profesionales y códigos de ética aplicables.'
            ]
        },
        {
            id: 'privacidad',
            titulo: 'Privacidad y Confidencialidad',
            icono: Scale,
            contenido: [
                'PsyMatch se compromete a proteger la privacidad y confidencialidad de todos los datos de usuarios.',
                'La información personal se maneja de acuerdo con nuestra Política de Privacidad.',
                'Las comunicaciones entre usuarios y profesionales están protegidas por encriptación end-to-end.',
                'Los datos de salud se manejan conforme a las regulaciones de privacidad aplicables.'
            ]
        },
        {
            id: 'pagos',
            titulo: 'Pagos y Facturación',
            icono: CheckCircle,
            contenido: [
                'Los pagos se procesan de forma segura a través de proveedores de pago certificados.',
                'Los precios de los servicios son establecidos por cada profesional individual.',
                'PsyMatch cobra una comisión por facilitar la conexión entre usuarios y profesionales.',
                'Las políticas de reembolso varían según el profesional y las circunstancias específicas.'
            ]
        },
        {
            id: 'limitaciones',
            titulo: 'Limitaciones de Responsabilidad',
            icono: AlertTriangle,
            contenido: [
                'PsyMatch actúa como plataforma intermediaria y no es responsable de la calidad de los servicios profesionales.',
                'No garantizamos resultados específicos de los tratamientos o intervenciones psicológicas.',
                'Los usuarios utilizan la plataforma bajo su propio riesgo y responsabilidad.',
                'En caso de emergencias psicológicas, los usuarios deben contactar servicios de emergencia locales.'
            ]
        },
        {
            id: 'suspension',
            titulo: 'Suspensión y Terminación',
            icono: AlertTriangle,
            contenido: [
                'PsyMatch se reserva el derecho de suspender o terminar cuentas que violen estos términos.',
                'Los usuarios pueden cancelar su cuenta en cualquier momento desde su panel de control.',
                'La terminación no afecta las obligaciones ya contraídas antes de la terminación.',
                'Los datos del usuario serán manejados según nuestra política de retención de datos.'
            ]
        },
        {
            id: 'modificaciones',
            titulo: 'Modificaciones a los Términos',
            icono: Clock,
            contenido: [
                'PsyMatch puede revisar estos términos de servicio en cualquier momento sin previo aviso.',
                'Al usar este sitio web, usted acepta estar sujeto a la versión actual de estos términos.',
                'Las modificaciones importantes serán notificadas a los usuarios registrados.',
                'El uso continuado de la plataforma constituye aceptación de los términos modificados.'
            ]
        }
    ];

    const contactoLegal = {
        email: 'legal@psymatch.com',
        direccion: 'Dirección Legal de PsyMatch',
        telefono: '+1 (555) 123-4567'
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
            {/* Hero Section */}
            <section className="relative pt-20 pb-16 px-6 md:px-12">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center mb-6">
                        <Link
                            href="/"
                            className="flex items-center text-blue-600 hover:text-blue-700 transition-colors duration-200 mr-4"
                        >
                            <ArrowLeft className="w-5 h-5 mr-2" />
                            Volver al inicio
                        </Link>
                    </div>
                    
                    <div className="text-center mb-12">
                        <div className="flex items-center justify-center mb-6">
                            <Book className="w-12 h-12 text-blue-600 mr-3" />
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                                Términos de Servicio
                            </h1>
                        </div>
                        <p className="text-xl text-gray-600 mb-4">
                            Condiciones legales para el uso de la plataforma PsyMatch
                        </p>
                        <div className="bg-blue-50 rounded-lg p-4 text-center">
                            <p className="text-blue-800 font-medium">
                                Última actualización: 25 de Agosto, 2025
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Introducción */}
            <section className="py-8 px-6 md:px-12 bg-white">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-8 mb-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Introducción</h2>
                        <p className="text-gray-700 leading-relaxed">
                            Bienvenido a PsyMatch. Estos Términos de Servicio (&quot;Términos&quot;) rigen su acceso y uso 
                            de nuestros servicios, incluido nuestro sitio web, aplicaciones móviles y cualquier software, 
                            herramientas, funciones u otros servicios proporcionados por PsyMatch (&quot;Servicios&quot;).
                        </p>
                        <p className="text-gray-700 leading-relaxed mt-4">
                            Al acceder o utilizar nuestros Servicios, usted acepta estar sujeto a estos Términos. 
                            Si no está de acuerdo con estos Términos, no debe acceder ni utilizar nuestros Servicios.
                        </p>
                    </div>
                </div>
            </section>

            {/* Secciones principales */}
            <section className="py-16 px-6 md:px-12">
                <div className="max-w-4xl mx-auto">
                    <div className="space-y-12">
                        {secciones.map((seccion, index) => (
                            <div key={seccion.id} className="bg-white rounded-xl p-8 shadow-lg">
                                <div className="flex items-center mb-6">
                                    <div className="bg-blue-100 p-3 rounded-xl mr-4">
                                        <seccion.icono className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900">
                                        {index + 1}. {seccion.titulo}
                                    </h2>
                                </div>
                                
                                <div className="space-y-4">
                                    {seccion.contenido.map((parrafo, idx) => (
                                        <p key={idx} className="text-gray-700 leading-relaxed">
                                            {parrafo}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Información de contacto legal */}
            <section className="py-16 px-6 md:px-12 bg-gray-50">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-xl p-8 shadow-lg">
                        <div className="flex items-center mb-6">
                            <Mail className="w-8 h-8 text-blue-600 mr-3" />
                            <h2 className="text-2xl font-bold text-gray-900">Contacto Legal</h2>
                        </div>
                        
                        <p className="text-gray-700 mb-6">
                            Si tiene preguntas sobre estos Términos de Servicio, puede contactarnos a través de:
                        </p>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-2">Email Legal</h3>
                                    <a 
                                        href={`mailto:${contactoLegal.email}`}
                                        className="text-blue-600 hover:text-blue-700 transition-colors duration-200"
                                    >
                                        {contactoLegal.email}
                                    </a>
                                </div>
                                
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-2">Soporte General</h3>
                                    <a 
                                        href="mailto:psymatch.contact@gmail.com"
                                        className="text-blue-600 hover:text-blue-700 transition-colors duration-200"
                                    >
                                        psymatch.contact@gmail.com
                                    </a>
                                </div>
                            </div>
                            
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-2">Páginas Relacionadas</h3>
                                <div className="space-y-2">
                                    <Link 
                                        href="/privacy-policy"
                                        className="block text-blue-600 hover:text-blue-700 transition-colors duration-200"
                                    >
                                        → Política de Privacidad
                                    </Link>
                                    <Link 
                                        href="/soporte"
                                        className="block text-blue-600 hover:text-blue-700 transition-colors duration-200"
                                    >
                                        → Centro de Soporte
                                    </Link>
                                    <Link 
                                        href="/about"
                                        className="block text-blue-600 hover:text-blue-700 transition-colors duration-200"
                                    >
                                        → Acerca de Nosotros
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Aviso importante */}
            <section className="py-16 px-6 md:px-12 bg-gradient-to-r from-amber-50 to-orange-50">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-xl p-8 shadow-lg border-l-4 border-amber-400">
                        <div className="flex items-start">
                            <AlertTriangle className="w-8 h-8 text-amber-500 mr-4 mt-1 flex-shrink-0" />
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 mb-3">Aviso Importante</h2>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    PsyMatch es una plataforma tecnológica que facilita la conexión entre usuarios y 
                                    profesionales de la salud mental. No somos un proveedor directo de servicios médicos 
                                    o psicológicos.
                                </p>
                                <p className="text-gray-700 leading-relaxed">
                                    En caso de emergencias psicológicas o pensamientos de autolesión, 
                                    por favor contacte inmediatamente a los servicios de emergencia locales 
                                    o líneas de crisis de su país.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer de la página */}
            <section className="py-8 px-6 md:px-12 bg-gray-100">
                <div className="max-w-4xl mx-auto text-center">
                    <p className="text-gray-600 text-sm">
                        © 2025 PsyMatch. Todos los derechos reservados. 
                        Este documento constituye un acuerdo legal entre usted y PsyMatch.
                    </p>
                </div>
            </section>
        </div>
    );
}
