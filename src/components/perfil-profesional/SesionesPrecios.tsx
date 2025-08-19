import { profesionales } from "@/helpers/professional";
import { IProfessional } from "@/services/prrofessionalProfile";

const SesionesPrecios = ({ data }: { data: IProfessional }) => {
    return (
        <div className="flex flex-col w-full gap-4 p-8 mt-6 bg-white border-2 border-gray-200 h-fit rounded-xl">
            <h3 className="text-xl font-bold text-black">Tipos de sesiones</h3>
            {(data?.session_types || []).map((tipo, index) => (
                <div key={index} className="bg-gray-200 border-2 border-gray-300 p-4 rounded-xl grid items-center grid-cols-[85%_10%]">
                    <span className="text-sm font-bold">{tipo}</span>
                </div>
            ))}
        </div>
    )
}

export default SesionesPrecios;