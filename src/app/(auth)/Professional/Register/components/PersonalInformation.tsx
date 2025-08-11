'use client';
import { ErrorMessage, Field, Form, Formik, useFormikContext } from 'formik';
import * as Yup from 'yup';
import { User, Mail, Phone, Camera, Upload } from 'lucide-react';
import { useBotonesRegisterContext } from '@/context/botonesRegisterContext';
import { useEffect, useState } from 'react';
import { AutoSaveCookies, dataToSave, getCookieObject, saveMerged } from '@/helpers/formRegister/helpers';
import { useFotoDePerfil } from '@/context/fotoDePerfil';




const PersonalInformation = () => {
    const {avanzarPaso} = useBotonesRegisterContext()
    
     const { profileImagePreview, handleImageUpload } = useFotoDePerfil();

    

    const [initialValues, setInitialValues] = useState({
        name: "",
        email: '',
        phone: '',
        password: "",
        confirmPassword: "",
        birthdate: '',
        dni: "",
        profile_picture: null
    });
    

useEffect(() => {
  if (initialValues.name === "" && initialValues.email === "") {
    const cookieData = getCookieObject();
    if (cookieData) {
      try {
        setInitialValues({
          name: cookieData.name || "",
          email: cookieData.email || "",
          phone: cookieData.phone || "",
          password: cookieData.password || "",
          confirmPassword: cookieData.confirmPassword || "",
          birthdate: cookieData.birthdate || "",
          dni: cookieData.dni || "",
          profile_picture: null
        });
      } catch (error) {
        console.error(error);
      }
    }
  }
}, []);


    const validationSchema = Yup.object({
        name: Yup.string().required('El nombre es obligatorio'),
        email: Yup.string().email('Correo inválido').required('El correo es obligatorio'),
        phone: Yup.string()
            .required('El número es obligatorio')
            .matches(/^\d{2}\s?\d{4}\s?\d{4}$/, 'El número debe tener 10 dígitos, puede incluir espacios'),
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
            .max(new Date(), 'La fecha de nacimiento no puede ser posterior a hoy')
            .typeError('Debe ser una fecha válida'),
        dni: Yup.string()
            .required('El DNI es obligatorio')
            .matches(/^\d{7,8}$/, 'El DNI debe tener entre 7 y 8 números'),
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

    const handleSubmit = (values: PersonalInformationFormValues) => {
        const toSave = dataToSave(values)
        console.log("Guardando en cookie (submit):", toSave);
        saveMerged(toSave)

        //API

        avanzarPaso();
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
                    {({ setFieldValue, values }) => (
                        <Form className="space-y-6">
                            <AutoSaveCookies />
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
                                    <label className="text-sm font-medium leading-none" htmlFor="birthdate">
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

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <label className="text-sm font-medium leading-none" htmlFor="dni">
                                        Nro de Documento *
                                    </label>
                                    <Field
                                        name="dni"
                                        id="dni"
                                        type="number"
                                        className="flex w-full h-10 px-3 py-2 text-base bg-white border border-gray-300 rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 md:text-sm"
                                    />
                                    <ErrorMessage name="dni" component="div" className="mt-1 text-sm text-red-500" />
                                </div>
                            </div>


                            {/* Contraseñas */}
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <label className="text-sm font-medium leading-none" htmlFor="password">
                                        Contraseña *
                                    </label>
                                    <Field
                                        name="password"
                                        id="password"
                                        type="password"
                                        className="flex w-full h-10 px-3 py-2 text-base bg-white border border-gray-300 rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 md:text-sm"
                                    />
                                    <ErrorMessage name="password" component="div" className="mt-1 text-sm text-red-500" />
                                </div>
                                <div>
                                    <label className="text-sm font-medium leading-none" htmlFor="confirmPassword">
                                        Confirmar Contraseña *
                                    </label>
                                    <Field
                                        name="confirmPassword"
                                        id="confirmPassword"
                                        type="password"
                                        className="flex w-full h-10 px-3 py-2 text-base bg-white border border-gray-300 rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 md:text-sm"
                                    />
                                    <ErrorMessage name="confirmPassword" component="div" className="mt-1 text-sm text-red-500" />
                                </div>
                            </div>



                            {/* Subidas de imágenes */}
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <label className="text-sm font-medium leading-none" htmlFor='profile_picture'>
                                        Foto de perfil profesional *
                                    </label>
                                    <div className="flex items-center mt-2 space-x-4">
                                            <img
                                                alt="Foto de perfil"
                                                className="object-cover w-20 h-20 rounded-md"
                                            />
                                            :
                                            <div className="flex items-center justify-center w-20 h-20 bg-gray-200 rounded-md">
                                                <Camera className="w-8 h-8 text-gray-400" />
                                            </div>
                                            {profileImagePreview && <img src={profileImagePreview} alt="Preview" />}
                                        <div>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                                className="hidden"
                                                id="profile_picture"
                                            />
                                            <label
                                                htmlFor='profile_picture'
                                                className="inline-flex items-center h-10 gap-2 px-4 py-2 text-sm font-medium bg-white border border-gray-300 rounded-md cursor-pointer hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                            >
                                                <Upload className="w-4 h-4" />
                                                Subir Foto
                                            </label>
                                            <p className="mt-1 text-sm text-gray-500">JPG, PNG hasta 5MB</p>
                                            <ErrorMessage name='profile_picture' component="div" className="mt-1 text-sm text-red-500" />
                                        </div>
                                    </div>
                                </div>
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
