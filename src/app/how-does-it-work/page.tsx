import Beneficios from '@/components/como-funciona/Beneficios';
import Caracteristicas from '@/components/como-funciona/Caracteristicas';
import Cards_ComoFunciona from '@/components/como-funciona/Cards_ComoFunciona';
import Comenzar from '@/components/como-funciona/Comenzar';
import Preguntas from '@/components/como-funciona/Preguntas';
import Tecnologia from '@/components/como-funciona/tecnologia/Tecnologia';

const Como_Funciona = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br pt-14 from-blue-50 to-indigo-100">
            <div className="w-[50%] m-auto text-center items-center flex flex-col h-52 justify-between">
                <div>
                    <h1 className="text-[40px] mb-4 font-bold">¿Cómo Funciona PsyMatch?</h1>
                    <span className="text-gray-700">
                        Descubre cómo nuestra plataforma impulsada por inteligencia artificial te conecta con el terapeuta perfecto en solo unos
                        minutos.
                    </span>
                </div>
                <span className="px-10 font-bold rounded-full bg-violet-200 w-fit ">Proceso Simplificado en 4 Pasos</span>
            </div>

            <div className="flex flex-col justify-center mt-32">
                <div className="w-[50%] m-auto text-center">
                    <h1 className="mb-4 text-[20px] font-bold">Tu Viaje hacia el Bienestar Mental</h1>
                    <span className="text-gray-700 text-md">Desde la primera consulta hasta el seguimiento continuo</span>
                </div>

                <div className="flex flex-col items-center justify-center">
                    <Cards_ComoFunciona />
                    <Caracteristicas />
                    <Beneficios />
                    <Tecnologia />
                    <Comenzar />
                    <Preguntas />
                </div>
            </div>
        </div>
    );
};

export default Como_Funciona;
