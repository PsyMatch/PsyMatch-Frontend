'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Search, ChevronDown, Funnel } from 'lucide-react';

const Filter = () => {
    // Estados para todos los filtros
    const [precioMin, setPrecioMin] = useState('');
    const [precioMax, setPrecioMax] = useState('');
    const [modalidadSeleccionada, setModalidadSeleccionada] = useState('');
    const [idiomaSeleccionado, setIdiomaSeleccionado] = useState('');
    const [obraSocialSeleccionada, setObraSocialSeleccionada] = useState('');
    const [tipoTerapiaSeleccionado, setTipoTerapiaSeleccionado] = useState('');
    const [disponibilidadSeleccionada, setDisponibilidadSeleccionada] = useState<string[]>([]);
    const [enfoquesTerapiaSeleccionados, setEnfoquesTerapiaSeleccionados] = useState<string[]>([]);
    const [especialidadesSeleccionadas, setEspecialidadesSeleccionadas] = useState<string[]>([]);

    const idiomas = ['Español', 'Ingles', 'Portugues'];

    const modalidades = ['Presencial', 'Online', 'Hibrido'];

    const especialidades = [
        'Trastornos de Ansiedad',
        'Terapia de Pareja',
        'Trastornos de la Conducta Alimentaria',
        'Trastorno Bipolar',
        'Transiciones de Vida',
        'Terapia Infantil y Adolescente',
        'Trastornos del Sueño',
        'Depresión',
        'Terapia Familiar',
        'TDAH',
        'TOC',
        'Asesoramiento Laboral',
        'Psicología Geriátrica',
        'Manejo de la Ira',
        'Trauma y TEPT',
        'Adicciones y Abuso de Sustancias',
        'Trastornos del Espectro Autista',
        'Duelo y Pérdida',
        'Temas LGBTQ+',
        'Manejo del Dolor Crónico',
    ];

    const enfoquesTerapia = [
        'Terapia Cognitivo-Conductual (TCC)',
        'Terapia de Aceptación y Compromiso (ACT)',
        'Terapia Psicodinámica',
        'Terapia de Sistemas Familiares',
        'Terapia Breve Centrada en Soluciones',
        'Terapia de Juego',
        'Terapia Dialéctico-Conductual (TDC)',
        'Desensibilización y Reprocesamiento por Movimiento Ocular (EMDR)',
        'Terapia Humanista/Centrada en la Persona',
        'Terapia Basada en Mindfulness',
        'Terapia Gestalt',
        'Terapia de Arte',
        'Terapia de Grupo',
    ];

    const tiposTerapia = ['Individual', 'Pareja', 'Familiar', 'Grupo'];

    const disponibilidad = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

    const obrasSociales = [
        'OSDE',
        'Swiss Medical',
        'IOMA',
        'PAMI',
        'Unión Personal',
        'OSDEPYM',
        'Luis Pasteur',
        'Jerárquicos Salud',
        'Sancor Salud',
        'OSECAC',
        'Osmecón Salud',
        'APROSS',
        'OSPRERA',
        'OSPAT',
        'ASE Nacional',
        'OSPSIP',
    ];

    const mockPsicologos = [
        {
            id: 1,
            nombre: 'Dra. María González',
            imagen: '/person-gray-photo-placeholder-woman.webp',
            valoracion: 4.9,
            numeroReseñas: 127,
            ubicacion: 'Madrid, España',
            precio: 25000,
            disponibilidad: 'Disponible Hoy',
            modalidades: ['in_person', 'online'],
            especialidades: ['anxiety_disorder', 'depression'],
            enfoquesTerapia: ['cognitive_behavioral_therapy'],
            tiposTerapia: ['individual'],
            idiomas: ['spanish', 'english'],
            experiencia: '10+ años',
            descripcion: 'Especialista en terapia cognitivo-conductual con más de 10 años de experiencia tratando ansiedad y depresión.',
            obrasSociales: ['osde', 'swiss-medical'],
            diasDisponibles: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
        },
        {
            id: 2,
            nombre: 'Dr. Carlos Ruiz',
            imagen: '/person-gray-photo-placeholder-woman.webp',
            valoracion: 4.8,
            numeroReseñas: 89,
            ubicacion: 'Barcelona, España',
            precio: 20000,
            disponibilidad: 'Disponible Mañana',
            modalidades: ['online'],
            especialidades: ['trauma_ptsd'],
            enfoquesTerapia: ['eye_movement_desensitization_reprocessing'],
            tiposTerapia: ['individual'],
            idiomas: ['spanish'],
            experiencia: '8+ años',
            descripcion: 'Experto en terapia de trauma y EMDR con amplia experiencia ayudando a clientes a superar el TEPT.',
            obrasSociales: ['ioma', 'pami'],
            diasDisponibles: ['monday', 'wednesday', 'friday', 'saturday'],
        },
        {
            id: 3,
            nombre: 'Dra. Ana Martínez',
            imagen: '/person-gray-photo-placeholder-woman.webp',
            valoracion: 4.9,
            numeroReseñas: 156,
            ubicacion: 'Valencia, España',
            precio: 35000,
            disponibilidad: 'Disponible Esta Semana',
            modalidades: ['in_person', 'online'],
            especialidades: ['couples_therapy', 'family_therapy'],
            enfoquesTerapia: ['family_systems_therapy'],
            tiposTerapia: ['couple', 'family'],
            idiomas: ['spanish', 'portuguese'],
            experiencia: '12+ años',
            descripcion: 'Especialista en relaciones ayudando a parejas y familias a mejorar la comunicación y resolver conflictos.',
            obrasSociales: ['osde', 'unión-personal'],
            diasDisponibles: ['tuesday', 'thursday', 'friday', 'saturday', 'sunday'],
        },
        {
            id: 4,
            nombre: 'Dr. Luis Fernández',
            imagen: '/person-gray-photo-placeholder-woman.webp',
            valoracion: 4.7,
            numeroReseñas: 73,
            ubicacion: 'Sevilla, España',
            precio: 30000,
            disponibilidad: 'Disponible Próxima Semana',
            modalidades: ['in_person'],
            especialidades: ['addiction_substance_abuse'],
            enfoquesTerapia: ['group_therapy', 'cognitive_behavioral_therapy'],
            tiposTerapia: ['individual', 'group'],
            idiomas: ['spanish'],
            experiencia: '15+ años',
            descripcion: 'Especialista en adicciones con 15 años de experiencia en terapia individual y grupal.',
            obrasSociales: ['apross', 'osprera'],
            diasDisponibles: ['monday', 'tuesday', 'thursday'],
        },
        {
            id: 5,
            nombre: 'Dra. Elena Rodríguez',
            imagen: '/person-gray-photo-placeholder-woman.webp',
            valoracion: 4.8,
            numeroReseñas: 94,
            ubicacion: 'Bilbao, España',
            precio: 29000,
            disponibilidad: 'Disponible Hoy',
            modalidades: ['in_person', 'online', 'hybrid'],
            especialidades: ['child_adolescent_therapy', 'adhd', 'autism_spectrum_disorder'],
            enfoquesTerapia: ['play_therapy', 'dialectical_behavioral_therapy'],
            tiposTerapia: ['individual', 'family'],
            idiomas: ['spanish', 'english'],
            experiencia: '9+ años',
            descripcion: 'Especialista en terapia infantil y adolescente con experiencia en TDAH y trastornos del espectro autista.',
            obrasSociales: ['swiss-medical', 'sancor-salud'],
            diasDisponibles: ['monday', 'wednesday', 'friday', 'saturday'],
        },
    ];

    // Estado para búsqueda
    const [busqueda, setBusqueda] = useState('');

    // Estados para controlar la apertura de dropdowns
    const [modalidadAbierta, setModalidadAbierta] = useState(false);
    const [idiomaAbierto, setIdiomaAbierto] = useState(false);
    const [obraSocialAbierta, setObraSocialAbierta] = useState(false);
    const [tipoTerapiaAbierto, setTipoTerapiaAbierto] = useState(false);
    const [ordenamientoAbierto, setOrdenamientoAbierto] = useState(false);

    // Estado para ordenamiento
    const [ordenamientoSeleccionado, setOrdenamientoSeleccionado] = useState('rating');

    // Opciones de ordenamiento
    const opcionesOrdenamiento = [
        { label: 'Mejor Valorados', value: 'rating' },
        { label: 'Precio: Menor a Mayor', value: 'price_asc' },
        { label: 'Precio: Mayor a Menor', value: 'price_desc' },
        { label: 'Más Experiencia', value: 'experience' },
        { label: 'Disponibilidad', value: 'availability' },
    ];

    // Efecto para cerrar dropdowns al hacer clic fuera
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;

            // No cerrar si el clic fue en un dropdown o sus botones
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

    // Función para limpiar todos los filtros
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

    // Función para manejar checkboxes
    const toggleCheckbox = (value: string, selectedItems: string[], setSelectedItems: (items: string[]) => void) => {
        if (selectedItems.includes(value)) {
            setSelectedItems(selectedItems.filter((item) => item !== value));
        } else {
            setSelectedItems([...selectedItems, value]);
        }
    };

    // Función para filtrar y ordenar psicólogos
    const filtrarPsicologos = () => {
        let resultado = mockPsicologos.filter((psicologo) => {
            // Filtro por precio
            const precioMinNum = precioMin ? parseFloat(precioMin) : 0;
            const precioMaxNum = precioMax ? parseFloat(precioMax) : Infinity;
            if (psicologo.precio < precioMinNum || psicologo.precio > precioMaxNum) {
                return false;
            }

            // Filtro por modalidad
            if (modalidadSeleccionada && !psicologo.modalidades.includes(modalidadSeleccionada)) {
                return false;
            }

            // Filtro por idioma
            if (idiomaSeleccionado && !psicologo.idiomas.includes(idiomaSeleccionado)) {
                return false;
            }

            // Filtro por obra social
            if (obraSocialSeleccionada && !psicologo.obrasSociales.includes(obraSocialSeleccionada)) {
                return false;
            }

            // Filtro por tipo de terapia
            if (tipoTerapiaSeleccionado && !psicologo.tiposTerapia.includes(tipoTerapiaSeleccionado)) {
                return false;
            }

            // Filtro por disponibilidad (días)
            if (disponibilidadSeleccionada.length > 0) {
                const tieneDisponibilidad = disponibilidadSeleccionada.some((dia) => psicologo.diasDisponibles.includes(dia));
                if (!tieneDisponibilidad) {
                    return false;
                }
            }

            // Filtro por enfoques de terapia
            if (enfoquesTerapiaSeleccionados.length > 0) {
                const tieneEnfoque = enfoquesTerapiaSeleccionados.some((enfoque) => psicologo.enfoquesTerapia.includes(enfoque));
                if (!tieneEnfoque) {
                    return false;
                }
            }

            // Filtro por especialidades
            if (especialidadesSeleccionadas.length > 0) {
                const tieneEspecialidad = especialidadesSeleccionadas.some((especialidad) => psicologo.especialidades.includes(especialidad));
                if (!tieneEspecialidad) {
                    return false;
                }
            }

            // Filtro por búsqueda (nombre, especialidades, ubicación)
            if (busqueda) {
                const busquedaLower = busqueda.toLowerCase();
                const coincideNombre = psicologo.nombre.toLowerCase().includes(busquedaLower);
                const coincideUbicacion = psicologo.ubicacion.toLowerCase().includes(busquedaLower);
                const coincideDescripcion = psicologo.descripcion.toLowerCase().includes(busquedaLower);

                if (!coincideNombre && !coincideUbicacion && !coincideDescripcion) {
                    return false;
                }
            }

            return true;
        });

        // Aplicar ordenamiento
        switch (ordenamientoSeleccionado) {
            case 'rating':
                resultado = resultado.sort((a, b) => b.valoracion - a.valoracion);
                break;
            case 'price_asc':
                resultado = resultado.sort((a, b) => a.precio - b.precio);
                break;
            case 'price_desc':
                resultado = resultado.sort((a, b) => b.precio - a.precio);
                break;
            case 'experience':
                resultado = resultado.sort((a, b) => {
                    const getExperienceYears = (exp: string) => {
                        const match = exp.match(/(\d+)/);
                        return match ? parseInt(match[1]) : 0;
                    };
                    return getExperienceYears(b.experiencia) - getExperienceYears(a.experiencia);
                });
                break;
            case 'availability':
                resultado = resultado.sort((a, b) => {
                    const availabilityOrder = ['Disponible Hoy', 'Disponible Mañana', 'Disponible Esta Semana', 'Disponible Próxima Semana'];
                    return availabilityOrder.indexOf(a.disponibilidad) - availabilityOrder.indexOf(b.disponibilidad);
                });
                break;
            default:
                break;
        }

        return resultado;
    };

    const psicologosFiltrados = filtrarPsicologos();

    // Función auxiliar para obtener el nombre de la modalidad
    const obtenerNombreModalidad = (value: string) => {
        const modalidad = modalidades.find((m) => m === value);
        return modalidad ? modalidad : value;
    };

    // Función auxiliar para obtener las especialidades como etiquetas
    const obtenerEtiquetasEspecialidades = (especialidadesPsicologo: string[]) => {
        return especialidadesPsicologo.map((esp) => {
            const especialidad = especialidades.find((e) => e === esp);
            return especialidad ? especialidad : esp;
        });
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
                                            // Cerrar todos los demás dropdowns antes de abrir este
                                            setIdiomaAbierto(false);
                                            setObraSocialAbierta(false);
                                            setTipoTerapiaAbierto(false);
                                            // Alternar el estado del dropdown actual
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
                                            // Cerrar todos los demás dropdowns antes de abrir este
                                            setModalidadAbierta(false);
                                            setObraSocialAbierta(false);
                                            setTipoTerapiaAbierto(false);
                                            // Alternar el estado del dropdown actual
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
                                            // Cerrar todos los demás dropdowns antes de abrir este
                                            setModalidadAbierta(false);
                                            setIdiomaAbierto(false);
                                            setTipoTerapiaAbierto(false);
                                            // Alternar el estado del dropdown actual
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
                                            // Cerrar todos los demás dropdowns antes de abrir este
                                            setModalidadAbierta(false);
                                            setIdiomaAbierto(false);
                                            setObraSocialAbierta(false);
                                            // Alternar el estado del dropdown actual
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
                            psicologosFiltrados.map((psicologo) => (
                                <div
                                    key={psicologo.id}
                                    className="rounded-lg border bg-white text-gray-900 shadow-sm hover:shadow-lg transition-shadow"
                                >
                                    <div className="p-6">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-start">
                                                <Image
                                                    alt={psicologo.nombre}
                                                    className="w-16 h-16 rounded-full mr-4"
                                                    src={psicologo.imagen}
                                                    width={80}
                                                    height={80}
                                                />
                                                <div>
                                                    <div className="flex items-center mb-2">
                                                        <h3 className="text-lg font-semibold mr-2">{psicologo.nombre}</h3>
                                                    </div>
                                                    <div className="flex items-center mb-2">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="24"
                                                            height="24"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            className="lucide lucide-star h-4 w-4 text-yellow-400 fill-current mr-1"
                                                        >
                                                            <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                                                        </svg>
                                                        <span className="text-sm text-gray-600">
                                                            {psicologo.valoracion} ({psicologo.numeroReseñas} reseñas)
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center text-sm text-gray-600 mb-2">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="24"
                                                            height="24"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            className="lucide lucide-map-pin h-4 w-4 mr-1"
                                                        >
                                                            <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                                                            <circle cx="12" cy="10" r="3" />
                                                        </svg>
                                                        {psicologo.ubicacion}
                                                    </div>
                                                    <div className="flex items-center text-sm text-gray-600">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="24"
                                                            height="24"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            className="lucide lucide-dollar-sign h-4 w-4 mr-1"
                                                        >
                                                            <line x1="12" y1="1" x2="12" y2="23"></line>
                                                            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                                                        </svg>
                                                        ${psicologo.precio}/sesión
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-sm text-green-600 font-medium mb-2">{psicologo.disponibilidad}</div>
                                                <div className="flex gap-1 flex-wrap">
                                                    {psicologo.modalidades.map((modalidad) => (
                                                        <div
                                                            key={modalidad}
                                                            className="inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-gray-900 text-xs"
                                                        >
                                                            {modalidad === 'in_person' && (
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width="24"
                                                                    height="24"
                                                                    viewBox="0 0 24 24"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    strokeWidth="2"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    className="lucide lucide-users h-3 w-3 mr-1"
                                                                >
                                                                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                                                                    <circle cx="9" cy="7" r="4"></circle>
                                                                    <path d="m22 21-2-2"></path>
                                                                    <path d="m16 16 2 2"></path>
                                                                </svg>
                                                            )}
                                                            {modalidad === 'online' && (
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width="24"
                                                                    height="24"
                                                                    viewBox="0 0 24 24"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    strokeWidth="2"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    className="lucide lucide-video h-3 w-3 mr-1"
                                                                >
                                                                    <path d="m22 8-6 4 6 4V8Z"></path>
                                                                    <rect width="14" height="12" x="2" y="2" rx="2" ry="2"></rect>
                                                                </svg>
                                                            )}
                                                            {obtenerNombreModalidad(modalidad)}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <p className="text-gray-600 mb-4 text-sm">{psicologo.descripcion}</p>

                                        <div className="flex flex-wrap gap-1 mb-4">
                                            {obtenerEtiquetasEspecialidades(psicologo.especialidades)
                                                .slice(0, 3)
                                                .map((especialidad, index) => (
                                                    <div
                                                        key={index}
                                                        className="inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 border-transparent bg-gray-200 text-gray-800 hover:bg-gray-300 text-xs"
                                                    >
                                                        {especialidad}
                                                    </div>
                                                ))}
                                        </div>

                                        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                                            <div>
                                                <span className="font-medium">Idiomas:</span>{' '}
                                                {psicologo.idiomas.map((idioma) => idiomas.find((i) => i === idioma) || idioma).join(', ')}
                                            </div>
                                            <div>
                                                <span className="font-medium">Experiencia:</span> {psicologo.experiencia}
                                            </div>
                                        </div>

                                        <div className="flex gap-2">
                                            <a className="flex-1" href={`/psychologist/${psicologo.id}`}>
                                                <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-gray-300 hover:bg-gray-100 hover:text-gray-900 h-9 rounded-md px-3 w-full bg-transparent">
                                                    Ver Perfil Completo
                                                </button>
                                            </a>

                                            <a className="flex-1" href={`/booking/${psicologo.id}`}>
                                                <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 h-9 rounded-md px-3 w-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="24"
                                                        height="24"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        className="lucide lucide-calendar h-4 w-4 mr-1"
                                                    >
                                                        <path d="M8 2v4"></path>
                                                        <path d="M16 2v4"></path>
                                                        <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                                                        <path d="M3 10h18"></path>
                                                    </svg>
                                                    Reservar Cita
                                                </button>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))
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
