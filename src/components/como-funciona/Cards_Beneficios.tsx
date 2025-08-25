import { CheckCircle } from 'lucide-react';

const paraPacientes = [
    'Encuentra el terapeuta perfecto en minutos',
    'Ahorra tiempo con emparejamiento inteligente',
    'Accede a reseñas verificadas y transparentes',
    'Reserva citas 24/7 desde cualquier lugar',
    'Soporte continuo durante tu tratamiento',
    'Precios transparentes sin sorpresas',
];

const paraTerapeutas = [
    'Conecta con pacientes ideales para tu especialidad',
    'Gestiona tu práctica con herramientas avanzadas',
    'Recibe feedback valioso para mejorar',
    'Aumenta tu visibilidad profesional',
    'Herramientas de comunicación seguras',
    'Análisis detallados de tu práctica',
];

const Cards_Beneficios = () => {
    return (
        <div className="grid w-full grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-20 px-4 sm:px-6 lg:px-40 mt-6 lg:mt-10 mb-12 lg:mb-20 justify-items-center max-w-7xl mx-auto">
            <div className="flex flex-col items-start gap-2 p-6 lg:p-8 text-left bg-white border-2 border-gray-300 rounded-lg h-fit w-full max-w-lg">
                <div className="text-lg sm:text-xl lg:text-2xl font-bold mb-2">Para Pacientes</div>
                <ul className="flex flex-col gap-2 lg:gap-3 w-full">
                    {paraPacientes.map((info, index) => (
                        <div key={index} className="flex flex-row items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-violet-950 flex-shrink-0 mt-0.5" />
                            <li className="text-xs sm:text-sm lg:text-base text-gray-700">{info}</li>
                        </div>
                    ))}
                </ul>
            </div>
            <div className="flex flex-col items-start gap-2 p-6 lg:p-8 text-left bg-white border-2 border-gray-300 rounded-lg h-fit w-full max-w-lg">
                <div className="text-lg sm:text-xl lg:text-2xl font-bold mb-2">Para Terapeutas</div>
                <ul className="flex flex-col gap-2 lg:gap-3 w-full">
                    {paraTerapeutas.map((info, index) => (
                        <div key={index} className="flex flex-row items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-violet-950 flex-shrink-0 mt-0.5" />
                            <li className="text-xs sm:text-sm lg:text-base text-gray-700">{info}</li>
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Cards_Beneficios;
