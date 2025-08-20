'use client';

import Calendario from '@/components/session/Calendar';
import { psychologistsService, PsychologistResponse } from '@/services/psychologists';
import { appointmentsService, CreateAppointmentRequest } from '@/services/appointments';
import { Calendar, Clock, MapPin } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

// Horarios disponibles (constante fuera del componente)
const AVAILABLE_TIMES = ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'];

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

    // Función para obtener user_id del token en cookies
    const getUserIdFromToken = () => {
        // Solo ejecutar en el cliente
        if (typeof window === 'undefined') return '';

        try {
            // Obtener token de las cookies
            const token = Cookies.get('authToken');

            if (token) {
                // Decodificar JWT payload (parte central del token)
                const payload = JSON.parse(atob(token.split('.')[1]));

                // Verificar si el token ha expirado
                if (payload.exp && payload.exp * 1000 < Date.now()) {
                    // Limpiar cookie expirada
                    Cookies.remove('authToken');
                    return '';
                }

                const extractedId = payload.sub || payload.userId || payload.id;
                return extractedId;
            }

            return '';
        } catch (error) {
            console.error('Error extracting user ID from token:', error);
            return '';
        }
    };

    // Función para obtener el token completo de las cookies
    const getAuthToken = () => {
        // Solo ejecutar en el cliente
        if (typeof window === 'undefined') return null;

        const token = Cookies.get('authToken');

        if (token) {
            try {
                // Verificar si el token ha expirado
                const payload = JSON.parse(atob(token.split('.')[1]));
                if (payload.exp && payload.exp * 1000 < Date.now()) {
                    // Limpiar cookie expirada
                    Cookies.remove('authToken');
                    return null;
                }
                return token;
            } catch (error) {
                console.error('Error verificando token:', error);
                // Si hay error decodificando, limpiar cookie
                Cookies.remove('authToken');
                return null;
            }
        }

        return null;
    };

    // Función para redirigir a login
    const redirectToLogin = useCallback(() => {
        router.push('/login');
    }, [router]);

    useEffect(() => {
        // Marcar que estamos en el cliente para evitar errores de hidratación
        setIsClient(true);

        // Verificar autenticación al cargar el componente
        const authToken = getAuthToken();
        if (!authToken) {
            // Redirigir automáticamente si no está autenticado o token expirado
            redirectToLogin();
            return;
        }

        const id = getUserIdFromToken();
        if (!id) {
            redirectToLogin();
            return;
        }
        setUserId(id);

        // Función para cargar el psicólogo específico desde la base de datos
        const loadPsychologist = async () => {
            try {
                // Usar la nueva ruta más eficiente que trae solo el psicólogo específico
                const foundPsychologist = await psychologistsService.getPsychologistByIdDirect(psychologistId);
                setPsychologist(foundPsychologist);
            } catch (error) {
                console.error('Error loading psychologist:', error);
                // Si no podemos cargar el psicólogo, redirigir a login o mostrar error
                redirectToLogin();
            } finally {
                setLoading(false);
            }
        };

        // Cargar el psicólogo específico desde la base de datos
        loadPsychologist();
    }, [psychologistId, router, redirectToLogin]);

    // useEffect separado para manejar la configuración inicial cuando se carga el psicólogo
    useEffect(() => {
        if (psychologist) {
            // Si el psicólogo tiene modalidades, establecer la primera como predeterminada
            if (psychologist.modality) {
                // Usar directamente la modalidad del psicólogo
                setModality(psychologist.modality);
            } else {
                setModality('En línea'); // Valor por defecto
            }
        }
    }, [psychologist]);

    // Función para verificar si un horario está disponible
    const isTimeAvailable = useCallback(
        (time: string): boolean => {
            if (!selectedDate) return false;

            const today = new Date();
            const selectedDateObj = new Date(selectedDate + 'T00:00:00');

            // Si la fecha seleccionada no es hoy, todos los horarios están disponibles
            if (selectedDateObj.toDateString() !== today.toDateString()) {
                return true;
            }

            // Si es hoy, verificar que la hora sea posterior a la actual
            const [timeStr, modifier] = time.split(' ');
            const [hours, minutes] = timeStr.split(':').map(Number);

            let hour24 = hours;
            if (modifier === 'PM' && hours !== 12) {
                hour24 = hours + 12;
            } else if (modifier === 'AM' && hours === 12) {
                hour24 = 0;
            }

            const timeDate = new Date();
            timeDate.setHours(hour24, minutes, 0, 0);

            // Agregar un buffer de 1 hora para permitir tiempo de preparación
            const currentTimePlusBuffer = new Date(today.getTime() + 60 * 60 * 1000);

            return timeDate > currentTimePlusBuffer;
        },
        [selectedDate]
    );

    // useEffect para verificar periódicamente si la hora seleccionada sigue siendo válida
    useEffect(() => {
        if (selectedTime && selectedDate) {
            const interval = setInterval(() => {
                if (!isTimeAvailable(selectedTime)) {
                    setSelectedTime('');
                    alert('El horario seleccionado ya no está disponible. Por favor, selecciona otro horario.');
                }
            }, 60000); // Verificar cada minuto

            return () => clearInterval(interval);
        }
    }, [selectedTime, selectedDate, isTimeAvailable]);

    const handleDateChange = (date: string) => {
        setSelectedDate(date);
        setSelectedTime(''); // Resetear hora al cambiar fecha
    };

    const handleTimeSelect = (time: string) => {
        // Verificar que el horario aún esté disponible antes de seleccionarlo
        if (isTimeAvailable(time)) {
            setSelectedTime(time);
        } else {
            alert('Este horario ya no está disponible. Por favor, selecciona otro horario.');
        }
    };

    // Función para convertir hora de 12h a 24h
    const convertTo24Hour = (time12h: string): string => {
        const [timeStr, modifier] = time12h.split(' ');
        const [hours, minutes] = timeStr.split(':').map(Number);

        let hour24 = hours;
        if (modifier === 'PM' && hours !== 12) {
            hour24 = hours + 12;
        } else if (modifier === 'AM' && hours === 12) {
            hour24 = 0;
        }

        return `${hour24.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    };

    const handleSubmitAppointment = async () => {
        // Validación de campos requeridos
        if (!selectedDate || !selectedTime || !sessionType || !therapyApproach || !modality || !psychologist || !userId) {
            alert('Por favor, completa todos los campos requeridos');
            return;
        }

        setLoading(true);

        // Verificar autenticación justo antes de enviar
        const authToken = getAuthToken();
        if (!authToken) {
            alert('No estás autenticado. Por favor, inicia sesión para continuar.');
            setLoading(false);
            redirectToLogin();
            return;
        }

        try {
            // Convertir hora de 12h a 24h para el backend
            const hour24 = convertTo24Hour(selectedTime);

            // Preparar datos para el backend
            const appointmentData: CreateAppointmentRequest = {
                date: selectedDate, // YYYY-MM-DD format
                hour: hour24, // HH:mm format
                user_id: userId,
                psychologist_id: psychologistId,
                modality: modality as 'Presencial' | 'En línea' | 'Híbrido',
                session_type: sessionType,
                therapy_approach: therapyApproach,
                insurance: insurance || undefined,
                price: 50000, // Precio fijo por ahora
                notes: `Cita agendada desde el frontend. Modalidad: ${modality}, Tipo: ${sessionType}, Enfoque: ${therapyApproach}${
                    insurance ? `, Obra Social: ${insurance}` : ''
                }`,
            };

            // Crear la cita usando el servicio
            const newAppointment = await appointmentsService.createAppointment(appointmentData);

            console.log('Cita creada exitosamente:', newAppointment);
            alert('¡Cita creada exitosamente!');

            // Llamar al backend para obtener el init_point de Mercado Pago
            const mpRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payments/mercadopago-preference`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`,
                },
            });
            if (!mpRes.ok) {
                throw new Error('No se pudo iniciar el pago con Mercado Pago');
            }
            const mpData = await mpRes.json();
            if (mpData.init_point) {
                window.location.href = mpData.init_point;
            } else {
                alert('No se pudo obtener el link de pago. Intenta nuevamente.');
            }
        } catch (error: unknown) {
            console.error('Error al crear la cita o iniciar el pago:', error);

            // Manejo específico de errores
            const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
            if (errorMessage.includes('Authentication failed')) {
                alert('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.');
                redirectToLogin();
            } else if (errorMessage.includes('Bad request') || errorMessage.includes('Ese horario ya está reservado')) {
                alert('Ya existe una cita en ese horario. Por favor, elige otro horario.');
            } else if (errorMessage.includes('not found')) {
                alert('Error: No se pudo encontrar el psicólogo o tu perfil de paciente. Verifica tu información.');
            } else {
                alert('Error al crear la cita o iniciar el pago. Por favor, intenta nuevamente.');
            }
        } finally {
            setLoading(false);
        }
    }; // Función para obtener horarios filtrados
    const getFilteredTimes = useCallback((): string[] => {
        return AVAILABLE_TIMES.filter((time) => isTimeAvailable(time));
    }, [isTimeAvailable]);

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
                                    <h2 className="text-2xl font-bold text-gray-900">Dr/a {psychologist.name}</h2>
                                    <p className="text-lg text-gray-600">{psychologist.professional_title || 'Psicólogo/a'}</p>
                                    <p className="text-sm text-gray-500 mt-1">{psychologist.personal_biography}</p>

                                    <div className="flex items-center gap-4 mt-3">
                                        <div className="flex items-center">
                                            <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                                            <span className="text-sm text-gray-600">
                                                {psychologist.office_address || 'Ubicación no especificada'}
                                            </span>
                                        </div>
                                        {psychologist.professional_experience && (
                                            <div className="flex items-center">
                                                <span className="text-sm text-gray-600">
                                                    📅 {psychologist.professional_experience} años de experiencia
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-4 mt-2">
                                        <span className="text-sm text-gray-600">⭐ 4.8 (Reviews próximamente)</span>
                                        <span className="text-sm font-semibold text-green-600">💰 $50.000</span>
                                        {psychologist.verified && (
                                            <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                                                ✓ Verificado
                                            </span>
                                        )}
                                    </div>

                                    {psychologist.languages && psychologist.languages.length > 0 && (
                                        <div className="mt-2">
                                            <span className="text-sm text-gray-600">🗣️ Idiomas: {psychologist.languages.join(', ')}</span>
                                        </div>
                                    )}

                                    {psychologist.specialities && psychologist.specialities.length > 0 && (
                                        <div className="mt-2">
                                            <span className="text-sm text-gray-600">🎯 Especialidades: </span>
                                            <div className="flex flex-wrap gap-1 mt-1">
                                                {psychologist.specialities.slice(0, 3).map((specialty, index) => (
                                                    <span
                                                        key={index}
                                                        className="inline-flex items-center px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full"
                                                    >
                                                        {specialty}
                                                    </span>
                                                ))}
                                                {psychologist.specialities.length > 3 && (
                                                    <span className="text-xs text-gray-500">+{psychologist.specialities.length - 3} más</span>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Información adicional del psicólogo */}
                    <div className="rounded-lg border bg-white text-gray-900 shadow-sm mb-8">
                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Información del Profesional</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {/* Modalidad */}
                                <div>
                                    <h4 className="text-sm font-medium text-gray-700 mb-2">Modalidad de Atención</h4>
                                    <p className="text-sm text-gray-600">{psychologist.modality || 'No especificado'}</p>
                                </div>

                                {/* Tipos de sesión */}
                                {psychologist.session_types && psychologist.session_types.length > 0 && (
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-700 mb-2">Tipos de Sesión</h4>
                                        <div className="flex flex-wrap gap-1">
                                            {psychologist.session_types.map((type, index) => (
                                                <span
                                                    key={index}
                                                    className="inline-flex items-center px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full"
                                                >
                                                    {type}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Enfoques terapéuticos */}
                                {psychologist.therapy_approaches && psychologist.therapy_approaches.length > 0 && (
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-700 mb-2">Enfoques Terapéuticos</h4>
                                        <div className="flex flex-wrap gap-1">
                                            {psychologist.therapy_approaches.slice(0, 2).map((approach, index) => (
                                                <span
                                                    key={index}
                                                    className="inline-flex items-center px-2 py-1 text-xs font-medium bg-orange-100 text-orange-800 rounded-full"
                                                >
                                                    {approach}
                                                </span>
                                            ))}
                                            {psychologist.therapy_approaches.length > 2 && (
                                                <span className="text-xs text-gray-500">+{psychologist.therapy_approaches.length - 2} más</span>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Seguros aceptados */}
                                {psychologist.insurance_accepted && psychologist.insurance_accepted.length > 0 && (
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-700 mb-2">Obras Sociales Aceptadas</h4>
                                        <div className="flex flex-wrap gap-1">
                                            {psychologist.insurance_accepted.slice(0, 3).map((insurance, index) => (
                                                <span
                                                    key={index}
                                                    className="inline-flex items-center px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full"
                                                >
                                                    {insurance}
                                                </span>
                                            ))}
                                            {psychologist.insurance_accepted.length > 3 && (
                                                <span className="text-xs text-gray-500">+{psychologist.insurance_accepted.length - 3} más</span>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Número de licencia */}
                                {psychologist.license_number && (
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-700 mb-2">Número de Licencia</h4>
                                        <p className="text-sm text-gray-600">#{psychologist.license_number}</p>
                                    </div>
                                )}

                                {/* Disponibilidad */}
                                {psychologist.availability && psychologist.availability.length > 0 && (
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-700 mb-2">Disponibilidad</h4>
                                        <div className="flex flex-wrap gap-1">
                                            {psychologist.availability.slice(0, 4).map((day, index) => (
                                                <span
                                                    key={index}
                                                    className="inline-flex items-center px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full"
                                                >
                                                    {day}
                                                </span>
                                            ))}
                                            {psychologist.availability.length > 4 && (
                                                <span className="text-xs text-gray-500">+{psychologist.availability.length - 4} más</span>
                                            )}
                                        </div>
                                    </div>
                                )}
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
                                        getFilteredTimes().map((time) => (
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
                                {selectedDate && getFilteredTimes().length === 0 && (
                                    <p className="text-center text-gray-500 py-8">
                                        No hay horarios disponibles para esta fecha.
                                        {new Date(selectedDate + 'T00:00:00').toDateString() === new Date().toDateString()
                                            ? ' Los horarios deben ser al menos 1 hora después de la hora actual.'
                                            : ''}
                                    </p>
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
                                            {psychologist?.session_types?.map((tipo: string) => (
                                                <option key={tipo} value={tipo}>
                                                    {tipo}
                                                </option>
                                            )) || (
                                                // Opciones por defecto si no hay datos
                                                <>
                                                    <option value="Individual">Individual</option>
                                                    <option value="Pareja">Pareja</option>
                                                    <option value="Familiar">Familiar</option>
                                                    <option value="Grupo">Grupo</option>
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
                                            {psychologist?.therapy_approaches?.map((enfoque: string) => (
                                                <option key={enfoque} value={enfoque}>
                                                    {enfoque}
                                                </option>
                                            )) || (
                                                // Opciones por defecto si no hay datos
                                                <>
                                                    <option value="Terapia cognitivo-conductual">Terapia cognitivo-conductual</option>
                                                    <option value="Terapia psicodinámica">Terapia psicodinámica</option>
                                                    <option value="Terapia centrada en la persona">Terapia centrada en la persona</option>
                                                    <option value="Terapia de sistemas familiares">Terapia de sistemas familiares</option>
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
                                            {psychologist?.insurance_accepted?.map((obra: string) => (
                                                <option key={obra} value={obra}>
                                                    {obra}
                                                </option>
                                            )) || (
                                                // Opciones por defecto si no hay datos
                                                <>
                                                    <option value="OSDE">OSDE</option>
                                                    <option value="Swiss Medical">Swiss Medical</option>
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
                                                    <option value="Presencial">Presencial</option>
                                                    <option value="En línea">En línea</option>
                                                    <option value="Híbrido">Híbrido</option>
                                                </>
                                            )}
                                        </select>
                                    </div>

                                    {/* Información de duración y precio (solo lectura) */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Duración de la Sesión</label>
                                            <div className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600">
                                                45 minutos
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Precio de la Sesión</label>
                                            <div className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600">$50.000</div>
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
                                            <strong>Duración:</strong> 45 minutos
                                        </p>
                                        {insurance && (
                                            <p className="text-sm text-gray-600">
                                                <strong>Seguro:</strong> {insurance}
                                            </p>
                                        )}
                                        <p className="text-sm text-gray-600">
                                            <strong>Precio:</strong> $50.000
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
