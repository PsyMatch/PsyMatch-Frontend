'use client';

import Calendario from '@/components/session/Calendar';
import { psychologistsService, type PsychologistResponse } from '@/services/psychologists';
import { appointmentsService, type CreateAppointmentRequest, type AppointmentResponse } from '@/services/appointments';
import MercadoPagoPayment from '@/components/payments/MercadoPagoPayment';
import { Calendar, Clock, MapPin, User, Award, Globe, Target, Shield, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useNotifications } from '@/hooks/useNotifications';

const SessionPage = () => {
    const params = useParams();
    const router = useRouter();
    const notifications = useNotifications();
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
    const [availableTimes, setAvailableTimes] = useState<string[]>([]);

    // Estados para el flujo de pago
    const [showPayment, setShowPayment] = useState(false);
    const [createdAppointment, setCreatedAppointment] = useState<AppointmentResponse | null>(null);
    const [paymentCompleted, setPaymentCompleted] = useState(false);

    // Función para obtener user_id del token en cookies
    const getUserIdFromToken = () => {
        // Solo ejecutar en el cliente
        if (typeof window === 'undefined') return '';

        try {
            // Obtener token de las cookies
            const token = Cookies.get('auth_token');

            if (token) {
                // Decodificar JWT payload (parte central del token)
                const payload = JSON.parse(atob(token.split('.')[1]));

                // Verificar si el token ha expirado
                if (payload.exp && payload.exp * 1000 < Date.now()) {
                    // Limpiar cookie expirada
                    Cookies.remove('auth_token');
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

        const token = Cookies.get('auth_token');

        if (token) {
            try {
                // Verificar si el token ha expirado
                const payload = JSON.parse(atob(token.split('.')[1]));
                if (payload.exp && payload.exp * 1000 < Date.now()) {
                    // Limpiar cookie expirada
                    Cookies.remove('auth_token');
                    return null;
                }
                return token;
            } catch (error) {
                console.error('Error verificando token:', error);
                // Si hay error decodificando, limpiar cookie
                Cookies.remove('auth_token');
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

    // Función para obtener horarios disponibles del psicólogo
    const getAvailableTimesForPsychologist = useCallback(() => {
        if (!psychologist) return;

        try {
            // Si el psicólogo tiene working_hours definidos, usarlos
            if (psychologist.working_hours && psychologist.working_hours.length > 0) {
                // Convertir formato de 24h a 12h para mostrar
                const formattedTimes = psychologist.working_hours.map((time) => {
                    const [hours, minutes] = time.split(':');
                    const hour24 = parseInt(hours);
                    const hour12 = hour24 === 0 ? 12 : hour24 > 12 ? hour24 - 12 : hour24;
                    const ampm = hour24 >= 12 ? 'PM' : 'AM';
                    return `${hour12.toString().padStart(2, '0')}:${minutes} ${ampm}`;
                });
                setAvailableTimes(formattedTimes);
            } else {
                // Horarios por defecto si no tiene working_hours definidos
                const defaultTimes = ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'];
                setAvailableTimes(defaultTimes);
            }
        } catch (error) {
            console.error('Error al obtener horarios disponibles:', error);
            // Usar horarios por defecto en caso de error
            const defaultTimes = ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'];
            setAvailableTimes(defaultTimes);
        }
    }, [psychologist]);

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

            // Cargar los horarios disponibles del psicólogo
            getAvailableTimesForPsychologist();
        }
    }, [psychologist, getAvailableTimesForPsychologist]);

    // Función para verificar si un horario está disponible
    const isTimeAvailable = useCallback(
        (time: string): boolean => {
            if (!selectedDate || !availableTimes.includes(time)) return false;

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
        [selectedDate, availableTimes]
    );

    // useEffect para verificar periódicamente si la hora seleccionada sigue siendo válida
    useEffect(() => {
        if (selectedTime && selectedDate) {
            const interval = setInterval(() => {
                if (!isTimeAvailable(selectedTime)) {
                    setSelectedTime('');
                    notifications.warning('El horario seleccionado ya no está disponible. Por favor, selecciona otro horario.');
                }
            }, 60000); // Verificar cada minuto

            return () => clearInterval(interval);
        }
    }, [selectedTime, selectedDate, isTimeAvailable, notifications]);

    const handleDateChange = (date: string) => {
        setSelectedDate(date);
        setSelectedTime(''); // Resetear hora al cambiar fecha
    };

    const handleTimeSelect = (time: string) => {
        // Verificar que el horario aún esté disponible antes de seleccionarlo
        if (isTimeAvailable(time)) {
            setSelectedTime(time);
        } else {
            notifications.warning('Este horario ya no está disponible. Por favor, selecciona otro horario.');
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
            notifications.warning('Por favor, completa todos los campos requeridos');
            return;
        }

        setLoading(true);

        // Verificar autenticación justo antes de enviar
        const authToken = getAuthToken();
        if (!authToken) {
            notifications.error('No estás autenticado. Por favor, inicia sesión para continuar.');
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
                price: psychologist.consultation_fee || 50000,
                notes: `Cita agendada desde el frontend. Modalidad: ${modality}, Tipo: ${sessionType}, Enfoque: ${therapyApproach}${
                    insurance ? `, Obra Social: ${insurance}` : ''
                }`,
            };

            // Crear la cita usando el servicio
            const newAppointment = await appointmentsService.createAppointment(appointmentData);

            // Guardar la cita creada y mostrar el componente de pago
            setCreatedAppointment(newAppointment);
            setShowPayment(true);
        } catch (error: unknown) {
            console.error('Error al crear la cita:', error);

            // Manejo específico de errores
            const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
            if (errorMessage.includes('Authentication failed')) {
                notifications.error('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.');
                redirectToLogin();
            } else if (errorMessage.includes('Bad request') || errorMessage.includes('Ese horario ya está reservado')) {
                notifications.error('Ya existe una cita en ese horario. Por favor, elige otro horario.');
            } else if (errorMessage.includes('not found')) {
                notifications.error('Error: No se pudo encontrar el psicólogo o tu perfil de paciente. Verifica tu información.');
            } else {
                notifications.error('Error al crear la cita. Por favor, intenta nuevamente.');
            }
        } finally {
            setLoading(false);
        }
    };

    // Manejar éxito del pago
    const handlePaymentSuccess = () => {
        setPaymentCompleted(true);
        // El componente MercadoPagoPayment ya maneja la redirección automáticamente
    };

    // Manejar error del pago
    const handlePaymentError = (error: string) => {
        console.error('Error en el pago:', error);
        notifications.error(`Error al procesar el pago: ${error}`);
        setShowPayment(false);
        // Opcionalmente, podrías cancelar la cita aquí si es necesario
    };

    // Función para confirmar el turno después del pago exitoso
    const handleConfirmAppointment = async () => {
        if (!createdAppointment) return;

        try {
            setLoading(true);

            // Actualizar el estado de la cita a CONFIRMED
            await appointmentsService.updateAppointment(createdAppointment.id, {
                status: 'confirmed',
            });

            notifications.success('¡Turno confirmado exitosamente! Te hemos enviado un email con los detalles.');

            // Redirigir al dashboard del usuario
            router.push('/dashboard/user');
        } catch (error) {
            console.error('Error confirmando la cita:', error);
            notifications.error('Hubo un error al confirmar el turno. Contacta con soporte.');
        } finally {
            setLoading(false);
        }
    };

    // Función para obtener horarios filtrados
    const getFilteredTimes = useCallback((): string[] => {
        return availableTimes.filter((time) => isTimeAvailable(time));
    }, [availableTimes, isTimeAvailable]);

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
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-6xl px-4 py-8 mx-auto sm:px-6 lg:px-8">
                {!isClient ? (
                    <div className="flex items-center justify-center py-16">
                        <div className="text-center">
                            <div className="w-8 h-8 mx-auto mb-4 border-2 border-blue-600 rounded-full animate-spin border-t-transparent"></div>
                            <p className="text-gray-600">Cargando...</p>
                        </div>
                    </div>
                ) : !psychologist ? (
                    <div className="flex items-center justify-center py-16">
                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-4 text-gray-400">
                                <User className="w-full h-full" />
                            </div>
                            <p className="text-gray-600">Psicólogo no encontrado</p>
                        </div>
                    </div>
                ) : !getAuthToken() ? (
                    <div className="flex items-center justify-center py-16">
                        <div className="max-w-md p-8 text-center bg-white border border-amber-200 rounded-xl shadow-sm">
                            <div className="w-16 h-16 mx-auto mb-4 text-amber-500">
                                <Shield className="w-full h-full" />
                            </div>
                            <h3 className="mb-2 text-lg font-semibold text-gray-900">Acceso Requerido</h3>
                            <p className="mb-6 text-gray-600">Debes iniciar sesión para agendar una cita</p>
                            <button
                                onClick={redirectToLogin}
                                className="w-full px-6 py-3 font-medium text-white transition-all duration-200 bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                Iniciar Sesión
                            </button>
                        </div>
                    </div>
                ) : showPayment && createdAppointment ? (
                    <div className="max-w-2xl mx-auto">
                        <div className="p-8 mb-8 text-center bg-white border border-green-200 rounded-xl shadow-sm">
                            <div className="w-16 h-16 mx-auto mb-4 text-green-600">
                                <CheckCircle className="w-full h-full" />
                            </div>
                            <h2 className="mb-3 text-2xl font-bold text-gray-900">Cita Creada Exitosamente</h2>
                            <p className="mb-2 text-gray-700">
                                Tu cita con <span className="font-semibold">{psychologist.name}</span>
                            </p>
                            <p className="mb-4 text-gray-700">
                                {formatDisplayDate(selectedDate)} a las {selectedTime}
                            </p>
                            <p className="text-sm text-gray-600">Completa el pago para confirmar tu turno</p>
                        </div>

                        <div className="bg-white border rounded-xl shadow-sm">
                            <div className="p-8">
                                <MercadoPagoPayment
                                    amount={psychologist.consultation_fee || 5000}
                                    appointmentId={createdAppointment.id}
                                    onSuccess={() => {
                                        // Guardar appointmentId en sessionStorage para usar en payment success
                                        if (typeof window !== 'undefined') {
                                            sessionStorage.setItem('current_appointment_id', createdAppointment.id);
                                        }
                                        handlePaymentSuccess();
                                    }}
                                    onError={handlePaymentError}
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        {paymentCompleted && (
                            <div className="p-8 mt-8 text-center bg-white border border-blue-200 rounded-xl shadow-sm">
                                <h3 className="mb-3 text-lg font-semibold text-gray-900">Pago Procesado</h3>
                                <p className="mb-6 text-gray-600">
                                    Una vez que MercadoPago confirme tu pago, podrás confirmar definitivamente tu turno.
                                </p>
                                <button
                                    onClick={handleConfirmAppointment}
                                    disabled={loading}
                                    className="px-8 py-3 font-medium text-white transition-all duration-200 bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? 'Confirmando...' : 'Confirmar Turno'}
                                </button>
                            </div>
                        )}

                        <div className="mt-6 text-center">
                            <button
                                onClick={() => {
                                    setShowPayment(false);
                                    setCreatedAppointment(null);
                                    setPaymentCompleted(false);
                                }}
                                className="text-sm text-gray-500 transition-colors hover:text-gray-700 focus:outline-none"
                            >
                                Volver a la selección de horario
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-8">
                        <div className="bg-white border rounded-xl shadow-sm">
                            <div className="p-6 sm:p-8">
                                <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                                    <div className="flex-shrink-0">
                                        <Image
                                            alt={psychologist.name}
                                            className="w-20 h-20 rounded-full sm:w-24 sm:h-24"
                                            width={96}
                                            height={96}
                                            src={psychologist.profile_picture || '/person-gray-photo-placeholder-woman.webp'}
                                        />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="mb-4">
                                            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Dr/a {psychologist.name}</h1>
                                            <p className="text-lg text-gray-600 sm:text-xl">{psychologist.professional_title || 'Psicólogo/a'}</p>
                                            {psychologist.personal_biography && (
                                                <p className="mt-2 text-gray-600">{psychologist.personal_biography}</p>
                                            )}
                                        </div>

                                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                            <div className="flex items-center gap-2">
                                                <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                                <span className="text-sm text-gray-600 truncate">
                                                    {psychologist.office_address || 'Ubicación no especificada'}
                                                </span>
                                            </div>

                                            {psychologist.professional_experience && (
                                                <div className="flex items-center gap-2">
                                                    <Award className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                                    <span className="text-sm text-gray-600">
                                                        {psychologist.professional_experience} años de experiencia
                                                    </span>
                                                </div>
                                            )}

                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-semibold text-green-600">
                                                    ${psychologist.consultation_fee || 50000}
                                                </span>
                                                {psychologist.verified && (
                                                    <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">
                                                        <CheckCircle className="w-3 h-3" />
                                                        Verificado
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {psychologist.languages && psychologist.languages.length > 0 && (
                                            <div className="flex items-center gap-2 mt-4">
                                                <Globe className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                                <span className="text-sm text-gray-600">Idiomas: {psychologist.languages.join(', ')}</span>
                                            </div>
                                        )}

                                        {psychologist.specialities && psychologist.specialities.length > 0 && (
                                            <div className="mt-4">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Target className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                                    <span className="text-sm font-medium text-gray-700">Especialidades:</span>
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    {psychologist.specialities.map((specialty, index) => (
                                                        <span
                                                            key={index}
                                                            className="inline-flex items-center px-3 py-1 text-xs font-medium text-blue-800 bg-blue-100 rounded-full"
                                                        >
                                                            {specialty}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white border rounded-xl shadow-sm">
                            <div className="p-6 sm:p-8">
                                <h3 className="mb-6 text-lg font-semibold text-gray-900">Información del Profesional</h3>

                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    <div className="space-y-2">
                                        <h4 className="text-sm font-medium text-gray-700">Modalidad de Atención</h4>
                                        <p className="text-sm text-gray-600">{psychologist.modality || 'No especificado'}</p>
                                    </div>

                                    {psychologist.session_types && psychologist.session_types.length > 0 && (
                                        <div className="space-y-2">
                                            <h4 className="text-sm font-medium text-gray-700">Tipos de Sesión</h4>
                                            <div className="flex flex-wrap gap-1">
                                                {psychologist.session_types.map((type, index) => (
                                                    <span
                                                        key={index}
                                                        className="inline-flex items-center px-2 py-1 text-xs font-medium text-purple-800 bg-purple-100 rounded-full"
                                                    >
                                                        {type}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {psychologist.therapy_approaches && psychologist.therapy_approaches.length > 0 && (
                                        <div className="space-y-2">
                                            <h4 className="text-sm font-medium text-gray-700">Enfoques Terapéuticos</h4>
                                            <div className="flex flex-wrap gap-1">
                                                {psychologist.therapy_approaches.map((approach, index) => (
                                                    <span
                                                        key={index}
                                                        className="inline-flex items-center px-2 py-1 text-xs font-medium text-orange-800 bg-orange-100 rounded-full"
                                                    >
                                                        {approach}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {psychologist.insurance_accepted && psychologist.insurance_accepted.length > 0 && (
                                        <div className="space-y-2">
                                            <h4 className="text-sm font-medium text-gray-700">Obras Sociales Aceptadas</h4>
                                            <div className="flex flex-wrap gap-1">
                                                {psychologist.insurance_accepted.map((insurance, index) => (
                                                    <span
                                                        key={index}
                                                        className="inline-flex items-center px-2 py-1 text-xs font-medium text-gray-800 bg-gray-100 rounded-full"
                                                    >
                                                        {insurance}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {psychologist.license_number && (
                                        <div className="space-y-2">
                                            <h4 className="text-sm font-medium text-gray-700">Número de Licencia</h4>
                                            <p className="text-sm text-gray-600">#{psychologist.license_number}</p>
                                        </div>
                                    )}

                                    {psychologist.availability && psychologist.availability.length > 0 && (
                                        <div className="space-y-2">
                                            <h4 className="text-sm font-medium text-gray-700">Disponibilidad</h4>
                                            <div className="flex flex-wrap gap-1">
                                                {psychologist.availability.map((day, index) => (
                                                    <span
                                                        key={index}
                                                        className="inline-flex items-center px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full"
                                                    >
                                                        {day}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                            <div className="bg-white border rounded-xl shadow-sm">
                                <div className="p-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <Calendar className="w-5 h-5 text-blue-600" />
                                        <h3 className="text-lg font-semibold text-gray-900">Seleccionar Fecha</h3>
                                    </div>
                                    <p className="mb-6 text-sm text-gray-600">Elige el día para tu sesión</p>
                                    <Calendario
                                        value={selectedDate}
                                        onChange={handleDateChange}
                                        placeholder="Elije el día"
                                        className="w-full"
                                        availableDays={psychologist?.availability || []}
                                    />
                                </div>
                            </div>

                            <div className="bg-white border rounded-xl shadow-sm">
                                <div className="p-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <Clock className="w-5 h-5 text-blue-600" />
                                        <h3 className="text-lg font-semibold text-gray-900">Horarios Disponibles</h3>
                                    </div>
                                    <div className="mb-6 text-sm text-gray-600">
                                        {selectedDate ? (
                                            <div className="space-y-1">
                                                <div>{formatDisplayDate(selectedDate)}</div>
                                                {selectedTime && <div className="font-medium text-blue-600">Hora seleccionada: {selectedTime}</div>}
                                            </div>
                                        ) : (
                                            'Selecciona una fecha primero'
                                        )}
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        {selectedDate &&
                                            getFilteredTimes().map((time) => (
                                                <button
                                                    key={time}
                                                    onClick={() => handleTimeSelect(time)}
                                                    className={`
                                                        px-4 py-3 border rounded-lg text-sm font-medium transition-all duration-200
                                                        ${
                                                            selectedTime === time
                                                                ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                                                                : 'border-gray-300 hover:bg-gray-50 text-gray-900 hover:border-gray-400'
                                                        }
                                                    `}
                                                >
                                                    {time}
                                                </button>
                                            ))}
                                    </div>

                                    {!selectedDate && (
                                        <div className="py-12 text-center">
                                            <Clock className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                                            <p className="text-gray-500">Selecciona una fecha para ver los horarios disponibles</p>
                                        </div>
                                    )}

                                    {selectedDate && getFilteredTimes().length === 0 && (
                                        <div className="py-12 text-center">
                                            <Clock className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                                            <p className="text-gray-500">
                                                No hay horarios disponibles para esta fecha.
                                                {new Date(selectedDate + 'T00:00:00').toDateString() === new Date().toDateString()
                                                    ? ' Los horarios deben ser al menos 1 hora después de la hora actual.'
                                                    : ''}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {selectedDate && selectedTime && (
                            <div className="bg-white border rounded-xl shadow-sm">
                                <div className="p-6 sm:p-8">
                                    <h3 className="mb-2 text-lg font-semibold text-gray-900">Detalles de la Sesión</h3>
                                    <p className="mb-8 text-sm text-gray-600">
                                        Completa la información adicional. Los campos marcados con <span className="text-red-500">*</span> son
                                        obligatorios.
                                    </p>

                                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                        <div className="space-y-2">
                                            <label htmlFor="session-type" className="block text-sm font-medium text-gray-700">
                                                Tipo de Sesión <span className="text-red-500">*</span>
                                            </label>
                                            <select
                                                id="session-type"
                                                value={sessionType}
                                                onChange={(e) => setSessionType(e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                                required
                                            >
                                                <option value="">Selecciona el tipo de sesión</option>
                                                {psychologist?.session_types?.map((tipo: string) => (
                                                    <option key={tipo} value={tipo}>
                                                        {tipo}
                                                    </option>
                                                )) || (
                                                    <>
                                                        <option value="Individual">Individual</option>
                                                        <option value="Pareja">Pareja</option>
                                                        <option value="Familiar">Familiar</option>
                                                        <option value="Grupo">Grupo</option>
                                                    </>
                                                )}
                                            </select>
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor="therapy-approach" className="block text-sm font-medium text-gray-700">
                                                Enfoque Terapéutico <span className="text-red-500">*</span>
                                            </label>
                                            <select
                                                id="therapy-approach"
                                                value={therapyApproach}
                                                onChange={(e) => setTherapyApproach(e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                                required
                                            >
                                                <option value="">Selecciona el enfoque</option>
                                                {psychologist?.therapy_approaches?.map((enfoque: string) => (
                                                    <option key={enfoque} value={enfoque}>
                                                        {enfoque}
                                                    </option>
                                                )) || (
                                                    <>
                                                        <option value="Terapia cognitivo-conductual">Terapia cognitivo-conductual</option>
                                                        <option value="Terapia psicodinámica">Terapia psicodinámica</option>
                                                        <option value="Terapia centrada en la persona">Terapia centrada en la persona</option>
                                                        <option value="Terapia de sistemas familiares">Terapia de sistemas familiares</option>
                                                    </>
                                                )}
                                            </select>
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor="insurance" className="block text-sm font-medium text-gray-700">
                                                Seguro Médico
                                            </label>
                                            <select
                                                id="insurance"
                                                value={insurance}
                                                onChange={(e) => setInsurance(e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                            >
                                                <option value="">Sin seguro médico</option>
                                                {psychologist?.insurance_accepted?.map((obra: string) => (
                                                    <option key={obra} value={obra}>
                                                        {obra}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor="modality" className="block text-sm font-medium text-gray-700">
                                                Modalidad <span className="text-red-500">*</span>
                                            </label>
                                            <select
                                                id="modality"
                                                value={modality}
                                                onChange={(e) => setModality(e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                                required
                                            >
                                                <option value="">Selecciona modalidad</option>
                                                {psychologist?.modality === 'Híbrido' ? (
                                                    <>
                                                        <option value="Presencial">Presencial</option>
                                                        <option value="En línea">En línea</option>
                                                    </>
                                                ) : psychologist?.modality ? (
                                                    <option value={psychologist.modality}>{psychologist.modality}</option>
                                                ) : (
                                                    <>
                                                        <option value="Presencial">Presencial</option>
                                                        <option value="En línea">En línea</option>
                                                        <option value="Híbrido">Híbrido</option>
                                                    </>
                                                )}
                                            </select>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-700">Duración de la Sesión</label>
                                            <div className="w-full px-4 py-3 text-gray-600 border border-gray-300 rounded-lg bg-gray-50">
                                                45 minutos
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-700">Precio de la Sesión</label>
                                            <div className="w-full px-4 py-3 text-gray-600 border border-gray-300 rounded-lg bg-gray-50">
                                                ${psychologist.consultation_fee || 50000}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {selectedDate && selectedTime && sessionType && therapyApproach && modality && (
                            <div className="bg-white border rounded-xl shadow-sm">
                                <div className="p-6 sm:p-8">
                                    <h3 className="mb-6 text-lg font-semibold text-gray-900">Confirmar Cita</h3>

                                    <div className="p-6 mb-8 space-y-3 border border-gray-200 rounded-lg bg-gray-50">
                                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                            <div>
                                                <span className="text-sm font-medium text-gray-700">Fecha:</span>
                                                <p className="text-sm text-gray-900">{formatDisplayDate(selectedDate)}</p>
                                            </div>
                                            <div>
                                                <span className="text-sm font-medium text-gray-700">Hora:</span>
                                                <p className="text-sm text-gray-900">{selectedTime}</p>
                                            </div>
                                            <div>
                                                <span className="text-sm font-medium text-gray-700">Tipo de Sesión:</span>
                                                <p className="text-sm text-gray-900">{sessionType}</p>
                                            </div>
                                            <div>
                                                <span className="text-sm font-medium text-gray-700">Modalidad:</span>
                                                <p className="text-sm text-gray-900">{modality}</p>
                                            </div>
                                            <div>
                                                <span className="text-sm font-medium text-gray-700">Enfoque:</span>
                                                <p className="text-sm text-gray-900">{therapyApproach}</p>
                                            </div>
                                            <div>
                                                <span className="text-sm font-medium text-gray-700">Duración:</span>
                                                <p className="text-sm text-gray-900">45 minutos</p>
                                            </div>
                                            {insurance && (
                                                <div>
                                                    <span className="text-sm font-medium text-gray-700">Seguro:</span>
                                                    <p className="text-sm text-gray-900">{insurance}</p>
                                                </div>
                                            )}
                                            <div>
                                                <span className="text-sm font-medium text-gray-700">Precio:</span>
                                                <p className="text-sm font-semibold text-green-600">${psychologist.consultation_fee || 50000}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleSubmitAppointment}
                                        disabled={loading}
                                        className={`w-full font-medium py-4 px-6 rounded-lg transition-all duration-200 ${
                                            loading
                                                ? 'bg-gray-400 cursor-not-allowed'
                                                : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                                        } text-white`}
                                    >
                                        {loading ? (
                                            <div className="flex items-center justify-center gap-2">
                                                <div className="w-4 h-4 border-2 border-white rounded-full animate-spin border-t-transparent"></div>
                                                Enviando...
                                            </div>
                                        ) : (
                                            'Confirmar Cita'
                                        )}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SessionPage;
