import { Camera, Mail, Phone, Upload, User } from 'lucide-react';

const PersonalInformation = () => {
    return (
        <div className="rounded-lg border bg-white text-gray-900 shadow-sm">
            <div className="flex flex-col space-y-1.5 p-6">
                <div className="text-2xl font-semibold leading-none tracking-tight flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Información Personal
                </div>
                <div className="text-sm text-gray-500">Cuéntanos sobre ti</div>
            </div>

            <div className="p-6 pt-0 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            htmlFor="firstName"
                        >
                            Nombre *
                        </label>
                        <input
                            className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base ring-offset-white placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                            id="firstName"
                            required
                        />
                    </div>
                    <div>
                        <label
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            htmlFor="lastName"
                        >
                            Apellido *
                        </label>
                        <input
                            className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base ring-offset-white placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                            id="lastName"
                            required
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="email">
                            Correo electrónico *
                        </label>
                        <div className="relative">
                            <Mail className="h-4 w-4 absolute left-3 top-3 text-gray-400" />

                            <input
                                className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base pl-10 ring-offset-white placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                id="email"
                                required
                                type="email"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="phone">
                            Número telefónico *
                        </label>
                        <div className="relative">
                            <Phone className="h-4 w-4 absolute left-3 top-3 text-gray-400" />

                            <input
                                className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base pl-10 ring-offset-white placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                id="phone"
                                required
                                type="tel"
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <label
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        htmlFor="dateOfBirth"
                    >
                        Fecha de nacimiento *
                    </label>
                    <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base ring-offset-white placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                        id="dateOfBirth"
                        required
                        type="date"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            htmlFor="profilePhoto"
                        >
                            Foto de perfil profesional *
                        </label>
                        <div className="mt-2 flex items-center space-x-4">
                            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                                <Camera className="h-8 w-8 text-gray-400" />
                            </div>
                            <div>
                                <input id="profilePhoto" accept="image/*" className="hidden" type="file" />
                                <button
                                    type="button"
                                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium border border-gray-300 bg-white hover:bg-gray-100 hover:text-gray-900 h-10 px-4 py-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                                >
                                    <Upload className="h-4 w-4 mr-2" />
                                    Subir Foto
                                </button>
                                <p className="text-sm text-gray-500 mt-1">JPG, PNG up to 5MB</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <label
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            htmlFor="frontIDCard"
                        >
                            Frente del DNI *
                        </label>
                        <div className="mt-2 flex items-center space-x-4">
                            <div className="w-20 h-20 bg-gray-200 rounded-md flex items-center justify-center">
                                <Camera className="h-8 w-8 text-gray-400" />
                            </div>
                            <div>
                                <input id="frontIDCard" accept="image/*" className="hidden" type="file" />
                                <button
                                    type="button"
                                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium border border-gray-300 bg-white hover:bg-gray-100 hover:text-gray-900 h-10 px-4 py-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                                >
                                    <Upload className="h-4 w-4 mr-2" />
                                    Subir Foto
                                </button>
                                <p className="text-sm text-gray-500 mt-1">JPG, PNG up to 5MB</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <label
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            htmlFor="reverseIDCard"
                        >
                            Reverso del DNI *
                        </label>
                        <div className="mt-2 flex items-center space-x-4">
                            <div className="w-20 h-20 bg-gray-200 rounded-md flex items-center justify-center">
                                <Camera className="h-8 w-8 text-gray-400" />
                            </div>
                            <div>
                                <input id="reverseIDCard" accept="image/*" className="hidden" type="file" />
                                <button
                                    type="button"
                                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium border border-gray-300 bg-white hover:bg-gray-100 hover:text-gray-900 h-10 px-4 py-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                                >
                                    <Upload className="h-4 w-4 mr-2" />
                                    Subir Foto
                                </button>
                                <p className="text-sm text-gray-500 mt-1">JPG, PNG up to 5MB</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        disabled
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 h-10 px-4 py-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                    >
                        Continuar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PersonalInformation;
