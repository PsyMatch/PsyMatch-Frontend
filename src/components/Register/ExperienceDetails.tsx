import { FileText } from 'lucide-react';

const ExperienceDetails = () => {
    return (
        <div className="bg-white text-gray-900 shadow-sm">
            <div className="flex flex-col space-y-1.5">
                <div className="text-2xl font-semibold leading-none tracking-tight flex items-center">
                    <FileText className="h-5 w-5 mr-2" />
                    Detalles de Experiencia
                </div>
                <div className="text-sm text-gray-500">Información sobre su experiencia laboral</div>
            </div>

            <div className="pt-6 space-y-6">
                <div>
                    <div className="space-y-4 mt-2">
                        <div className="p-4 border border-gray-300 rounded-lg">
                            <div>
                                <label
                                    className="text-sm font-medium leading-none text-gray-900 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    htmlFor="company-name"
                                >
                                    Nombre de la Empresa
                                </label>
                                <input
                                    className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                    id="company-name"
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label
                                        className="text-sm font-medium leading-none text-gray-900 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        htmlFor="city"
                                    >
                                        Ciudad
                                    </label>
                                    <input
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                        id="city"
                                        placeholder="ej. La Plata"
                                    />
                                </div>
                                <div>
                                    <label
                                        className="text-sm font-medium leading-none text-gray-900 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        htmlFor="province"
                                    >
                                        Provincia
                                    </label>
                                    <input
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                        id="province"
                                        placeholder="ej. Buenos Aires"
                                    />
                                </div>
                                <div>
                                    <label
                                        className="text-sm font-medium leading-none text-gray-900 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        htmlFor="postal-code"
                                    >
                                        Código Postal
                                    </label>
                                    <input
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                        id="postal-code"
                                        placeholder="ej. 1900"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                <div>
                                    <label
                                        className="text-sm font-medium leading-none text-gray-900 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        htmlFor="company-phone"
                                    >
                                        Teléfono de la Empresa
                                    </label>
                                    <input
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                        id="company-phone"
                                        placeholder="ej. +54 221 123-4567"
                                    />
                                </div>
                                <div>
                                    <label
                                        className="text-sm font-medium leading-none text-gray-900 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        htmlFor="years-of-experience"
                                    >
                                        Años de Experiencia
                                    </label>
                                    <input
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                        id="years-of-experience"
                                        placeholder="ej. 5"
                                    />
                                </div>
                            </div>
                            <div>
                                <label
                                    className="text-sm font-medium leading-none text-gray-900 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    htmlFor="job-description"
                                >
                                    Descripción del Puesto
                                </label>
                                <input
                                    className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                    id="job-description"
                                    placeholder="ej. Psicólogo Clínico con experiencia en terapia cognitivo-conductual"
                                />
                            </div>
                        </div>
                        <button
                            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                            type="button"
                        >
                            Agregar Experiencia
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExperienceDetails;
