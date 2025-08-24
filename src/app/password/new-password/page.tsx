"use client"
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { useState } from "react";
import Cookies from "js-cookie";
import { ErrorMessage, Field, Form, Formik } from "formik";


const ChangePassword = () => {
    const token = Cookies.get('authToken');


    return (
        <div className="flex flex-col items-center min-h-screen gap-4 pt-16 bg-gradient-to-br from-blue-50 to-indigo-100">
            <Formik
                initialValues={{ newPassword: '', confirmPassword: '' }}
                validate={values => {
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
                    try{   
                        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password/:token`, {
                            method: 'POST',
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                token: token,
                                newPassword: values.newPassword
                            })
                        });

                        const response = await res.text();
                        console.log("Respuesta", response)
                    }catch(err){
                        console.log("Error", err)
                    }finally {
                        setSubmitting(false);
                    }
                }}
            >
                {({ isSubmitting }) => (
                    <Form className="flex flex-col items-center h-56 w-[30%]">
                        <h1 className="text-[26px] font-bold mb-5">Crea una nueva contraseña</h1>
                        <div className="flex flex-col w-full mb-2">
                            <label htmlFor="newPassword">Nueva contraseña</label>
                            <Field
                                as={Input}
                                name="newPassword"
                                type="password"
                                id="newPassword"
                                className="h-8 mb-4"
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
                                className="h-8 mb-4"
                                placeholder="confirmar nueva contraseña"
                            />
                            <ErrorMessage name="confirmPassword" component="div" className="text-xs text-red-500" />
                        </div>
                        <span className="text-xs text-center">Una vez hecho el cambio te redirigiremos a iniciar sesión</span>
                        <Button type="submit" className="mt-2 text-black w-fit bg-violet-300" disabled={isSubmitting}>
                            Guardar nueva contraseña
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default ChangePassword;