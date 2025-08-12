import { profesionales } from "@/helpers/professional";
import { MessageCircle } from "lucide-react";
import { PhoneCall } from "lucide-react";
import { Video } from "lucide-react";

type Profesional = typeof profesionales[0];

const Contacto = ({ data }: { data: Profesional }) => {
    return (
        <div className="flex flex-col w-full gap-4 p-8 mb-6 bg-white border-2 border-gray-200 h-fit rounded-xl">
            <h3 className="text-xl font-bold text-black">Opciones de Contacto</h3>
            <div className="flex flex-col gap-3">
                    <div className="flex flex-col">
                            <div className="flex flex-row items-center gap-2 px-5 py-2 mb-3 bg-gray-200 border-2 border-gray-300 rounded-lg">
                                <PhoneCall />
                                <span>{data.opcionesContacto.telefono}</span>
                            </div>
                            <div className="flex flex-row items-center gap-2 px-5 py-2 mb-3 bg-gray-200 border-2 border-gray-300 rounded-lg">
                                <Video />
                                <span>{data.opcionesContacto.video}</span>
                            </div>
                            <div className="flex flex-row items-center gap-2 px-5 py-2 mb-3 bg-gray-200 border-2 border-gray-300 rounded-lg">
                                <MessageCircle />
                                <span>{data.opcionesContacto.mensaje}</span>
                            </div>
                    </div>
            </div>

        </div>
    )
}

export default Contacto;