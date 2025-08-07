'use client';

import { commonSymptoms } from '@/constants/symptoms';
import { Search } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const CardMatch = () => {
    const [symptoms, setSymptoms] = useState('');
    const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);

    const handleSymptomClick = (symptom: string) => {
        if (selectedSymptoms.includes(symptom)) {
            setSelectedSymptoms(selectedSymptoms.filter((symp) => symp != symptom));
        } else {
            setSelectedSymptoms([...selectedSymptoms, symptom]);
        }
    };
    return (
        <div className="rounded-lg border border-gray-200 bg-white text-black shadow-sm max-w-4xl mx-auto mb-12">
            <div className="flex flex-col space-y-1.5 p-6">
                <div className="text-2xl font-semibold leading-none tracking-tight flex items-center justify-center">
                    Cuéntanos qué estás experimentando
                </div>
                <div className="text-sm text-gray-500">Describe tus síntomas o selecciona de las preocupaciones comunes a continuación</div>
            </div>

            <div className="p-6 pt-0 space-y-6">
                <textarea
                    className="flex w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-base ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-800 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm min-h-[100px]"
                    placeholder="He estado sintiéndome ansioso por el trabajo y tengo problemas para dormir..."
                ></textarea>

                <div className="flex flex-wrap gap-2 justify-center">
                    {commonSymptoms.map((symptom) => (
                        <div
                            key={symptom}
                            className="inline-flex items-center rounded-full border border-gray-200 px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 text-black cursor-pointer hover:bg-indigo-100"
                        >
                            {symptom}
                        </div>
                    ))}
                </div>

                <Link href="/matching">
                    <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-800 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-gray-900 text-white hover:bg-gray-900/90 h-11 rounded-md px-8 w-full sm:w-auto">
                        <Search className="h-5 w-5 mr-2" />
                        Encontrar Mi Psicólogo
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default CardMatch;
