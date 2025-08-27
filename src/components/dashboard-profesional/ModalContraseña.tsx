'use client';
import { useModalContext } from '@/context/modalContraseña';
import { ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ErrorMessage, Form, Formik } from 'formik';
import { X } from 'lucide-react';
import Button from '../ui/button';
import Cookies from 'js-cookie';
import { useNotifications } from '@/hooks/useNotifications';
import { useState } from 'react';
import CustomPasswordInput from '../ui/Custom-password-input';
import * as Yup from "yup";

const ModalContraseña = () => {
    const { cerrarModal } = useModalContext();
    const notifications = useNotifications();
    const token = Cookies.get('authToken') || Cookies.get('auth_token');
    const [_disabled, setDisabled] = useState(false);


    const changePasswordSchema = Yup.object().shape({
    newPassword: Yup.string()
        .required("La nueva contraseña es obligatoria")
        .min(6, "La contraseña debe tener al menos 6 caracteres")
        .matches(/[A-Z]/, "Debe contener al menos una letra mayúscula")
        .matches(/[a-z]/, "Debe contener al menos una letra minúscula")
        .matches(/[0-9]/, "Debe contener al menos un número")
        .matches(/[!@#$%^&*(),.?":{}|<>_\-]/, "Debe contener al menos un signo o caracter especial"),
        
    confirmPassword: Yup.string()
        .required("La confirmación es obligatoria")
        .oneOf([Yup.ref("newPassword")], "Las contraseñas no coinciden"),
    });

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
                    validationSchema={changePasswordSchema}
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

                            // Obtener respuesta para verificar el éxito
                            await res.text();
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
                    {({ isSubmitting, handleChange, values }) => (
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
                                <CustomPasswordInput
                                    label="Nueva contraseña *"
                                    name="newPassword"
                                    id="newPassword"
                                    onChange={handleChange}
                                    value={values.newPassword}
                                    className="flex w-full h-10 px-3 py-2 text-base bg-white border border-gray-300 rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 md:text-sm"
                                />
                                <ErrorMessage name="newPassword" component="div" className="text-xs text-red-500" />
                            </div>
                            <div className="flex flex-col w-full mb-2">
                                <CustomPasswordInput
                                    label="Confirmar nueva contraseña *"
                                    name="confirmPassword"
                                    id="confirmPassword"
                                    onChange={handleChange}
                                    value={values.confirmPassword}
                                    className="flex w-full h-10 px-3 py-2 text-base bg-white border border-gray-300 rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 md:text-sm"
                                />
                                <ErrorMessage name="confirmPassword" component="div" className="text-xs text-red-500" />
                            </div>
                            <Button type="submit" className="mt-2 text-black w-fit bg-violet-300"  disabled={isSubmitting || _disabled}>
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
