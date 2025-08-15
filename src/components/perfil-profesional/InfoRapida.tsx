import { profesionales } from "@/helpers/professional";
import { IProfessional } from "@/services/prrofessionalProfile";

const InfoRapida = ({ data }: { data: IProfessional }) => {
    return (
        <div className="flex flex-col w-full gap-4 p-8 mb-10 bg-white border-2 border-gray-200 h-fit rounded-xl">
            <h3 className="text-xl font-bold text-black">Información Rápida</h3>
            <div className="flex flex-col gap-1">
                <span className="font-semibold">Experiencia</span>
                <span className="text-gray-700">{data.professional_experience}</span>
            </div>

            <div className="flex flex-col gap-1">
                <span className="font-semibold">Idiomas</span>
                <ul className="flex flex-row">
                    {data.languages?.map((idioma, index) => (
                        <li key={index} className="px-2 py-[0.8px] mr-1 text-[11px] text-white text-center bg-[#5046E7] w-fit h-fit rounded-xl">
                            {idioma}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="flex flex-col gap-1">
                <span className="font-semibold">Modalidad de las Sesiones</span>
                <span>{data.modality}</span>
            </div>
            <div className="flex flex-col gap-1">
                <span className="font-semibold">Obra Social Aceptadas:</span>
                <ul className="flex flex-row">
                    {data.insurance_accepted?.length ? (
                        data.insurance_accepted.map((obra, index) => (
                        <li
                            key={index}
                            className="px-2 py-[0.8px] mr-1 text-[11px] text-white text-center bg-[#5046E7] w-fit h-fit rounded-xl"
                        >
                            {obra}
                        </li>
                        ))
                    ) : (
                        <li className="text-sm text-gray-400">Sin obras sociales registradas</li>
                    )}
                </ul>
            </div>
        </div>
    )
}

export default InfoRapida;