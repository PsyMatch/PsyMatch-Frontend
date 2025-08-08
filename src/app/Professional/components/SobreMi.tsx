import { profesionales } from "@/helpers/professional";

type Profesional = typeof profesionales[0];

const SobreMi = ({ data }: { data: Profesional }) => {
    return (
        <div className="flex flex-col w-full gap-4 p-8 mb-8 bg-white border-2 border-gray-200 h-fit rounded-xl">
            <h3 className="text-xl font-bold text-black">Sobre {data.infoPersonal.nombreCompleto}</h3>
            <p className="flex flex-wrap">
                {data.infoRapida.biografiaPersonal}
            </p>
        </div>
    )
}

export default SobreMi;