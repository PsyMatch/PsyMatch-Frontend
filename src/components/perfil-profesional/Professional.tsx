import { MessageCircle, Calendar, MapPin, Clock } from 'lucide-react';
import type { IProfessional } from '@/services/prrofessionalProfile';
import Image from 'next/image';
import Link from 'next/link';

const Professional = ({ data }: { data: IProfessional }) => {
    return (
        <article
            className="grid items-center w-full p-5 mt-10 md:grid-cols-[0.6fr_2fr_1fr] bg-white border-2 border-gray-200 h-auto mb-10 rounded-xl shadow-sm overflow-hidden"
            role="article"
            aria-labelledby="professional-name"
        >
            <div className="flex justify-center p-6 md:p-4">
                <div className="relative">
                    <Image
                        className="w-20 h-20 md:w-32 md:h-32 rounded-full object-cover border-4 border-gray-100"
                        src={data.profile_picture || '/person-gray-photo-placeholder-woman.webp'}
                        alt={`Foto de perfil de ${data.name}`}
                        width={128}
                        height={128}
                        priority
                    />
                </div>
            </div>

            <div className="flex flex-col justify-between h-auto text-start p-6 md:p-4 space-y-3">
                <div className="space-y-2">
                    <h1 id="professional-name" className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                        {data.name}
                    </h1>
                    <p className="text-lg font-semibold text-gray-700">{data.professional_title}</p>
                </div>

                {data.specialities && data.specialities.length > 0 && (
                    <div className="space-y-2">
                        <span className="text-sm font-medium text-gray-600">Especialidades:</span>
                        <ul className="flex flex-wrap gap-2" role="list">
                            {data.specialities.map((especialidad, index) => (
                                <li key={index} className="px-3 py-1 text-xs font-medium text-white bg-blue-600 rounded-full">
                                    {especialidad}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <div className="flex flex-col mt-20 gap-4 text-sm font-medium text-gray-600">
                    {data.availability && data.availability.length > 0 && (
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-green-600" aria-hidden="true" />
                            <span className="text-green-600 font-semibold">Disponible: {data.availability.join(', ')}</span>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex flex-col items-center md:items-end gap-3 p-6 md:pr-8">
                <Link
                    href={`/session/${data.id}`}
                    className="flex items-center gap-2 px-6 py-3 text-white bg-gray-900 rounded-lg hover:bg-gray-800 focus:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 transition-all duration-200 hover:-translate-y-px active:translate-y-0 w-full md:w-auto justify-center font-medium"
                    aria-label={`Reservar sesión con ${data.name}`}
                >
                    <Calendar className="w-4 h-4" aria-hidden="true" />
                    Reservar Ahora
                </Link>

                <button
                    className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 focus:bg-gray-50 focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 transition-all duration-200 hover:-translate-y-px active:translate-y-0 w-full md:w-auto justify-center font-medium text-gray-700"
                    aria-label={`Enviar mensaje a ${data.name}`}
                >
                    <MessageCircle className="w-4 h-4" aria-hidden="true" />
                    Enviar mensaje
                </button>
            </div>
        </article>
    );
};

export default Professional;
