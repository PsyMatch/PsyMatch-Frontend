import { MessageCircle } from 'lucide-react';
import { Calendar } from 'lucide-react';
import { IProfessional } from '@/services/prrofessionalProfile';

const Professional = ({ data }: { data: IProfessional }) => {
    return (
        <div className="grid items-center w-full mt-10 md:grid-cols-[0.6fr_2fr_1fr] bg-white border-2 border-gray-200 h-56 mb-10 rounded-xl">
            <div className="flex justify-center">
                <div className="w-20 h-20 bg-gray-400 rounded-full md:w-32 md:h-32"></div>
            </div>

            <div className="flex flex-col justify-between h-40 text-start">
                <h3 className="text-xl font-bold text-black">{data.name}</h3>
                <span className="text-xs font-semibold text-black">{data.professional_title}</span>

                {/* <div className="flex flex-row">
                    <span><strong>{data.data.infoPersonal.reseñas.porcentaje}</strong> reseñas</span>
                    <span>({data.data.infoPersonal.reseñas.cantidad} reseñas)</span>
                </div>  */}

                <ul className="flex flex-row">
                    {data.specialities?.map((especialidad, index) => (
                        <li key={index} className="px-2 py-[0.8px] mr-1 text-[11px] text-white text-center bg-[#5046E7] w-fit h-fit rounded-xl">
                            {especialidad}
                        </li>
                    ))}
                </ul>

                <div className="flex flex-row gap-4 text-[10px] font-semibold text-gray-700">
                    <span>{data.office_address}</span>
                    <ul className="flex flex-row gap-2 text-green-700">
                        Disponible:{' '}
                        {data.availability?.map((dia, index) => (
                            <li key={index}>{dia}</li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="flex flex-col items-end gap-3 pr-8">
                <button className="flex flex-row gap-2 px-8 py-2 text-white bg-black rounded-md hover:bg-gray-900 w-fit">
                    <Calendar />
                    Reservar Ahora
                </button>

                <button className="flex flex-row gap-2 px-8 py-2 bg-white border-2 border-gray-200 rounded-md hover:bg-gray-100 w-fit">
                    <MessageCircle />
                    Enviar mensaje
                </button>
            </div>
        </div>
    );
};

export default Professional;
