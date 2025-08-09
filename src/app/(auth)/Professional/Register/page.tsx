"use client"
import InfoProfesional from '@/app/(auth)/professional/register/components/infoProfesional';
import PersonalInformation from '@/app/(auth)/professional/register/components/PersonalInformation';
import Services_Prices from '@/app/(auth)/professional/register/components/Services_Prices';
import { useBotonesRegisterContext } from '@/context/botonesRegisterContext';


const RegisterProfessional = () => {

    const {pasoActual, retrocederPaso} = useBotonesRegisterContext()
    
    return (
        <div className="bg-[#5046E7]">
            <div className="w-screen lg:w-[50%] bg-white flex flex-col p-10">
                <div className='flex flex-col justify-center'>
                    <h1 className="text-[30px] mb-5 font-bold text-[#5046E7]">Únete a nuestra red profesional</h1>
                    {pasoActual === 1 && <PersonalInformation />}
                    {pasoActual === 2 &&  <InfoProfesional />}
                    {pasoActual === 3 &&  <Services_Prices />}
                </div>
                {pasoActual != 1 && <button onClick={retrocederPaso}>Volver</button>}
            </div>
        </div>
    );
};

export default RegisterProfessional;
