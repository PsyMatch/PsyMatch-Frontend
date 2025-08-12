import { Brain, FileText, MessageCircle, Shield, Star, Video } from "lucide-react"

const Cards_Caracteristicas = () => {
    return (
        <div className="grid grid-cols-3 gap-8 px-20 mt-10 mb-10 justify-items-center">
            <div className="flex flex-col items-center h-48 gap-2 py-5 text-center bg-white border-2 border-gray-300 rounded-lg w-96">
                <Brain className="w-8 h-24 text-[#9333ea]"/>
                <h3 className="font-bold">Emparejamiento con IA</h3>
                <span className="w-[80%] text-gray-600">Algoritmo avanzado que analiza sintomas, preferencias y necesidades específicas</span>
            </div>
            <div className="flex flex-col items-center h-48 gap-2 py-5 text-center bg-white border-2 border-gray-300 rounded-lg w-96">
                <Shield className="w-8 h-24 text-[#16a34a]" />
                <h3 className="font-bold">Terapeutas Verificados</h3>
                <span className="w-[80%] text-gray-600">Todos los profesionales pasan por un riguroso proceso de verificación</span>
            </div>
            <div className="flex flex-col items-center h-48 gap-2 py-5 text-center bg-white border-2 border-gray-300 rounded-lg w-96">
                <Star className="w-8 h-24 text-[#ca8a04]"/>
                <h3 className="font-bold">Reseñas Auténticas</h3>
                <span className="text-gray-600 w-[80%]">Sistema de reseñas verificadas con análisis de sentimientos por IA</span>
            </div>
            <div className="flex flex-col items-center h-48 gap-2 py-5 text-center bg-white border-2 border-gray-300 rounded-lg w-96">
                <MessageCircle className="w-8 h-24 text-[#2563eb]"/>
                <h3 className="font-bold">Soporte 24/7</h3>
                <span className="text-gray-600 w-[80%]">Chatbot de IA y soporte humano disponible las 24 horas</span>
            </div>
            <div className="flex flex-col items-center h-48 gap-2 py-5 text-center bg-white border-2 border-gray-300 rounded-lg w-96">
                <Video className="w-8 h-24 text-[#4f46e5]"/>
                <h3 className="font-bold">Sesiones Flexibles</h3>
                <span className="text-gray-600 w-[80%]">Presencial, online o telefónica según tus preferencias</span>
            </div>
            <div className="flex flex-col items-center h-48 gap-2 py-5 text-center bg-white border-2 border-gray-300 rounded-lg w-96">
                <FileText className="w-8 h-24 text-[#ea580c]"/>
                <h3 className="font-bold">Seguimiento de Progreso</h3>
                <span className="text-gray-600 w-[80%]">Herramientas para monitorear tu bienestar y progreso terapéutico</span>
            </div>
        </div>
    )
}

export default Cards_Caracteristicas