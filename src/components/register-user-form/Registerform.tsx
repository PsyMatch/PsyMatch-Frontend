'use client';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Camera, MapPinIcon } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import CustomInput from '@/components/ui/Custom-input';
import CustomPasswordInput from '@/components/ui/Custom-password-input';
import CustomPhoneInput from '@/components/ui/Custom-phone-input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/Avatar';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { envs } from '@/config/envs.config';
import { useNotifications } from '@/hooks/useNotifications';
import { triggerAuthStateChange } from '@/utils/auth';

const RegisterSchema = Yup.object().shape({
    fullName: Yup.string().min(2, 'El nombre debe tener al menos 2 caracteres').required('El nombre completo es requerido'),
    alias: Yup.string().min(2, 'El alias debe tener al menos 2 caracteres'),
    birthDate: Yup.date().max(new Date(), 'La fecha de nacimiento no puede ser futura').required('La fecha de nacimiento es requerida'),
    phone: Yup.string().min(10, 'Número de teléfono demasiado corto').required('El número de teléfono es requerido'),
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
    profileImage: Yup.mixed()
        .nullable()
        .test('fileSize', 'La imagen debe ser menor a 2MB', function (value) {
            if (!value) return true; // Si no hay archivo, está bien
            const file = value as File;
            return file.size <= 2 * 1024 * 1024; // 2MB
        })
        .test('fileType', 'Solo se permiten archivos JPG, PNG o WEBP', function (value) {
            if (!value) return true; // Si no hay archivo, está bien
            const file = value as File;
            const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
            return validTypes.includes(file.type);
        }),
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
    profileImage: File | null;
}

interface MapboxSuggestion {
    id: string;
    place_name: string;
    center: [number, number];
    place_type: string[];
    relevance: number;
    context?: Array<{
        id: string;
        text: string;
        short_code?: string;
    }>;
    properties?: {
        address?: string;
    };
}

export default function RegisterForm() {
    const router = useRouter();
    const notifications = useNotifications();
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [registerError, setRegisterError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [addressSuggestions, setAddressSuggestions] = useState<MapboxSuggestion[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [_selectedCoordinates, setSelectedCoordinates] = useState<{ lat: number; lng: number } | null>(null);
    const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
    const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);
    const addressInputRef = useRef<HTMLInputElement>(null);
    const suggestionsRef = useRef<HTMLDivElement>(null);

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

            if (values.profileImage) {
                formData.append('profile_picture', values.profileImage);
            } else {
                formData.append(
                    'profile_picture',
                    'https://res.cloudinary.com/dibnkd72j/image/upload/v1755495603/default-pacient-profile-picture_kqpobf.webp'
                );
            }

            const response = await fetch(`${envs.next_public_api_url}/auth/signup`, {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                notifications.success('¡Cuenta creada exitosamente! Bienvenido a PsyMatch');

                await handleAutoLogin(values.email, values.password);
            } else {
                setRegisterError(data.message || 'Error al crear la cuenta');
            }
        } catch (_error) {
            setRegisterError('Error de conexión. Intenta nuevamente.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleAutoLogin = async (email: string, password: string) => {
        try {
            const response = await fetch(`${envs.next_public_api_url}/auth/signin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                if (data.token) {
                    Cookies.set('auth_token', data.token);
                }

                if (data.data.role) {
                    Cookies.set('role', data.data.role);
                }

                if (data.data.verified) {
                    Cookies.set('verified', data.data.verified);
                }

                triggerAuthStateChange();

                router.push('/dashboard/user');
            } else {
                notifications.warning('Cuenta creada exitosamente. Por favor inicia sesión.');
                router.push('/login');
            }
        } catch (_error) {
            notifications.warning('Cuenta creada exitosamente. Por favor inicia sesión.');
            router.push('/login');
        }
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, setFieldValue: (field: string, value: File | null) => void) => {
        const file = event.target.files?.[0];

        if (file) {
            setFieldValue('profileImage', file);
            const reader = new FileReader();
            reader.onload = (e) => {
                setProfileImage(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setFieldValue('profileImage', null);
            setProfileImage(null);
        }
    };

    const searchAddresses = async (query: string) => {
        if (query.length < 3) {
            setAddressSuggestions([]);
            setShowSuggestions(false);
            return;
        }

        const MAPBOX_TOKEN = envs.next_public_mapbox_token;
        if (!MAPBOX_TOKEN) {
            return;
        }

        setIsLoadingSuggestions(true);
        try {
            const response = await fetch(
                `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?` +
                    `access_token=${MAPBOX_TOKEN}&` +
                    `country=AR&` +
                    `language=es&` +
                    `limit=8&` +
                    `types=address,poi,place&`
            );

            if (response.ok) {
                const data = await response.json();
                setAddressSuggestions(data.features || []);
                setShowSuggestions(true);
            } else {
                setAddressSuggestions([]);
            }
        } catch (_error) {
            setAddressSuggestions([]);
        } finally {
            setIsLoadingSuggestions(false);
        }
    };

    const selectAddress = async (suggestion: MapboxSuggestion, setFieldValue: (field: string, value: string) => void) => {
        setFieldValue('address', suggestion.place_name);
        setShowSuggestions(false);
        setAddressSuggestions([]);

        setSelectedCoordinates({
            lat: suggestion.center[1],
            lng: suggestion.center[0],
        });
        setSelectedPlaceId(suggestion.id);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                suggestionsRef.current &&
                !suggestionsRef.current.contains(event.target as Node) &&
                !addressInputRef.current?.contains(event.target as Node)
            ) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="w-full max-w-sm space-y-4 sm:max-w-md sm:space-y-6">
            <div className="text-xs font-bold text-center text-gray-600 rounded sm:text-sm">
                ¿Eres un profesional de salud mental?{' '}
                <Link href="/register-professional" className="text-blue-600 hover:underline">
                    Únete a Nuestra Red
                </Link>
            </div>

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
                    profileImage: null,
                }}
                validationSchema={RegisterSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, errors, touched, handleChange, handleBlur, values, setFieldValue }) => (
                    <Form className="space-y-3 sm:space-y-4">
                        {registerError && (
                            <div className="px-3 py-2 text-sm text-red-700 border border-red-200 rounded-md bg-red-50">{registerError}</div>
                        )}

                        <div className="md:grid md:grid-cols-2 md:gap-4">
                            <div className="mt-2 md:col-span-1">
                                <CustomInput
                                    label="Nombre Completo *"
                                    id="fullName"
                                    name="fullName"
                                    placeholder="Nombre Apellido"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.fullName}
                                    error={errors.fullName && touched.fullName && errors.fullName}
                                />
                            </div>

                            <div className="mt-2 md:col-span-1">
                                <CustomInput
                                    label="Alias"
                                    id="alias"
                                    name="alias"
                                    placeholder="Alias"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.alias}
                                    error={errors.alias && touched.alias && errors.alias}
                                />
                            </div>

                            <div className="mt-2 md:col-span-1">
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

                            <div className="mt-2 md:col-span-1">
                                <CustomInput
                                    label="Correo electrónico *"
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="ejemplo@correo.com"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                    error={errors.email && touched.email && errors.email}
                                />
                            </div>

                            <div className="mt-2 md:col-span-1">
                                <CustomInput
                                    label="DNI *"
                                    id="dni"
                                    name="dni"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.dni}
                                    error={errors.dni && touched.dni && errors.dni}
                                    placeholder="12345678"
                                />
                            </div>

                            <div className="mt-2 md:col-span-1">
                                <CustomPhoneInput
                                    label="Número de teléfono *"
                                    id="phone"
                                    name="phone"
                                    placeholder="11 2345-6789"
                                    value={values.phone}
                                    onChange={(phone) => handleChange({ target: { name: 'phone', value: phone } })}
                                    onBlur={() => handleBlur({ target: { name: 'phone' } })}
                                    error={errors.phone && touched.phone && errors.phone}
                                />
                            </div>
                        </div>

                        <div className="mt-2 md:col-span-1">
                            <div className="relative space-y-2">
                                <Label htmlFor="address" className="flex items-center gap-2 text-sm font-medium">
                                    Dirección *
                                </Label>
                                <div ref={addressInputRef}>
                                    <input
                                        id="address"
                                        name="address"
                                        type="text"
                                        placeholder="Av. Corrientes 123, Buenos Aires, Argentina"
                                        value={values.address}
                                        onChange={(e) => {
                                            handleChange(e);
                                            setSelectedCoordinates(null);
                                            setSelectedPlaceId(null);
                                            setTimeout(() => {
                                                if (e.target.value && !selectedPlaceId) {
                                                    searchAddresses(e.target.value);
                                                }
                                            }, 300);
                                        }}
                                        onBlur={handleBlur}
                                        className={`placeholder:text-gray-400 w-full px-3 py-2 text-sm bg-white border rounded-md shadow-sm focus:outline-none focus:ring-1 ${
                                            errors.address && touched.address
                                                ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                                                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                                        }`}
                                        autoComplete="off"
                                    />
                                </div>

                                {showSuggestions && (
                                    <div
                                        ref={suggestionsRef}
                                        className="absolute left-0 right-0 z-50 mt-1 overflow-y-auto bg-white border border-gray-300 rounded-md shadow-lg top-full max-h-60"
                                    >
                                        {isLoadingSuggestions ? (
                                            <div className="flex items-center gap-2 text-sm font-medium">
                                                <div className="w-4 h-4 border-2 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
                                                Buscando direcciones en Argentina...
                                            </div>
                                        ) : addressSuggestions.length > 0 ? (
                                            addressSuggestions.map((suggestion) => (
                                                <button
                                                    key={suggestion.id}
                                                    type="button"
                                                    className="w-full p-3 text-sm text-left transition-colors border-b border-gray-200 hover:bg-gray-50 last:border-b-0"
                                                    onClick={() => selectAddress(suggestion, setFieldValue)}
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <MapPinIcon className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-center gap-2 text-sm">{suggestion.place_name}</div>
                                                        </div>
                                                    </div>
                                                </button>
                                            ))
                                        ) : (
                                            <div className="p-3 text-sm text-center text-gray-600">
                                                No se encontraron direcciones en Argentina. Intente con una búsqueda más específica.
                                            </div>
                                        )}
                                    </div>
                                )}

                                {errors.address && touched.address && <p className="text-sm text-red-600">{errors.address}</p>}
                            </div>
                        </div>

                        <div className="md:grid md:grid-cols-2 md:gap-4">
                            <div className="mt-2 md:col-span-1">
                                <CustomPasswordInput
                                    label="Contraseña"
                                    id="password"
                                    name="password"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password}
                                    error={errors.password && touched.password && errors.password}
                                />
                            </div>

                            <div className="mt-2 md:col-span-1">
                                <CustomPasswordInput
                                    label="Confirmar Contraseña"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.confirmPassword}
                                    error={errors.confirmPassword && touched.confirmPassword && errors.confirmPassword}
                                />
                            </div>

                            <div className="mt-2 md:col-span-1">
                                <CustomPhoneInput
                                    label="Contacto de Emergencia"
                                    id="emergencyContact"
                                    name="emergencyContact"
                                    value={values.emergencyContact}
                                    onChange={(phone) => handleChange({ target: { name: 'emergencyContact', value: phone } })}
                                    onBlur={() => handleBlur({ target: { name: 'emergencyContact' } })}
                                    error={errors.emergencyContact && touched.emergencyContact && errors.emergencyContact}
                                />
                                <p className="mt-1 text-xs text-grey-500">¨* Este número no puede coincidir con el de teléfono principal.</p>
                            </div>

                            <div className="mt-2 md:col-span-1">
                                <div className="space-y-2">
                                    <Label htmlFor="socialWork" className="text-sm font-medium text-gray-700">
                                        Obra Social
                                    </Label>
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
                                        <option value="IOMA">IOMA</option>
                                        <option value="Unión Personal">Union Personal</option>
                                        <option value="PAMI">PAMI</option>
                                        <option value="OSDEPYM">OSDEPYM</option>
                                        <option value="Luis Pasteur">Luis Pasteur</option>
                                        <option value="Jerárquicos Salud">Jerarquicos Salud</option>
                                        <option value="Sancor Salud">Sancor Salud</option>
                                        <option value="OSECAC">Osecac</option>
                                        <option value="OSMECON Salud">OSMECON Salud</option>
                                        <option value="Apross">Apross</option>
                                        <option value="OSPRERA">OSPRERA</option>
                                        <option value="OSPAT">OSPAT</option>
                                        <option value="ASE Nacional">ASE nacional</option>
                                        <option value="OSPIP">OSPIP</option>
                                    </select>
                                    {errors.socialWork && touched.socialWork && <p className="mt-1 text-sm text-red-600">{errors.socialWork}</p>}
                                </div>
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
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleImageUpload(e, setFieldValue)}
                                        className="hidden"
                                        id="profile-upload"
                                    />
                                    <Label
                                        htmlFor="profile-upload"
                                        className="flex justify-center px-3 py-2 text-xs w-24 bg-gray-200 rounded-md cursor-pointer hover:bg-gray-300 sm:px-4 sm:py-2 sm:text-sm"
                                    >
                                        Subir foto
                                    </Label>
                                    <p className="mt-1 text-xs text-gray-500">Máximo 2MB - JPG, PNG o WEBP</p>
                                    {errors.profileImage && touched.profileImage && (
                                        <p className="mt-1 text-sm text-red-600">{errors.profileImage}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col pt-2 space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
                            <Button type="submit" disabled={isSubmitting} className="w-full text-white bg-blue-600 sm:flex-1 hover:bg-blue-700">
                                {isLoading ? 'Creando Cuenta...' : 'Crear Cuenta'}
                            </Button>
                            <Link href="/login">
                                <Button className="w-full text-black bg-white sm:flex-1 hover:text-white hover:bg-neutral-700">Iniciar Sesión</Button>
                            </Link>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
