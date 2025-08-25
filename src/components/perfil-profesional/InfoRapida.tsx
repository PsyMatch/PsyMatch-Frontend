import { Clock, Globe, Video, Shield, AlertCircle, Calendar, CheckCircle } from 'lucide-react';
import type { IProfessional } from '@/services/prrofessionalProfile';

const InfoRapida = ({ data }: { data: IProfessional }) => {
    return (
        <section
            className="flex flex-col w-full gap-6 p-6 mb-10 bg-white border-2 border-gray-200 rounded-xl shadow-sm"
            aria-labelledby="quick-info-title"
        >
            <h2 id="quick-info-title" className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-blue-600" aria-hidden="true" />
                Información Rápida
            </h2>

            <div className="space-y-5">
                {/* Session Types Section */}
                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-600" aria-hidden="true" />
                        <span className="font-semibold text-gray-900">Tipos de sesiones</span>
                    </div>
                    <div className="ml-6">
                        {data.session_types?.length ? (
                            <ul className="flex flex-wrap gap-2 max-w-2xl" role="list">
                                {data.session_types.map((tipo, index) => (
                                    <li key={index} className="px-3 py-1 text-xs font-medium text-white bg-neutral-800 rounded-full">
                                        {tipo}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="flex items-center gap-2 p-3 bg-gray-100 rounded-lg border border-gray-200">
                                <AlertCircle className="w-4 h-4 text-gray-500" aria-hidden="true" />
                                <p className="text-sm text-gray-600">No hay tipos de sesiones registrados</p>
                                <p className="text-xs text-gray-500 mt-1">Contacta al profesional para más información</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Experience Section */}
                <div className="flex flex-col gap-2 p-4 bg-gray-50 rounded-lg border border-gray-100">
                    <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-600" aria-hidden="true" />
                        <span className="font-semibold text-gray-900">Experiencia</span>
                    </div>
                    <p className="text-gray-700 ml-6">{data.professional_experience} años</p>
                </div>

                {/* Languages Section */}
                {data.languages && data.languages.length > 0 && (
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-2">
                            <Globe className="w-4 h-4 text-gray-600" aria-hidden="true" />
                            <span className="font-semibold text-gray-900">Idiomas</span>
                        </div>
                        <ul className="flex flex-wrap gap-2 ml-6" role="list">
                            {data.languages.map((idioma, index) => (
                                <li key={index} className="px-3 py-1 text-xs font-medium text-white bg-blue-600 rounded-full">
                                    {idioma}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Session Modality Section */}
                {data.modality && (
                    <div className="flex flex-col gap-2 p-4 bg-blue-50 rounded-lg border border-blue-100">
                        <div className="flex items-center gap-2">
                            <Video className="w-4 h-4 text-blue-600" aria-hidden="true" />
                            <span className="font-semibold text-gray-900">Modalidad de las Sesiones</span>
                        </div>
                        <p className="text-gray-700 ml-6 font-medium">{data.modality}</p>
                    </div>
                )}

                {/* Insurance Section */}
                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-gray-600" aria-hidden="true" />
                        <span className="font-semibold text-gray-900">Obras Sociales Aceptadas</span>
                    </div>
                    <div className="ml-6">
                        {data.insurance_accepted?.length ? (
                            <ul className="flex flex-wrap gap-2 max-w-2xl" role="list">
                                {data.insurance_accepted.map((obra, index) => (
                                    <li key={index} className="px-3 py-1 text-xs font-medium text-white bg-green-600 rounded-full">
                                        {obra}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="flex items-center gap-2 p-3 bg-gray-100 rounded-lg border border-gray-200">
                                <AlertCircle className="w-4 h-4 text-gray-500" aria-hidden="true" />
                                <span className="text-sm text-gray-600">Sin obras sociales registradas</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default InfoRapida;
