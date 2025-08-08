import PersonalInformation from '@/components/Register/PersonalInformation';
import Info_RegisterForm from './Info-RegisterForm';

const Info_RegisterContainer = () => {
    return (
        <div className="w-screen lg:w-[50%] bg-[#CECECE] flex flex-col pb-20">
            <div className="m-auto">
                <h1 className="text-[30px] my-5 font-bold text-[#5046E7]">Únete a nuestra red profesional</h1>
                <div className="text-end">
                    <div className="w-full h-2 mb-2 bg-white rounded-xl">
                        <div className="w-[50%] h-2 bg-black rounded-xl"></div>
                    </div>
                    <span className="text-gray-500">Paso 2 de 3</span>
                </div>
            </div>

            <div className="mt-6 mb-6 ml-5">
                <h2 className="text-[#5046E7] text-[20px] font-bold">Información profesional</h2>
                <h4 className="font-medium text-gray-700">Su licencia e información profesional</h4>
            </div>
            <Info_RegisterForm />
            <PersonalInformation />
        </div>
    );
};

export default Info_RegisterContainer;
