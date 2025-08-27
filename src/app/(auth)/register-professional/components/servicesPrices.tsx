'use client';
import { initialValuesTipos, validationSchema, Valores } from '@/helpers/formRegister/register-profesional';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { dataToSave, getCookieObject } from '@/helpers/formRegister/helpers';
import { useFotoDePerfil } from '@/context/fotoDePerfil';
import { useAuthProfessionalContext } from '@/context/registerProfessional';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNotifications } from '@/hooks/useNotifications';
import { envs } from '@/config/envs.config';
import { triggerAuthStateChange } from '@/utils/auth';

const modalidades = ['Presencial', 'En línea', 'Híbrido'];

const especialidades = [
    'Trastorno de ansiedad',
    'Terapia de pareja',
    'Trastorno de la alimentación',
    'Trastorno bipolar',
    'Transiciones de vida',
    'Terapia infantil y adolescente',
    'Trastornos del sueño',
    'Depresión',
    'Terapia familiar',
    'TDAH',
    'TOC',
    'Orientación profesional',
    'Psicología geriátrica',
    'Manejo de la ira',
    'Trauma y TEPT',
    'Adicción y abuso de sustancias',
    'Trastorno del espectro autista',
    'Duelo y pérdida',
    'LGBTQIA',
    'Manejo del dolor crónico',
];

const enfoquesTerapia = [
    'Terapia cognitivo-conductual',
    'Terapia de aceptación y compromiso',
    'Terapia psicodinámica',
    'Terapia de sistemas familiares',
    'Terapia breve centrada en soluciones',
    'Terapia de juego',
    'Terapia dialéctico-conductual',
    'Desensibilización y reprocesamiento por movimientos oculares',
    'Terapia centrada en la persona',
    'Terapia basada en la atención plena',
    'Terapia Gestalt',
    'Terapia de arte',
    'Terapia de grupo',
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
    'OSMECON Salud',
    'Apross',
    'OSPRERA',
    'OSPAT',
    'ASE Nacional',
    'OSPIP',
    'Ninguna',
];

const getInitialValues = (): typeof initialValuesTipos => {
    const cookieData = getCookieObject();
    return cookieData
        ? {
              name: cookieData.name || '',
              email: cookieData.email || '',
              phone: cookieData.phone || '',
              password: cookieData.password || '',
              confirmPassword: cookieData.confirmPassword || '',
              birthdate: cookieData.birthdate || '',
              dni: cookieData.dni || '',
              profile_picture: null,
              personal_biography: cookieData.personal_biography || '',
              languages: cookieData.languages || [],
              license_number: cookieData.license_number || '',
              professional_title: cookieData.professional_title || '',
              professional_experience: cookieData.professional_experience || 0,
              office_address: cookieData.office_address || '',

              specialities: cookieData.specialities || [],
              therapy_approaches: cookieData.therapy_approaches || [],
              session_types: cookieData.session_types || [],
              modality: cookieData.modality || '',
              insurance_accepted: cookieData.insurance_accepted || [],
              availability: cookieData.availability || [],
              consultation_fee: cookieData.consultation_fee || 0,
          }
        : {
              name: '',
              email: '',
              phone: '',
              password: '',
              confirmPassword: '',
              birthdate: '',
              dni: '',
              profile_picture: null,
              personal_biography: '',
              languages: [],
              license_number: '',
              professional_title: '',
              professional_experience: '',
              office_address: '',

              specialities: [],
              therapy_approaches: [],
              session_types: [],
              modality: '',
              insurance_accepted: [],
              availability: [],
              consultation_fee: 0,
          };
};

const saveMerged = (newValues: Record<string, unknown>) => {
    const existing = getCookieObject() || {};
    const merged = { ...existing, ...newValues };
    Cookies.set('userDataCompleta', JSON.stringify(merged), { path: '/' });
};

