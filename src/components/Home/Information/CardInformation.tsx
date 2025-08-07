import { Brain, Calendar, MessageCircle, Star } from 'lucide-react';

const CardInformation = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="rounded-lg border border-gray-200 bg-white text-black shadow-sm">
                <div className="p-6 text-center">
                    <Brain className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
                    <h4 className="font-semibold mb-2">Emparejamiento</h4>
                    <p className="text-sm text-gray-600">
                        Nuestro sistema avanzado analiza tus síntomas y preferencias para encontrar la pareja perfecta
                    </p>
                </div>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white text-black shadow-sm">
                <div className="p-6 text-center">
                    <Calendar className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
                    <h4 className="font-semibold mb-2">Reserva Fácil</h4>
                    <p className="text-sm text-gray-600">Reserva citas al instante con pagos seguros en línea e integración de calendario</p>
                </div>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white text-black shadow-sm">
                <div className="p-6 text-center">
                    <MessageCircle className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
                    <h4 className="font-semibold mb-2">Soporte 24/7</h4>
                    <p className="text-sm text-gray-600">Obtén ayuda instantánea de nuestro chatbot conéctate con agentes de soporte reales</p>
                </div>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white text-black shadow-sm">
                <div className="p-6 text-center">
                    <Star className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
                    <h4 className="font-semibold mb-2">Reseñas Verificadas</h4>
                    <p className="text-sm text-gray-600">Lee reseñas auténticas de pacientes reales para tomar decisiones informadas</p>
                </div>
            </div>
        </div>
    );
};

export default CardInformation;
