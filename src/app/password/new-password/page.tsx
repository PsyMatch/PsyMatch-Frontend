'use client';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import { useState, Suspense } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { toast } from 'react-toastify';
import { useRouter, useSearchParams } from 'next/navigation';
import CustomPasswordInput from '@/components/ui/Custom-password-input';

const ChangePasswordForm = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams?.get('token');

    const [boton, setBoton] = useState(false);

    return (
        <div className="flex flex-col items-center min-h-screen gap-4 pt-16 bg-gradient-to-br from-blue-50 to-indigo-100">
            <Formik
                initialValues={{ newPassword: '', confirmPassword: '' }}
                validate={(values) => {
                    const errors: { newPassword?: string; confirmPassword?: string } = {};
                    if (!values.newPassword) {
                        errors.newPassword = 'Requerido';
                    }
                    if (!values.confirmPassword) {
                        errors.confirmPassword = 'Requerido';
                    } else if (values.newPassword !== values.confirmPassword) {
                        errors.confirmPassword = 'Las contraseñas no coinciden';
                    }
                    return errors;
                }}
                onSubmit={async (values, { setSubmitting }) => {
                    try {
                        setBoton(true);
                        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                token: token,
                                newPassword: values.newPassword,
                            }),
                        });

                        const response = await res.json();

                        if (res.ok) {
                            toast.success(`${response.message}`, {
                                position: 'top-center',
                                type: 'success',
                                isLoading: false,
                                autoClose: 2500,
                                closeOnClick: true,
                                draggable: true,
                            });

                            setTimeout(() => {
                                router.push('/login');
                            }, 3300);
                        } else {
                            toast.error(`${response.message || 'Error al cambiar la contraseña'}`, {
                                position: 'top-center',
                                type: 'error',
                                autoClose: 3000,
                                closeOnClick: true,
                                draggable: true,
                            });
                        }
                    } catch (err) {
                        toast.error('Error de conexión. Inténtalo de nuevo.', {
                            position: 'top-center',
                            type: 'error',
                            autoClose: 3000,
                            closeOnClick: true,
                            draggable: true,
                        });
                    } finally {
                        setSubmitting(false);
                        setBoton(false);
                    }
                }}
            >
                {({ isSubmitting, handleChange, handleBlur, values, errors, touched }) => (
                    <Form className="flex flex-col items-center h-56 w-[30%]">
                        <h1 className="text-[26px] font-bold mb-5">Crea una nueva contraseña</h1>
                        <div className="w-full mt-2">
                            <CustomPasswordInput
                                label="Nueva contraseña"
                                id="newPassword"
                                name="newPassword"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.newPassword}
                                error={errors.newPassword && touched.newPassword && errors.newPassword}
                            />
                        </div>
                        <div className="w-full my-2">
                            <CustomPasswordInput
                                label="Confirmar contraseña"
                                id="confirmPassword"
                                name="confirmPassword"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.confirmPassword}
                                error={errors.confirmPassword && touched.confirmPassword && errors.confirmPassword}
                            />
                        </div>
                        <span className="my-2 text-xs text-center">Una vez hecho el cambio te redirigiremos a iniciar sesión</span>
                        <div className="flex flex-col pt-2 space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
                            <Button
                                type="submit"
                                className="w-full text-white bg-blue-600 sm:flex-1 hover:bg-blue-700 disabled:opacity-50"
                                disabled={isSubmitting}
                            >
                                Guardar nueva contraseña
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

const ChangePassword = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ChangePasswordForm />
        </Suspense>
    );
};

export default ChangePassword;
