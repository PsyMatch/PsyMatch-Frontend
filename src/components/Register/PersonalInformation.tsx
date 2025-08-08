'use client';

import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { User, Mail, Phone, Camera, Upload } from 'lucide-react';

const PersonalInformation = () => {
    const initialValues = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        profilePhoto: null,
        frontIDCard: null,
        reverseIDCard: null,
    };

    const validationSchema = Yup.object({
        firstName: Yup.string().required('El nombre es obligatorio'),
        lastName: Yup.string().required('El apellido es obligatorio'),
        email: Yup.string().email('Correo inválido').required('El correo es obligatorio'),
        phone: Yup.string().required('El número es obligatorio'),
        dateOfBirth: Yup.date().required('La fecha de nacimiento es obligatoria').nullable(),
        profilePhoto: Yup.mixed().required('La foto de perfil es obligatoria'),
        frontIDCard: Yup.mixed().required('El frente del DNI es obligatorio'),
        reverseIDCard: Yup.mixed().required('El reverso del DNI es obligatorio'),
    });

    interface PersonalInformationFormValues {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        dateOfBirth: string;
        profilePhoto: File | null;
        frontIDCard: File | null;
        reverseIDCard: File | null;
    }

    const handleSubmit = (values: PersonalInformationFormValues) => {
        console.log(values);
    };

    return (
        <div className=" bg-white text-gray-900 shadow-sm">
            <div className="flex flex-col space-y-1.5 py-6">
                <div className="text-2xl font-semibold leading-none tracking-tight flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Información Personal
                </div>
                <div className="text-sm text-gray-500">Cuéntanos sobre ti</div>
            </div>

            <div className="pb-6 space-y-6">
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                    {({ setFieldValue, isSubmitting }) => (
                        <Form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium leading-none" htmlFor="name">
                                        Nombre Completo *
                                    </label>
                                    <Field
                                        name="name"
                                        id="name"
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 md:text-sm"
                                    />
                                    <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                                </div>
                                <div>
                                    <label className="text-sm font-medium leading-none" htmlFor="lastName">
                                        Fecha de nacimiento *
                                    </label>
                                    <Field
                                        name="dateOfBirth"
                                        type="date"
                                        id="dateOfBirth"
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 md:text-sm"
                                    />
                                    <ErrorMessage name="dateOfBirth" component="div" className="text-red-500 text-sm mt-1" />
                                </div>
                            </div>

                            {/* Email y Teléfono */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium leading-none" htmlFor="email">
                                        Correo Electrónico *
                                    </label>
                                    <div className="relative">
                                        <Mail className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                                        <Field
                                            name="email"
                                            type="email"
                                            id="email"
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 pl-10 text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 md:text-sm"
                                        />
                                    </div>
                                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                                </div>
                                <div>
                                    <label className="text-sm font-medium leading-none" htmlFor="phone">
                                        Número de Teléfono *
                                    </label>
                                    <div className="relative">
                                        <Phone className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                                        <Field
                                            name="phone"
                                            type="tel"
                                            id="phone"
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 pl-10 text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 md:text-sm"
                                        />
                                    </div>
                                    <ErrorMessage name="phone" component="div" className="text-red-500 text-sm mt-1" />
                                </div>
                            </div>

                            {/* Contraseñas */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium leading-none" htmlFor="contraseña">
                                        Contraseña *
                                    </label>
                                    <Field
                                        name="contraseña"
                                        id="contraseña"
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 md:text-sm"
                                    />
                                    <ErrorMessage name="contraseña" component="div" className="text-red-500 text-sm mt-1" />
                                </div>
                                <div>
                                    <label className="text-sm font-medium leading-none" htmlFor="confirmarContraseña">
                                        Confirmar Contraseña *
                                    </label>
                                    <Field
                                        name="confirmarContraseña"
                                        id="confirmarContraseña"
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 md:text-sm"
                                    />
                                    <ErrorMessage name="confirmarContraseña" component="div" className="text-red-500 text-sm mt-1" />
                                </div>
                            </div>

                            {/* Subidas de imágenes */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    { id: 'frontIDCard', label: 'Frente del DNI *' },
                                    { id: 'reverseIDCard', label: 'Reverso del DNI *' },
                                    { id: 'profilePhoto', label: 'Foto de perfil profesional *' },
                                ].map((item) => (
                                    <div key={item.id}>
                                        <label className="text-sm font-medium leading-none" htmlFor={item.id}>
                                            {item.label}
                                        </label>
                                        <div className="mt-2 flex items-center space-x-4">
                                            <div className="w-20 h-20 bg-gray-200 rounded-md flex items-center justify-center">
                                                <Camera className="h-8 w-8 text-gray-400" />
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
                                                    className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white hover:bg-gray-100 text-sm font-medium h-10 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer"
                                                >
                                                    <Upload className="h-4 w-4" />
                                                    Subir Foto
                                                </label>
                                                <p className="text-sm text-gray-500 mt-1">JPG, PNG hasta 5MB</p>
                                                <ErrorMessage name={item.id} component="div" className="text-red-500 text-sm mt-1" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default PersonalInformation;
