import { User } from 'lucide-react';
import type { IProfessional } from '@/services/prrofessionalProfile';

const SobreMi = ({ data }: { data: IProfessional }) => {
    return (
        <section className="flex flex-col w-full gap-6 p-6 mb-8 bg-white border-2 border-gray-200 rounded-xl shadow-sm" aria-labelledby="about-title">
            <h2 id="about-title" className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" aria-hidden="true" />
                Sobre {data.name}
            </h2>

            <div className="relative">
                <div className="pl-6">
                    {data.personal_biography ? (
                        <p className="text-gray-700 leading-relaxed text-base">{data.personal_biography}</p>
                    ) : (
                        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                            <User className="w-5 h-5 text-gray-400" aria-hidden="true" />
                            <span className="text-gray-500 italic">{data.name} aún no ha agregado información personal.</span>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default SobreMi;
