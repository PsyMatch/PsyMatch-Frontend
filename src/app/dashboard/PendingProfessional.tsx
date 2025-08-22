import { Clock } from "lucide-react";
import { Mail } from "lucide-react";
import { Pointer } from "lucide-react";

const PendingProfessional = () => {
    return (
        <div className="mx-64 mt-10 mb-32">
            <h1 className="mb-4 text-xl text-black">✅ Registro completado</h1>
            <h2 className="text-black">Gracias por registrarte en PsyMatch.</h2>
            <div className="mt-6">
                <h2 className="font-bold text-black">Tu perfil está en proceso de verificación.</h2>
                <span>Un miembro de nuestro equipo revisará tu información para garantizar la seguridad y confianza en nuestra comunidad.</span>
            </div>
            <div className="flex flex-col mt-6 space-y-2">
                <div className="flex flex-row items-center">
                    <Clock className="inline mr-1" />
                    <span>Este proceso puede tardar hasta 2 días hábiles.</span>
                </div>
                <div className="flex flex-row items-center">
                    <Mail className="inline mr-1" />
                    <span>Te avisaremos por email cuando tu cuenta esté lista para empezar a recibir pacientes.</span>
                </div>
            </div>
            <div className="mt-6">
                <a href="" className="flex flex-row items-center px-6 w-fit bg-violet-200 rounded-xl">¿Tenés dudas? Contactanos aquí <Pointer className="h-5 ml-2"/></a>
            </div>
        </div>
    );
};

export default PendingProfessional;