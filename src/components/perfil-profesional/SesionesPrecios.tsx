import { profesionales } from "@/helpers/professional";

type Profesional = typeof profesionales[0];

const SesionesPrecios = ({ data }: { data: Profesional }) => {
    return (
        <div className="flex flex-col w-full gap-4 p-8 mt-6 bg-white border-2 border-gray-200 h-fit rounded-xl">
            <h3 className="text-xl font-bold text-black">Tipos de sesiones y precios</h3>
            {data.sesionesYPrecios.map((tipo, index) => (
                <div key={index} className="bg-gray-200 border-2 border-gray-300 p-4 rounded-xl grid items-center grid-cols-[85%_10%]">
                    <div>
                        <h3 className="font-bold">{tipo.tipo}</h3>
                        <span className="text-sm">{tipo.duracion}</span>
                    </div>
                    <div>
                        <span className="font-bold">{tipo.precio}</span>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default SesionesPrecios;