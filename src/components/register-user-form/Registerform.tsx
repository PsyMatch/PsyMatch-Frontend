'use client';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Camera } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import CustomInput from '@/components/ui/Custom-input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/Avatar';
import Link from 'next/link';
import Cookies from 'js-cookie';

const RegisterSchema = Yup.object().shape({
    fullName: Yup.string().min(2, 'El nombre debe tener al menos 2 caracteres').required('El nombre completo es requerido'),
    alias: Yup.string().min(2, 'El alias debe tener al menos 2 caracteres').required('El alias es requerido'),
    birthDate: Yup.date().max(new Date(), 'La fecha de nacimiento no puede ser futura').required('La fecha de nacimiento es requerida'),
    phone: Yup.string()
        .matches(/^[0-9+\-\s()]+$/, 'Número de teléfono inválido')
        .required('El número de teléfono es requerido'),
    email: Yup.string().email('Correo electrónico inválido').required('El correo electrónico es requerido'),
    password: Yup.string()
        .min(8, 'La contraseña debe tener al menos 8 caracteres')
        .matches(/(?=.*[a-z])/, 'Debe contener al menos una letra minúscula')
        .matches(/(?=.*[A-Z])/, 'Debe contener al menos una letra mayúscula')
        .matches(/(?=.*\d)/, 'Debe contener al menos un número')
        .required('La contraseña es requerida'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Las contraseñas no coinciden')
        .required('Confirmar contraseña es requerido'),
    dni: Yup.string()
        .matches(/^\d{7,9}$/, 'DNI inválido')
        .required('El DNI es requerido'),
    address: Yup.string().min(5, 'La dirección debe tener al menos 5 caracteres').required('La dirección es requerida'),
    emergencyContact: Yup.string()
        .matches(/^[0-9+\-\s()]+$/, 'Número de contacto inválido')
        .test('different-from-phone', 'El contacto de emergencia debe ser diferente al número de teléfono', function (value) {
            const { phone } = this.parent;
            if (!value || !phone) return true;
            return value !== phone;
        }),
    socialWork: Yup.string().nullable(),
});

export interface RegisterFormValues {
    fullName: string;
    alias: string;
    birthDate: string;
    phone: string;
    email: string;
    password: string;
    confirmPassword: string;
    dni: string;
    address: string;
    socialWork: string;
    emergencyContact: string;
}

export default function RegisterForm() {
    const router = useRouter();
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
    const [registerError, setRegisterError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (values: RegisterFormValues) => {
        setIsLoading(true);
        setRegisterError('');

        try {
            const formData = new FormData();

            formData.append('name', values.fullName);
            formData.append('alias', values.alias);

            if (values.birthDate) {
                const birthdateISO = new Date(values.birthDate).toISOString();
                formData.append('birthdate', birthdateISO);
            }

            formData.append('phone', values.phone);
            formData.append('email', values.email);
            formData.append('password', values.password);
            formData.append('confirmPassword', values.confirmPassword);
            formData.append('dni', values.dni);
            formData.append('address', values.address);

            if (values.socialWork) {
                formData.append('health_insurance', values.socialWork);
            }

            if (values.emergencyContact) {
                formData.append('emergency_contact', values.emergencyContact);
            }

            // El backend maneja la foto de perfil de dos maneras:
            // 1. Como archivo (usando FileInterceptor) - cuando se sube un archivo
            // 2. Como string en el DTO - cuando no se sube archivo
            if (profileImageFile) {
                formData.append('profile_picture', profileImageFile);
            } else {
                // Si no hay archivo, enviamos una URL por defecto como string
                formData.append(
                    'profile_picture',
                    'https://res.cloudinary.com/dibnkd72j/image/upload/v1755031810/default-profile-picture_lzshvt.webp'
                );
            }

            const response = await fetch('http://localhost:3000/auth/signup', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                router.push('/login');
                alert('Registro exitoso. Por favor inicia sesión.');
            } else {
                setRegisterError(data.message || 'Error al crear la cuenta');
            }

            if (data.data.role) {
                Cookies.set('role', data.data.role);
            }

            const traerRole = Cookies.get('role');

            // Redirigir según el tipo de usuario
            if (traerRole === 'Psicólogo') {
                router.push('/dashboard/professional');
            }
            if (traerRole === 'Administrador') {
                router.push('/dashboard/admin');
            } else {
                router.push('/dashboard/user');
            }
        } catch (error) {
            console.error('Error en registro:', error);
            setRegisterError('Error de conexión. Intenta nuevamente.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setProfileImageFile(file);
            const reader = new FileReader();
            reader.onload = (e) => {
                setProfileImage(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="w-full max-w-sm space-y-4 sm:max-w-md sm:space-y-6">
            <div className="space-y-2 text-center">
                <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">Comenzar</h1>
                <p className="text-sm text-gray-600 sm:text-base">Únete a miles de usuarios que han encontrado a su terapeuta ideal</p>
            </div>

            <Formik
                initialValues={{
                    fullName: '',
                    alias: '',
                    birthDate: '',
                    phone: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                    dni: '',
                    address: '',
                    socialWork: '',
                    emergencyContact: '',
                }}
                validationSchema={RegisterSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, errors, touched, handleChange, handleBlur, values }) => (
                    <Form className="space-y-3 sm:space-y-4">
                        {registerError && (
                            <div className="px-3 py-2 text-sm text-red-700 border border-red-200 rounded-md bg-red-50">{registerError}</div>
                        )}

                        <div className="md:grid md:grid-cols-2 md:gap-4">
                            <div className="md:col-span-1">
                                <CustomInput
                                    label="Nombre Completo *"
                                    id="fullName"
                                    name="fullName"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.fullName}
                                    error={errors.fullName && touched.fullName && errors.fullName}
                                />
                            </div>

                            <div className="md:col-span-1">
                                <CustomInput
                                    label="Alias"
                                    id="alias"
                                    name="alias"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.alias}
                                    error={errors.alias && touched.alias && errors.alias}
                                />
                            </div>

                            <div className="md:col-span-1">
                                <CustomInput
                                    label="Fecha de Nacimiento *"
                                    id="birthDate"
                                    type="date"
                                    name="birthDate"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.birthDate}
                                    error={errors.birthDate && touched.birthDate && errors.birthDate}
                                />
                            </div>

                            <div className="md:col-span-1">
                                <CustomInput
                                    label="Correo electrónico *"
                                    id="email"
                                    type="email"
                                    name="email"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                    error={errors.email && touched.email && errors.email}
                                />
                            </div>

                            <div className="md:col-span-1">
                                <CustomInput
                                    label="DNI *"
                                    id="dni"
                                    name="dni"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.dni}
                                    error={errors.dni && touched.dni && errors.dni}
                                    placeholder="Ej: 12345678"
                                />
                            </div>

                            <div className="md:col-span-1">
                                <CustomInput
                                    label="Número de teléfono *"
                                    id="phone"
                                    type="tel"
                                    name="phone"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.phone}
                                    error={errors.phone && touched.phone && errors.phone}
                                />
                            </div>

                            <div className="md:col-span-1">
                                <CustomInput
                                    label="Dirección *"
                                    id="address"
                                    name="address"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.address}
                                    error={errors.address && touched.address && errors.address}
                                    placeholder="Calle, número, ciudad"
                                />
                            </div>

                            <div className="space-y-1">
                                <Label htmlFor="socialWork">Obra Social</Label>
                                <select
                                    id="socialWork"
                                    name="socialWork"
                                    value={values.socialWork}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="w-full px-2 py-3 text-sm bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                >
                                    <option value="">Selecciona tu obra social (opcional)</option>
                                    <option value="OSDE">OSDE</option>
                                    <option value="Swiss Medical">Swiss Medical</option>
                                    <option value="Galeno">Galeno</option>
                                    <option value="Medicus">Medicus</option>
                                    <option value="PAMI">PAMI</option>
                                    <option value="Unión-personal">Unión-personal</option>
                                    <option value="Osdepy">Osdepy</option>
                                    <option value="Luis-pasteur">Luis-pasteur</option>
                                    <option value="Jerarquicos-salud">Jerarquicos-salud</option>
                                    <option value="Osecac">Osecac</option>
                                    <option value="Apross">Apross</option>
                                    <option value="Osprera">Osprera</option>
                                    <option value="Ospat">Ospat</option>
                                    <option value="Ase-nacional">Ase-nacional</option>
                                    <option value="Ospsip">Ospsip</option>
                                </select>
                                {errors.socialWork && touched.socialWork && <p className="mt-1 text-sm text-red-600">{errors.socialWork}</p>}
                            </div>

                            <div className="md:col-span-1">
                                <CustomInput
                                    label="Contraseña"
                                    id="password"
                                    type="password"
                                    name="password"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password}
                                    error={errors.password && touched.password && errors.password}
                                />
                            </div>

                            <div className="md:col-span-1">
                                <CustomInput
                                    label="Confirmar Contraseña"
                                    id="confirmPassword"
                                    type="password"
                                    name="confirmPassword"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.confirmPassword}
                                    error={errors.confirmPassword && touched.confirmPassword && errors.confirmPassword}
                                />
                            </div>

                            <div className="md:col-span-1">
                                <CustomInput
                                    label="Contacto de Emergencia"
                                    id="emergencyContact"
                                    type="tel"
                                    name="emergencyContact"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.emergencyContact}
                                    error={errors.emergencyContact && touched.emergencyContact && errors.emergencyContact}
                                />
                                <p className="mt-1 text-xs text-grey-500">¨* Este número no puede coincidir con el de teléfono principal.</p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-700">Foto de Perfil</Label>
                            <div className="flex items-center space-x-4">
                                <Avatar className="w-12 h-12 sm:w-16 sm:h-16">
                                    {profileImage ? (
                                        <AvatarImage src={profileImage} />
                                    ) : (
                                        <AvatarFallback className="bg-gray-200">
                                            <Camera className="w-4 h-4 text-gray-400 sm:w-6 sm:h-6" />
                                        </AvatarFallback>
                                    )}
                                </Avatar>
                                <div>
                                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="profile-upload" />
                                    <Label
                                        htmlFor="profile-upload"
                                        className="px-3 py-2 text-xs bg-gray-200 rounded-md cursor-pointer hover:bg-gray-300 sm:px-4 sm:py-2 sm:text-sm"
                                    >
                                        Subir foto
                                    </Label>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col pt-2 space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
                            <Button type="submit" disabled={isSubmitting} className="w-full text-white bg-blue-600 sm:flex-1 hover:bg-blue-700">
                                {isLoading ? 'Creando Cuenta...' : 'Crear Cuenta'}
                            </Button>
                            <Link href="/login">
                                <Button className="w-full text-black bg-white sm:flex-1 hover:text-blue-700">Iniciar Sesión</Button>
                            </Link>
                        </div>
                    </Form>
                )}
            </Formik>

            <div className="text-xs text-center text-gray-600 sm:text-sm">
                ¿Eres un profesional de salud mental?{' '}
                <Link href="/professional/register" className="text-blue-600 hover:underline">
                    Únete a Nuestra Red
                </Link>
            </div>
        </div>
    );
}
