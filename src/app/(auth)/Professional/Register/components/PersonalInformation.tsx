'use client';

import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { User, Mail, Phone, Camera, Upload } from 'lucide-react';
import Cookies from "js-cookie";
import { useBotonesRegisterContext } from '@/context/botonesRegisterContext';
import { useEffect, useState } from 'react';

const PersonalInformation = () => {
    const {avanzarPaso} = useBotonesRegisterContext()

    const [initialValues, setInitialValues] = useState({
        name: "",
        email: '',
        phone: '',
        contraseña: "",
        confirmarContraseña: "",
        dateOfBirth: '',
        profilePhoto: null,
        frontIDCard: null,
        reverseIDCard: null,
    });

  useEffect(() => {
    const cookieData = Cookies.get("userDataPaso1");
    if (cookieData) {
      try {
        const parsed = JSON.parse(cookieData);
        setInitialValues({
            name: parsed.name || "",
            email: parsed.email || "",
            phone: parsed.phone|| '',
            contraseña: parsed.contraseña || "",
            confirmarContraseña: parsed.confirmarContraseña || "",
            dateOfBirth: parsed.dateOfBirth || '',
            profilePhoto: parsed.profilePhoto || null,
            frontIDCard: parsed.frontIDCard ||  null,
            reverseIDCard: parsed.reverseIDCard || null,
        });
      } catch {
      }
    }
  }, []);

    const validationSchema = Yup.object({
        name: Yup.string().required('El nombre es obligatorio'),
        email: Yup.string().email('Correo inválido').required('El correo es obligatorio'),
        phone: Yup.string()
            .required('El número es obligatorio')
            .matches(/^\d{2}\s?\d{4}\s?\d{4}$/, 'El número debe tener 10 dígitos, puede incluir espacios'),
        contraseña: Yup.string().required('La contraseña es obligatoria'),
        confirmarContraseña: Yup.string()
            .oneOf([Yup.ref('contraseña'), undefined], 'Las contraseñas deben coincidir')
            .required('Confirmar contraseña es obligatorio'),
        dateOfBirth: Yup.date().required('La fecha de nacimiento es obligatoria').nullable(),
        profilePhoto: Yup.mixed().required('La foto de perfil es obligatoria'),
        frontIDCard: Yup.mixed().required('El frente del DNI es obligatorio'),
        reverseIDCard: Yup.mixed().required('El reverso del DNI es obligatorio'),
    });

    interface PersonalInformationFormValues {
        name: string;
        email: string;
        phone: string;
        dateOfBirth: string;
        profilePhoto: File | null;
        frontIDCard: File | null;
        reverseIDCard: File | null;
    }

    const handleSubmit = (values: PersonalInformationFormValues) => {


        Cookies.set("userDataPaso1", JSON.stringify(values));

        const savedData = Cookies.get("userDataPaso1");
            if (savedData) {
            const parsedData = JSON.parse(savedData);
            console.log(parsedData);
        }

        avanzarPaso()
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
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} enableReinitialize >
                    {({ setFieldValue, isSubmitting }) => (
                        <Form className="space-y-6">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <label className="text-sm font-medium leading-none" htmlFor="name">
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
                                    <label className="text-sm font-medium leading-none" htmlFor="dateOfBirth">
                                        Fecha de nacimiento *
                                    </label>
                                    <Field
                                        name="dateOfBirth"
                                        type="date"
                                        id="dateOfBirth"
                                        className="flex w-full h-10 px-3 py-2 text-base bg-white border border-gray-300 rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 md:text-sm"
                                    />
                                    <ErrorMessage name="dateOfBirth" component="div" className="mt-1 text-sm text-red-500" />
                                </div>
                            </div>

                            {/* Email y Teléfono */}
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <label className="text-sm font-medium leading-none" htmlFor="email">
                                        Correo Electrónico *
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute w-4 h-4 text-gray-400 left-3 top-3" />
                                        <Field
                                            name="email"
                                            type="email"
                                            id="email"
                                            className="flex w-full h-10 px-3 py-2 pl-10 text-base bg-white border border-gray-300 rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 md:text-sm"
                                        />
                                    </div>
                                    <ErrorMessage name="email" component="div" className="mt-1 text-sm text-red-500" />
                                </div>
                                <div>
                                    <label className="text-sm font-medium leading-none" htmlFor="phone">
                                        Número de Teléfono *
                                    </label>
                                    <div className="relative">
                                        <Phone className="absolute w-4 h-4 text-gray-400 left-3 top-3" />
                                        <Field
                                            name="phone"
                                            type="tel"
                                            id="phone"
                                            className="flex w-full h-10 px-3 py-2 pl-10 text-base bg-white border border-gray-300 rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 md:text-sm"
                                        />
                                    </div>
                                    <ErrorMessage name="phone" component="div" className="mt-1 text-sm text-red-500" />
                                </div>
                            </div>

                            {/* Contraseñas */}
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <label className="text-sm font-medium leading-none" htmlFor="contraseña">
                                        Contraseña *
                                    </label>
                                    <Field
                                        name="contraseña"
                                        id="contraseña"
                                        className="flex w-full h-10 px-3 py-2 text-base bg-white border border-gray-300 rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 md:text-sm"
                                    />
                                    <ErrorMessage name="contraseña" component="div" className="mt-1 text-sm text-red-500" />
                                </div>
                                <div>
                                    <label className="text-sm font-medium leading-none" htmlFor="confirmarContraseña">
                                        Confirmar Contraseña *
                                    </label>
                                    <Field
                                        name="confirmarContraseña"
                                        id="confirmarContraseña"
                                        className="flex w-full h-10 px-3 py-2 text-base bg-white border border-gray-300 rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 md:text-sm"
                                    />
                                    <ErrorMessage name="confirmarContraseña" component="div" className="mt-1 text-sm text-red-500" />
                                </div>
                            </div>

                            {/* Subidas de imágenes */}
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                {[
                                    { id: 'frontIDCard', label: 'Frente del DNI *' },
                                    { id: 'reverseIDCard', label: 'Reverso del DNI *' },
                                    { id: 'profilePhoto', label: 'Foto de perfil profesional *' },
                                ].map((item) => (
                                    <div key={item.id}>
                                        <label className="text-sm font-medium leading-none" htmlFor={item.id}>
                                            {item.label}
                                        </label>
                                        <div className="flex items-center mt-2 space-x-4">
                                            <div className="flex items-center justify-center w-20 h-20 bg-gray-200 rounded-md">
                                                <Camera className="w-8 h-8 text-gray-400" />
                                            </div>
                                            <div>
                                                <input
                                                    id={item.id}
                                                    accept="image/*"
                                                    className="hidden"
                                                    type="file"
                                                    onChange={(event) => {
                                                        const files = event.target.files;
                                                        setFieldValue(item.id, files && files[0] ? files[0] : null);
                                                    }}
                                                />
                                                <label
                                                    htmlFor={item.id}
                                                    className="inline-flex items-center h-10 gap-2 px-4 py-2 text-sm font-medium bg-white border border-gray-300 rounded-md cursor-pointer hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                >
                                                    <Upload className="w-4 h-4" />
                                                    Subir Foto
                                                </label>
                                                <p className="mt-1 text-sm text-gray-500">JPG, PNG hasta 5MB</p>
                                                <ErrorMessage name={item.id} component="div" className="mt-1 text-sm text-red-500" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button type="submit" className="px-4 py-1 mt-10 rounded-xl bg-violet-600">Continuar</button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default PersonalInformation;
