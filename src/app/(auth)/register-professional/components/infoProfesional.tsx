'use client';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import React, { useEffect, useState, useRef } from 'react';
import { validationSchemaInfoProfesional, ValoresInfoProfesional } from '@/helpers/formRegister/info-profesional';
import { useBotonesRegisterContext } from '@/context/botonesRegisterContext';
import { AutoSaveCookies, dataToSave, getCookieObject, saveMerged } from '@/helpers/formRegister/helpers';
import { MapPinIcon } from 'lucide-react';
import { envs } from '@/config/envs.config';

const idiomas = ['Inglés', 'Español', 'Portugués'];

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

const InfoProfesional = () => {
    const { avanzarPaso } = useBotonesRegisterContext();

    const [initialValues, setInitialValues] = useState<ValoresInfoProfesional>({
        personal_biography: '',
        languages: [],
        license_number: '',
        professional_title: '',
        professional_experience: '',
        office_address: '',
    });

    // Estados para autocompletado de direcciones
    const [addressSuggestions, setAddressSuggestions] = useState<MapboxSuggestion[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectedCoordinates, setSelectedCoordinates] = useState<{ lat: number; lng: number } | null>(null);
    const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
    const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);
    const addressInputRef = useRef<HTMLInputElement>(null);
    const suggestionsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (initialValues.personal_biography === '' && initialValues.license_number === '' && initialValues.languages.length === 0) {
            const cookieData = getCookieObject();
            if (cookieData) {
                try {
                    setInitialValues({
                        personal_biography: cookieData.personal_biography || '',
                        languages: cookieData.languages || [],
                        license_number: cookieData.license_number || '',
                        professional_title: cookieData.professional_title || '',
                        professional_experience: cookieData.professional_experience || '',
                        office_address: cookieData.office_address || '',
                    });
                } catch (error) {
                    console.error(error);
                }
            }
        }
    }, [initialValues.languages.length, initialValues.license_number, initialValues.personal_biography]);

    const searchAddresses = async (query: string) => {
        if (query.length < 3) {
            setAddressSuggestions([]);
            setShowSuggestions(false);
            return;
        }

        const MAPBOX_TOKEN = envs.next_public_mapbox_token;
        if (!MAPBOX_TOKEN) {
            console.error('Mapbox access token no configurado');
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
        } catch (error) {
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

    const handleSubmit = (values: ValoresInfoProfesional) => {
        console.log('Languages enviados:', values.languages);
        const toSave = dataToSave(values as unknown as Record<string, unknown>);
        console.log('Guardando en cookie (submit):', toSave);
        saveMerged(toSave);
        avanzarPaso();
    };

    return (
        <>
            <div className="flex flex-col space-y-1.5 py-6 mb-3">
                <div className="flex items-center text-[#5046E7] text-2xl font-semibold leading-none tracking-tight">Información profesional</div>
                <div className="text-sm text-gray-500">Su licencia e información profesional</div>
            </div>

            <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchemaInfoProfesional} enableReinitialize>
                {({ values, setFieldValue }) => (
                    <Form>
                        <AutoSaveCookies />
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold leading-none" htmlFor="personal_biography">
                                Biografia Personal *
                            </label>
                            <ErrorMessage name="personal_biography" component="div" className="mt-1 text-sm text-red-600" />
                            <Field
                                as="textarea"
                                name="personal_biography"
                                id="personal_biography"
                                className="w-[90%] h-28 px-3 py-2 text-base bg-white border border-gray-300 rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 md:text-sm resize-none align-top"
                            />
                        </div>

                        <div className="mt-10 font-bold">Idiomas *</div>
                        <ErrorMessage name="languages" component="div" className="mt-1 text-sm text-red-600" />
                        <div className="grid grid-cols-3 gap-5 mt-5">
                            {idiomas.map((idioma) => (
                                <label key={idioma} className="text-[12px]">
                                    <input
                                        type="checkbox"
                                        name="languages"
                                        value={idioma}
                                        checked={values.languages.includes(idioma)}
                                        onChange={() => {
                                            if (values.languages.includes(idioma)) {
                                                // SACAR OPCION SI ESTA SELECCIONADA
                                                setFieldValue(
                                                    'languages',
                                                    values.languages.filter((item) => item !== idioma)
                                                );
                                            } else {
                                                // AGREGAR LA OPCION
                                                setFieldValue('languages', [...values.languages, idioma]);
                                            }
                                        }}
                                    />
                                    {idioma}
                                </label>
                            ))}
                        </div>

                        <div className="flex flex-col gap-2 mt-10">
                            <label className="text-sm font-bold leading-none" htmlFor="professional_experience">
                                Años de experiencia
                            </label>
                            <ErrorMessage name="professional_experience" component="div" className="mt-1 text-sm text-red-600" />
                            <Field
                                name="professional_experience"
                                id="professional_experience"
                                type="number"
                                className="flex w-[90%] h-10 px-3 py-2 text-base bg-white border border-gray-300 rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 md:text-sm"
                            />
                        </div>

                        <div className="flex flex-col gap-2 mt-10">
                            <label className="text-sm font-bold leading-none" htmlFor="license_number">
                                Nro de Matricula Profesional *
                            </label>
                            <ErrorMessage name="license_number" component="div" className="mt-1 text-sm text-red-600" />
                            <Field
                                name="license_number"
                                id="license_number"
                                type="number"
                                className="flex w-[90%] h-10 px-3 py-2 text-base bg-white border border-gray-300 rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 md:text-sm"
                            />
                        </div>

                        <div className="flex flex-col gap-2 mt-10">
                            <label className="text-sm font-bold leading-none" htmlFor="professional_title">
                                Titulo Profesional *
                            </label>
                            <ErrorMessage name="professional_title" component="div" className="mt-1 text-sm text-red-600" />
                            <Field
                                name="professional_title"
                                id="professional_title"
                                type="text"
                                className="flex w-[90%] h-10 px-3 py-2 text-base bg-white border border-gray-300 rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 md:text-sm"
                            />
                        </div>

                        <div className="flex flex-col gap-2 mt-10 relative">
                            <label className="text-sm font-bold leading-none" htmlFor="office_address">
                                Dirección de oficina/consultorio (opcional si haces sesiones presencial)
                            </label>
                            <ErrorMessage name="office_address" component="div" className="mt-1 text-sm text-red-600" />
                            <div ref={addressInputRef}>
                                <input
                                    name="office_address"
                                    id="office_address"
                                    type="text"
                                    placeholder="Av. Corrientes 123, Buenos Aires, Argentina"
                                    value={values.office_address || ''}
                                    onChange={(e) => {
                                        setFieldValue('office_address', e.target.value);
                                        setSelectedCoordinates(null);
                                        setSelectedPlaceId(null);
                                        setTimeout(() => {
                                            if (e.target.value && !selectedPlaceId) {
                                                searchAddresses(e.target.value);
                                            }
                                        }, 300);
                                    }}
                                    className="flex w-[90%] h-10 px-3 py-2 text-base bg-white border border-gray-300 rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 md:text-sm"
                                    autoComplete="off"
                                />
                            </div>

                            {showSuggestions && (
                                <div
                                    ref={suggestionsRef}
                                    className="absolute top-full left-0 right-0 z-50 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto mt-1 w-[90%]"
                                >
                                    {isLoadingSuggestions ? (
                                        <div className="p-3 text-sm font-medium flex items-center gap-2">
                                            <div className="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                                            Buscando direcciones en Argentina...
                                        </div>
                                    ) : addressSuggestions.length > 0 ? (
                                        addressSuggestions.map((suggestion) => (
                                            <button
                                                key={suggestion.id}
                                                type="button"
                                                className="w-full text-left p-3 hover:bg-gray-50 text-sm border-b border-gray-200 last:border-b-0 transition-colors"
                                                onClick={() => selectAddress(suggestion, setFieldValue)}
                                            >
                                                <div className="flex items-center gap-2">
                                                    <MapPinIcon className="w-4 h-4 text-indigo-500 mt-0.5 flex-shrink-0" />
                                                    <div className="flex-1 min-w-0">
                                                        <div className="text-sm flex items-center gap-2">{suggestion.place_name}</div>
                                                    </div>
                                                </div>
                                            </button>
                                        ))
                                    ) : (
                                        <div className="p-3 text-sm text-gray-600 text-center">
                                            No se encontraron direcciones en Argentina. Intente con una búsqueda más específica.
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        <button type="submit" className="px-4 py-1 mt-10 rounded-xl bg-violet-600">
                            Continuar
                        </button>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default InfoProfesional;
