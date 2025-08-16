'use client';
import { initialValuesTipos, validationSchema, Valores } from '@/helpers/formRegister/register-profesional';
import { Formik, Form, ErrorMessage } from 'formik';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { dataToSave, getCookieObject, saveMerged } from '@/helpers/formRegister/helpers';
import { useFotoDePerfil } from '@/context/fotoDePerfil';
import { useAuthProfessionalContext } from '@/context/registerProfessional';
import { ToastContainer, toast, Bounce } from 'react-toastify';

const modalidades = [
    "Presencial",
    "En línea",
    "Híbrido"
];

const especialidades = [
    "Trastorno de ansiedad",
    "Terapia de pareja",
    "Trastorno de la alimentación",
    "Trastorno bipolar",
    "Transiciones de vida",
    "Terapia infantil y adolescente",
    "Trastornos del sueño",
    "Depresión",
    "Terapia familiar",
    "TDAH",
    "TOC",
    "Orientación profesional",
    "Psicología geriátrica",
    "Manejo de la ira",
    "Trauma y TEPT",
    "Adicción y abuso de sustancias",
    "Trastorno del espectro autista",
    "Duelo y pérdida",
    "LGBTQIA",
    "Manejo del dolor crónico"
];

const enfoquesTerapia = [
    "Terapia cognitivo-conductual",
    "Terapia de aceptación y compromiso",
    "Terapia psicodinámica",
    "Terapia de sistemas familiares",
    "Terapia breve centrada en soluciones",
    "Terapia de juego",
    "Terapia dialéctico-conductual",
    "Desensibilización y reprocesamiento por movimientos oculares",
    "Terapia centrada en la persona",
    "Terapia basada en la atención plena",
    "Terapia Gestalt",
    "Terapia de arte",
    "Terapia de grupo"
];
const tiposTerapia = [
    "Individual",
    "Pareja",
    "Familiar",
    "Grupo"
];

const disponibilidad = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo"
];

const obrasSociales = [
    "OSDE",
    "Swiss Medical",
    "IOMA",
    "PAMI",
    "Unión Personal",
    "OSDEPYM",
    "Luis Pasteur",
    "Jerárquicos Salud",
    "Sancor Salud",
    "OSECAC",
    "OSMECON Salud",
    "Apross",
    "OSPRERA",
    "OSPAT",
    "ASE Nacional",
    "OSPIP"
];


