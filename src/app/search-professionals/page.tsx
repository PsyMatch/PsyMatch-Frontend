'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Search, ChevronDown, Funnel, Star, MapPin, Users, Video, Calendar } from 'lucide-react';
import { psychologistsService, PsychologistResponse } from '@/services/psychologists';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import {
    idiomas,
    modalidades,
    especialidades,
    enfoquesTerapia,
    tiposTerapia,
    disponibilidad,
    obrasSociales,
    opcionesOrdenamiento,
} from '@/constants/filters';

const Filter = () => {
    const router = useRouter();

    const [psychologists, setPsychologists] = useState<PsychologistResponse[]>([]);

    const [precioMin, setPrecioMin] = useState('');
    const [precioMax, setPrecioMax] = useState('');
    const [modalidadSeleccionada, setModalidadSeleccionada] = useState('');
    const [idiomaSeleccionado, setIdiomaSeleccionado] = useState('');
    const [obraSocialSeleccionada, setObraSocialSeleccionada] = useState('');
    const [tipoTerapiaSeleccionado, setTipoTerapiaSeleccionado] = useState('');
    const [disponibilidadSeleccionada, setDisponibilidadSeleccionada] = useState<string[]>([]);
    const [enfoquesTerapiaSeleccionados, setEnfoquesTerapiaSeleccionados] = useState<string[]>([]);
    const [especialidadesSeleccionadas, setEspecialidadesSeleccionadas] = useState<string[]>([]);

    const getAuthToken = () => {
        if (typeof window === 'undefined') return null;

        const authToken = Cookies.get('auth-token');
        const authTokenAlt = Cookies.get('authToken');

        console.log('Available cookies:');
        console.log('auth-token:', authToken);
        console.log('authToken:', authTokenAlt);
        console.log('All cookies:', document.cookie);

        return authToken || authTokenAlt;
    };

    const redirectToLogin = useCallback(() => {
        router.push('/login');
    }, [router]);

    const calcularPrecio = useCallback((psicologo: PsychologistResponse): number => {
        const experiencia = psicologo.professional_experience || 0;
        const precioBase = 35000;

        let precio = precioBase;
        if (experiencia >= 20) {
            precio = 60000;
        } else if (experiencia >= 15) {
            precio = 55000;
        } else if (experiencia >= 10) {
            precio = 50000;
        } else if (experiencia >= 5) {
            precio = 45000;
        } else {
            precio = 40000;
        }

        if (psicologo.modality === 'En línea') {
            precio *= 0.85;
        }

        return Math.round(precio);
    }, []);

    useEffect(() => {
        const loadPsychologists = async () => {
            try {
                const authToken = getAuthToken();

                if (!authToken) {
                    console.log('No auth token found, redirecting to login');
                    redirectToLogin();
                    return;
                }

                const response = await psychologistsService.getPsychologistsForPatient();
                setPsychologists(response.data);
            } catch (error) {
                console.error('Error loading psychologists:', error);

                if (error instanceof Error) {
                    if (
                        error.message.includes('Authentication failed') ||
                        error.message.includes('Token expired') ||
                        error.message.includes('Invalid token') ||
                        error.message.includes('No authentication token found')
                    ) {
                        console.log('Authentication error, redirecting to login');
                        redirectToLogin();
                        return;
                    }
                }

                redirectToLogin();
            }
        };

        loadPsychologists();
    }, [router, redirectToLogin]);

    const [busqueda, setBusqueda] = useState('');

    const [modalidadAbierta, setModalidadAbierta] = useState(false);
    const [idiomaAbierto, setIdiomaAbierto] = useState(false);
    const [obraSocialAbierta, setObraSocialAbierta] = useState(false);
    const [tipoTerapiaAbierto, setTipoTerapiaAbierto] = useState(false);
    const [ordenamientoAbierto, setOrdenamientoAbierto] = useState(false);

    const [ordenamientoSeleccionado, setOrdenamientoSeleccionado] = useState('rating');

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;

            if (target.closest('[data-dropdown]')) {
                return;
            }

            setModalidadAbierta(false);
            setIdiomaAbierto(false);
            setObraSocialAbierta(false);
            setTipoTerapiaAbierto(false);
            setOrdenamientoAbierto(false);
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    const limpiarFiltros = () => {
        setPrecioMin('');
        setPrecioMax('');
        setModalidadSeleccionada('');
        setIdiomaSeleccionado('');
        setObraSocialSeleccionada('');
        setTipoTerapiaSeleccionado('');
        setDisponibilidadSeleccionada([]);
        setEnfoquesTerapiaSeleccionados([]);
        setEspecialidadesSeleccionadas([]);
    };

    const toggleCheckbox = (value: string, selectedItems: string[], setSelectedItems: (items: string[]) => void) => {
        if (selectedItems.includes(value)) {
            setSelectedItems(selectedItems.filter((item) => item !== value));
        } else {
            setSelectedItems([...selectedItems, value]);
        }
    };

    const filtrarPsicologos = () => {
        if (psychologists.length > 0) {
            console.log('Ejemplo de psicólogo del backend:', psychologists[0]);
            console.log('Modalidades disponibles:', [...new Set(psychologists.map((p) => p.modality).filter(Boolean))]);
            console.log('Idiomas disponibles:', [...new Set(psychologists.flatMap((p) => p.languages || []))]);
            console.log('Especialidades disponibles:', [...new Set(psychologists.flatMap((p) => p.specialities || []))]);
        }

        let resultado = psychologists.filter((psicologo) => {
            const precioPsicologo = calcularPrecio(psicologo);
            const precioMinNum = precioMin ? parseFloat(precioMin) : 0;
            const precioMaxNum = precioMax ? parseFloat(precioMax) : Infinity;

            if (precioPsicologo < precioMinNum || precioPsicologo > precioMaxNum) {
                return false;
            }

            if (modalidadSeleccionada) {
                const modalidadPsicologo = psicologo.modality;

                if (modalidadPsicologo === modalidadSeleccionada) {
                } else if (modalidadPsicologo === 'Híbrido' && (modalidadSeleccionada === 'Presencial' || modalidadSeleccionada === 'En línea')) {
                } else {
                    return false;
                }
            }

            if (idiomaSeleccionado && psicologo.languages) {
                const tieneIdioma = psicologo.languages.some(
                    (lang) =>
                        lang.toLowerCase().includes(idiomaSeleccionado.toLowerCase()) || idiomaSeleccionado.toLowerCase().includes(lang.toLowerCase())
                );
                if (!tieneIdioma) {
                    return false;
                }
            }

            if (obraSocialSeleccionada && psicologo.insurance_accepted) {
                const tieneObraSocial = psicologo.insurance_accepted.some(
                    (insurance) =>
                        insurance.toLowerCase().includes(obraSocialSeleccionada.toLowerCase()) ||
                        obraSocialSeleccionada.toLowerCase().includes(insurance.toLowerCase())
                );
                if (!tieneObraSocial) {
                    return false;
                }
            }

            if (tipoTerapiaSeleccionado && psicologo.session_types) {
                const tieneTipoTerapia = psicologo.session_types.some(
                    (sessionType) =>
                        sessionType.toLowerCase().includes(tipoTerapiaSeleccionado.toLowerCase()) ||
                        tipoTerapiaSeleccionado.toLowerCase().includes(sessionType.toLowerCase())
                );
                if (!tieneTipoTerapia) {
                    return false;
                }
            }

            if (disponibilidadSeleccionada.length > 0 && psicologo.availability) {
                const tieneDisponibilidad = disponibilidadSeleccionada.some((diaSeleccionado) =>
                    psicologo.availability!.some(
                        (diaDisponible) =>
                            diaDisponible.toLowerCase().includes(diaSeleccionado.toLowerCase()) ||
                            diaSeleccionado.toLowerCase().includes(diaDisponible.toLowerCase())
                    )
                );
                if (!tieneDisponibilidad) {
                    return false;
                }
            }

            if (enfoquesTerapiaSeleccionados.length > 0 && psicologo.therapy_approaches) {
                const tieneEnfoque = enfoquesTerapiaSeleccionados.some((enfoqueSeleccionado) =>
                    psicologo.therapy_approaches!.some(
                        (enfoqueDisponible) =>
                            enfoqueDisponible.toLowerCase().includes(enfoqueSeleccionado.toLowerCase()) ||
                            enfoqueSeleccionado.toLowerCase().includes(enfoqueDisponible.toLowerCase())
                    )
                );
                if (!tieneEnfoque) {
                    return false;
                }
            }
            if (especialidadesSeleccionadas.length > 0 && psicologo.specialities) {
                const tieneEspecialidad = especialidadesSeleccionadas.some((especialidadSeleccionada) =>
                    psicologo.specialities!.some(
                        (especialidadDisponible) =>
                            especialidadDisponible.toLowerCase().includes(especialidadSeleccionada.toLowerCase()) ||
                            especialidadSeleccionada.toLowerCase().includes(especialidadDisponible.toLowerCase())
                    )
                );
                if (!tieneEspecialidad) {
                    return false;
                }
            }

            if (busqueda) {
                const busquedaLower = busqueda.toLowerCase();
                const coincideNombre = psicologo.name.toLowerCase().includes(busquedaLower);
                const coincideUbicacion = psicologo.office_address ? psicologo.office_address.toLowerCase().includes(busquedaLower) : false;
                const coincideDescripcion = psicologo.personal_biography ? psicologo.personal_biography.toLowerCase().includes(busquedaLower) : false;

                if (!coincideNombre && !coincideUbicacion && !coincideDescripcion) {
                    return false;
                }
            }

            return true;
        });

        switch (ordenamientoSeleccionado) {
            case 'rating':
                resultado = resultado.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'price_asc':
                resultado = resultado.sort((a, b) => {
                    const precioA = calcularPrecio(a);
                    const precioB = calcularPrecio(b);
                    return precioA - precioB;
                });
                break;
            case 'price_desc':
                resultado = resultado.sort((a, b) => {
                    const precioA = calcularPrecio(a);
                    const precioB = calcularPrecio(b);
                    return precioB - precioA;
                });
                break;
            case 'experience':
                resultado = resultado.sort((a, b) => {
                    const expA = a.professional_experience || 0;
                    const expB = b.professional_experience || 0;
                    return expB - expA;
                });
                break;
            case 'availability':
                resultado = resultado.sort((a, b) => a.name.localeCompare(b.name));
                break;
            default:
                break;
        }

        return resultado;
    };

    const psicologosFiltrados = filtrarPsicologos();

    const obtenerNombreModalidad = (value: string) => {
        const modalidad = modalidades.find((m) => m === value);
        return modalidad ? modalidad : value;
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Buscar Terapeutas</h2>
                <div className="flex flex-col lg:flex-row gap-4">
                    <div className="flex-1">
                        <div className="relative">
                            <Search className="h-5 w-5 absolute left-3 top-3 text-gray-400" aria-hidden="true" />
                            <input
                                value={busqueda}
                                onChange={(e) => setBusqueda(e.target.value)}
                                className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base placeholder:text-gray-400 pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                placeholder="Buscar por nombre, especialidad o síntomas..."
                            />
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <div className="relative" data-dropdown>
                            <button
                                type="button"
                                onClick={() => setOrdenamientoAbierto(!ordenamientoAbierto)}
                                className="flex h-10 w-48 items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
                            >
                                <span>{opcionesOrdenamiento.find((opcion) => opcion.value === ordenamientoSeleccionado)?.label}</span>
                                <ChevronDown className="h-4 w-4 opacity-50" aria-hidden="true" />
                            </button>

                            {ordenamientoAbierto && (
                                <div className="absolute z-50 mt-1 w-full rounded-md border border-gray-300 bg-white shadow-lg">
                                    <div className="py-1">
                                        {opcionesOrdenamiento.map((opcion) => (
                                            <button
                                                key={opcion.value}
                                                onClick={() => {
                                                    setOrdenamientoSeleccionado(opcion.value);
                                                    setOrdenamientoAbierto(false);
                                                }}
                                                className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-100 ${
                                                    ordenamientoSeleccionado === opcion.value ? 'bg-indigo-50 text-indigo-600' : 'text-gray-900'
                                                }`}
                                            >
                                                {opcion.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-8">
                <div className="lg:w-1/4">
                    <div className="rounded-lg border border-gray-300 bg-white text-gray-900 shadow-sm sticky top-4">
                        <div className="flex flex-col space-y-1.5 p-6">
                            <div className="flex items-center justify-between">
                                <div className="text-2xl font-semibold leading-none tracking-tight flex items-center">
                                    <Funnel
                                        className="h-5 w-5 mr-2"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        aria-hidden="true"
                                    />
                                    Filtros
                                </div>
                                <button
                                    onClick={limpiarFiltros}
                                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium rounded-md border border-gray-300 bg-white px-3 py-2 h-9 transition-colors hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                                >
                                    Limpiar Todo
                                </button>
                            </div>

                            <div>
                                <label className="text-sm font-medium mb-2 block">Rango de Precio ($)</label>
                                <div className="flex gap-2">
                                    <div className="flex-1">
                                        <label className="text-xs text-gray-500 mb-1 block">Mínimo</label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">$</span>
                                            <input
                                                type="number"
                                                placeholder="0"
                                                value={precioMin}
                                                onChange={(e) => setPrecioMin(e.target.value)}
                                                className="flex h-9 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 pl-7 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <label className="text-xs text-gray-500 mb-1 block">Máximo</label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">$</span>
                                            <input
                                                type="number"
                                                placeholder="50000"
                                                value={precioMax}
                                                onChange={(e) => setPrecioMax(e.target.value)}
                                                className="flex h-9 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 pl-7 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div data-dropdown>
                                <label className="text-sm font-medium mb-2 block">Modalidad</label>
                                <div className="relative">
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setIdiomaAbierto(false);
                                            setObraSocialAbierta(false);
                                            setTipoTerapiaAbierto(false);
                                            setModalidadAbierta(!modalidadAbierta);
                                        }}
                                        className="flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        <span>
                                            {modalidadSeleccionada ? modalidades.find((m) => m === modalidadSeleccionada) : 'Todas las Modalidades'}
                                        </span>
                                        <ChevronDown className={`h-4 w-4 opacity-50 transition-transform ${modalidadAbierta ? 'rotate-180' : ''}`} />
                                    </button>
                                    {modalidadAbierta && (
                                        <div
                                            onClick={(e) => e.stopPropagation()}
                                            className="absolute z-10 mt-1 w-full rounded-md border border-gray-300 bg-white shadow-lg"
                                        >
                                            <div className="py-1">
                                                <button
                                                    onClick={() => {
                                                        setModalidadSeleccionada('');
                                                        setModalidadAbierta(false);
                                                    }}
                                                    className="block w-full px-3 py-2 text-left text-sm hover:bg-gray-100"
                                                >
                                                    Todas las Modalidades
                                                </button>
                                                {modalidades.map((modalidad) => (
                                                    <button
                                                        key={modalidad}
                                                        onClick={() => {
                                                            setModalidadSeleccionada(modalidad);
                                                            setModalidadAbierta(false);
                                                        }}
                                                        className="block w-full px-3 py-2 text-left text-sm hover:bg-gray-100"
                                                    >
                                                        {modalidad}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div data-dropdown>
                                <label className="text-sm font-medium mb-2 block">Idiomas</label>
                                <div className="relative">
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setModalidadAbierta(false);
                                            setObraSocialAbierta(false);
                                            setTipoTerapiaAbierto(false);
                                            setIdiomaAbierto(!idiomaAbierto);
                                        }}
                                        className="flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        <span>
                                            {idiomaSeleccionado
                                                ? idiomas.find((i) => i === idiomaSeleccionado) || idiomaSeleccionado
                                                : 'Todos los Idiomas'}
                                        </span>
                                        <ChevronDown className={`h-4 w-4 opacity-50 transition-transform ${idiomaAbierto ? 'rotate-180' : ''}`} />
                                    </button>
                                    {idiomaAbierto && (
                                        <div
                                            onClick={(e) => e.stopPropagation()}
                                            className="absolute z-10 mt-1 w-full rounded-md border border-gray-300 bg-white shadow-lg"
                                        >
                                            <div className="py-1">
                                                <button
                                                    onClick={() => {
                                                        setIdiomaSeleccionado('');
                                                        setIdiomaAbierto(false);
                                                    }}
                                                    className="block w-full px-3 py-2 text-left text-sm hover:bg-gray-100"
                                                >
                                                    Todos los Idiomas
                                                </button>
                                                {idiomas.map((idioma) => (
                                                    <button
                                                        key={idioma}
                                                        onClick={() => {
                                                            setIdiomaSeleccionado(idioma);
                                                            setIdiomaAbierto(false);
                                                        }}
                                                        className="block w-full px-3 py-2 text-left text-sm hover:bg-gray-100"
                                                    >
                                                        {idioma}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div data-dropdown>
                                <label className="text-sm font-medium mb-2 block">Obra Social</label>
                                <div className="relative">
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setModalidadAbierta(false);
                                            setIdiomaAbierto(false);
                                            setTipoTerapiaAbierto(false);
                                            setObraSocialAbierta(!obraSocialAbierta);
                                        }}
                                        className="flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        <span>
                                            {obraSocialSeleccionada
                                                ? obrasSociales.find((o) => o === obraSocialSeleccionada)
                                                : 'Todas las Obras Sociales'}
                                        </span>
                                        <ChevronDown className={`h-4 w-4 opacity-50 transition-transform ${obraSocialAbierta ? 'rotate-180' : ''}`} />
                                    </button>
                                    {obraSocialAbierta && (
                                        <div
                                            onClick={(e) => e.stopPropagation()}
                                            className="absolute z-10 mt-1 w-full rounded-md border border-gray-300 bg-white shadow-lg max-h-48 overflow-y-auto"
                                        >
                                            <div className="py-1">
                                                <button
                                                    onClick={() => {
                                                        setObraSocialSeleccionada('');
                                                        setObraSocialAbierta(false);
                                                    }}
                                                    className="block w-full px-3 py-2 text-left text-sm hover:bg-gray-100"
                                                >
                                                    Todas las Obras Sociales
                                                </button>
                                                {obrasSociales.map((obra) => (
                                                    <button
                                                        key={obra}
                                                        onClick={() => {
                                                            setObraSocialSeleccionada(obra);
                                                            setObraSocialAbierta(false);
                                                        }}
                                                        className="block w-full px-3 py-2 text-left text-sm hover:bg-gray-100"
                                                    >
                                                        {obra}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div data-dropdown>
                                <label className="text-sm font-medium mb-2 block">Tipos de Terapia</label>
                                <div className="relative">
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setModalidadAbierta(false);
                                            setIdiomaAbierto(false);
                                            setObraSocialAbierta(false);
                                            setTipoTerapiaAbierto(!tipoTerapiaAbierto);
                                        }}
                                        className="flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        <span>
                                            {tipoTerapiaSeleccionado
                                                ? tiposTerapia.find((t) => t === tipoTerapiaSeleccionado)
                                                : 'Cualquier Tipo de Terapia'}
                                        </span>
                                        <ChevronDown
                                            className={`h-4 w-4 opacity-50 transition-transform ${tipoTerapiaAbierto ? 'rotate-180' : ''}`}
                                        />
                                    </button>
                                    {tipoTerapiaAbierto && (
                                        <div
                                            onClick={(e) => e.stopPropagation()}
                                            className="absolute z-10 mt-1 w-full rounded-md border border-gray-300 bg-white shadow-lg"
                                        >
                                            <div className="py-1">
                                                <button
                                                    onClick={() => {
                                                        setTipoTerapiaSeleccionado('');
                                                        setTipoTerapiaAbierto(false);
                                                    }}
                                                    className="block w-full px-3 py-2 text-left text-sm hover:bg-gray-100"
                                                >
                                                    Cualquier Tipo de Terapia
                                                </button>
                                                {tiposTerapia.map((tipo) => (
                                                    <button
                                                        key={tipo}
                                                        onClick={() => {
                                                            setTipoTerapiaSeleccionado(tipo);
                                                            setTipoTerapiaAbierto(false);
                                                        }}
                                                        className="block w-full px-3 py-2 text-left text-sm hover:bg-gray-100"
                                                    >
                                                        {tipo}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div>
                                <label className="text-sm font-medium mb-2 block">Disponibilidad</label>
                                <div className="space-y-2 max-h-48 overflow-y-auto">
                                    {disponibilidad.map((dia) => (
                                        <div key={dia} className="flex items-center space-x-2">
                                            <button
                                                type="button"
                                                role="checkbox"
                                                aria-checked={disponibilidadSeleccionada.includes(dia)}
                                                onClick={() => toggleCheckbox(dia, disponibilidadSeleccionada, setDisponibilidadSeleccionada)}
                                                className={`peer h-4 w-4 shrink-0 rounded-sm border border-indigo-600 ring-offset-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
                                                    disponibilidadSeleccionada.includes(dia) ? 'bg-indigo-600 text-white' : 'bg-white'
                                                }`}
                                                id={dia}
                                            >
                                                {disponibilidadSeleccionada.includes(dia) && (
                                                    <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                )}
                                            </button>
                                            <label htmlFor={dia} className="text-sm">
                                                {dia}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="text-sm font-medium mb-2 block">Enfoques de Terapia</label>
                                <div className="space-y-2 max-h-48 overflow-y-auto">
                                    {enfoquesTerapia.map((enfoque) => (
                                        <div key={enfoque} className="flex items-center space-x-2">
                                            <button
                                                type="button"
                                                role="checkbox"
                                                aria-checked={enfoquesTerapiaSeleccionados.includes(enfoque)}
                                                onClick={() => toggleCheckbox(enfoque, enfoquesTerapiaSeleccionados, setEnfoquesTerapiaSeleccionados)}
                                                className={`peer h-4 w-4 shrink-0 rounded-sm border border-indigo-600 ring-offset-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
                                                    enfoquesTerapiaSeleccionados.includes(enfoque) ? 'bg-indigo-600 text-white' : 'bg-white'
                                                }`}
                                                id={enfoque}
                                            >
                                                {enfoquesTerapiaSeleccionados.includes(enfoque) && (
                                                    <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                )}
                                            </button>
                                            <label htmlFor={enfoque} className="text-sm">
                                                {enfoque}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="text-sm font-medium mb-2 block">Especialidades</label>
                                <div className="space-y-2 max-h-48 overflow-y-auto">
                                    {especialidades.map((especialidad) => (
                                        <div key={especialidad} className="flex items-center space-x-2">
                                            <button
                                                type="button"
                                                role="checkbox"
                                                aria-checked={especialidadesSeleccionadas.includes(especialidad)}
                                                onClick={() =>
                                                    toggleCheckbox(especialidad, especialidadesSeleccionadas, setEspecialidadesSeleccionadas)
                                                }
                                                className={`peer h-4 w-4 shrink-0 rounded-sm border border-indigo-600 ring-offset-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
                                                    especialidadesSeleccionadas.includes(especialidad) ? 'bg-indigo-600 text-white' : 'bg-white'
                                                }`}
                                                id={especialidad}
                                            >
                                                {especialidadesSeleccionadas.includes(especialidad) && (
                                                    <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                )}
                                            </button>
                                            <label htmlFor={especialidad} className="text-sm">
                                                {especialidad}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="lg:w-3/4">
                    <div className="mb-6 flex items-center justify-between">
                        <p className="text-gray-600">{psicologosFiltrados.length} terapeutas encontrados</p>
                    </div>
                    <div className="space-y-4">
                        {psicologosFiltrados.length > 0 ? (
                            psicologosFiltrados.map((psicologo) => {
                                // DEBUG: Verificar estructura del psicólogo y su ID
                                console.log('=== DEBUGGING PSYCHOLOGIST DATA ===');
                                console.log('Psychologist object:', psicologo);
                                console.log('Psychologist ID:', psicologo.id);
                                console.log('Psychologist name:', psicologo.name);
                                console.log('Generated session URL:', `/session/${psicologo.id}`);
                                console.log('Generated profile URL:', `/professionalProfile/${psicologo.id}`);
                                console.log('================================');

                                return (
                                    <div
                                        key={psicologo.id}
                                        className="rounded-lg border bg-white text-gray-900 shadow-sm hover:shadow-lg transition-shadow"
                                    >
                                        <div className="p-6">
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="flex items-start">
                                                    <Image
                                                        alt={psicologo.name}
                                                        className="w-16 h-16 rounded-full mr-4"
                                                        src={psicologo.profile_picture || '/person-gray-photo-placeholder-woman.webp'}
                                                        width={80}
                                                        height={80}
                                                    />
                                                    <div>
                                                        <div className="flex items-center mb-2">
                                                            <h3 className="text-lg font-semibold mr-2">Dr/a {psicologo.name}</h3>
                                                        </div>
                                                        <div className="flex items-center text-sm text-gray-600 mb-2">
                                                            <Star className="h-4 w-4 mr-1" strokeWidth={2} />
                                                            <span className="text-sm text-gray-600">4.8 (12 reseñas)</span>
                                                        </div>
                                                        <div className="flex items-center text-sm text-gray-600 mb-2">
                                                            <MapPin className="h-4 w-4 mr-1" strokeWidth={2} />
                                                            {psicologo.office_address || 'Consulta disponible'}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="flex gap-1 flex-wrap">
                                                        {(Array.isArray(psicologo.modality)
                                                            ? psicologo.modality
                                                            : [psicologo.modality || 'Presencial']
                                                        ).map((modalidad) => (
                                                            <div
                                                                key={modalidad}
                                                                className="inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-gray-900 text-xs"
                                                            >
                                                                {modalidad === 'Presencial' && <Users className="h-3 w-3 mr-1" strokeWidth={2} />}
                                                                {modalidad === 'En línea' && <Video className="h-3 w-3 mr-1" strokeWidth={2} />}
                                                                {modalidad === 'Híbrido' && (
                                                                    <>
                                                                        <Users className="h-3 w-3 mr-1" strokeWidth={2} />
                                                                        <Video className="h-3 w-3 mr-1" strokeWidth={2} />
                                                                    </>
                                                                )}
                                                                {obtenerNombreModalidad(modalidad)}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            <p className="text-gray-600 mb-4 text-sm">
                                                {psicologo.personal_biography || 'Psicólogo profesional con experiencia en terapia individual.'}
                                            </p>

                                            {/* Obras Sociales */}
                                            {psicologo.insurance_accepted && psicologo.insurance_accepted.length > 0 && (
                                                <div className="mb-3">
                                                    <span className="text-xs font-medium text-gray-700 mb-1 block">Obras Sociales Aceptadas:</span>
                                                    <div className="flex flex-wrap gap-1">
                                                        {psicologo.insurance_accepted.slice(0, 3).map((seguro, index) => (
                                                            <span
                                                                key={index}
                                                                className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-blue-100 text-blue-800"
                                                            >
                                                                {seguro}
                                                            </span>
                                                        ))}
                                                        {psicologo.insurance_accepted.length > 3 && (
                                                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-600">
                                                                +{psicologo.insurance_accepted.length - 3} más
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Tipos de Sesión */}
                                            {psicologo.session_types && psicologo.session_types.length > 0 && (
                                                <div className="mb-3">
                                                    <span className="text-xs font-medium text-gray-700 mb-1 block">Tipos de Sesión:</span>
                                                    <div className="flex flex-wrap gap-1">
                                                        {psicologo.session_types.map((tipo, index) => (
                                                            <span
                                                                key={index}
                                                                className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-purple-100 text-purple-800"
                                                            >
                                                                {tipo}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Enfoques Terapéuticos */}
                                            {psicologo.therapy_approaches && psicologo.therapy_approaches.length > 0 && (
                                                <div className="mb-3">
                                                    <span className="text-xs font-medium text-gray-700 mb-1 block">Enfoques Terapéuticos:</span>
                                                    <div className="flex flex-wrap gap-1">
                                                        {psicologo.therapy_approaches.slice(0, 2).map((enfoque, index) => (
                                                            <span
                                                                key={index}
                                                                className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-indigo-100 text-indigo-800"
                                                            >
                                                                {enfoque}
                                                            </span>
                                                        ))}
                                                        {psicologo.therapy_approaches.length > 2 && (
                                                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-600">
                                                                +{psicologo.therapy_approaches.length - 2} más
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Especialidades */}
                                            {psicologo.specialities && psicologo.specialities.length > 0 && (
                                                <div className="mb-3">
                                                    <span className="text-xs font-medium text-gray-700 mb-1 block">Especialidades:</span>
                                                    <div className="flex flex-wrap gap-1">
                                                        {psicologo.specialities.map((especialidad, index) => (
                                                            <span
                                                                key={index}
                                                                className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-purple-100 text-purple-800"
                                                            >
                                                                {especialidad}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Disponibilidad */}
                                            {psicologo.availability && psicologo.availability.length > 0 && (
                                                <div className="mb-3">
                                                    <span className="text-xs font-medium text-gray-700 mb-1 block">Disponibilidad:</span>
                                                    <div className="flex flex-wrap gap-1">
                                                        {psicologo.availability.slice(0, 4).map((horario, index) => (
                                                            <span
                                                                key={index}
                                                                className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-800"
                                                            >
                                                                {horario}
                                                            </span>
                                                        ))}
                                                        {psicologo.availability.length > 4 && (
                                                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-600">
                                                                +{psicologo.availability.length - 4} más
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            )}

                                            <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                                                <div>
                                                    <span className="font-medium">Idiomas:</span>{' '}
                                                    {(psicologo.languages || ['Español'])
                                                        .map((idioma) => idiomas.find((i) => i === idioma) || idioma)
                                                        .join(', ')}
                                                </div>
                                                <div>
                                                    <span className="font-medium">Experiencia:</span> {psicologo.professional_experience || 5} años
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-end text-sm mb-4">
                                                <div className="text-right">
                                                    <div className="text-2xl font-bold text-green-600">
                                                        ${calcularPrecio(psicologo).toLocaleString('es-AR')}
                                                    </div>
                                                    <div className="text-xs text-gray-500">por sesión</div>
                                                </div>
                                            </div>

                                            <div className="flex gap-2">
                                                <a className="flex-1" href={`/professionalProfile/${psicologo.id}`}>
                                                    <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-gray-300 hover:bg-gray-100 hover:text-gray-900 h-9 rounded-md px-3 w-full bg-transparent">
                                                        Ver Perfil Completo
                                                    </button>
                                                </a>

                                                <a className="flex-1" href={`/session/${psicologo.id}`}>
                                                    <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 h-9 rounded-md px-3 w-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                                                        <Calendar className="h-4 w-4 mr-1" strokeWidth={2} />
                                                        Reservar Cita
                                                    </button>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="text-center py-12">
                                <p className="text-gray-500 text-lg">No se encontraron terapeutas que coincidan con los filtros seleccionados.</p>
                                <button
                                    onClick={limpiarFiltros}
                                    className="mt-4 inline-flex items-center justify-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    Limpiar Filtros
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Filter;
