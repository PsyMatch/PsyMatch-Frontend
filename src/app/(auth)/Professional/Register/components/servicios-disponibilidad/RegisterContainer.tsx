import { Layers } from 'lucide-react';
import RegisterForm from './RegisterForm';

const RegisterContainer = () => {
    return (
        <div>
            <div className="flex flex-col space-y-1.5 mb-6">
                <div className="text-2xl font-semibold leading-none tracking-tight flex items-center">
                    <Layers className="h-5 w-5 mr-2" />
                    Servicios y Especialidades
                </div>
                <div className="text-sm text-gray-500">¿Qué servicios ofreces y cuáles son tus áreas de especialización?</div>
            </div>

            <RegisterForm />
        </div>
    );
};

export default RegisterContainer;
