'use client';

import Calendario from '@/components/session/Calendar';
import { envs } from '@/config/envs.config';
import { psychologistsService, PsychologistResponse } from '@/services/psychologists';
import { Calendar, Clock, MapPin } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const SessionPage = () => {
    const params = useParams();
    const router = useRouter();
    const psychologistId = (params?.slug as string) || '';

    const [psychologist, setPsychologist] = useState<PsychologistResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [sessionType, setSessionType] = useState('');
    const [therapyApproach, setTherapyApproach] = useState('');
    const [insurance, setInsurance] = useState('');
    const [modality, setModality] = useState('');
    const [userId, setUserId] = useState<string>('');
    const [isClient, setIsClient] = useState(false);

    // Obtener datos del psicólogo seleccionado
    const duration = 45; // Por ahora fijo, debería venir del backend
    const price = 25000; // Precio por defecto, podría venir del backend o ser configurable

    // Función para obtener user_id del token en cookies
    const getUserIdFromToken = () => {
        // Solo ejecutar en el cliente
        if (typeof window === 'undefined') return '';

        try {
            // Obtener token de las cookies (nombre común: 'auth-token', 'token', 'access_token')
            const token = Cookies.get('auth-token') || Cookies.get('authToken');

            if (token) {
                // Decodificar JWT payload (parte central del token)
                const payload = JSON.parse(atob(token.split('.')[1]));
                return payload.sub || payload.userId || payload.id;
            }

            // Fallback para desarrollo
            return 'user-uuid-from-token'; // Placeholder
        } catch (error) {
            console.error('Error extracting user ID from token:', error);
            return 'user-uuid-from-token'; // Placeholder para desarrollo
        }
    };

    // Función para obtener el token completo de las cookies
    const getAuthToken = () => {
        // Solo ejecutar en el cliente
        if (typeof window === 'undefined') return null;
        return Cookies.get('auth-token') || Cookies.get('authToken');
    };

    // Función para redirigir a login
    const redirectToLogin = useCallback(() => {
        router.push('/login');
    }, [router]);

    useEffect(() => {
        // Marcar que estamos en el cliente para evitar errores de hidratación
        setIsClient(true);

        const id = getUserIdFromToken();
        setUserId(id);

        // Verificar autenticación al cargar el componente
        const authToken = getAuthToken();
        if (!authToken) {
            // Redirigir automáticamente si no está autenticado
            redirectToLogin();
            return;
        }

        // Función para cargar psicólogos desde la base de datos
        const loadPsychologists = async () => {
            try {
                if (authToken) {
                    const response = await psychologistsService.getPsychologistsForPatient(authToken);

                    // Buscar el psicólogo específico por ID
                    const foundPsychologist = await psychologistsService.getPsychologistById(response.data, psychologistId);
                    setPsychologist(foundPsychologist);
                }
            } catch (error) {
                console.error('Error loading psychologists:', error);
                // Si no podemos cargar psicólogos, redirigir a login o mostrar error
                redirectToLogin();
            } finally {
                setLoading(false);
            }
        };

        // Cargar psicólogos desde la base de datos
        loadPsychologists();
    }, [psychologistId, router, redirectToLogin]);

    // useEffect separado para manejar la configuración inicial cuando se carga el psicólogo
    useEffect(() => {
        if (psychologist) {
            // Si el psicólogo tiene modalidades, establecer la primera como predeterminada
            if (psychologist.modality) {
                // Convertir modalidad del psicólogo a formato del formulario si es necesario
                setModality(psychologist.modality);
            } else {
                setModality('En línea'); // Valor por defecto
            }
        }
    }, [psychologist]);

    const handleDateChange = (date: string) => {
        setSelectedDate(date);
        setSelectedTime(''); // Resetear hora al cambiar fecha
        console.log('Fecha seleccionada (ISO-8601):', date);
    };

    const handleTimeSelect = (time: string) => {
        setSelectedTime(time);
        console.log('Hora seleccionada:', time);
        console.log('Cita completa:', selectedDate, time);
    };

    const handleSubmitAppointment = async () => {
        // Validación de campos requeridos
        if (!selectedDate || !selectedTime || !sessionType || !therapyApproach || !modality || !psychologist || !userId) {
            alert('Por favor, completa todos los campos requeridos');
            return;
        }

        // Verificar autenticación
        const authToken = getAuthToken();
        if (!authToken) {
            alert('No estás autenticado. Por favor, inicia sesión para continuar.');
            redirectToLogin();
            return;
        }

        const appointmentData = {
            date: selectedDate, // Ya está en formato ISO-8601 (YYYY-MM-DD)
            hour: convertTo24Hour(selectedTime), // Formato HH:mm requerido por backend
            duration: duration, // Duración del psicólogo
            session_type: sessionType,
            therapy_approach: therapyApproach,
            insurance: insurance || undefined,
            price: price, // Precio del psicólogo
            modality: modality, // Usar el valor del enum EModality
            // Campos requeridos por el backend
            user_id: userId, // Obtenido del token
            psychologist_id: psychologist.id, // UUID del psicólogo obtenido del slug
            status: 'pending', // Estado inicial según AppointmentStatus enum
        };

        setLoading(true);
        try {
            console.log('Enviando cita:', appointmentData);

            // Obtener token de autorización
            const authToken = getAuthToken();

            const headers: Record<string, string> = {
                'Content-Type': 'application/json',
            };

            // Agregar token si existe
            if (authToken) {
                headers['Authorization'] = `Bearer ${authToken}`;
            }

            const response = await fetch(`${envs.next_public_api_url}/appointments`, {
                method: 'POST',
                headers,
                body: JSON.stringify(appointmentData),
            });

            if (!response.ok) {
                // Manejo específico para diferentes errores
                if (response.status === 401) {
                    alert('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.');
                    redirectToLogin();
                    return;
                } else if (response.status === 400) {
                    const errorData = await response.json().catch(() => null);
                    const errorMessage = errorData?.message || 'Datos inválidos. Verifica la información ingresada.';
                    alert(errorMessage);
                    return;
                } else if (response.status === 404) {
                    alert('Psicólogo no encontrado. Por favor, verifica la información.');
                    return;
                } else if (response.status === 409) {
                    alert('Ya existe una cita en ese horario. Por favor, elige otro horario.');
                    return;
                }
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            const result = await response.json();
            console.log('Cita creada exitosamente:', result);
            alert('¡Cita creada exitosamente!');

            // TODO: Redirigir a página de confirmación o dashboard
        } catch (error) {
            console.error('Error al crear la cita:', error);
            alert('Error al crear la cita. Por favor, intenta nuevamente.');
        } finally {
            setLoading(false);
        }
    };

    // Función para convertir formato AM/PM a 24 horas
    const convertTo24Hour = (time12h: string): string => {
        const [time, modifier] = time12h.split(' ');
        let [hours] = time.split(':');
        const [, minutes] = time.split(':');

        if (hours === '12') {
            hours = modifier === 'AM' ? '00' : '12';
        } else if (modifier === 'PM') {
            hours = (parseInt(hours, 10) + 12).toString();
        }

        return `${hours.padStart(2, '0')}:${minutes}`;
    };

    // Horarios disponibles
    const availableTimes = ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'];

    // Función para formatear la fecha ISO a formato legible
    const formatDisplayDate = (isoDate: string): string => {
        if (!isoDate) return '';

        try {
            // Parsear la fecha sin agregar tiempo para evitar problemas de zona horaria
            const [year, month, day] = isoDate.split('-').map(Number);
            const date = new Date(year, month - 1, day); // month - 1 porque los meses van de 0-11

            const options: Intl.DateTimeFormatOptions = {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            };

            return date.toLocaleDateString('es-ES', options);
        } catch (error) {
            console.error('Error formatting date:', error);
            return isoDate; // Fallback
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {!isClient ? (
                // Mostrar loading hasta que la hidratación esté completa
                <div className="text-center py-8">
                    <p className="text-gray-500">Cargando...</p>
                </div>
            ) : !psychologist ? (
                <div className="text-center py-8">
                    <p className="text-gray-500">Psicólogo no encontrado</p>
                </div>
            ) : !getAuthToken() ? (
                <div className="text-center py-8">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                        <p className="text-yellow-800 mb-4">Debes iniciar sesión para agendar una cita</p>
                        <button
                            onClick={redirectToLogin}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                        >
                            Iniciar Sesión
                        </button>
                    </div>
                </div>
            ) : (
                <>
                    <div className="rounded-lg border bg-white text-gray-900 shadow-sm mb-8">
                        <div className="p-6">
                            <div className="flex items-center">
                                <Image
                                    alt={psychologist.name}
                                    className="rounded-full mr-4"
                                    width={64}
                                    height={64}
                                    src={psychologist.profile_picture || '/person-gray-photo-placeholder-woman.webp'}
                                />
                                <div>
                                    <h2 className="text-xl font-semibold">{psychologist.name}</h2>
                                    <p className="text-gray-600">{psychologist.personal_biography || 'Psicólogo especializado'}</p>
                                    <div className="flex items-center mt-1">
                                        <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                                        <span className="text-sm text-gray-600">{psychologist.office_address || 'Ubicación no especificada'}</span>
                                    </div>
                                    <div className="flex items-center mt-1">
                                        <span className="text-sm text-gray-600">⭐ 4.8 (Reviews próximamente)</span>
                                        <span className="text-sm text-gray-600 ml-4">💰 ${price.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="rounded-lg border bg-white text-gray-900 shadow-sm">
                            <div className="flex flex-col space-y-1.5 p-6">
                                <div className="text-2xl font-semibold leading-none tracking-tight flex items-center">
                                    <Calendar className="h-5 w-5 mr-2" />
                                    Seleccionar Fecha
                                </div>
                                <div className="text-sm text-gray-500 mb-4">Elige el día para tu sesión</div>
                            </div>
                            <div className="p-6 pt-0">
                                <Calendario value={selectedDate} onChange={handleDateChange} placeholder="Elije el día" className="w-full" />
                            </div>
                        </div>
                        <div className="rounded-lg border bg-white text-gray-900 shadow-sm">
                            <div className="flex flex-col space-y-1.5 p-6">
                                <div className="text-2xl font-semibold leading-none tracking-tight flex items-center">
                                    <Clock className="h-5 w-5 mr-2" />
                                    Horarios Disponibles
                                </div>
                                <div className="text-sm text-gray-500">
                                    {selectedDate ? (
                                        <div>
                                            <div>{formatDisplayDate(selectedDate)}</div>
                                            {selectedTime && <div className="text-blue-600 font-medium mt-1">Hora seleccionada: {selectedTime}</div>}
                                        </div>
                                    ) : (
                                        'Selecciona una fecha primero'
                                    )}
                                </div>
                            </div>
                            <div className="p-6 pt-0">
                                <div className="grid grid-cols-2 gap-3">
                                    {selectedDate &&
                                        availableTimes.map((time) => (
                                            <button
                                                key={time}
                                                onClick={() => handleTimeSelect(time)}
                                                className={`
                                        px-4 py-2 border rounded-lg text-sm transition-colors
                                        ${
                                            selectedTime === time
                                                ? 'bg-blue-500 text-white border-blue-500'
                                                : 'border-gray-300 hover:bg-gray-50 text-gray-900'
                                        }
                                    `}
                                            >
                                                {time}
                                            </button>
                                        ))}
                                </div>
                                {!selectedDate && (
                                    <p className="text-center text-gray-500 py-8">Selecciona una fecha para ver los horarios disponibles</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Detalles adicionales de la sesión */}
                    {selectedDate && selectedTime && (
                        <div className="mt-8">
                            <div className="rounded-lg border bg-white text-gray-900 shadow-sm">
                                <div className="flex flex-col space-y-1.5 p-6">
                                    <div className="text-2xl font-semibold leading-none tracking-tight">Detalles de la Sesión</div>
                                    <div className="text-sm text-gray-500">
                                        Completa la información adicional. Los campos marcados con <span className="text-red-500">*</span> son
                                        obligatorios.
                                    </div>
                                </div>
                                <div className="p-6 pt-0 space-y-6">
                                    {/* Tipo de sesión */}
                                    <div>
                                        <label htmlFor="session-type" className="block text-sm font-medium text-gray-700 mb-2">
                                            Tipo de Sesión <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            id="session-type"
                                            value={sessionType}
                                            onChange={(e) => setSessionType(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                            required
                                        >
                                            <option value="">Selecciona el tipo de sesión</option>
                                            {psychologist?.session_types?.map((tipo: string) => {
                                                const tipoMap: { [key: string]: string } = {
                                                    INDIVIDUAL: 'Individual',
                                                    COUPLES: 'Terapia de Parejas',
                                                    FAMILY: 'Terapia Familiar',
                                                    GROUP: 'Terapia Grupal',
                                                };
                                                return (
                                                    <option key={tipo} value={tipo}>
                                                        {tipoMap[tipo] || tipo}
                                                    </option>
                                                );
                                            }) || (
                                                // Opciones por defecto si no hay datos
                                                <>
                                                    <option value="INDIVIDUAL">Individual</option>
                                                    <option value="COUPLES">Terapia de Parejas</option>
                                                    <option value="FAMILY">Terapia Familiar</option>
                                                    <option value="GROUP">Terapia Grupal</option>
                                                </>
                                            )}
                                        </select>
                                    </div>

                                    {/* Enfoque terapéutico */}
                                    <div>
                                        <label htmlFor="therapy-approach" className="block text-sm font-medium text-gray-700 mb-2">
                                            Enfoque Terapéutico <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            id="therapy-approach"
                                            value={therapyApproach}
                                            onChange={(e) => setTherapyApproach(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                            required
                                        >
                                            <option value="">Selecciona el enfoque</option>
                                            {psychologist?.therapy_approaches?.map((enfoque: string) => {
                                                const enfoqueMap: { [key: string]: string } = {
                                                    COGNITIVE_BEHAVIORAL_THERAPY: 'Terapia Cognitivo-Conductual',
                                                    PSYCHODYNAMIC_THERAPY: 'Terapia Psicodinámica',
                                                    HUMANISTIC_PERSON_CENTERED_THERAPY: 'Terapia Humanista',
                                                    FAMILY_SYSTEMS_THERAPY: 'Terapia Sistémica',
                                                    GESTALT_THERAPY: 'Gestalt',
                                                    MINDFULNESS_BASED_THERAPY: 'Mindfulness',
                                                    EYE_MOVEMENT_DESENSITIZATION_REPROCESSING: 'EMDR',
                                                    DIALECTICAL_BEHAVIORAL_THERAPY: 'Terapia Dialéctico-Conductual',
                                                    PLAY_THERAPY: 'Terapia de Juego',
                                                    GROUP_THERAPY: 'Terapia de Grupo',
                                                };
                                                return (
                                                    <option key={enfoque} value={enfoque}>
                                                        {enfoqueMap[enfoque] || enfoque}
                                                    </option>
                                                );
                                            }) || (
                                                // Opciones por defecto si no hay datos
                                                <>
                                                    <option value="COGNITIVE_BEHAVIORAL_THERAPY">Terapia Cognitivo-Conductual</option>
                                                    <option value="PSYCHODYNAMIC_THERAPY">Terapia Psicodinámica</option>
                                                    <option value="HUMANISTIC_PERSON_CENTERED_THERAPY">Terapia Humanista</option>
                                                    <option value="FAMILY_SYSTEMS_THERAPY">Terapia Sistémica</option>
                                                </>
                                            )}
                                        </select>
                                    </div>

                                    {/* Seguro médico */}
                                    <div>
                                        <label htmlFor="insurance" className="block text-sm font-medium text-gray-700 mb-2">
                                            Seguro Médico
                                        </label>
                                        <select
                                            id="insurance"
                                            value={insurance}
                                            onChange={(e) => setInsurance(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                        >
                                            <option value="">Sin seguro médico</option>
                                            {psychologist?.insurance_accepted?.map((obra: string) => {
                                                const obraMap: { [key: string]: string } = {
                                                    OSDE: 'OSDE',
                                                    SWISS_MEDICAL: 'Swiss Medical',
                                                    IOMA: 'IOMA',
                                                    PAMI: 'PAMI',
                                                    UNION_PERSONAL: 'Unión Personal',
                                                    SANCOR_SALUD: 'Sancor Salud',
                                                    APROSS: 'APROSS',
                                                    OSPRERA: 'OSPRERA',
                                                };
                                                return (
                                                    <option key={obra} value={obra}>
                                                        {obraMap[obra] || obra}
                                                    </option>
                                                );
                                            }) || (
                                                // Opciones por defecto si no hay datos
                                                <>
                                                    <option value="OSDE">OSDE</option>
                                                    <option value="SWISS_MEDICAL">Swiss Medical</option>
                                                    <option value="IOMA">IOMA</option>
                                                    <option value="PAMI">PAMI</option>
                                                </>
                                            )}
                                        </select>
                                    </div>

                                    {/* Modalidad */}
                                    <div>
                                        <label htmlFor="modality" className="block text-sm font-medium text-gray-700 mb-2">
                                            Modalidad <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            id="modality"
                                            value={modality}
                                            onChange={(e) => setModality(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                            required
                                        >
                                            <option value="">Selecciona modalidad</option>
                                            {/* Usar modalidad única del psicólogo o opciones por defecto */}
                                            {psychologist?.modality ? (
                                                <option value={psychologist.modality}>{psychologist.modality}</option>
                                            ) : (
                                                // Opciones por defecto si no hay datos específicos
                                                <>
                                                    <option value="PRESENCIAL">Presencial</option>
                                                    <option value="EN_LINEA">En línea</option>
                                                    <option value="HIBRIDO">Híbrido</option>
                                                </>
                                            )}
                                        </select>
                                    </div>

                                    {/* Información de duración y precio (solo lectura) */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Duración de la Sesión</label>
                                            <div className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600">
                                                {duration} minutos
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Precio de la Sesión</label>
                                            <div className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600">
                                                ${price.toLocaleString()}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Botón de confirmación */}
                    {selectedDate && selectedTime && sessionType && therapyApproach && modality && (
                        <div className="mt-8">
                            <div className="rounded-lg border bg-white text-gray-900 shadow-sm">
                                <div className="p-6">
                                    <h3 className="text-lg font-semibold mb-4">Confirmar Cita</h3>
                                    <div className="bg-gray-50 p-4 rounded-lg mb-4 space-y-2">
                                        <p className="text-sm text-gray-600">
                                            <strong>Fecha:</strong> {formatDisplayDate(selectedDate)}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            <strong>Hora:</strong> {selectedTime}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            <strong>Tipo de Sesión:</strong> {sessionType}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            <strong>Enfoque Terapéutico:</strong> {therapyApproach}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            <strong>Modalidad:</strong> {modality}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            <strong>Duración:</strong> {duration} minutos
                                        </p>
                                        {insurance && (
                                            <p className="text-sm text-gray-600">
                                                <strong>Seguro:</strong> {insurance}
                                            </p>
                                        )}
                                        <p className="text-sm text-gray-600">
                                            <strong>Precio:</strong> ${price.toLocaleString()}
                                        </p>
                                    </div>
                                    <button
                                        onClick={handleSubmitAppointment}
                                        disabled={loading}
                                        className={`w-full font-medium py-3 px-4 rounded-lg transition-colors ${
                                            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                                        } text-white`}
                                    >
                                        {loading ? 'Enviando...' : 'Confirmar Cita'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    <div></div>
                </>
            )}
        </div>
    );
};

export default SessionPage;
