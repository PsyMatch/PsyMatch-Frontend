"use client"
import { Pencil } from "lucide-react"
import Input from "../ui/input"
import { useState } from "react"
import { dashboardProfesionalMock } from "@/helpers/dashboardProfesionalMock"
import Cookies from "js-cookie"

const traduccionesEspecialidades: Record<string, string> = {
  anxiety_disorder: "Trastornos de Ansiedad",
  couples_therapy: "Terapia de Pareja",
  eating_disorder: "Trastornos de la Conducta Alimentaria",
  bipolar_disorder: "Trastorno Bipolar",
  life_transitions: "Transiciones de Vida",
  child_adolescent_therapy: "Terapia Infantil y Adolescente",
  sleep_disorders: "Trastornos del Sueño",
  depression: "Depresión",
  family_therapy: "Terapia Familiar",
  adhd: "TDAH",
  ocd: "TOC",
  career_counseling: "Asesoramiento Laboral",
  geriatric_psychology: "Psicología Geriátrica",
  anger_management: "Manejo de la Ira",
  trauma_ptsd: "Trauma y TEPT",
  addiction_substance_abuse: "Adicciones y Abuso de Sustancias",
  autism_spectrum_disorder: "Trastornos del Espectro Autista",
  grief_loss: "Duelo y Pérdida",
  lgbtqia: "Temas LGBTQ+",
  chronic_pain_management: "Manejo del Dolor Crónico"
};



const Perfil = () => {
    const cookies = Cookies.get('userDataCompleta');
    const userData = cookies ? JSON.parse(cookies) : null;

    const [profileImage, setProfileImage] = useState<string>("https://ui-avatars.com/api/?name=Profesional&background=E0E7FF&color=3730A3");
    const [editable, setEditable] = useState<boolean>(false);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = userData.data.profile_profile
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
        return file
    };


    return (
    <div className="flex flex-col w-full gap-8 px-2 py-8 md:flex-row bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl">
        <div className="flex flex-col items-center w-full md:w-1/2">
            <div className="flex flex-col items-center w-full p-8 bg-white rounded-lg shadow">
                <div className="relative mb-4">
                    <img src={profileImage} alt="profile" className="object-cover w-32 h-32 bg-gray-200 rounded-full" />
                    {editable && (
                        <>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                                id="profile-upload-pro"
                            />
                            <label
                                htmlFor="profile-upload-pro"
                                className="absolute p-2 bg-gray-200 rounded-full shadow cursor-pointer bottom-2 right-2 hover:bg-gray-300"
                            >
                                <Pencil className="w-5 h-5 text-gray-600" />
                            </label>
                        </>
                    )}
                </div>
                <h3 className="mb-1 text-xl font-semibold">{userData.data.name}</h3>
                <p className="mb-2 text-gray-500">{dashboardProfesionalMock.profesional.titulo}</p>
                <div className="mb-2 text-sm text-gray-400">{userData.data.languajes}</div>
            </div>
        </div>
        <div className="flex flex-col w-full md:w-1/2">
            <div className="p-8 bg-white rounded-lg shadow-md">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">Mi cuenta profesional</h2>
                    <button onClick={() => setEditable((e) => !e)} className="px-4 py-2 text-white rounded bg-violet-600 hover:bg-violet-700">
                        {editable ? 'Cancelar' : 'Editar'}
                    </button>
                </div>
                <form className="space-y-6">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <label className="block mb-1 text-sm font-medium">Nombre Completo</label>
                            <Input
                                className="w-full px-3 py-2 border rounded"
                                value={userData.data.name}
                                disabled={!editable}
                            />
                        </div>
                        <div>
                            <label className="block mb-1 text-sm font-medium">Título Profesional</label>
                            <Input
                                className="w-full px-3 py-2 border rounded"
                                value={dashboardProfesionalMock.profesional.titulo}
                                disabled={!editable}
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block mb-1 text-sm font-medium">Biografía Profesional</label>
                            <textarea
                                className="w-full px-3 py-2 border rounded resize-none"
                                value={dashboardProfesionalMock.profesional.biografia}
                                disabled={!editable}
                            />
                        </div>
                        <div>
                            <label className="block mb-1 text-sm font-medium">Especialidades</label>
                            <ul>
                                {userData?.data?.specialities?.map((serv: string, index: number) => (
                                    <li key={index} className="bg-white-400 px-4 py-[2px] text-sm font-bold rounded-xl">
                                        {traduccionesEspecialidades[serv] || serv}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <label className="block mb-1 text-sm font-medium">Idiomas</label>
                            <div className="flex flex-row flex-wrap gap-2">
                                {dashboardProfesionalMock.profesional.idioma.map((idioma, index) => (
                                    <span key={index} className="bg-white-400 px-4 py-[2px] text-sm font-bold rounded-xl">{idioma}</span>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="block mb-1 text-sm font-medium">Disponibilidad</label>
                            <textarea
                                className="w-full h-20 px-3 py-2 border rounded resize-none"
                                value={dashboardProfesionalMock.diasDisponibles.join(', ')}
                                disabled={!editable}
                            />
                        </div>
                    </div>
                    {editable && (
                        <div className="flex justify-end">
                            <button type="button" className="px-6 py-2 text-white bg-green-600 rounded hover:bg-green-700">
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
