"use client"
import { Calendar } from 'lucide-react';
import { Clock } from 'lucide-react';
import { MapPin } from 'lucide-react';

import Link from 'next/link';

import { PsychologistResponse, PsychologistsApiResponse, psychologistsService } from '@/services/psychologists';
import { useEffect, useState } from 'react';



const Cards = () => {
    const [profesionales, setProfesionales] = useState<PsychologistResponse[]>([]);

    useEffect(() => {
        const loadPsychologists = async () => {
            try {
                const response: PsychologistsApiResponse = await psychologistsService.getPsychologistsForPatient();
                console.log("Response final: ",response)
                const soloTres = response.data.slice(3, 6);
                setProfesionales(soloTres);
            } catch (error) {
                console.error('Error loading psychologists:', error);

            }
        };

        loadPsychologists();
    }, []);

    return (
        <>
            {profesionales.map((profesional) => (
                <div key={profesional.id} className="p-5 bg-white border-2 border-gray-300 md:mx-10 rounded-xl w-80 md:w-96 min-h-72 max-h-fit">
                    <div className="flex flex-row items-center gap-3">
                        <div className="bg-[#DFDFDF] rounded-full w-14 h-14"></div>
                        <div className="flex flex-col">
                            <span className="font-bold">{profesional.name}</span>
                        </div>
                    </div>

                    <ul className="flex flex-row flex-wrap gap-3 mt-5">
                        {profesional?.specialities?.map((especialidad, index) => (
                            <li key={index} className="py-1 text-[12px] px-2 w-fit text-black bg-[#DFDFDF] rounded-[50px]">
                                {especialidad}
                            </li>
                        ))}
                    </ul>

                    <div className="flex flex-col items-start text-[#3C3C3C] gap-1 text-sm mt-5 pl-3">
                        <div className="flex flex-row items-center gap-1">
                            <MapPin height={15} />
                            <span>{profesional.office_address}</span>
                        </div>
                        {/* <div className="flex flex-row items-center gap-1">
                            <DollarSign height={15} />
                            <span>$ {profesional.precio}/sesión</span>
                        </div> */}
                        <div className="flex flex-row items-center gap-1">
                            <Clock height={15} className="text-green-700" />
                            <span className="text-green-700 ">{profesional.availability}</span>
                        </div>
                    </div>

                    <div className="flex flex-row gap-5 mt-5 ">
                        <Link href={`professionalProfile/${profesional.id}`} className="text-center hover:bg-gray-200 px-3 w-[45%] py-1 border-2 border-gray-400 rounded-md text-md">Ver Perfil</Link>
                        <Link href={"#"} className="hover:bg-gray-900 flex flex-row gap-2 px-3 w-[45%] py-1 bg-black text-white items-center justify-center rounded-md text-md">
                            <Calendar height={20} />
                            Reservar
                        </Link>
                    </div>
                </div>
            ))}
        </>
    );
};

export default Cards;
