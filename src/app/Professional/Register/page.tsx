import PersonalInformation from '@/components/Register/PersonalInformation';

const ProfessionalRegister = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-3xl font-bold text-gray-900">Únete a Nuestra Red de Profesionales</h2>
                    <div className="inline-flex items-center rounded-full border border-transparent px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 bg-white text-gray-800 hover:bg-indigo-100">
                        Paso 1 de 3
                    </div>
                </div>

                <div
                    aria-valuemax={100}
                    aria-valuemin={0}
                    role="progressbar"
                    data-state="indeterminate"
                    data-max="100"
                    className="relative w-full overflow-hidden rounded-full bg-white h-2 mb-2"
                >
                    <div
                        data-state="indeterminate"
                        data-max="100"
                        className="h-full w-full flex-1 bg-gray-900 transition-all"
                        style={{ transform: 'translateX(-66.666%)' }}
                    ></div>
                </div>

                <p className="text-gray-600">Información Personal</p>
            </div>
            <PersonalInformation />
        </div>
    );
};

export default ProfessionalRegister;
