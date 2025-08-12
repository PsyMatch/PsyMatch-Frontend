'use client';
import { Pencil } from 'lucide-react';
import Input from '../ui/input';
import { useState } from 'react';
import { dashboardProfesionalMock } from '@/helpers/dashboardProfesionalMock';
import Image from 'next/image';

const Perfil = () => {
    const [profileImage, setProfileImage] = useState<string>('https://ui-avatars.com/api/?name=Profesional&background=E0E7FF&color=3730A3');
    const [editable, setEditable] = useState<boolean>(false);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="flex flex-col md:flex-row gap-8 w-full bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-2 rounded-xl">
            <div className="w-full md:w-1/2 flex flex-col items-center">
                <div className="bg-white rounded-lg shadow p-8 flex flex-col items-center w-full">
                    <div className="relative mb-4">
                        <Image
                            src={profileImage}
                            alt="profile"
                            width={128}
                            height={128}
                            className="w-32 h-32 rounded-full object-cover bg-gray-200"
                        />
                        {editable && (
                            <>
                                <Input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="profile-upload-pro" />
                                <label
                                    htmlFor="profile-upload-pro"
                                    className="absolute bottom-2 right-2 bg-gray-200 hover:bg-gray-300 p-2 rounded-full cursor-pointer shadow"
                                >
                                    <Pencil className="w-5 h-5 text-gray-600" />
                                </label>
                            </>
                        )}
                    </div>
                    <h3 className="text-xl font-semibold mb-1">{dashboardProfesionalMock.profesional.nombre}</h3>
                    <p className="text-gray-500 mb-2">{dashboardProfesionalMock.profesional.titulo}</p>
                    <div className="text-sm text-gray-400 mb-2">{dashboardProfesionalMock.profesional.idioma.join(', ')}</div>
                </div>
            </div>
            <div className="w-full md:w-1/2 flex flex-col">
                <div className="bg-white rounded-lg shadow-md p-8">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">Mi cuenta profesional</h2>
                        <button onClick={() => setEditable((e) => !e)} className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded">
                            {editable ? 'Cancelar' : 'Editar'}
                        </button>
                    </div>
                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Nombre Completo</label>
                                <Input
                                    className="border rounded px-3 py-2 w-full"
                                    value={dashboardProfesionalMock.profesional.nombre}
                                    disabled={!editable}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Título Profesional</label>
                                <Input
                                    className="border rounded px-3 py-2 w-full"
                                    value={dashboardProfesionalMock.profesional.titulo}
                                    disabled={!editable}
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium mb-1">Biografía Profesional</label>
                                <textarea
                                    className="border rounded px-3 py-2 w-full resize-none"
                                    value={dashboardProfesionalMock.profesional.biografia}
                                    disabled={!editable}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Especialidades</label>
                                <div className="flex flex-row gap-2 flex-wrap">
                                    {dashboardProfesionalMock.profesional.serviciosYEspecialidades.map((serv, index) => (
                                        <span key={index} className="bg-white-400 px-4 py-[2px] text-sm font-bold rounded-xl">
                                            {serv}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Idiomas</label>
                                <div className="flex flex-row gap-2 flex-wrap">
                                    {dashboardProfesionalMock.profesional.idioma.map((idioma, index) => (
                                        <span key={index} className="bg-white-400 px-4 py-[2px] text-sm font-bold rounded-xl">
                                            {idioma}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Precio por Sesión ($)</label>
                                <Input className="border rounded px-3 py-2 w-full" value={'14000'} disabled={!editable} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Disponibilidad</label>
                                <textarea
                                    className="border rounded px-3 py-2 w-full resize-none h-20"
                                    value={dashboardProfesionalMock.diasDisponibles.join(', ')}
                                    disabled={!editable}
                                />
                            </div>
                        </div>
                        {editable && (
                            <div className="flex justify-end">
                                <button type="button" className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded">
                                    Guardar
                                </button>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Perfil;
