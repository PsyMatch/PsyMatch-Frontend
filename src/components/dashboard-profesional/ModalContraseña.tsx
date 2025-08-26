'use client';
import { useModalContext } from '@/context/modalContraseña';
import { ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { X } from 'lucide-react';
import Button from '../ui/button';
import Cookies from 'js-cookie';
import Input from '../ui/input';
import { useNotifications } from '@/hooks/useNotifications';
import { useEffect, useState } from 'react';

const ModalContraseña = () => {
    const { cerrarModal } = useModalContext();
    const notifications = useNotifications();
    const token = Cookies.get('authToken') || Cookies.get('auth_token');
    const [disabled, setDisabled] = useState(false);

    useEffect(() => {
        const unlockTime = localStorage.getItem('buttonUnlockTime');
        if (unlockTime && Date.now() < parseInt(unlockTime)) {
            setDisabled(true);
            const timeout = setTimeout(() => setDisabled(false), parseInt(unlockTime) - Date.now());
            return () => clearTimeout(timeout);
        }
    }, []);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="p-6 text-center bg-white shadow-xl rounded-2xl w-96 h-fit">
                <div className="flex flex-row items-center justify-between mb-4">
                    <h2 className="text-xl font-bold">Cambiar contraseña</h2>
                    <button onClick={cerrarModal}>
                        <X />
                    </button>
                </div>

                <Formik
                    initialValues={{ newPassword: '', confirmPassword: '' }}
                    validate={(values) => {
                        const errors: { newPassword?: string; confirmPassword?: string } = {};
                        if (!values.newPassword) {
                            errors.newPassword = 'Campo requerido';
                        }
                        if (!values.confirmPassword) {
                            errors.confirmPassword = 'Campo requerido';
                        } else if (values.newPassword !== values.confirmPassword) {
                            errors.confirmPassword = 'Las contraseñas no coinciden';
                        }
                        return errors;
                    }}
                    onSubmit={async (values, { setSubmitting }) => {
                        try {
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

                            const response = await res.text();
                            setDisabled(true);

                            notifications.success('Contraseña cambiada correctamente');

                            setTimeout(() => {
                                cerrarModal();
                            }, 2200);
                        } catch {
                            // Error al cambiar contraseña
                        } finally {
                            setSubmitting(false);
                        }
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form className="flex flex-col items-center w-full">
                            <ToastContainer
                                position="top-center"
                                autoClose={5000}
                                hideProgressBar={false}
                                newestOnTop={false}
                                closeOnClick={false}
                                rtl={false}
                                pauseOnFocusLoss
                                draggable
                                pauseOnHover
                                theme="light"
                                transition={Bounce}
                            />
                            <div className="flex flex-col w-full mb-2">
                                <label htmlFor="newPassword">Nueva contraseña</label>
                                <Field
                                    as={Input}
                                    name="newPassword"
                                    type="password"
                                    id="newPassword"
                                    className="h-8 mb-4 placeholder:text-gray-400"
                                    placeholder="nueva contraseña"
                                />
                                <ErrorMessage name="newPassword" component="div" className="text-xs text-red-500" />
                            </div>
                            <div className="flex flex-col w-full mb-2">
                                <label htmlFor="confirmPassword">Confirmar nueva contraseña</label>
                                <Field
                                    as={Input}
                                    name="confirmPassword"
                                    type="password"
                                    id="confirmPassword"
                                    className="h-8 mb-4 placeholder:text-gray-400"
                                    placeholder="confirmar nueva contraseña"
                                />
                                <ErrorMessage name="confirmPassword" component="div" className="text-xs text-red-500" />
                            </div>
                            <Button type="submit" className="mt-2 text-black w-fit bg-violet-300" disabled={isSubmitting}>
                                Guardar nueva contraseña
                            </Button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default ModalContraseña;
