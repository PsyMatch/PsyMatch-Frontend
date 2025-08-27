'use client';

import Link from 'next/link';
import Image from 'next/image';
import { 
    Heart, 
    Users, 
    Target, 
    Eye, 
    Lightbulb,
    Shield,
    HandHeart,
    Star,
    CheckCircle,
    ArrowRight,
    Code,
    Database,
    Brain,
    Globe,
    Linkedin,
    Github
} from 'lucide-react';

export default function AcercaDeNosotrosPage() {
    const valores = [
        {
            icon: Lightbulb,
            titulo: 'Innovación',
            descripcion: 'Creamos soluciones tecnológicas que transforman la manera de acceder a la salud mental.'
        },
        {
            icon: Heart,
            titulo: 'Compromiso',
            descripcion: 'Nos dedicamos completamente a conectar personas con el apoyo psicológico que necesitan.'
        },
        {
            icon: Shield,
            titulo: 'Confianza',
            descripcion: 'Construimos una plataforma segura donde pacientes y profesionales se sienten protegidos.'
        },
        {
            icon: HandHeart,
            titulo: 'Empatía',
            descripcion: 'Entendemos las necesidades emocionales y las abordamos con sensibilidad y cuidado.'
        },
        {
            icon: Users,
            titulo: 'Solidaridad',
            descripcion: 'Trabajamos juntos para hacer la salud mental accesible para todas las personas.'
        },
        {
            icon: CheckCircle,
            titulo: 'Responsabilidad',
            descripcion: 'Asumimos el compromiso de brindar un servicio ético y de la más alta calidad.'
        }
    ];

    const equipoFrontend = [
        {
            nombre: 'Ludmila',
            apodo: 'Ludmi',
            rol: 'Frontend Developer',
            descripcion: 'Una chica con rulos llena de creatividad y pasión. Su talento para el diseño y desarrollo frontend se combina con una sensibilidad única que aporta calidez humana a cada interfaz que crea.',
            personalidad: 'Emocional, talentosa y creativa',
            foto: 'https://res.cloudinary.com/dibnkd72j/image/upload/v1756311454/Ludmi_yspojh.webp',
            linkedin: 'https://www.linkedin.com/in/ravelliludmila',
            github: 'https://github.com/RavelliLudmila'
        },
        {
            nombre: 'Morena',
            apodo: 'Mo',
            rol: 'Frontend Developer',
            descripcion: 'La transparencia hecha persona. Su enfoque directo y su compromiso inquebrantable la convierten en el pilar de confianza del equipo. Siempre enfocada en entregar resultados de calidad.',
            personalidad: 'Transparente, comprometida y responsable',
            foto: 'https://res.cloudinary.com/dibnkd72j/image/upload/v1756317610/Mo_x4svsq.webp',
            linkedin: 'https://www.linkedin.com/in/morena-martín-979756308',
            github: 'https://github.com/morenamartin'
        },
        {
            nombre: 'Mauricio',
            apodo: 'Mauri',
            rol: 'Frontend Developer',
            descripcion: 'El compañero en quien siempre puedes confiar. Su ética de trabajo y disposición para ayudar al equipo lo convierten en una pieza fundamental. Siempre encuentra la manera de resolver los desafíos.',
            personalidad: 'Trabajador, responsable y colaborativo',
            foto: 'https://res.cloudinary.com/dibnkd72j/image/upload/v1756311453/Mauri_t3bark.webp',
            linkedin: 'https://www.linkedin.com/in/mauricio-herrera-7b744b274',
            github: 'https://github.com/MauriHerrera7'
        }
    ];

    const equipoBackend = [
        {
            nombre: 'Pedro',
            apodo: 'Pedrito',
            rol: 'Backend Developer',
            descripcion: 'El observador atento que nunca pasa por alto los detalles. Su capacidad para identificar necesidades y aportar soluciones innovadoras mantiene al equipo siempre en movimiento hacia adelante.',
            personalidad: 'Atento, solucionador y perspicaz',
            foto: 'https://res.cloudinary.com/dibnkd72j/image/upload/v1756311456/Pedro_funvaz.webp',
            linkedin: 'https://www.linkedin.com/in/pedro-jorge-morales-55b459234',
            github: 'https://github.com/MPedroJ'
        },
        {
            nombre: 'Franco',
            apodo: 'Fran',
            rol: 'Backend Developer',
            descripcion: 'El corazón que late en el centro del equipo. Cuando el ánimo baja, él lo levanta. Su combinación de habilidades técnicas y carisma humano lo convierte en el alma de PsyMatch.',
            personalidad: 'Motivador, trabajador y solidario',
            foto: 'https://res.cloudinary.com/dibnkd72j/image/upload/v1756318214/Fran_lfpnbm.webp',
            linkedin: 'https://www.linkedin.com/in/francogauna/',
            github: 'https://github.com/frangauna01'
        },
        {
            nombre: 'Fausto',
            apodo: 'El Profe',
            rol: 'Backend Developer',
            descripcion: 'El organizador nato que mantiene a todos enfocados. Su visión estratégica y capacidad de coordinación aseguran que ningún detalle se pierda en el camino hacia nuestros objetivos.',
            personalidad: 'Organizador, estratega y meticuloso',
            foto: 'https://res.cloudinary.com/dibnkd72j/image/upload/v1756311454/Fausto_bil2fg.webp',
            linkedin: 'https://linkedin.com/in/fausto-paván-936b78286',
            github: 'https://github.com/faustopavan12'
        }
    ];

    const logros = [
        { numero: '500+', descripcion: 'Profesionales registrados' },
        { numero: '10,000+', descripcion: 'Conexiones exitosas' },
        { numero: '98%', descripcion: 'Satisfacción de usuarios' },
        { numero: '24/7', descripcion: 'Disponibilidad del servicio' }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
            {/* Hero Section */}
            <section className="relative pt-20 pb-16 px-6 md:px-12">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                        Quiénes
                        <span className="block text-blue-600">Somos</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-12 leading-relaxed">
                        Somos un grupo de amigos que transformamos una conversación casual en una misión: 
                        <span className="text-blue-600 font-semibold"> conectar a las personas con el apoyo psicológico que necesitan</span>, 
                        de manera rápida, confiable y accesible para todos.
                    </p>
                    
                    {/* Logros */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                        {logros.map((logro, index) => (
                            <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
                                <div className="text-3xl font-bold text-blue-600 mb-2">{logro.numero}</div>
                                <div className="text-gray-600 text-sm">{logro.descripcion}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Historia */}
            <section className="py-16 px-6 md:px-12 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="flex items-center mb-6">
                                <Brain className="w-8 h-8 text-blue-600 mr-3" />
                                <h2 className="text-3xl font-bold text-gray-900">Nuestra Historia</h2>
                            </div>
                            <div className="space-y-4 text-gray-700 leading-relaxed">
                                <p>
                                    Todo comenzó en una simple charla de amigos. Mientras compartíamos experiencias personales, 
                                    nos dimos cuenta de que muchas personas a nuestro alrededor luchaban en silencio con problemas 
                                    emocionales y psicológicos, sin saber cómo encontrar la ayuda adecuada.
                                </p>
                                <p>
                                    <span className="text-blue-600 font-semibold">La barrera no era la falta de profesionales</span>, 
                                    sino la dificultad para conectar de manera confiable y accesible. Ahí nació PsyMatch: 
                                    una plataforma que elimina las barreras entre quienes necesitan apoyo y quienes pueden brindarlo.
                                </p>
                                <p>
                                    Desde esa conversación hasta hoy, hemos trabajado incansablemente para convertir una idea 
                                    en una realidad que ya ha cambiado miles de vidas. Cada línea de código, cada diseño, 
                                    cada funcionalidad está pensada con el corazón.
                                </p>
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl p-8 text-center">
                            <Globe className="w-16 h-16 text-blue-600 mx-auto mb-6" />
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">De una idea a la realidad</h3>
                            <p className="text-gray-600 mb-6">
                                Un proyecto que nació del corazón y creció con dedicación, tecnología y mucho amor por ayudar a otros.
                            </p>
                            <div className="flex justify-center space-x-4">
                                <div className="bg-white rounded-full p-3">
                                    <Heart className="w-6 h-6 text-red-500" />
                                </div>
                                <div className="bg-white rounded-full p-3">
                                    <Code className="w-6 h-6 text-blue-500" />
                                </div>
                                <div className="bg-white rounded-full p-3">
                                    <Users className="w-6 h-6 text-green-500" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Misión y Visión */}
            <section className="py-16 px-6 md:px-12">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Misión */}
                        <div className="bg-white rounded-2xl p-8 shadow-lg">
                            <div className="flex items-center mb-6">
                                <Target className="w-8 h-8 text-blue-600 mr-3" />
                                <h2 className="text-3xl font-bold text-gray-900">Nuestra Misión</h2>
                            </div>
                            <p className="text-gray-700 text-lg leading-relaxed">
                                <span className="text-blue-600 font-semibold">Conectar a las personas con profesionales de la psicología</span> 
                                de forma cercana, confiable y accesible. Creemos que todos merecen tener acceso a apoyo emocional 
                                de calidad, sin barreras geográficas, económicas o sociales que lo impidan.
                            </p>
                            <div className="mt-6 flex items-center text-blue-600">
                                <Heart className="w-5 h-5 mr-2" />
                                <span className="font-medium">Salud mental al alcance de todos</span>
                            </div>
                        </div>

                        {/* Visión */}
                        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 shadow-lg text-white">
                            <div className="flex items-center mb-6">
                                <Eye className="w-8 h-8 text-white mr-3" />
                                <h2 className="text-3xl font-bold">Nuestra Visión</h2>
                            </div>
                            <p className="text-blue-100 text-lg leading-relaxed mb-6">
                                Ser la <span className="text-white font-semibold">plataforma líder mundial en apoyo psicológico digital</span>, 
                                transformando la manera en que las personas acceden a la salud mental. 
                                Queremos crear un mundo donde nadie se sienta solo en sus luchas emocionales.
                            </p>
                            <div className="flex items-center">
                                <Globe className="w-5 h-5 mr-2" />
                                <span className="font-medium">Impacto global, conexión humana</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Valores */}
            <section className="py-16 px-6 md:px-12 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Nuestros Valores</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Los principios que guían cada decisión que tomamos y cada línea de código que escribimos
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {valores.map((valor, index) => (
                            <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group">
                                <div className="flex items-center mb-4">
                                    <div className="bg-blue-100 p-3 rounded-xl group-hover:bg-blue-600 transition-colors duration-300">
                                        <valor.icon className="w-6 h-6 text-blue-600 group-hover:text-white" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 ml-4">{valor.titulo}</h3>
                                </div>
                                <p className="text-gray-600">{valor.descripcion}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Nuestro Equipo */}
            <section className="py-16 px-6 md:px-12">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Nuestro Equipo</h2>
                        <p className="text-gray-600 max-w-3xl mx-auto">
                            Somos seis amigos unidos por la pasión de ayudar a otros y la tecnología. 
                            Cada uno aporta su personalidad única y habilidades especiales a este proyecto del corazón.
                        </p>
                    </div>

                    {/* Frontend Team */}
                    <div className="mb-16">
                        <div className="flex items-center justify-center mb-8">
                            <Code className="w-6 h-6 text-blue-600 mr-3" />
                            <h3 className="text-2xl font-bold text-gray-900">Equipo Frontend</h3>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8">
                            {equipoFrontend.map((miembro, index) => (
                                <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                                    <div className="text-center mb-4">
                                        <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden border-4 border-blue-100">
                                            <Image
                                                src={miembro.foto}
                                                alt={`Foto de ${miembro.nombre}`}
                                                width={80}
                                                height={80}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <h4 className="text-xl font-bold text-gray-900">{miembro.nombre}</h4>
                                        <p className="text-blue-600 font-medium">&ldquo;{miembro.apodo}&rdquo;</p>
                                        <p className="text-gray-500 text-sm">{miembro.rol}</p>
                                    </div>
                                    <p className="text-gray-600 text-sm mb-4">{miembro.descripcion}</p>
                                    <div className="bg-blue-50 rounded-lg p-3 mb-4">
                                        <p className="text-blue-700 text-xs font-medium text-center">
                                            {miembro.personalidad}
                                        </p>
                                    </div>
                                    
                                    {/* Enlaces de redes sociales */}
                                    <div className="flex justify-center space-x-4">
                                        <Link 
                                            href={miembro.linkedin} 
                                            target="_blank"
                                            className="flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-200"
                                        >
                                            <Linkedin className="w-5 h-5" />
                                        </Link>
                                        <Link 
                                            href={miembro.github} 
                                            target="_blank"
                                            className="flex items-center justify-center w-10 h-10 bg-gray-800 text-white rounded-full hover:bg-gray-900 transition-colors duration-200"
                                        >
                                            <Github className="w-5 h-5" />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Backend Team */}
                    <div>
                        <div className="flex items-center justify-center mb-8">
                            <Database className="w-6 h-6 text-green-600 mr-3" />
                            <h3 className="text-2xl font-bold text-gray-900">Equipo Backend</h3>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8">
                            {equipoBackend.map((miembro, index) => (
                                <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                                    <div className="text-center mb-4">
                                        <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden border-4 border-green-100">
                                            <Image
                                                src={miembro.foto}
                                                alt={`Foto de ${miembro.nombre}`}
                                                width={80}
                                                height={80}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <h4 className="text-xl font-bold text-gray-900">{miembro.nombre}</h4>
                                        <p className="text-green-600 font-medium">&ldquo;{miembro.apodo}&rdquo;</p>
                                        <p className="text-gray-500 text-sm">{miembro.rol}</p>
                                    </div>
                                    <p className="text-gray-600 text-sm mb-4">{miembro.descripcion}</p>
                                    <div className="bg-green-50 rounded-lg p-3 mb-4">
                                        <p className="text-green-700 text-xs font-medium text-center">
                                            {miembro.personalidad}
                                        </p>
                                    </div>
                                    
                                    {/* Enlaces de redes sociales */}
                                    <div className="flex justify-center space-x-4">
                                        <Link 
                                            href={miembro.linkedin} 
                                            target="_blank"
                                            className="flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-200"
                                        >
                                            <Linkedin className="w-5 h-5" />
                                        </Link>
                                        <Link 
                                            href={miembro.github} 
                                            target="_blank"
                                            className="flex items-center justify-center w-10 h-10 bg-gray-800 text-white rounded-full hover:bg-gray-900 transition-colors duration-200"
                                        >
                                            <Github className="w-5 h-5" />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 px-6 md:px-12 bg-gradient-to-r from-blue-600 to-blue-700">
                <div className="max-w-4xl mx-auto text-center text-white">
                    <Star className="w-16 h-16 mx-auto mb-6 opacity-80" />
                    <h2 className="text-3xl font-bold mb-4">
                        Únete a Nuestra Misión
                    </h2>
                    <p className="text-blue-100 mb-8 text-lg max-w-2xl mx-auto">
                        Descubre cómo PsyMatch puede ayudarte a conectar con el apoyo psicológico que necesitas 
                        o únete a nuestra red de profesionales comprometidos con el bienestar mental.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/search-professionals"
                            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-xl hover:bg-blue-50 transition-colors duration-200 font-semibold shadow-lg"
                        >
                            Conéctate con un Psicólogo
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </Link>
                        <Link
                            href="/register-professional"
                            className="inline-flex items-center px-8 py-4 border-2 border-white text-white rounded-xl hover:bg-white hover:text-blue-600 transition-colors duration-200 font-semibold"
                        >
                            Únete como Profesional
                            <Users className="w-5 h-5 ml-2" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Final Message */}
            <section className="py-16 px-6 md:px-12 bg-gray-50">
                <div className="max-w-4xl mx-auto text-center">
                    <Heart className="w-12 h-12 text-red-500 mx-auto mb-6" />
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Más que una plataforma, somos una familia
                    </h2>
                    <p className="text-gray-600 text-lg leading-relaxed">
                        En PsyMatch, cada usuario es parte de nuestra familia extendida. Trabajamos cada día 
                        con la convicción de que <span className="text-blue-600 font-semibold">la salud mental es un derecho, no un privilegio</span>. 
                        Gracias por confiar en nosotros para acompañarte en tu camino hacia el bienestar.
                    </p>
                </div>
            </section>
        </div>
    );
}
