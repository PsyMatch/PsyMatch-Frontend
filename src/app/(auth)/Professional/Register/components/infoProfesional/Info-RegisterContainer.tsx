import PersonalInformation from '@/components/Register/PersonalInformation';
import Info_RegisterForm from './Info-RegisterForm';
import ExperienceDetails from '@/components/Register/ExperienceDetails';
import { Briefcase } from 'lucide-react';

const Info_RegisterContainer = () => {
    return (
        <div>
            <div className="mb-8">
                <div className="w-full h-2 mb-2 bg-gray-200 rounded-full">
                    <div className="w-[50%] h-2 bg-indigo-600 rounded-full transition-all"></div>
                </div>
                <div className="text-end">
                    <span className="text-sm text-gray-500">Paso 2 de 3</span>
                </div>
            </div>

            <div className="flex flex-col space-y-1.5 mb-10">
                <div className="text-2xl font-semibold leading-none tracking-tight flex items-center">
                    <Briefcase className="h-5 w-5 mr-2" />
                    Información profesional
                </div>
                <div className="text-sm text-gray-500">Su licencia e información profesional</div>
            </div>

            <Info_RegisterForm />
            <ExperienceDetails />
            <PersonalInformation />
        </div>
    );
};

export default Info_RegisterContainer;