const Services_Prices = () => {
    const router = useRouter();

    const { profileImageFile } = useFotoDePerfil();
    const {saveUserData} = useAuthProfessionalContext();

    const [initialValues, setInitialValues] = useState<typeof initialValuesTipos>({
        specialities: [],
        therapy_approaches: [],
        session_types: [],
        modality: '',
        insurance_accepted: [],
        availability: [],
    });

    useEffect(() => {
        const cookieData = getCookieObject();
        if (cookieData) {
            try {
                setInitialValues({
                    specialities: cookieData.specialities || [],
                    therapy_approaches: cookieData.therapy_approaches || [],
                    session_types: cookieData.session_types || [],
                    modality: cookieData.modality || '',
                    insurance_accepted: cookieData.insurance_accepted || [],
                    availability: cookieData.availability || [],
                });
            } catch (error) {
                console.error(error);
            }
        }
    }, []);

    const handleSubmit = async (values: Valores) => {
        const toSave = dataToSave(values as unknown as Record<string, unknown>);
        console.log('Guardando en cookie (submit):', toSave);
        saveMerged(toSave);
        console.log(Cookies.get('userDataCompleta'));

        const fullData = getCookieObject();

        const toastId = toast.loading("Enviando datos...", {
            position: "top-center",
            theme: "dark",
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
                    formData.append(key, String(value));
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

            const response = await fetch('http://localhost:8080/auth/signup/psychologist', {
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
                // Guardar token en localStorage si viene en la respuesta
                if (data.token) {
                    localStorage.setItem('authToken', data.token);
                    Cookies.set('authToken', data.token);
                }

                
                saveUserData(data);
                
                if (data.role) {
                    Cookies.set("role", data.role, { path: '/' });
                }

                // Redirigir según el tipo de usuario
                if (data.rol === 'Psicólogo') {
                    router.push('/dashboard/professional')
                } if(data.rol === 'Administrador') {
                    router.push('/dashboard/admin')
                } else {
                    router.push('/dashboard/user')
                }
            }

            toast.update(toastId, {
                render: "Registrado con éxito!",
                type: "success",
                isLoading: false,
                autoClose: 3000,
                closeOnClick: true,
                draggable: true,
            });
            Cookies.remove('userDataCompleta');
 
            router.push('/');
        } catch (error:any) {
            console.error('Error:', error);
            toast.update(toastId, {
            render: error.message || "Error al registrar!",
            type: "error",
            isLoading: false,
            autoClose: 3000,
            closeOnClick: true,
            draggable: true,
            });
        }
    };

    return (
        <>
            <ToastContainer/>
            <div className="flex flex-col space-y-1.5 py-6 mb-3">
                <div className="flex items-center text-[#5046E7] text-2xl font-semibold leading-none tracking-tight">Servicios y Especialidades</div>
                <div className="text-sm text-gray-500">¿Qué servicios ofreces y cuáles son tus áreas de especialización?</div>
            </div>

            <Formik enableReinitialize initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
                {({ values, setFieldValue }) => (
                    <Form>
                        <div className="font-bold">Especialidades * (Selecciona al menos 3)</div>
                        <ErrorMessage name="specialities" component="div" className="mt-1 text-sm text-red-600" />
                        <div className="grid grid-cols-3 gap-5 mt-5">
                            {especialidades.map((option) => (
                                <label key={option} className="text-[12px]">
                                    <input
                                        type="checkbox"
                                        name="specialities"
                                        value={option}
                                        checked={values.specialities.includes(option)}
                                        onChange={() => {
                                            if (values.specialities.includes(option)) {
                                                // SACAR OPCION SI ESTA SELECCIONADA
                                                setFieldValue(
                                                    'specialities',
                                                    values.specialities.filter((item) => item !== option)
                                                );
                                            } else {
                                                // AGREGAR LA OPCION
                                                setFieldValue('specialities', [...values.specialities, option]);
                                            }
                                        }}
                                    />
                                    {option}
                                </label>
                            ))}
                        </div>

                        <div className="mt-10 font-bold">Enfoques terapéutico * (Selecciona al menos 2)</div>
                        <ErrorMessage name="therapy_approaches" component="div" className="mt-1 text-sm text-red-600" />
                        <div className="grid grid-cols-3 gap-5 mt-5">
                            {enfoquesTerapia.map((enfoque) => (
                                <label key={enfoque} className="text-[12px]">
                                    <input
                                        type="checkbox"
                                        name="therapy_approaches"
                                        value={enfoque}
                                        checked={values.therapy_approaches.includes(enfoque)}
                                        onChange={() => {
                                            if (values.therapy_approaches.includes(enfoque)) {
                                                // SACAR OPCION SI ESTA SELECCIONADA
                                                setFieldValue(
                                                    'therapy_approaches',
                                                    values.therapy_approaches.filter((item) => item !== enfoque)
                                                );
                                            } else {
                                                // AGREGAR LA OPCION
                                                setFieldValue('therapy_approaches', [...values.therapy_approaches, enfoque]);
                                            }
                                        }}
                                    />
                                    {enfoque}
                                </label>
                            ))}
                        </div>

                        <div className="mt-10 font-bold">Tipos de sesión ofrecidos *</div>
                        <ErrorMessage name="session_types" component="div" className="mt-1 text-sm text-red-600" />
                        <div className="grid grid-cols-3 gap-5 mt-5">
                            {tiposTerapia.map((tipo) => (
                                <label key={tipo} className="text-[12px]">
                                    <input
                                        type="checkbox"
                                        name="session_type"
                                        value={tipo}
                                        checked={values.session_types.includes(tipo)}
                                        onChange={() => {
                                            if (values.session_types.includes(tipo)) {
                                                // SACAR OPCION SI ESTA SELECCIONADA
                                                setFieldValue(
                                                    'session_types',
                                                    values.session_types.filter((item) => item !== tipo)
                                                );
                                            } else {
                                                // AGREGAR LA OPCION
                                                setFieldValue('session_types', [...values.session_types, tipo]);
                                            }
                                        }}
                                    />
                                    {tipo}
                                </label>
                            ))}
                        </div>

                        <div className="mt-10 font-bold">Modalidad del Servicio *</div>
                        <ErrorMessage name="modality" component="div" className="mt-1 text-sm text-red-600" />
                        <div className="grid grid-cols-3 gap-5 mt-5 mb-10">
                            {modalidades.map((modalidad) => (
                                <label key={modalidad} className="text-[12px]">
                                    <input
                                        type="radio"
                                        name="modality"
                                        value={modalidad}
                                        checked={values.modality === modalidad}
                                        onChange={() => setFieldValue('modality', modalidad)}
                                    />
                                    {modalidad}
                                </label>
                            ))}
                        </div>

                        <div className="mb-4 font-bold ">Obras sociales Aceptadas *</div>
                        <div className="grid grid-cols-3 gap-5">
                            {obrasSociales.map((obra) => (
                                <label key={obra} className="text-[12px]">
                                    <input
                                        type="checkbox"
                                        name="insurance_accepted"
                                        value={obra}
                                        checked={values.insurance_accepted.includes(obra)}
                                        onChange={() => {
                                            if (values.insurance_accepted.includes(obra)) {
                                                // SACAR OPCION SI ESTA SELECCIONADA
                                                setFieldValue(
                                                    'insurance_accepted',
                                                    values.insurance_accepted.filter((item) => item !== obra)
                                                );
                                            } else {
                                                // AGREGAR LA OPCION
                                                setFieldValue('insurance_accepted', [...values.insurance_accepted, obra]);
                                            }
                                        }}
                                    />
                                    {obra}
                                </label>
                            ))}
                        </div>

                        <div className="mt-10 font-bold ">Días de la semana Disponibles *</div>
                        <ErrorMessage name="availability" component="div" className="mt-1 text-sm text-red-600" />
                        <div className="grid grid-cols-3 gap-5 mt-5">
                            {disponibilidad.map((dia) => (
                                <label key={dia} className="text-[12px]">
                                    <input
                                        type="checkbox"
                                        name="availability"
                                        value={dia}
                                        checked={values.availability.includes(dia)}
                                        onChange={() => {
                                            if (values.availability.includes(dia)) {
                                                // SACAR OPCION SI ESTA SELECCIONADA
                                                setFieldValue(
                                                    'availability',
                                                    values.availability.filter((item) => item !== dia)
                                                );
                                            } else {
                                                // AGREGAR LA OPCION
                                                setFieldValue('availability', [...values.availability, dia]);
                                            }
                                        }}
                                    />
                                    {dia}
                                </label>
                            ))}
                        </div>

                        <button type="submit" className="px-4 py-1 mt-10 rounded-xl bg-violet-600">
                            Enviar
                        </button>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default Services_Prices;
