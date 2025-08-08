import Info_RegisterContainer from './components/infoProfesional/Info-RegisterContainer';
import RegisterContainer from './components/servicios-disponibilidad/RegisterContainer';

const RegisterProfessional = () => {
    return (
        <div className="bg-[#5046E7]">
            <div className="w-screen lg:w-[50%] bg-white flex flex-col p-10">
                <div className="m-auto">
                    <h1 className="text-[30px] mb-5 font-bold text-[#5046E7]">Únete a nuestra red profesional</h1>
                    <Info_RegisterContainer />
                    <RegisterContainer />
                    <div className="flex justify-between mt-8">
                        <button
                            className="flex h-10 items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            type="button"
                        >
                            Volver
                        </button>
                        <button
                            className="flex h-10 items-center justify-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            type="button"
                        >
                            Continuar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterProfessional;