const Services_Prices = () => {
    const router = useRouter();
    const notifications = useNotifications();

    const { profileImageFile } = useFotoDePerfil();
    const { saveUserData } = useAuthProfessionalContext();

    const [initialValues] = useState<typeof initialValuesTipos>(getInitialValues);

    const handleSubmit = async (values: Valores) => {
        const toSave = dataToSave(values as unknown as Record<string, unknown>);
        saveMerged(toSave);

        const fullData = getCookieObject();

        const toastId = toast.loading('Enviando datos...', {
            position: 'top-center',
            theme: 'dark',
            closeOnClick: false,
            draggable: false,
        });

        try {
            const formData = new FormData();

            // Agregar los datos normales (excluyendo la imagen y la modalidad)
            Object.entries(fullData).forEach(([key, value]) => {
                // Saltear modality aquí porque la manejamos por separado
                if (key === 'modality') return;

                // Para arrays podés hacer:
                if (Array.isArray(value)) {
                    value.forEach((item) => formData.append(`${key}[]`, item));
                } else {
                    // Para consultation_fee, mantener como número si es numérico
                    if (key === 'consultation_fee' && typeof value === 'number') {
                        formData.append(key, value.toString());
                    } else {
                        formData.append(key, String(value));
                    }
                }
            });

            // Agregar la modalidad solo si tiene un valor válido
            if (values.modality && values.modality !== '') {
                formData.append('modality', values.modality);
            }

            // Agregar la imagen solo si está
            if (profileImageFile) {
                formData.append('profile_picture', profileImageFile);
            }
            const response = await fetch(`${envs.next_public_api_url}/auth/signup/psychologist`, {
                method: 'POST',
                // headers: { 'Content-Type': 'application/json' },
                body: formData,
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }

            const data = await response.json();

            if (response.ok) {
                // Guardar token en cookies si viene en la respuesta
                if (data.token) {
                    Cookies.set('auth_token', data.token);
                }

                saveUserData(data);

                if (data.data.role) {
                    Cookies.set('role', data.data.role, { path: '/' });
                    Cookies.set('role', data.data.role, { path: '/' });
                }

                if (data.data.verified) {
                    Cookies.set('verified', data.data.verified, { path: '/' });
                }

                // Disparar evento para actualizar la Navbar
                triggerAuthStateChange();
            }

            // Dismiss loading toast
            toast.dismiss(toastId);
            notifications.success('Registrado con éxito!');
            Cookies.remove('userDataCompleta');

            const rol = Cookies.get('role');

            // Redirigir según el tipo de usuario
            if (rol === 'Psicólogo') {
                router.push('/dashboard/professional');
            }
            if (rol === 'Administrador') {
                router.push('/dashboard/admin');
            } else {
                router.push('/dashboard/user');
            }
        } catch (error: unknown) {
            console.error('Error:', error);
            const errorMessage = error instanceof Error ? error.message : 'Error al registrar!';
            // Dismiss loading toast
            toast.dismiss(toastId);
            notifications.error(errorMessage);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="flex flex-col space-y-1.5 py-6 mb-3">
                <div className="flex items-center text-[#5046E7] text-2xl font-semibold leading-none tracking-tight">Servicios y Especialidades</div>
                <div className="text-sm text-gray-500">¿Qué servicios ofreces y cuáles son tus áreas de especialización?</div>
            </div>

            <Formik enableReinitialize initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
                {({ values, setFieldValue, handleChange }) => (
                    <Form>
                        <div className="text-sm font-medium text-gray-700">Especialidades * (Selecciona al menos 3)</div>
                        <ErrorMessage name="specialities" component="div" className="mt-1 text-sm text-red-600" />
                        <div className="grid grid-cols-3 gap-5 mt-5">
                            {especialidades.map((option) => (
                                <label key={option} className="text-[12px]">
                                    <input
                                        type="checkbox"
                                        name="specialities"
                                        className="mb-1 mr-1 border-gray-600"
                                        value={option}
                                        checked={values.specialities.includes(option)}
                                        onChange={() => {
                                            let newSpecialities;
                                            if (values.specialities.includes(option)) {
                                                // SACAR OPCION SI ESTA SELECCIONADA
                                                newSpecialities = values.specialities.filter((item) => item !== option);
                                            } else {
                                                // AGREGAR LA OPCION
                                                newSpecialities = [...values.specialities, option];
                                            }

                                            // actualizar Formik
                                            setFieldValue('specialities', newSpecialities);

                                            // actualizar cookie
                                            saveMerged({ specialities: newSpecialities });
                                        }}
                                    />
                                    {option}
                                </label>
                            ))}
                        </div>

                        <div className="mt-12 text-sm font-medium text-gray-700">Enfoques terapéutico * (Selecciona al menos 2)</div>
                        <ErrorMessage name="therapy_approaches" component="div" className="mt-1 text-sm text-red-600" />
                        <div className="grid grid-cols-2 gap-5 mt-5">
                            {enfoquesTerapia.map((enfoque) => (
                                <label key={enfoque} className="text-[12px]">
                                    <input
                                        type="checkbox"
                                        name="therapy_approaches"
                                        value={enfoque}
                                        className="mb-1 mr-1 border-gray-600"
                                        checked={values.therapy_approaches.includes(enfoque)}
                                        onChange={() => {
                                            let newTherapyApproaches;
                                            if (values.therapy_approaches.includes(enfoque)) {
                                                // SACAR OPCION SI ESTA SELECCIONADA
                                                newTherapyApproaches = values.therapy_approaches.filter((item) => item !== enfoque);
                                            } else {
                                                // AGREGAR LA OPCION
                                                newTherapyApproaches = [...values.therapy_approaches, enfoque];
                                            }

                                            // actualizar Formik
                                            setFieldValue('therapy_approaches', newTherapyApproaches);

                                            // actualizar cookie
                                            saveMerged({ therapy_approaches: newTherapyApproaches });
                                        }}
                                    />
                                    {enfoque}
                                </label>
                            ))}
                        </div>

                        <div className="mt-12 text-sm font-medium text-gray-700">Tipos de sesión ofrecidos *</div>
                        <ErrorMessage name="session_types" component="div" className="mt-1 text-sm text-red-600" />
                        <div className="grid grid-cols-3 gap-5 mt-5">
                            {tiposTerapia.map((tipo) => (
                                <label key={tipo} className="text-[12px]">
                                    <input
                                        type="checkbox"
                                        name="session_type"
                                        value={tipo}
                                        className="mb-1 mr-1 border-gray-600"
                                        checked={values.session_types.includes(tipo)}
                                        onChange={() => {
                                            let newSessionTypes;
                                            if (values.session_types.includes(tipo)) {
                                                // SACAR OPCION SI ESTA SELECCIONADA
                                                newSessionTypes = values.session_types.filter((item) => item !== tipo);
                                            } else {
                                                // AGREGAR LA OPCION
                                                newSessionTypes = [...values.session_types, tipo];
                                            }

                                            // actualizar Formik
                                            setFieldValue('session_types', newSessionTypes);

                                            // actualizar cookie
                                            saveMerged({ session_types: newSessionTypes });
                                        }}
                                    />
                                    {tipo}
                                </label>
                            ))}
                        </div>

                        <div className="mt-12">
                            <label className="text-sm font-medium text-gray-700" htmlFor="consultation_fee">
                                Precio de tus Sesiones *
                            </label>
                            <Field
                                name="consultation_fee"
                                type="number"
                                id="consultation_fee"
                                className="flex w-full h-10 px-3 py-2 text-base bg-white border border-gray-300 rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 md:text-sm"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    handleChange(e); // actualiza Formik
                                    saveMerged({ [e.target.name]: e.target.value }); // actualiza cookie con la clave correcta
                                }}
                            />
                            <ErrorMessage name="consultation_fee" component="div" className="mt-1 text-sm text-red-500" />
                        </div>

                        <div className="mt-12 text-sm font-medium text-gray-700">Modalidad del Servicio *</div>
                        <ErrorMessage name="modality" component="div" className="mt-1 text-sm text-red-600" />
                        <span className="text-xs">En caso de ofrecer atención tanto presencial como en línea, seleccione la opción Híbrido.</span>
                        <div className="grid grid-cols-3 gap-5 mt-5 mb-10">
                            {modalidades.map((modalidad) => (
                                <label key={modalidad} className="text-[12px] font-bold">
                                    <input
                                        type="radio"
                                        name="modality"
                                        className="mb-1 mr-1 border-gray-600"
                                        value={modalidad}
                                        checked={values.modality === modalidad}
                                        onChange={() => {
                                            // actualizar Formik
                                            setFieldValue('modality', modalidad);

                                            // actualizar cookie
                                            saveMerged({ modality: modalidad });
                                        }}
                                    />
                                    {modalidad}
                                </label>
                            ))}
                        </div>

                        <div className="mb-3 text-sm font-medium text-gray-700">Obras sociales Aceptadas *</div>
                        <div className="grid grid-cols-3 gap-5">
                            {obrasSociales.map((obra) => (
                                <label key={obra} className="text-[12px]">
                                    <input
                                        type="checkbox"
                                        name="insurance_accepted"
                                        className="mb-1 mr-1 border-gray-600"
                                        value={obra}
                                        checked={values.insurance_accepted.includes(obra)}
                                        onChange={() => {
                                            let newInsuranceAccepted;
                                            if (values.insurance_accepted.includes(obra)) {
                                                // SACAR OPCION SI ESTA SELECCIONADA
                                                newInsuranceAccepted = values.insurance_accepted.filter((item) => item !== obra);
                                            } else {
                                                // AGREGAR LA OPCION
                                                newInsuranceAccepted = [...values.insurance_accepted, obra];
                                            }

                                            // actualizar Formik
                                            setFieldValue('insurance_accepted', newInsuranceAccepted);

                                            // actualizar cookie
                                            saveMerged({ insurance_accepted: newInsuranceAccepted });
                                        }}
                                    />
                                    {obra}
                                </label>
                            ))}
                        </div>

                        <div className="mt-12 text-sm font-medium text-gray-700">Días de la semana Disponibles *</div>
                        <ErrorMessage name="availability" component="div" className="mt-1 text-sm text-red-600" />
                        <div className="grid grid-cols-3 gap-5 mt-5">
                            {disponibilidad.map((dia) => (
                                <label key={dia} className="text-[12px]">
                                    <input
                                        type="checkbox"
                                        name="availability"
                                        className="mb-1 mr-1 border-gray-600"
                                        value={dia}
                                        checked={values.availability.includes(dia)}
                                        onChange={() => {
                                            let newAvailability;
                                            if (values.availability.includes(dia)) {
                                                // SACAR OPCION SI ESTA SELECCIONADA
                                                newAvailability = values.availability.filter((item) => item !== dia);
                                            } else {
                                                // AGREGAR LA OPCION
                                                newAvailability = [...values.availability, dia];
                                            }

                                            // actualizar Formik
                                            setFieldValue('availability', newAvailability);

                                            // actualizar cookie
                                            saveMerged({ availability: newAvailability });
                                        }}
                                    />
                                    {dia}
                                </label>
                            ))}
                        </div>

                        <button type="submit" className="px-4 py-1 mt-10 text-white rounded-xl bg-violet-600">
                            Enviar
                        </button>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default Services_Prices;
