import { ChevronDown, Search } from 'lucide-react';
import Image from 'next/image';

const filter = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Buscar Terapeutas</h2>
                <div className="flex flex-col lg:flex-row gap-4">
                    <div className="flex-1">
                        <div className="relative">
                            <Search className="h-5 w-5 absolute left-3 top-3 text-gray-400" aria-hidden="true" />
                            <input
                                className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base placeholder:text-gray-400 pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                placeholder="Buscar por nombre, especialidad o síntomas..."
                            />
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <button
                            type="button"
                            role="combobox"
                            aria-controls="radix-«r0»"
                            aria-expanded="false"
                            aria-autocomplete="none"
                            dir="ltr"
                            data-state="closed"
                            className="flex h-10 w-48 items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
                        >
                            <span>Mejor Valorados</span>
                            <ChevronDown className="h-4 w-4 opacity-50" aria-hidden="true" />
                        </button>

                        <button className="inline-flex items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9">
                            Cuadrícula
                        </button>

                        <button className="inline-flex items-center justify-center gap-2 rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9">
                            Lista
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-8">
                <div className="lg:w-1/4">
                    <div className="rounded-lg border border-gray-300 bg-white text-gray-900 shadow-sm sticky top-4">
                        <div className="flex flex-col space-y-1.5 p-6">
                            <div className="flex items-center justify-between">
                                <div className="text-2xl font-semibold leading-none tracking-tight flex items-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="h-5 w-5 mr-2"
                                        aria-hidden="true"
                                    >
                                        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                                    </svg>
                                    Filtros
                                </div>
                                <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium rounded-md border border-gray-300 bg-white px-3 py-2 h-9 transition-colors hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                                    Limpiar Todo
                                </button>
                            </div>

                            <div className="p-6 pt-0 space-y-6">
                                <div>
                                    <label className="text-sm font-medium mb-2 block">Rango de Precio (€)</label>
                                    <span
                                        dir="ltr"
                                        data-orientation="horizontal"
                                        aria-disabled="false"
                                        className="relative flex w-full touch-none select-none items-center mb-2"
                                        style={{ ['--radix-slider-thumb-transform']: 'translateX(-50%)' } as React.CSSProperties}
                                    >
                                        <span
                                            data-orientation="horizontal"
                                            className="relative h-2 w-full grow overflow-hidden rounded-full bg-gray-200"
                                        >
                                            <span
                                                data-orientation="horizontal"
                                                className="absolute h-full bg-indigo-600"
                                                style={{ left: '11.7647%', right: '29.4118%' }}
                                            ></span>
                                        </span>
                                        <span
                                            style={{
                                                transform: 'var(--radix-slider-thumb-transform)',
                                                position: 'absolute',
                                                left: 'calc(11.7647% + 7.64706px)',
                                            }}
                                        >
                                            <span
                                                role="slider"
                                                aria-valuemin={30}
                                                aria-valuemax={200}
                                                aria-orientation="horizontal"
                                                data-orientation="horizontal"
                                                tabIndex={0}
                                                className="block h-5 w-5 rounded-full border-2 border-indigo-600 bg-white ring-offset-white transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                                                aria-label="Minimum"
                                                aria-valuenow={50}
                                            ></span>
                                        </span>
                                    </span>
                                    <div className="flex justify-between text-sm text-gray-600">
                                        <span>€50</span>
                                        <span>€150</span>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-sm font-medium mb-2 block">Especialidades</label>
                                    <div className="space-y-2 max-h-48 overflow-y-auto">
                                        {/* Repetir para cada especialidad */}
                                        <div className="flex items-center space-x-2">
                                            <button
                                                type="button"
                                                role="checkbox"
                                                aria-checked="false"
                                                data-state="unchecked"
                                                value="on"
                                                className="peer h-4 w-4 shrink-0 rounded-sm border border-indigo-600 ring-offset-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-indigo-600 data-[state=checked]:text-white"
                                                id="Ansiedad"
                                            ></button>
                                            <label htmlFor="Ansiedad" className="text-sm">
                                                Ansiedad
                                            </label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <button
                                                type="button"
                                                role="checkbox"
                                                aria-checked="false"
                                                data-state="unchecked"
                                                value="on"
                                                className="peer h-4 w-4 shrink-0 rounded-sm border border-indigo-600 ring-offset-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-indigo-600 data-[state=checked]:text-white"
                                                id="Depresión"
                                            ></button>
                                            <label htmlFor="Depresión" className="text-sm">
                                                Depresión
                                            </label>
                                        </div>
                                        {/* Agregar las demás especialidades igual */}
                                    </div>
                                </div>

                                {/* Comboboxes para Modalidad, Ubicación, Seguro, Valoración y Duración */}
                                <div>
                                    <label className="text-sm font-medium mb-2 block">Modalidad</label>
                                    <button
                                        type="button"
                                        role="combobox"
                                        aria-controls="radix-r1"
                                        aria-expanded="false"
                                        aria-autocomplete="none"
                                        dir="ltr"
                                        data-state="closed"
                                        className="flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        <span style={{ pointerEvents: 'none' }}>Todas las Modalidades</span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="h-4 w-4 opacity-50"
                                            aria-hidden="true"
                                        >
                                            <path d="m6 9 6 6 6-6"></path>
                                        </svg>
                                    </button>
                                </div>

                                <div>
                                    <label className="text-sm font-medium mb-2 block">Ubicación</label>
                                    <button
                                        type="button"
                                        role="combobox"
                                        aria-controls="radix-r2"
                                        aria-expanded="false"
                                        aria-autocomplete="none"
                                        dir="ltr"
                                        data-state="closed"
                                        className="flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        <span style={{ pointerEvents: 'none' }}>Todas las Ubicaciones</span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="h-4 w-4 opacity-50"
                                            aria-hidden="true"
                                        >
                                            <path d="m6 9 6 6 6-6"></path>
                                        </svg>
                                    </button>
                                </div>

                                <div>
                                    <label className="text-sm font-medium mb-2 block">Seguro</label>
                                    <button
                                        type="button"
                                        role="combobox"
                                        aria-controls="radix-r3"
                                        aria-expanded="false"
                                        aria-autocomplete="none"
                                        dir="ltr"
                                        data-state="closed"
                                        className="flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        <span style={{ pointerEvents: 'none' }}>Todos los Seguros</span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="h-4 w-4 opacity-50"
                                            aria-hidden="true"
                                        >
                                            <path d="m6 9 6 6 6-6"></path>
                                        </svg>
                                    </button>
                                </div>

                                <div>
                                    <label className="text-sm font-medium mb-2 block">Valoración Mínima</label>
                                    <button
                                        type="button"
                                        role="combobox"
                                        aria-controls="radix-r4"
                                        aria-expanded="false"
                                        aria-autocomplete="none"
                                        dir="ltr"
                                        data-state="closed"
                                        className="flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        <span style={{ pointerEvents: 'none' }}>Cualquier Valoración</span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="h-4 w-4 opacity-50"
                                            aria-hidden="true"
                                        >
                                            <path d="m6 9 6 6 6-6"></path>
                                        </svg>
                                    </button>
                                </div>

                                <div>
                                    <label className="text-sm font-medium mb-2 block">Duración de Sesión</label>
                                    <button
                                        type="button"
                                        role="combobox"
                                        aria-controls="radix-r5"
                                        aria-expanded="false"
                                        aria-autocomplete="none"
                                        dir="ltr"
                                        data-state="closed"
                                        className="flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        <span style={{ pointerEvents: 'none' }}>Cualquier Duración</span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="h-4 w-4 opacity-50"
                                            aria-hidden="true"
                                        >
                                            <path d="m6 9 6 6 6-6"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="lg:w-3/4">
                    <div className="mb-6 flex items-center justify-between">
                        <p className="text-gray-600">4 terapeutas encontrados</p>
                    </div>
                    <div className="space-y-4">
                        <div className="rounded-lg border bg-white text-gray-900 shadow-sm hover:shadow-lg transition-shadow">
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-start">
                                        <Image
                                            alt="Dra. María González"
                                            className="w-16 h-16 rounded-full mr-4"
                                            src="/person-gray-photo-placeholder-woman.webp"
                                            width={80}
                                            height={80}
                                        />
                                        <div>
                                            <div className="flex items-center mb-2">
                                                <h3 className="text-lg font-semibold mr-2">Dra. María González</h3>
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
                                                    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
                                                </svg>
                                                <span className="text-sm text-gray-600">4.9 (127 reseñas)</span>
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
                                                    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
                                                    <circle cx="12" cy="10" r="3"></circle>
                                                </svg>
                                                Madrid, España
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
                                                    <line x1="12" x2="12" y1="2" y2="22"></line>
                                                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                                                </svg>
                                                €80/sesión
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm text-green-600 font-medium mb-2">Disponible Hoy</div>
                                        <div className="flex gap-1">
                                            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-gray-900 text-xs">
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
                                                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                                                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                                </svg>
                                                Presencial
                                            </div>
                                            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-gray-900 text-xs">
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
                                                    <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"></path>
                                                    <rect x="2" y="6" width="14" height="12" rx="2"></rect>
                                                </svg>
                                                Online
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <p className="text-gray-600 mb-4 text-sm">
                                    Especialista en terapia cognitivo-conductual con más de 10 años de experiencia tratando ansiedad y depresión.
                                </p>

                                <div className="flex flex-wrap gap-1 mb-4">
                                    <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 border-transparent bg-gray-200 text-gray-800 hover:bg-gray-300 text-xs">
                                        Ansiedad
                                    </div>
                                    <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 border-transparent bg-gray-200 text-gray-800 hover:bg-gray-300 text-xs">
                                        Depresión
                                    </div>
                                    <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 border-transparent bg-gray-200 text-gray-800 hover:bg-gray-300 text-xs">
                                        TCC
                                    </div>
                                </div>

                                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                                    <div>
                                        <span className="font-medium">Idiomas:</span> Español, Inglés
                                    </div>
                                    <div>
                                        <span className="font-medium">Experiencia:</span> 10+ años
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <a className="flex-1" href="/psychologist/1">
                                        <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-gray-300 hover:bg-gray-100 hover:text-gray-900 h-9 rounded-md px-3 w-full bg-transparent">
                                            Ver Perfil Completo
                                        </button>
                                    </a>

                                    <a className="flex-1" href="/booking/1">
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
                        <div className="rounded-lg border bg-white text-gray-900 shadow-sm hover:shadow-lg transition-shadow">
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-start">
                                        <Image
                                            alt="Dra. Ana Martínez"
                                            className="w-16 h-16 rounded-full mr-4"
                                            src="/person-gray-photo-placeholder-woman.webp"
                                            width={80}
                                            height={80}
                                        />
                                        <div>
                                            <div className="flex items-center mb-2">
                                                <h3 className="text-lg font-semibold mr-2">Dra. Ana Martínez</h3>
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
                                                <span className="text-sm text-gray-600">4.9 (156 reseñas)</span>
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
                                                Valencia, España
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
                                                    <line x1="12" x2="12" y1="2" y2="22" />
                                                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                                                </svg>
                                                €100/sesión
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-right">
                                        <div className="text-sm text-green-600 font-medium mb-2">Disponible Esta Semana</div>
                                        <div className="flex gap-1">
                                            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-gray-900 text-xs">
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
                                                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                                    <circle cx="9" cy="7" r="4" />
                                                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                                                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                                </svg>
                                                Presencial
                                            </div>
                                            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-gray-900 text-xs">
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
                                                    <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" />
                                                    <rect x="2" y="6" width="14" height="12" rx="2" />
                                                </svg>
                                                Online
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <p className="text-gray-600 mb-4 text-sm">
                                    Especialista en relaciones ayudando a parejas y familias a mejorar la comunicación y resolver conflictos.
                                </p>

                                <div className="flex flex-wrap gap-1 mb-4">
                                    <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 border-transparent bg-gray-200 text-gray-800 hover:bg-gray-300 text-xs">
                                        Terapia de Pareja
                                    </div>
                                    <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 border-transparent bg-gray-200 text-gray-800 hover:bg-gray-300 text-xs">
                                        Terapia Familiar
                                    </div>
                                    <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 border-transparent bg-gray-200 text-gray-800 hover:bg-gray-300 text-xs">
                                        Comunicación
                                    </div>
                                </div>

                                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                                    <div>
                                        <span className="font-medium">Idiomas:</span> Español, Valenciano
                                    </div>
                                    <div>
                                        <span className="font-medium">Experiencia:</span> 12+ años
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <a className="flex-1" href="/psychologist/3">
                                        <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-gray-300 hover:bg-gray-100 hover:text-gray-900 h-9 rounded-md px-3 w-full bg-transparent">
                                            Ver Perfil Completo
                                        </button>
                                    </a>
                                    <a className="flex-1" href="/booking/3">
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
                                                <path d="M8 2v4" />
                                                <path d="M16 2v4" />
                                                <rect width="18" height="18" x="3" y="4" rx="2" />
                                                <path d="M3 10h18" />
                                            </svg>
                                            Reservar Cita
                                        </button>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-lg border bg-white text-gray-900 shadow-sm hover:shadow-lg transition-shadow">
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-start">
                                        <Image
                                            alt="Dr. Carlos Ruiz"
                                            className="w-16 h-16 rounded-full mr-4"
                                            src="/person-gray-photo-placeholder-woman.webp"
                                            width={80}
                                            height={80}
                                        />
                                        <div>
                                            <div className="flex items-center mb-2">
                                                <h3 className="text-lg font-semibold mr-2">Dr. Carlos Ruiz</h3>
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
                                                <span className="text-sm text-gray-600">4.8 (89 reseñas)</span>
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
                                                Barcelona, España
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
                                                    <line x1="12" x2="12" y1="2" y2="22" />
                                                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                                                </svg>
                                                €90/sesión
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-right">
                                        <div className="text-sm text-green-600 font-medium mb-2">Disponible Mañana</div>
                                        <div className="flex gap-1">
                                            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-gray-900 text-xs">
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
                                                    <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" />
                                                    <rect x="2" y="6" width="14" height="12" rx="2" />
                                                </svg>
                                                Online
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <p className="text-gray-600 mb-4 text-sm">
                                    Experto en terapia de trauma y EMDR con amplia experiencia ayudando a clientes a superar el TEPT.
                                </p>

                                <div className="flex flex-wrap gap-1 mb-4">
                                    <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 border-transparent bg-gray-200 text-gray-800 hover:bg-gray-300 text-xs">
                                        Trauma
                                    </div>
                                    <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 border-transparent bg-gray-200 text-gray-800 hover:bg-gray-300 text-xs">
                                        TEPT
                                    </div>
                                    <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 border-transparent bg-gray-200 text-gray-800 hover:bg-gray-300 text-xs">
                                        EMDR
                                    </div>
                                </div>

                                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                                    <div>
                                        <span className="font-medium">Idiomas:</span> Español, Catalán
                                    </div>
                                    <div>
                                        <span className="font-medium">Experiencia:</span> 8+ años
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <a className="flex-1" href="/psychologist/2">
                                        <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-gray-300 hover:bg-gray-100 hover:text-gray-900 h-9 rounded-md px-3 w-full bg-transparent">
                                            Ver Perfil Completo
                                        </button>
                                    </a>
                                    <a className="flex-1" href="/booking/2">
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
                                                <path d="M8 2v4" />
                                                <path d="M16 2v4" />
                                                <rect width="18" height="18" x="3" y="4" rx="2" />
                                                <path d="M3 10h18" />
                                            </svg>
                                            Reservar Cita
                                        </button>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-lg border bg-white text-gray-900 shadow-sm hover:shadow-lg transition-shadow">
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-start">
                                        <Image
                                            alt="Dr. Luis Fernández"
                                            className="w-16 h-16 rounded-full mr-4"
                                            src="/person-gray-photo-placeholder-woman.webp"
                                            width={80}
                                            height={80}
                                        />
                                        <div>
                                            <div className="flex items-center mb-2">
                                                <h3 className="text-lg font-semibold mr-2">Dr. Luis Fernández</h3>
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
                                                <span className="text-sm text-gray-600">4.7 (73 reseñas)</span>
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
                                                Sevilla, España
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
                                                    <line x1="12" x2="12" y1="2" y2="22" />
                                                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                                                </svg>
                                                €75/sesión
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-right">
                                        <div className="text-sm text-green-600 font-medium mb-2">Disponible Próxima Semana</div>
                                        <div className="flex gap-1">
                                            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-gray-900 text-xs">
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
                                                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                                    <circle cx="9" cy="7" r="4" />
                                                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                                                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                                </svg>
                                                Presencial
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <p className="text-gray-600 mb-4 text-sm">
                                    Especialista en adicciones con 15 años de experiencia en terapia individual y grupal.
                                </p>

                                <div className="flex flex-wrap gap-1 mb-4">
                                    <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 border-transparent bg-gray-200 text-gray-800 hover:bg-gray-300 text-xs">
                                        Adicciones
                                    </div>
                                    <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 border-transparent bg-gray-200 text-gray-800 hover:bg-gray-300 text-xs">
                                        Abuso de Sustancias
                                    </div>
                                    <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 border-transparent bg-gray-200 text-gray-800 hover:bg-gray-300 text-xs">
                                        Terapia de Grupo
                                    </div>
                                </div>

                                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                                    <div>
                                        <span className="font-medium">Idiomas:</span> Español
                                    </div>
                                    <div>
                                        <span className="font-medium">Experiencia:</span> 15+ años
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <a className="flex-1" href="/psychologist/4">
                                        <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-gray-300 hover:bg-gray-100 hover:text-gray-900 h-9 rounded-md px-3 w-full bg-transparent">
                                            Ver Perfil Completo
                                        </button>
                                    </a>
                                    <a className="flex-1" href="/booking/4">
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
                                                <path d="M8 2v4" />
                                                <path d="M16 2v4" />
                                                <rect width="18" height="18" x="3" y="4" rx="2" />
                                                <path d="M3 10h18" />
                                            </svg>
                                            Reservar Cita
                                        </button>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default filter;
