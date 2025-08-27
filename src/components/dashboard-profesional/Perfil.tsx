'use client';
import { useEffect, useState, useRef } from 'react';
import { Field, Formik } from 'formik';
import { Form } from 'formik';
import { envs } from '@/config/envs.config';
import Cookies from 'js-cookie';
import Image from 'next/image';
import { Camera, MapPinIcon } from 'lucide-react';
import ModalContraseña from './ModalContraseña';
import { useModalContext } from '@/context/modalContraseña';
import { useNotifications } from '@/hooks/useNotifications';

interface MapboxSuggestion {
    id: string;
    place_name: string;
    center: [number, number]; // [lng, lat]
    place_type: string[];
    relevance: number;
    context?: Array<{
        id: string;
        text: string;
        short_code?: string;
    }>;
    properties?: {
        address?: string;
    };
}

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

    profile_picture?: string;
}

const Perfil = () => {
    const notifications = useNotifications();
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

        profile_picture: '',
    });

    const [_cambios, setCambios] = useState<Partial<ResponseDataProfile>>({});

    const { modal, abrirModal } = useModalContext();

    // Estados para autocompletado de direcciones
    const [addressSuggestions, setAddressSuggestions] = useState<MapboxSuggestion[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [_selectedCoordinates, setSelectedCoordinates] = useState<{ lat: number; lng: number } | null>(null);
    const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
    const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);
    const addressInputRef = useRef<HTMLInputElement>(null);
    const suggestionsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const token = Cookies.get('auth_token');
        if (!token) return;
        fetch(`${envs.next_public_api_url}/psychologist/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((response) => {
                setPerfil(response.data);
                setProfileImage(
                    response.data.profileImage ||
                        response.data.profile_picture ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(response.data.fullName || response.data.name || 'Usuario')}`
                );
            })
            .catch(() => {
                // Error loading profile
            });
    }, []);

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

    const searchAddresses = async (query: string) => {
        if (query.length < 3) {
            setAddressSuggestions([]);
            setShowSuggestions(false);
            return;
        }

        const MAPBOX_TOKEN = envs.next_public_mapbox_token;
        if (!MAPBOX_TOKEN) {
            return;
        }

        setIsLoadingSuggestions(true);
        try {
            const response = await fetch(
                `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?` +
                    `access_token=${MAPBOX_TOKEN}&` +
                    `country=AR&` +
                    `language=es&` +
                    `limit=8&` +
                    `types=address,poi,place&`
            );

            if (response.ok) {
                const data = await response.json();
                setAddressSuggestions(data.features || []);
                setShowSuggestions(true);
            } else {
                setAddressSuggestions([]);
            }
        } catch {
            setAddressSuggestions([]);
        } finally {
            setIsLoadingSuggestions(false);
        }
    };

    const selectAddress = (suggestion: MapboxSuggestion, setFieldValue: (field: string, value: string) => void) => {
        setFieldValue('office_address', suggestion.place_name);
        setShowSuggestions(false);
        setAddressSuggestions([]);

        setSelectedCoordinates({
            lat: suggestion.center[1],
            lng: suggestion.center[0],
        });
        setSelectedPlaceId(suggestion.id);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                suggestionsRef.current &&
                !suggestionsRef.current.contains(event.target as Node) &&
                !addressInputRef.current?.contains(event.target as Node)
            ) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleUpdateProfile = async (cambios: Partial<ResponseDataProfile>, original: ResponseDataProfile) => {
        const token = Cookies.get('auth_token') || Cookies.get('authToken');
        if (!token) return;

        let bodySend = Object.fromEntries(Object.entries(cambios).filter(([key, value]) => value !== original[key as keyof ResponseDataProfile]));

        if (Object.keys(bodySend).length === 0 && !profileFile) {
            return;
        }

        const formData = new FormData();

        Object.entries(bodySend).forEach(([key, value]) => {
            formData.append(key, value as string);
        });

        if (profileFile) {
            formData.append('profile_picture', profileFile);
        }

        await fetch(`${envs.next_public_api_url}/psychologist/me`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        })
            .then((res) => res.json())
            .then((response) => {
                setPerfil((prev) => ({ ...prev, ...response }));
                setProfileImage(`${response.data.profile_picture}?t=${new Date().getTime()}`);
                setCambios({});
                bodySend = {};
                setEditable(false);
                
                console.log("Respuesta completa", response)
                console.log("imagen",response.data.profile_picture)

                notifications.success(`${response.message}`);
            })
            .catch((error) => {
                console.error('Error al actualizar el perfil:', error.message);
            });
    };

    const [editable, setEditable] = useState<boolean>(false);

    const [menuEnfoques, setMenuEnfoques] = useState<boolean>(false);
    const [menuEspecialidades, setMenuEspecialidades] = useState<boolean>(false);
    const [menuIdiomas, setMenuIdiomas] = useState<boolean>(false);
    const [menuIsurances, setMenuIsurances] = useState<boolean>(false);
    const [menuTipos, setMenuTipos] = useState<boolean>(false);
    const [menuModalidad, setMenuModalidad] = useState<boolean>(false);
    const [menuAvailability, setMenuAvailability] = useState<boolean>(false);

    return (
        <div className="flex flex-col items-center w-full min-h-screen px-2 py-8 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl">
            {modal && <ModalContraseña />}
            {/* Panel imagen y contraseña */}
            <div className="flex flex-col items-center w-full max-w-lg p-4 mb-8 bg-white rounded-lg shadow md:p-8">
                <div className="relative mb-4">
  {profileImage && profileImage.startsWith("blob:") ? (
    <img
      src={profileImage}
      alt="profile preview"
      className="object-cover w-24 h-24 bg-gray-200 rounded-full md:w-32 md:h-32"
    />
  ) : (
    <Image
      key={profileImage} // fuerza re-render al cambiar
      src={
        profileImage && profileImage.trim() !== ""
          ? profileImage
          : `https://ui-avatars.com/api/?name=${encodeURIComponent(perfil?.name || "Usuario")}`
      }
      alt="profile"
      width={128}
      height={128}
      className="object-cover w-24 h-24 bg-gray-200 rounded-full md:w-32 md:h-32"
    />
  )}
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
                <h3 className="mb-1 text-lg font-semibold md:text-xl">{perfil?.name}</h3>
                <p className="mb-2 text-gray-500 break-all">{perfil?.email}</p>
                <div className="mb-2 text-sm text-gray-400">{perfil?.phone}</div>
                <div className="text-sm text-gray-400">
                    Idiomas:
                    {perfil?.languages?.map((idioma: string, index: number) => (
                        <span key={index} className="pl-2 py-[2px] text-xs mb-1">
                            {idioma}
                            {index < (perfil?.languages?.length ?? 0) - 1 && ','}
                        </span>
                    ))}
                </div>
                <div>
                    <button onClick={abrirModal} className="px-4 mt-6 text-violet-600 hover:underline">
                        ¿Quieres cambiar tu contraseña?
                    </button>
                </div>
            </div>
            {/* Mi cuenta profesional */}
            <div className="flex flex-col w-full max-w-5xl">
                <div className="p-4 bg-white rounded-lg shadow-md md:p-8">
                    <div className="flex flex-col items-start justify-between gap-2 mb-6 md:flex-row md:items-center">
                        <h2 className="text-xl font-bold md:text-2xl">Mi cuenta profesional</h2>
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
                                <div className="grid grid-cols-1 gap-6 md:gap-10 md:grid-cols-2">
                                    <div className="w-full col-span-2">
                                        <div className="flex flex-col gap-6 md:grid md:grid-cols-2 md:gap-10">
                                            <div>
                                                <label className="block mb-1 text-sm font-medium">Nombre Completo</label>
                                                <div className="w-full px-3 py-2 border rounded bg-gray-50">{perfil?.name}</div>
                                            </div>
                                            <div>
                                                <label className="block mb-1 text-sm font-medium">Título Profesional</label>
                                                <Field
                                                    type="text"
                                                    name="professional_title"
                                                    className="w-full px-3 py-2 border rounded bg-gray-50 focus:outline-none focus:ring-2 focus:ring-violet-400"
                                                    disabled={!editable}
                                                />
                                            </div>
                                            <div>
                                                <label className="block mb-1 text-sm font-medium">Biografía Profesional</label>
                                                <Field
                                                    type="textarea"
                                                    name="personal_biography"
                                                    className="w-full px-3 py-2 overflow-x-hidden border border-black rounded resize-y h-fit bg-gray-50 focus:outline-none focus:ring-2 focus:ring-violet-400"
                                                    disabled={!editable}
                                                />
                                            </div>
                                            <div className="relative">
                                                <label className="block mb-1 text-sm font-medium">Dirección del consultorio</label>
                                                <div ref={addressInputRef}>
                                                    <input
                                                        name="office_address"
                                                        type="text"
                                                        placeholder="Av. Corrientes 123, Buenos Aires, Argentina"
                                                        value={values.office_address || ''}
                                                        disabled={!editable}
                                                        onChange={(e) => {
                                                            setFieldValue('office_address', e.target.value);
                                                            setSelectedCoordinates(null);
                                                            setSelectedPlaceId(null);
                                                            setTimeout(() => {
                                                                if (e.target.value && !selectedPlaceId && editable) {
                                                                    searchAddresses(e.target.value);
                                                                }
                                                            }, 300);
                                                        }}
                                                        className="w-full px-3 py-2 border rounded resize-none bg-gray-50 focus:outline-none focus:ring-2 focus:ring-violet-400"
                                                        autoComplete="off"
                                                    />
                                                </div>
                                                {showSuggestions && editable && (
                                                    <div
                                                        ref={suggestionsRef}
                                                        className="absolute left-0 right-0 z-50 mt-1 overflow-y-auto bg-white border border-gray-300 rounded-md shadow-lg top-full max-h-60"
                                                    >
                                                        {isLoadingSuggestions ? (
                                                            <div className="flex items-center gap-2 p-3 text-sm font-medium">
                                                                <div className="w-4 h-4 border-2 rounded-full border-violet-500 border-t-transparent animate-spin"></div>
                                                                Buscando direcciones en Argentina...
                                                            </div>
                                                        ) : addressSuggestions.length > 0 ? (
                                                            addressSuggestions.map((suggestion) => (
                                                                <button
                                                                    key={suggestion.id}
                                                                    type="button"
                                                                    className="w-full p-3 text-sm text-left transition-colors border-b border-gray-200 hover:bg-violet-50 last:border-b-0"
                                                                    onClick={() => selectAddress(suggestion, setFieldValue)}
                                                                >
                                                                    <div className="flex items-center gap-2">
                                                                        <MapPinIcon className="w-4 h-4 text-violet-500 mt-0.5 flex-shrink-0" />
                                                                        <div className="flex-1 min-w-0">
                                                                            <div className="flex items-center gap-2 text-sm">
                                                                                {suggestion.place_name}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </button>
                                                            ))
                                                        ) : (
                                                            <div className="p-3 text-sm text-center text-gray-600">
                                                                No se encontraron direcciones en Argentina. Intente con una búsqueda más específica.
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <label className="block mb-1 text-sm font-medium">Valor de las Sesiones</label>
                                                <Field
                                                    type="text"
                                                    name="consultation_fee"
                                                    className="w-full px-3 py-2 border rounded resize-none bg-gray-50 focus:outline-none focus:ring-2 focus:ring-violet-400"
                                                    disabled={!editable}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className={`grid w-full grid-cols-1 gap-6 md:grid-cols-2 col-span-2`}>
                                        <div>
                                            <label className="block mb-1 text-sm font-medium">Enfoques Terapéuticos</label>
                                            <ul>
                                                {perfil?.therapy_approaches?.map((serv: string, index: number) => (
                                                    <li key={index} className="bg-violet-50 px-4 py-[2px] text-sm font-bold rounded-xl mb-1">
                                                        {serv}
                                                    </li>
                                                ))}
                                                {editable && (
                                                    <button
                                                        type="button"
                                                        className="px-5 py-1 mt-2 text-xs text-white rounded bg-violet-800 hover:bg-violet-700"
                                                        onClick={() => {
                                                            setMenuEnfoques(!menuEnfoques);
                                                        }}
                                                    >
                                                        {menuEnfoques ? 'cerrar' : 'Agregar Enfoque'}
                                                    </button>
                                                )}
                                                {menuEnfoques && editable && (
                                                    <div className="mt-2">
                                                        <div className="mb-1 text-sm text-gray-500">
                                                            Mantén apretado ctrl para seleccionar múltiples
                                                        </div>
                                                        <select
                                                            className="w-full px-3 py-2 border rounded bg-violet-50 focus:outline-none focus:ring-2 focus:ring-violet-400"
                                                            id="therapy_approaches"
                                                            name="therapy_approaches"
                                                            multiple
                                                            value={values.therapy_approaches}
                                                            onChange={(e) => {
                                                                const valuesArray = Array.from(e.target.selectedOptions, (option) => option.value);
                                                                setFieldValue('therapy_approaches', valuesArray);
                                                            }}
                                                            style={{ height: '120px' }}
                                                        >
                                                            <option value="Terapia cognitivo-conductual">Terapia cognitivo-conductual</option>
                                                            <option value="Terapia de aceptación y compromiso">
                                                                Terapia de aceptación y compromiso
                                                            </option>
                                                            <option value="Terapia psicodinámica">Terapia psicodinámica</option>
                                                            <option value="Terapia de sistemas familiares">Terapia de sistemas familiares</option>
                                                            <option value="Terapia breve centrada en soluciones">
                                                                Terapia breve centrada en soluciones
                                                            </option>
                                                            <option value="Terapia de juego">Terapia de juego</option>
                                                            <option value="Terapia dialéctico-conductual">Terapia dialéctico-conductual</option>
                                                            <option value="Desensibilización y reprocesamiento por movimientos oculares">
                                                                Desensibilización y reprocesamiento por movimientos oculares
                                                            </option>
                                                            <option value="Terapia centrada en la persona">Terapia centrada en la persona</option>
                                                            <option value="Terapia basada en la atención plena">
                                                                Terapia basada en la atención plena
                                                            </option>
                                                            <option value="Terapia Gestalt">Terapia Gestalt</option>
                                                            <option value="Terapia de arte">Terapia de arte</option>
                                                            <option value="Terapia de grupo">Terapia de grupo</option>
                                                        </select>
                                                    </div>
                                                )}
                                            </ul>
                                        </div>
                                        <div>
                                            <label className="block mb-1 text-sm font-medium">Especialidades</label>
                                            <ul>
                                                {perfil?.specialities?.map((speciality: string, index: number) => (
                                                    <li key={index} className="bg-violet-50 px-4 py-[2px] text-sm font-bold rounded-xl mb-1">
                                                        {speciality}
                                                    </li>
                                                ))}
                                                {editable && (
                                                    <button
                                                        type="button"
                                                        className="px-5 py-1 mt-2 text-xs text-white rounded bg-violet-800 hover:bg-violet-700"
                                                        onClick={() => {
                                                            setMenuEspecialidades(!menuEspecialidades);
                                                        }}
                                                    >
                                                        {menuEspecialidades ? 'cerrar' : 'Agregar Especialidades'}
                                                    </button>
                                                )}
                                                {menuEspecialidades && editable && (
                                                    <div className="mt-2">
                                                        <div className="mb-1 text-sm text-gray-500">
                                                            Mantén apretado ctrl para seleccionar múltiples
                                                        </div>
                                                        <select
                                                            className="w-full px-3 py-2 border rounded bg-violet-50 focus:outline-none focus:ring-2 focus:ring-violet-400"
                                                            id="specialities"
                                                            name="specialities"
                                                            multiple
                                                            value={values.specialities}
                                                            onChange={(e) => {
                                                                const valuesArray = Array.from(e.target.selectedOptions, (option) => option.value);
                                                                setFieldValue('specialities', valuesArray);
                                                            }}
                                                            style={{ height: '120px' }}
                                                        >
                                                            <option value="TDAH">TDAH</option>
                                                            <option value="Adicción y abuso de sustancias">Adicción y abuso de sustancias</option>
                                                            <option value="Manejo de la ira">Manejo de la ira</option>
                                                            <option value="Terapia de arte">Terapia de arte</option>
                                                            <option value="Terapia basada en la atención plena">
                                                                Terapia basada en la atención plena
                                                            </option>
                                                            <option value="Trastorno del espectro autista">Trastorno del espectro autista</option>
                                                            <option value="Trastorno bipolar">Trastorno bipolar</option>
                                                            <option value="Orientación profesional">Orientación profesional</option>
                                                            <option value="Terapia centrada en la persona">Terapia centrada en la persona</option>
                                                            <option value="Terapia infantil y adolescente">Terapia infantil y adolescente</option>
                                                            <option value="Manejo del dolor crónico">Manejo del dolor crónico</option>
                                                            <option value="Terapia de pareja">Terapia de pareja</option>
                                                            <option value="Depresión">Depresión</option>
                                                            <option value="Terapia dialéctico-conductual">Terapia dialéctico-conductual</option>
                                                            <option value="Trastorno de la alimentación">Trastorno de la alimentación</option>
                                                            <option value="Desensibilización y reprocesamiento por movimientos oculares">
                                                                Desensibilización y reprocesamiento por movimientos oculares
                                                            </option>
                                                            <option value="Terapia familiar">Terapia familiar</option>
                                                            <option value="Psicología geriátrica">Psicología geriátrica</option>
                                                            <option value="Terapia Gestalt">Terapia Gestalt</option>
                                                            <option value="Duelo y pérdida">Duelo y pérdida</option>
                                                            <option value="Terapia de grupo">Terapia de grupo</option>
                                                            <option value="LGBTQIA">LGBTQIA</option>
                                                            <option value="Transiciones de vida">Transiciones de vida</option>
                                                            <option value="TOC">TOC</option>
                                                            <option value="Trastornos del sueño">Trastornos del sueño</option>
                                                            <option value="Trauma y TEPT">Trauma y TEPT</option>
                                                        </select>
                                                    </div>
                                                )}
                                            </ul>
                                        </div>
                                        <div>
                                            <label className="block mb-1 text-sm font-medium">Idiomas</label>
                                            <div className="flex flex-row flex-wrap gap-2">
                                                {perfil?.languages?.map((idioma: string, index: number) => (
                                                    <span key={index} className="bg-violet-50 px-4 py-[2px] text-sm font-bold rounded-xl mb-1">
                                                        {idioma}
                                                    </span>
                                                ))}
                                            </div>
                                            {editable && (
                                                <button
                                                    type="button"
                                                    className="px-5 py-1 mt-2 text-xs text-white rounded bg-violet-800 hover:bg-violet-700"
                                                    onClick={() => {
                                                        setMenuIdiomas(!menuIdiomas);
                                                    }}
                                                >
                                                    {menuIdiomas ? 'cerrar' : 'Agregar Idioma'}
                                                </button>
                                            )}
                                            {menuIdiomas && editable && (
                                                <div className="mt-2">
                                                    <div className="mb-1 text-sm text-gray-500">Mantén apretado ctrl para seleccionar múltiples</div>
                                                    <select
                                                        className="w-full px-3 py-2 border rounded bg-violet-50 focus:outline-none focus:ring-2 focus:ring-violet-400"
                                                        id="languages"
                                                        name="languages"
                                                        multiple
                                                        value={values.languages}
                                                        onChange={(e) => {
                                                            const valuesArray = Array.from(e.target.selectedOptions, (option) => option.value);
                                                            setFieldValue('languages', valuesArray);
                                                        }}
                                                        style={{ height: '60px' }}
                                                    >
                                                        <option value="Inglés">Inglés</option>
                                                        <option value="Español">Español</option>
                                                        <option value="Portugués">Portugués</option>
                                                    </select>
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block mb-1 text-sm font-medium">Obra Social Aceptadas</label>
                                            <div className="flex flex-row flex-wrap gap-2">
                                                {perfil?.insurance_accepted?.map((insurance: string, index: number) => (
                                                    <span key={index} className="bg-violet-50 px-4 py-[2px] text-sm font-bold rounded-xl mb-1">
                                                        {insurance}
                                                    </span>
                                                ))}
                                            </div>
                                            {editable && (
                                                <button
                                                    type="button"
                                                    className="px-5 py-1 mt-2 text-xs text-white rounded bg-violet-800 hover:bg-violet-700"
                                                    onClick={() => {
                                                        setMenuIsurances(!menuIsurances);
                                                    }}
                                                >
                                                    {menuIsurances ? 'cerrar' : 'Agregar Obra Social'}
                                                </button>
                                            )}
                                            {menuIsurances && editable && (
                                                <div className="mt-2">
                                                    <div className="mb-1 text-sm text-gray-500">Mantén apretado ctrl para seleccionar múltiples</div>
                                                    <select
                                                        className="w-full px-3 py-2 border rounded bg-violet-50 focus:outline-none focus:ring-2 focus:ring-violet-400"
                                                        id="insurance_accepted"
                                                        name="insurance_accepted"
                                                        multiple
                                                        value={values.insurance_accepted}
                                                        onChange={(e) => {
                                                            const valuesArray = Array.from(e.target.selectedOptions, (option) => option.value);
                                                            setFieldValue('insurance_accepted', valuesArray);
                                                        }}
                                                        style={{ height: '100px' }}
                                                    >
                                                        <option value="OSDE">OSDE</option>
                                                        <option value="Swiss Medical">Swiss Medical</option>
                                                        <option value="IOMA">IOMA</option>
                                                        <option value="PAMI">PAMI</option>
                                                        <option value="Unión Personal">Unión Personal</option>
                                                        <option value="OSDEPYM">OSDEPYM</option>
                                                        <option value="Luis Pasteur">Luis Pasteur</option>
                                                        <option value="Jerárquicos Salud">Jerárquicos Salud</option>
                                                        <option value="Sancor Salud">Sancor Salud</option>
                                                        <option value="OSECAC">OSECAC</option>
                                                        <option value="OSMECON Salud">OSMECON Salud</option>
                                                        <option value="Apross">Apross</option>
                                                        <option value="OSPRERA">OSPRERA</option>
                                                        <option value="OSPAT">OSPAT</option>
                                                        <option value="ASE Nacional">ASE Nacional</option>
                                                        <option value="OSPIP">OSPIP</option>
                                                        <option value="Ninguna">Ninguna</option>
                                                    </select>
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block mb-1 text-sm font-medium">Tipos de Sesión</label>
                                            <div className="flex flex-row flex-wrap gap-2">
                                                {perfil?.session_types?.map((tipo: string, index: number) => (
                                                    <span key={index} className="bg-violet-50 px-4 py-[2px] text-sm font-bold rounded-xl mb-1">
                                                        {tipo}
                                                    </span>
                                                ))}
                                            </div>
                                            {editable && (
                                                <button
                                                    type="button"
                                                    className="px-5 py-1 mt-2 text-xs text-white rounded bg-violet-800 hover:bg-violet-700"
                                                    onClick={() => {
                                                        setMenuTipos(!menuTipos);
                                                    }}
                                                >
                                                    {menuTipos ? 'cerrar' : 'Agregar Tipo de Sesión'}
                                                </button>
                                            )}
                                            {menuTipos && editable && (
                                                <div className="mt-2">
                                                    <div className="mb-1 text-sm text-gray-500">Mantén apretado ctrl para seleccionar múltiples</div>
                                                    <select
                                                        className="w-full px-3 py-2 border rounded bg-violet-50 focus:outline-none focus:ring-2 focus:ring-violet-400"
                                                        id="session_types"
                                                        name="session_types"
                                                        multiple
                                                        value={values.session_types}
                                                        onChange={(e) => {
                                                            const valuesArray = Array.from(e.target.selectedOptions, (option) => option.value);
                                                            setFieldValue('session_types', valuesArray);
                                                        }}
                                                        style={{ height: '60px' }}
                                                    >
                                                        <option value="Individual">Individual</option>
                                                        <option value="Pareja">Pareja</option>
                                                        <option value="Familiar">Familiar</option>
                                                        <option value="Grupo">Grupo</option>
                                                    </select>
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block mb-1 text-sm font-medium">Modalidad de Sesión</label>
                                            <Field
                                                type="text"
                                                name="modality"
                                                className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-50"
                                                readOnly
                                            />
                                            {editable && (
                                                <button
                                                    type="button"
                                                    className="px-5 py-1 mt-2 text-xs text-white rounded bg-violet-800 hover:bg-violet-700"
                                                    onClick={() => {
                                                        setMenuModalidad(!menuModalidad);
                                                    }}
                                                >
                                                    {menuModalidad ? 'cerrar' : 'Agregar Modalidad de Sesión'}
                                                </button>
                                            )}
                                            {menuModalidad && editable && (
                                                <div className="mt-2">
                                                    <select
                                                        className="w-full px-3 py-2 border rounded bg-violet-50 focus:outline-none focus:ring-2 focus:ring-violet-400"
                                                        id="modality"
                                                        name="modality"
                                                        onChange={(e) => {
                                                            setFieldValue('modality', e.target.value);
                                                        }}
                                                        style={{ height: '40px' }}
                                                    >
                                                        <option value="En línea">En línea</option>
                                                        <option value="Presencial">Presencial</option>
                                                        <option value="Híbrido">Híbrido</option>
                                                    </select>
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block mb-1 text-sm font-medium">Días Disponibles</label>
                                            <div className="flex flex-row flex-wrap gap-2">
                                                {perfil?.availability?.map((dia: string, index: number) => (
                                                    <span key={index} className="bg-violet-50 px-4 py-[2px] text-sm font-bold rounded-xl mb-1">
                                                        {dia}
                                                    </span>
                                                ))}
                                            </div>
                                            {editable && (
                                                <button
                                                    type="button"
                                                    className="px-5 py-1 mt-2 text-xs text-white rounded bg-violet-800 hover:bg-violet-700"
                                                    onClick={() => {
                                                        setMenuAvailability(!menuAvailability);
                                                    }}
                                                >
                                                    {menuAvailability ? 'cerrar' : 'Agregar Día'}
                                                </button>
                                            )}
                                            {menuAvailability && editable && (
                                                <div className="mt-2">
                                                    <select
                                                        className="w-full px-3 py-2 border rounded bg-violet-50 focus:outline-none focus:ring-2 focus:ring-violet-400"
                                                        id="availability"
                                                        name="availability"
                                                        multiple
                                                        value={values.availability}
                                                        onChange={(e) => {
                                                            const valuesArray = Array.from(e.target.selectedOptions, (option) => option.value);
                                                            setFieldValue('availability', valuesArray);
                                                        }}
                                                        style={{ height: '120px' }}
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
                                            )}
                                        </div>
                                        <div>
                                            <label className="block mb-1 text-sm font-medium">Experiencia</label>
                                            <Field
                                                type="number"
                                                name="professional_experience"
                                                className="w-full px-3 py-2 border rounded bg-gray-50 focus:outline-none focus:ring-2 focus:ring-violet-400"
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
