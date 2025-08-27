'use client';
import { ErrorMessage, Field, Form, Formik, FormikHelpers, useFormikContext } from 'formik';
import Image from 'next/image';
import * as Yup from 'yup';
import { User, Upload } from 'lucide-react';
import { useBotonesRegisterContext } from '@/context/botonesRegisterContext';
import { useEffect, useState } from 'react';
import { AutoSaveCookies, dataToSave, getCookieObject, saveMerged } from '@/helpers/formRegister/helpers';

import CustomPasswordInput from '@/components/ui/Custom-password-input';
import { envs } from '@/config/envs.config';
import DniField from '@/components/register-professional-validation/DniField';
import PhoneField from '@/components/register-professional-validation/PhoneField';
import EmailField from '@/components/register-professional-validation/EmailField';

const PersonalInformation = () => {
    const { avanzarPaso } = useBotonesRegisterContext();

    const [profileImage, setProfileImage] = useState<string | null>(null);

    interface PersonalInformationFormValues {
        name: string;
        email: string;
        phone: string;
        password: string;
        confirmPassword: string;
        birthdate: string;
        dni: string;
        profile_picture?: File | null;
        personal_biography: string;
        languages: string[];
        license_number: string;
        professional_title: string;
        professional_experience: string;
        office_address: string;
    }

    const [initialValues, setInitialValues] = useState<PersonalInformationFormValues>({
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
    });

    useEffect(() => {
        if (initialValues.name === '' && initialValues.email === '') {
            const cookieData = getCookieObject();
            if (cookieData) {
                try {
                    setInitialValues({
                        name: cookieData.name || '',
                        email: cookieData.email || '',
                        phone: cookieData.phone || '',
                        password: cookieData.password || '',
                        confirmPassword: cookieData.confirmPassword || '',
                        birthdate: cookieData.birthdate || '',
                        dni: cookieData.dni || '',
                        profile_picture: null,
                        personal_biography: cookieData.personal_biography,
                        languages: cookieData.languages,
                        license_number: cookieData.license_number,
                        professional_title: cookieData.professional_title,
                        professional_experience: cookieData.professional_experience,
                        office_address: cookieData.office_address,
                    });
                } catch (error) {
                    console.error(error);
                }
            }
        }
    }, [initialValues.email, initialValues.name]);

    const today = new Date();
    const haceDieciochoAños = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());

    const validationSchema = Yup.object({
        name: Yup.string().required('El nombre es obligatorio'),
        email: Yup.string().email('Correo inválido').required('El correo es obligatorio'),
        // phone: Yup.string()
        //     .required('El número es obligatorio'),
        password: Yup.string()
            .min(8, 'La contraseña debe tener al menos 8 caracteres')
            .matches(/(?=.*[a-z])/, 'Debe contener al menos una letra minúscula')
            .matches(/(?=.*[A-Z])/, 'Debe contener al menos una letra mayúscula')
            .matches(/(?=.*\d)/, 'Debe contener al menos un número')
            .required('La contraseña es requerida'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Las contraseñas deben coincidir')
            .required('Confirmar contraseña es obligatorio'),
        birthdate: Yup.date()
            .required('La fecha de nacimiento es obligatoria')
            .max(haceDieciochoAños, 'Debes ser mayor de 18 años')
            .typeError('Debe ser una fecha válida'),
        dni: Yup.string()
            .required('El DNI es obligatorio')
            .matches(/^\d{7,8}$/, 'El DNI debe tener entre 7 y 8 números'),
        profile_picture: Yup.mixed()
            .nullable()
            // .required("La foto de perfil es obligatoria")
            // .test("fileType", "Solo se permiten imágenes", (value) => {
            //     return value instanceof File; // Verifica que sea un archivo
            // })
            .test('fileSize', 'El archivo debe pesar menos de 2 MB', (value) => {
                if (!value) return true; // Si no hay archivo, está bien
                return value instanceof File && value.size <= 2 * 1024 * 1024;
            }),
    });

    interface PersonalInformationFormValues {
        name: string;
        email: string;
        phone: string;
        birthdate: string;
        password: string;
        confirmPassword: string;
        dni: string;
        profile_picture?: File | null;
    }

    interface ValidateFormValues {
        field: 'email' | 'phone' | 'dni' | 'license_number';
        emailValue?: string;
        phoneValue?: string;
        dniValue?: string | number;
        licenseValue?: string | number;
    }

    const handleValidate = async (values: ValidateFormValues) => {
        const errors: Partial<Record<'email' | 'phone' | 'dni' | 'license_number', string>> = {};

        try {
            const response = await fetch(`${envs.next_public_api_url}/users/validate-unique`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values),
            });

            if (response.status === 409) {
                // conflicto, por ejemplo email ya registrado
                errors.email = 'El correo ya está registrado';
                errors.phone = 'El telefono ya está registrado';
                errors.dni = 'El dni ya está registrado';
            }
        } catch (error) {
            console.error('Validation error:', error);
            if (values.field === 'email') errors.email = 'Error de conexión con el servidor';
            if (values.field === 'phone') errors.phone = 'Error de conexión con el servidor';
            if (values.field === 'dni') errors.dni = 'Error de conexión con el servidor';
            if (values.field === 'license_number') errors.license_number = 'Error de conexión con el servidor';
        }

        return errors;
    };

    const handleSubmit = async (
        values: PersonalInformationFormValues,
        { setErrors, setSubmitting }: FormikHelpers<PersonalInformationFormValues>
    ) => {
        const errors: Record<string, string> = {};

        const emailErrors = await handleValidate({ field: 'email', emailValue: values.email });
        if (emailErrors.email) errors.email = emailErrors.email;

        const phoneErrors = await handleValidate({ field: 'phone', phoneValue: values.phone });
        if (phoneErrors.phone) errors.phone = phoneErrors.phone;

        const dniErrors = await handleValidate({ field: 'dni', dniValue: values.dni });
        if (dniErrors.dni) errors.dni = dniErrors.dni;

        if (Object.keys(errors).length > 0) {
            setErrors(errors); // bloquea el submit
            setSubmitting(false);
            return;
        }

        // Guardar datos
        saveMerged(dataToSave(values as unknown as Record<string, unknown>));
        avanzarPaso();
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, setFieldValue: (field: string, value: File | null) => void) => {
        const file = event.target.files?.[0];

        if (file) {
            setFieldValue('profile_picture', file);
            const reader = new FileReader();
            reader.onload = (e) => {
                setProfileImage(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setFieldValue('profile_picture', null);
            setProfileImage(null);
        }
    };

    const ProfilePictureField = () => {
        const { setFieldValue, errors, touched } = useFormikContext<PersonalInformationFormValues>();

        return (
            <div>
                <label htmlFor="profile_picture" className="text-sm font-medium text-gray-700">
                    Foto de perfil profesional *
                </label>
                <div className="flex items-center mt-2 space-x-4">
                    {profileImage && (
                        <div className="relative w-[120px] h-[120px] border border-gray-300 rounded-full overflow-hidden">
                            <Image src={profileImage} alt="Preview" fill sizes="120px" className="object-cover" />
                        </div>
                    )}
                    <div>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, setFieldValue)}
                            className="hidden"
                            id="profile_picture"
                        />
                        <label
                            htmlFor="profile_picture"
                            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white transition rounded-lg cursor-pointer bg-violet-600 hover:bg-violet-700"
                        >
                            <Upload className="w-4 h-4 mr-2" />
                            Subir Foto
                        </label>
                        <p className="mt-1 text-xs text-gray-500">Máximo 2MB - JPG, PNG o WEBP</p>
                    </div>
                </div>
                {touched.profile_picture && errors.profile_picture && <p className="mt-1 text-sm text-red-500">{errors.profile_picture}</p>}
            </div>
        );
    };

    return (
        <div className="text-gray-900 bg-white shadow-sm ">
            <div className="flex flex-col space-y-1.5 py-6">
                <div className="flex items-center text-[#5046E7] text-2xl font-semibold leading-none tracking-tight">
                    <User className="w-5 h-5 mr-2" />
                    Información Personal
                </div>
                <div className="text-sm text-gray-500">Cuéntanos sobre ti</div>
            </div>

            <div className="pb-6 space-y-6">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    enableReinitialize
                >
                    {({ handleChange, values, isValid, isSubmitting, handleBlur, errors, touched, setFieldValue }) => {
                        return (
                            <Form className="space-y-6">
                                <AutoSaveCookies />
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div>
                                        <label className="text-sm font-medium text-gray-700" htmlFor="name">
                                            Nombre Completo *
                                        </label>
                                        <Field
                                            name="name"
                                            id="name"
                                            className="flex w-full h-10 px-3 py-2 text-base bg-white border border-gray-300 rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 md:text-sm"
                                        />
                                        <ErrorMessage name="name" component="div" className="mt-1 text-sm text-red-500" />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-700" htmlFor="birthdate">
                                            Fecha de nacimiento *
                                        </label>
                                        <Field
                                            name="birthdate"
                                            type="date"
                                            id="birthdate"
                                            className="flex w-full h-10 px-3 py-2 text-base bg-white border border-gray-300 rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 md:text-sm"
                                        />
                                        <ErrorMessage name="birthdate" component="div" className="mt-1 text-sm text-red-500" />
                                    </div>
                                </div>

                                {/* Email y Teléfono */}
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div>
                                        <EmailField />
                                    </div>

                                    <div>
                                        <PhoneField />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div>
                                        <DniField />
                                    </div>
                                </div>

                                {/* Contraseñas */}
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div>
                                        <CustomPasswordInput
                                            onChange={handleChange}
                                            label="Contraseña *"
                                            name="password"
                                            id="password"
                                            value={values.password}
                                            className="flex w-full h-10 px-3 py-2 text-base bg-white border border-gray-300 rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 md:text-sm"
                                        />
                                        <ErrorMessage name="password" component="div" className="mt-1 text-sm text-red-500" />
                                    </div>
                                    <div>
                                        <CustomPasswordInput
                                            label="Confirmar Contraseña *"
                                            name="confirmPassword"
                                            id="confirmPassword"
                                            onChange={handleChange}
                                            value={values.confirmPassword}
                                            className="flex w-full h-10 px-3 py-2 text-base bg-white border border-gray-300 rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 md:text-sm"
                                        />
                                        <ErrorMessage name="confirmPassword" component="div" className="mt-1 text-sm text-red-500" />
                                    </div>
                                </div>

                                {/* Subidas de imágenes */}
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <ProfilePictureField />
                                </div>
                                <button
                                    type="submit"
                                    className="px-4 py-1 mt-10 text-white rounded-xl bg-violet-600 disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={isSubmitting}
                                >
                                    Continuar
                                </button>
                            </Form>
                        );
                    }}
                </Formik>
            </div>
        </div>
    );
};

export default PersonalInformation;
