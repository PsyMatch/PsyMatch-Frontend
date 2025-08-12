import { CheckCircle, MessageCircle } from 'lucide-react';

const array = [
    'Respuestas inmediatas a preguntas frecuentes',
    'Técnicas de relajación y mindfulness',
    'Detección de crisis y recursos de emergencia',
    'Escalación a soporte humano cuando es necesario',
];

const SoporteInteligente = () => {
    return (
        <div className="grid grid-cols-2 gap-5">
            <div className="flex flex-col p-8 text-start">
                <h1 className="mb-5 text-xl font-bold">Asistente de IA 24/7</h1>
                <span className="text-gray-600">Nuestro chatbot inteligente está disponible las 24 horas para brindarte apoyo:</span>
                <ul className="flex flex-col justify-between h-32 mt-6">
                    {array.map((info, index) => (
                        <div key={index} className="flex flex-row items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-violet-950" />
                            <li className="text-sm text-gray-700">{info}</li>
                        </div>
                    ))}
                </ul>
            </div>

            <div className="bg-[#efe8ff] m-10 rounded-xl flex items-center justify-center">
                <MessageCircle className="w-20 h-20 text-[#4f46e5]" />
            </div>
        </div>
    );
};

export default SoporteInteligente;
