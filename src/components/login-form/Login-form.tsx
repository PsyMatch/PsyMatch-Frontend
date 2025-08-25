'use client';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import CustomInput from '@/components/ui/Custom-input';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { envs } from '@/config/envs.config';
import { triggerAuthStateChange } from '@/utils/auth';

const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Correo electrónico inválido').required('El correo electrónico es requerido'),
    password: Yup.string().min(8, 'La contraseña debe tener al menos 8 caracteres').required('La contraseña es requerida'),
});

export default function LoginForm() {
    const router = useRouter();
    const [loginError, setLoginError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (values: { email: string; password: string }) => {
        setIsLoading(true);
        setLoginError('');

        try {
            console.log('Enviando petición de login a:', `${envs.next_public_api_url}/auth/signin`);
            const response = await fetch(`${envs.next_public_api_url}/auth/signin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: values.email,
                    password: values.password,
                }),
            });

            console.log('Response status:', response.status);
            console.log('Response ok:', response.ok);

            const data = await response.json();
            console.log('Response data:', data);

            if (response.ok) {
                console.log('Login exitoso:', data);

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

                const traerRole = Cookies.get('role');

                if (traerRole === 'Psicólogo') {
                    router.push('/dashboard/professional');
                }
                if (traerRole === 'Administrador') {
                    router.push('/dashboard/admin');
                }
                if (traerRole === 'Paciente') {
                    router.push('/dashboard/user');
                }
            } else {
                setLoginError(data.message || 'Error al iniciar sesión');
            }
        } catch (error) {
            console.error('Error en login:', error);
            setLoginError('Error de conexión. Intenta nuevamente.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        window.location.replace(`${envs.next_public_api_url}/auth/google`);
    };

    return (
        <div className="w-full max-w-sm space-y-4 sm:max-w-md sm:space-y-6">
            <div className="space-y-2 text-center">
                <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">Bienvenido de Vuelta</h1>
                <p className="text-sm text-gray-600 sm:text-base">Ingresa tus credenciales para acceder a tu cuenta</p>
            </div>

            <Formik initialValues={{ email: '', password: '' }} validationSchema={LoginSchema} onSubmit={handleSubmit}>
                {({ isSubmitting, errors, touched, handleChange, handleBlur, values }) => (
                    <Form className="space-y-3 sm:space-y-4">
                        {loginError && <div className="px-3 py-2 text-sm text-red-700 border border-red-200 rounded-md bg-red-50">{loginError}</div>}

                        <CustomInput
                            label="Correo electrónico"
                            id="email"
                            type="email"
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            error={errors.email && touched.email && errors.email}
                            placeholder="tu@email.com"
                        />

                        <CustomInput
                            label="Contraseña"
                            id="password"
                            type="password"
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                            error={errors.password && touched.password && errors.password}
                            placeholder="Tu contraseña"
                        />

                        <div className="flex flex-col pt-2 space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
                            <Button
                                type="submit"
                                disabled={isSubmitting || isLoading}
                                className="w-full text-white bg-blue-600 sm:flex-1 hover:bg-blue-700 disabled:opacity-50"
                            >
                                {isLoading ? 'Iniciando Sesión...' : 'Iniciar Sesión'}
                            </Button>
                            <Link href="/register-user">
                                <Button className="w-full text-black bg-white sm:flex-1 hover:text-blue-700">Crear Cuenta</Button>
                            </Link>
                        </div>

                        <div className="pt-2">
                            <Button
                                type="button"
                                onClick={handleGoogleLogin}
                                className="flex items-center justify-center w-full gap-2 px-4 py-2 font-medium text-gray-700 transition-all bg-white border border-gray-300 rounded-full shadow-sm hover:bg-gray-100"
                                style={{ minHeight: 44 }}
                            >
                                <svg width="22" height="22" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_17_40)">
                                        <path
                                            d="M47.532 24.552c0-1.636-.146-3.2-.418-4.704H24.48v9.02h13.02c-.56 3.02-2.24 5.58-4.76 7.3v6.06h7.7c4.5-4.14 7.09-10.24 7.09-17.68z"
                                            fill="#4285F4"
                                        />
                                        <path
                                            d="M24.48 48c6.48 0 11.92-2.14 15.89-5.82l-7.7-6.06c-2.14 1.44-4.88 2.3-8.19 2.3-6.3 0-11.64-4.26-13.56-9.98H2.6v6.24C6.56 43.98 14.7 48 24.48 48z"
                                            fill="#34A853"
                                        />
                                        <path
                                            d="M10.92 28.44c-.5-1.44-.8-2.98-.8-4.44s.3-3 .8-4.44v-6.24H2.6A23.97 23.97 0 000 24c0 3.98.96 7.76 2.6 11.24l8.32-6.8z"
                                            fill="#FBBC05"
                                        />
                                        <path
                                            d="M24.48 9.52c3.54 0 6.68 1.22 9.16 3.62l6.86-6.86C36.4 2.14 30.96 0 24.48 0 14.7 0 6.56 4.02 2.6 10.76l8.32 6.24c1.92-5.72 7.26-9.98 13.56-9.98z"
                                            fill="#EA4335"
                                        />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_17_40">
                                            <rect width="48" height="48" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                                <span className="text-base">Continuar con Google</span>
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>

            <div className="text-xs text-center text-gray-600 sm:text-sm">
                ¿Eres un profesional de salud mental?{' '}
                <Link href="/register-professional" className="text-blue-600 hover:underline">
                    Únete a Nuestra Red
                </Link>
            </div>
        </div>
    );
}
