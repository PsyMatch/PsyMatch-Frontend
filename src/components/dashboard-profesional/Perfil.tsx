'use client';
import { useEffect, useState } from 'react';
import { Field, Formik } from 'formik';
import { Form } from 'formik';
import { envs } from '@/config/envs.config';
import Image from 'next/image';
import { Camera } from 'lucide-react';
import ModalContraseña from './ModalContraseña';
import { useModalContext } from '@/context/modalContraseña';

interface ResponseDataProfile {
    name?: string;
    email?: string;
    phone?: number;
    professional_title?: string;
    personal_biography?: string;
    languages?: string[];
    professional_experience?: number;
    office_address?: string;
    therapy_approaches?: string[];
    insurance_accepted?: string[];
    session_types?: string[];
    modality?: string;
    specialities?: string[];
    availability?: string[];
    consultation_fee?: number;
}

const Perfil = () => {
    const [perfil, setPerfil] = useState<ResponseDataProfile | null>({
        name: '',
        email: '',
        phone: 0,
        professional_title: '',
        personal_biography: '',
        languages: [],
        professional_experience: 0,
        office_address: '',
        therapy_approaches: [],
        insurance_accepted: [],
        session_types: [],
        modality: '',
        specialities: [],
        availability: [],
        consultation_fee: 0,
    });

    const [cambios, setCambios] = useState<Partial<ResponseDataProfile>>({});

    const {modal, abrirModal} = useModalContext()

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (!token) return;

        fetch("http://localhost:8080/psychologist/me", {
            headers: { 
                Authorization: `Bearer ${token}` 
            },
        })
            .then((res) => res.json())
            .then((response) => {
                setPerfil(response.data);
            })
            .catch(console.error);
    }, []);

    console.log(perfil);

    const [profileImage, setProfileImage] = useState('');
    const [profileFile, setProfileFile] = useState<File | null>(null);

    // --- Manejadores ---
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setProfileFile(file);
            setProfileImage(URL.createObjectURL(file));
        }
    };

    const handleUpdateProfile = (cambios: Partial<ResponseDataProfile>, original: ResponseDataProfile) => {
        const token = localStorage.getItem('authToken');
        if (!token) return;

        let bodySend = Object.fromEntries(Object.entries(cambios).filter(([key, value]) => value !== original[key as keyof ResponseDataProfile]));

        if (Object.keys(bodySend).length === 0) {
            console.log('No hay cambios para enviar');
            return;
        }

        console.log('Cuerpo de la solicitud:', bodySend);

        fetch(`${envs.next_public_api_url}/psychologist/me`, {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(bodySend)
        })
            .then((res) => res.json())
            .then((response) => {
                console.log('Respuesta:', response);

                setPerfil((prev) => ({ ...prev, ...response }));
                setCambios({});
                bodySend = {};
                setEditable(false);
            })
            .catch((error) => {
                console.error('Error al actualizar el perfil:', error.message);
            });
    };
    console.log('Enviando cambios:', cambios);

    
    const [editable, setEditable] = useState<boolean>(false);

    const [menuEnfoques, setMenuEnfoques] = useState<boolean>(false);
    const [menuEspecialidades, setMenuEspecialidades] = useState<boolean>(false);
    const [menuIdiomas, setMenuIdiomas] = useState<boolean>(false);
    const [menuIsurances, setMenuIsurances] = useState<boolean>(false);
    const [menuTipos, setMenuTipos] = useState<boolean>(false);
    const [menuModalidad, setMenuModalidad] = useState<boolean>(false);
    const [menuAvailability, setMenuAvailability] = useState<boolean>(false);

    return (
        <div className="flex flex-col w-full gap-8 px-2 py-8 md:flex-row bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl">
            {modal  && 
                <ModalContraseña />
            }
            {/* Panel imagen */}
            <div className="flex flex-col items-center w-full md:w-1/2">
                <div className="flex flex-col items-center w-full p-8 bg-white rounded-lg shadow">
                    <div className="relative mb-4">
                        <Image
                            src={
                                profileImage && typeof profileImage === 'string' && profileImage.trim() !== ''
                                    ? profileImage
                                    : `https://ui-avatars.com/api/?name=${encodeURIComponent(perfil?.name || 'Usuario')}`
                            }
                            alt="profile"
                            width={128}
                            height={128}
                            className="object-cover w-32 h-32 bg-gray-200 rounded-full"
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                if (!target.src.includes('ui-avatars.com')) {
                                    target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(perfil?.name || 'Usuario')}`;
                                }
                            }}
                        />
                        {editable && (
                            <>
                                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="profile-upload" />
                                <label
                                    htmlFor="profile-upload"
                                    className="absolute p-2 bg-gray-200 rounded-full shadow cursor-pointer bottom-2 right-2 hover:bg-gray-300"
                                >
                                    <Camera className="w-5 h-5 text-gray-600" />
                                </label>
                            </>
                        )}
                    </div>
                    <h3 className="mb-1 text-xl font-semibold">{perfil?.name}</h3>
                    <p className="mb-2 text-gray-500">{perfil?.email}</p>
                    <div className="mb-2 text-sm text-gray-400">{perfil?.phone}</div>
                    <div className="text-xs text-gray-400">Idiomas: {perfil?.languages || 'No especificados'}</div>
                    <div>
                        <button onClick={abrirModal} className='px-4 mt-6 text-violet-600 hover:underline'>¿Quieres cambiar tu contraseña?</button>
                    </div>
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
                    <Formik<Partial<ResponseDataProfile>>
                        enableReinitialize
                        initialValues={{
                            name: perfil?.name || '',
                            professional_title: perfil?.professional_title || '',
                            personal_biography: perfil?.personal_biography || '',
                            availability: perfil?.availability || [],
                            professional_experience: perfil?.professional_experience || 0,
                            office_address: perfil?.office_address || '',
                            therapy_approaches: perfil?.therapy_approaches || [],
                            specialities: perfil?.specialities || [],
                            insurance_accepted: perfil?.insurance_accepted || [],
                            session_types: perfil?.session_types || [],
                            modality: perfil?.modality || '',
                            consultation_fee: perfil?.consultation_fee || 0,
                        }}
                        onSubmit={(values) => {
                            if (!perfil) return;
                            handleUpdateProfile(values, perfil);
                        }}
                    >
                        {({ values, setFieldValue }) => (
                            <Form className="space-y-6">
                                <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
                                    <div>
                                        <label className="block mb-1 text-sm font-medium">Nombre Completo</label>
                                        <Field type="text" name="name" className="w-full px-3 py-2 border rounded" disabled={!editable} />
                                    </div>
                                    <div>
                                        <label className="block mb-1 text-sm font-medium">Título Profesional</label>
                                        <Field
                                            type="text"
                                            name="professional_title"
                                            className="w-full px-3 py-2 border rounded"
                                            disabled={!editable}
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block mb-1 text-sm font-medium">Biografía Profesional</label>
                                        <Field
                                            type="textarea"
                                            name="personal_biography"
                                            className="w-full px-3 py-2 border rounded resize-none"
                                            disabled={!editable}
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block mb-1 text-sm font-medium">Dirección del consultorio</label>
                                        <Field
                                            type="textarea"
                                            name="office_address"
                                            className="w-full px-3 py-2 border rounded resize-none"
                                            disabled={!editable}
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block mb-1 text-sm font-medium">Valor de las Sesiones</label>
                                        <Field
                                            type="text"
                                            name="consultation_fee"
                                            className="w-full px-3 py-2 border rounded resize-none"
                                            disabled={!editable}
                                        />
                                    </div>

                                    <div
                                        className={`grid w-full grid-cols-2 col-span-2 gap-4 ${editable ? 'md:grid-cols-1 gap-8' : 'md:grid-cols-2'}`}
                                    >
                                        <div>
                                            <label className="block mb-1 text-sm font-medium">Enfoques Terapéuticos</label>
                                            <ul>
                                                {perfil?.therapy_approaches?.map((serv: string, index: number) => (
                                                    <li key={index} className="bg-white-400 px-4 py-[2px] text-sm font-bold rounded-xl">
                                                        {serv}
                                                    </li>
                                                ))}

                                                {/* PONER INPUT */}
                                                {editable && (
                                                    <button
                                                        type="button"
                                                        className="px-5 text-xs text-white bg-violet-800"
                                                        onClick={() => {
                                                            setMenuEnfoques(!menuEnfoques);
                                                        }}
                                                    >
                                                        Agregar Enfoque
                                                    </button>
                                                )}
                                                {menuEnfoques ||
                                                    (editable && (
                                                        <div>
                                                            <div className="text-sm text-gray-500 ">
                                                                Manetene apretado ctrl para seleccionar múltiples
                                                            </div>
                                                            <select
                                                                className="mt-4"
                                                                id="therapy_approaches"
                                                                name="therapy_approaches"
                                                                multiple
                                                                value={values.therapy_approaches}
                                                                onChange={(e) => {
                                                                    const valuesArray = Array.from(
                                                                        e.target.selectedOptions,
                                                                        (option) => option.value
                                                                    );
                                                                    setFieldValue('therapy_approaches', valuesArray);
                                                                }}
                                                                style={{ height: '120px' }}
                                                            >
                                                                <option value="cognitivo-conductual">Terapia cognitivo-conductual</option>
                                                                <option value="aceptacion-compromiso">Terapia de aceptación y compromiso</option>
                                                                <option value="psicodinamica">Terapia psicodinámica</option>
                                                                <option value="sistemas-familiares">Terapia de sistemas familiares</option>
                                                                <option value="breve-soluciones">Terapia breve centrada en soluciones</option>
                                                                <option value="juego">Terapia de juego</option>
                                                                <option value="dialectico-conductual">Terapia dialéctico-conductual</option>
                                                                <option value="emdr">
                                                                    Desensibilización y reprocesamiento por movimientos oculares
                                                                </option>
                                                                <option value="centrada-persona">Terapia centrada en la persona</option>
                                                                <option value="atencion-plena">Terapia basada en la atención plena</option>
                                                                <option value="gestalt">Terapia Gestalt</option>
                                                                <option value="arte">Terapia de arte</option>
                                                                <option value="grupo">Terapia de grupo</option>
                                                            </select>
                                                        </div>
                                                    ))}
                                            </ul>
                                        </div>
                                        <div>
                                            <label className="block mb-1 text-sm font-medium">Especialidades</label>
                                            <ul>
                                                {perfil?.specialities?.map((speciality: string, index: number) => (
                                                    <li key={index} className="bg-white-400 px-4 py-[2px] text-sm font-bold rounded-xl">
                                                        {speciality}
                                                    </li>
                                                ))}
                                                {/* PONER INPUT */}

                                                {editable && (
                                                    <button
                                                        type="button"
                                                        className="px-5 text-xs text-white bg-violet-800"
                                                        onClick={() => {
                                                            setMenuEspecialidades(!menuEspecialidades);
                                                        }}
                                                    >
                                                        Agregar Especialidades
                                                    </button>
                                                )}
                                                {menuEspecialidades ||
                                                    (editable && (
                                                        <div>
                                                            <div className="text-sm text-gray-500 ">
                                                                Manetene apretado ctrl para seleccionar múltiples
                                                            </div>
                                                            <select
                                                                className="mt-4"
                                                                id="insurance_accepted"
                                                                name="insurance_accepted"
                                                                multiple
                                                                value={values.insurance_accepted}
                                                                onChange={(e) => {
                                                                    const valuesArrayInsurance_accepted = Array.from(
                                                                        e.target.selectedOptions,
                                                                        (option) => option.value
                                                                    );
                                                                    setFieldValue('insurance_accepted', valuesArrayInsurance_accepted);
                                                                }}
                                                                style={{ height: '120px' }}
                                                            >
                                                                <option value="cognitivo-conductual">Terapia cognitivo-conductual</option>
                                                                <option value="aceptacion-compromiso">Terapia de aceptación y compromiso</option>
                                                                <option value="psicodinamica">Terapia psicodinámica</option>
                                                                <option value="sistemas-familiares">Terapia de sistemas familiares</option>
                                                                <option value="breve-soluciones">Terapia breve centrada en soluciones</option>
                                                                <option value="juego">Terapia de juego</option>
                                                                <option value="dialectico-conductual">Terapia dialéctico-conductual</option>
                                                                <option value="emdr">
                                                                    Desensibilización y reprocesamiento por movimientos oculares
                                                                </option>
                                                                <option value="centrada-persona">Terapia centrada en la persona</option>
                                                                <option value="atencion-plena">Terapia basada en la atención plena</option>
                                                                <option value="gestalt">Terapia Gestalt</option>
                                                                <option value="arte">Terapia de arte</option>
                                                                <option value="grupo">Terapia de grupo</option>
                                                            </select>
                                                        </div>
                                                    ))}
                                            </ul>
                                        </div>
                                        <div>
                                            <label className="block mb-1 text-sm font-medium">Idiomas</label>
                                            <div className="flex flex-row flex-wrap gap-2">
                                                {perfil?.languages?.map((idioma: string, index: number) => (
                                                    <span key={index} className="bg-white-400 px-4 py-[2px] text-sm font-bold rounded-xl">
                                                        {idioma}
                                                    </span>
                                                ))}
                                            </div>
                                            {/* PONER INPUT */}

                                            {editable && (
                                                <button
                                                    type="button"
                                                    className="px-5 text-xs text-white bg-violet-800"
                                                    onClick={() => {
                                                        setMenuIdiomas(!menuIdiomas);
                                                    }}
                                                >
                                                    Agregar Idioma
                                                </button>
                                            )}
                                            {menuIdiomas ||
                                                (editable && (
                                                    <div>
                                                        <div className="text-sm text-gray-500 ">
                                                            Manetene apretado ctrl para seleccionar múltiples
                                                        </div>
                                                        <select
                                                            className="mt-4"
                                                            id="therapy_approaches"
                                                            name="therapy_approaches"
                                                            multiple
                                                            value={values.therapy_approaches}
                                                            onChange={(e) => {
                                                                const valuesArray = Array.from(e.target.selectedOptions, (option) => option.value);
                                                                setFieldValue('therapy_approaches', valuesArray);
                                                            }}
                                                            style={{ height: '60px', width: '30%' }}
                                                        >
                                                            <option value="ingles">Inglés</option>
                                                            <option value="español">Español</option>
                                                            <option value="frances">Francés</option>
                                                        </select>
                                                    </div>
                                                ))}
                                        </div>
                                        <div>
                                            <label className="block mb-1 text-sm font-medium">Obra Social Aceptadas</label>
                                            <div className="flex flex-row flex-wrap gap-2">
                                                {perfil?.insurance_accepted?.map((insurance: string, index: number) => (
                                                    <span key={index} className="bg-white-400 px-4 py-[2px] text-sm font-bold rounded-xl">
                                                        {insurance}
                                                    </span>
                                                ))}
                                            </div>
                                            {/* PONER INPUT */}

                                            {editable && (
                                                <button
                                                    type="button"
                                                    className="px-5 text-xs text-white bg-violet-800"
                                                    onClick={() => {
                                                        setMenuIsurances(!menuIsurances);
                                                    }}
                                                >
                                                    Agregar Obra Social
                                                </button>
                                            )}
                                            {menuIsurances ||
                                                (editable && (
                                                    <div>
                                                        <div className="text-sm text-gray-500 ">
                                                            Manetene apretado ctrl para seleccionar múltiples
                                                        </div>
                                                        <select
                                                            className="mt-4"
                                                            id="therapy_approaches"
                                                            name="therapy_approaches"
                                                            multiple
                                                            value={values.therapy_approaches}
                                                            onChange={(e) => {
                                                                const valuesArray = Array.from(e.target.selectedOptions, (option) => option.value);
                                                                setFieldValue('therapy_approaches', valuesArray);
                                                            }}
                                                            style={{ height: '60px', width: '30%' }}
                                                        >
                                                            <option value="ingles">Inglés</option>
                                                            <option value="español">Español</option>
                                                            <option value="frances">Francés</option>
                                                        </select>
                                                    </div>
                                                ))}
                                        </div>
                                        <div>
                                            <label className="block mb-1 text-sm font-medium">Tipos de Sesión</label>
                                            <div className="flex flex-row flex-wrap gap-2">
                                                {perfil?.session_types?.map((tipo: string, index: number) => (
                                                    <span key={index} className="bg-white-400 px-4 py-[2px] text-sm font-bold rounded-xl">
                                                        {tipo}
                                                    </span>
                                                ))}
                                            </div>
                                            {/* PONER INPUT */}

                                            {editable && (
                                                <button
                                                    type="button"
                                                    className="px-5 text-xs text-white bg-violet-800"
                                                    onClick={() => {
                                                        setMenuTipos(!menuTipos);
                                                    }}
                                                >
                                                    Agregar Tipo de Sesión
                                                </button>
                                            )}
                                            {menuTipos ||
                                                (editable && (
                                                    <div>
                                                        <div className="text-sm text-gray-500 ">
                                                            Manetene apretado ctrl para seleccionar múltiples
                                                        </div>
                                                        <select
                                                            className="mt-4"
                                                            id="session_types"
                                                            name="session_types"
                                                            multiple
                                                            value={values.session_types}
                                                            onChange={(e) => {
                                                                const valuesArray = Array.from(e.target.selectedOptions, (option) => option.value);
                                                                setFieldValue('session_types', valuesArray);
                                                            }}
                                                            style={{ height: '60px', width: '30%' }}
                                                        >
                                                            <option value="ingles">Inglés</option>
                                                            <option value="español">Español</option>
                                                            <option value="frances">Francés</option>
                                                        </select>
                                                    </div>
                                                ))}
                                        </div>
                                        <div>
                                            <label className="block mb-1 text-sm font-medium">Modalidad de Sesión</label>
                                            <Field type="text" name="modality" className="w-full px-3 py-2 border rounded" disabled={!editable} />
                                            {/* PONER INPUT */}
                                            {editable && (
                                                <button
                                                    type="button"
                                                    className="px-5 text-xs text-white bg-violet-800"
                                                    onClick={() => {
                                                        setMenuModalidad(!menuModalidad);
                                                    }}
                                                >
                                                    Agregar Modalidad de Sesión
                                                </button>
                                            )}
                                            {menuModalidad ||
                                                (editable && (
                                                    <div>
                                                        <select
                                                            className="mt-4"
                                                            id="modality"
                                                            name="modality"
                                                            onChange={(e) => {
                                                                const valuesArray = Array.from(e.target.selectedOptions, (option) => option.value);
                                                                setFieldValue('modality', valuesArray);
                                                            }}
                                                            style={{ height: '20px' }}
                                                        >
                                                            <option value="on_line">En línea</option>
                                                            <option value="presencial">Presencial</option>
                                                            <option value="hibrido">Híbrido</option>
                                                        </select>
                                                    </div>
                                                ))}
                                        </div>
                                        <div>
                                            <label className="block mb-1 text-sm font-medium">Días Disponibles</label>
                                            <div className="flex flex-row flex-wrap gap-2">
                                                {perfil?.availability?.map((dia: string, index: number) => (
                                                    <span key={index} className="bg-white-400 px-4 py-[2px] text-sm font-bold rounded-xl">
                                                        {dia}
                                                    </span>
                                                ))}
                                            </div>
                                            {/* PONER INPUT */}
                                            {editable && (
                                                <button
                                                    type="button"
                                                    className="px-5 text-xs text-white bg-violet-800"
                                                    onClick={() => {
                                                        setMenuAvailability(!menuAvailability);
                                                    }}
                                                >
                                                    Agregar Día
                                                </button>
                                            )}
                                            {menuAvailability ||
                                                (editable && (
                                                    <div>
                                                        <select
                                                            className="mt-4"
                                                            id="availability"
                                                            name="availability"
                                                            multiple
                                                            value={values.availability}
                                                            onChange={(e) => {
                                                                const valuesArray = Array.from(e.target.selectedOptions, (option) => option.value);
                                                                setFieldValue('availability', valuesArray);
                                                            }}
                                                            style={{ height: '120px', width: '30%' }}
                                                        >
                                                            <option value="Lunes">Lunes</option>
                                                            <option value="Martes">Martes</option>
                                                            <option value="Miércoles">Miércoles</option>
                                                            <option value="Jueves">Jueves</option>
                                                            <option value="Viernes">Viernes</option>
                                                            <option value="Sábado">Sábado</option>
                                                            <option value="Domingo">Domingo</option>
                                                        </select>
                                                    </div>
                                                ))}
                                        </div>

                                        <div>
                                            <label className="block mb-1 text-sm font-medium">Experiencia</label>
                                            <Field
                                                type="number"
                                                name="professional_experience"
                                                className="w-full px-3 py-2 border rounded"
                                                disabled={!editable}
                                            />
                                        </div>
                                        <div></div>
                                    </div>
                                </div>
                                {editable && (
                                    <div className="flex justify-end">
                                        <button type="submit" className="px-6 py-2 text-white bg-green-600 rounded hover:bg-green-700">
                                            Guardar
                                        </button>
                                    </div>
                                )}
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default Perfil;
