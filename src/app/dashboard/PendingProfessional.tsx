import { Clock, Mail, MessageCircle } from 'lucide-react';
import Link from 'next/link';

const PendingProfessional = () => {
    return (
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">Registro completado</h1>
                </div>
                <p className="text-lg text-gray-600">Gracias por registrarte en PsyMatch.</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 sm:p-8 mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Tu perfil está en proceso de verificación</h2>
                <p className="text-gray-600 leading-relaxed">
                    Un miembro de nuestro equipo revisará tu información para garantizar la seguridad y confianza en nuestra comunidad.
                </p>
            </div>

            <div className="space-y-4 mb-8">
                <div className="flex items-start gap-4 p-4 bg-white border border-gray-200 rounded-lg">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                        <Clock className="w-5 h-5 text-blue-600" />
                    </div>
                    <p className="text-gray-700 leading-relaxed">Este proceso puede tardar hasta 2 días hábiles.</p>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white border border-gray-200 rounded-lg">
                    <div className="flex-shrink-0 w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                        <Mail className="w-5 h-5 text-green-600" />
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                        Te avisaremos por email cuando tu cuenta esté lista para empezar a recibir pacientes.
                    </p>
                </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
                <Link
                    href="/soporte"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors duration-200 text-sm font-medium"
                >
                    <MessageCircle className="w-4 h-4" />
                    ¿Tenés dudas? Contactanos aquí
                </Link>
            </div>
        </div>
    );
};

export default PendingProfessional;
