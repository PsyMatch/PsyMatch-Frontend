"use client"
import { Formik, Form, Field, ErrorMessage } from "formik";
import React, { useEffect, useState } from "react";
import { Camera, Upload } from "lucide-react";
import { validationSchemaInfoProfesional, ValoresInfoProfesional } from "@/helpers/formRegister/info-profesional";
import Cookies from "js-cookie";
import { useBotonesRegisterContext } from "@/context/botonesRegisterContext";

const InfoProfesional = () => {
    const {avanzarPaso} = useBotonesRegisterContext()

const [initialValues, setInitialValues] = useState({
        biografia: "",
        idiomas: "",
        matriculaProfesional: null,
        seguro: null,
        nombreEmpresa: "",
        ciudad: "",
        provincia: "",
        codigoPostal: 0,
        telefonoEmpresa: 0,
        experiencia: 0,
        descripcion: ""
    });

  useEffect(() => {
    const cookieData = Cookies.get("userDataPaso2");
    if (cookieData) {
      try {
        const parsed = JSON.parse(cookieData);
        setInitialValues({
            biografia: parsed.biografia ||  "",
            idiomas: parsed.idiomas || "",
            matriculaProfesional: parsed.matriculaProfesional || null,
            seguro: parsed.seguro || null,
            nombreEmpresa: parsed.nombreEmpresa || "",
            ciudad: parsed.ciudad || "",
            provincia: parsed.provincia || "",
            codigoPostal: parsed.codigoPostal || 0,
            telefonoEmpresa: parsed.telefonoEmpresa || 0,
            experiencia: parsed.experiencia || 0,
            descripcion: parsed.descripcion || ""
        });
      } catch {
      }
    }
  }, []);


    const handleSubmit = (values: ValoresInfoProfesional) => {
    // ACA A LA API

        Cookies.set("userDataPaso2", JSON.stringify(values));
        const savedData = Cookies.get("userDataPaso2");
        if (savedData) {
            const parsedData = JSON.parse(savedData);
            console.log(parsedData);
        }
        avanzarPaso()
    };

  return (
    <>
        <div className="flex flex-col space-y-1.5 py-6 mb-3">
            <div className="flex items-center text-[#5046E7] text-2xl font-semibold leading-none tracking-tight">
                Información profesional
            </div>
            <div className="text-sm text-gray-500">Su licencia e información profesional</div>
        </div>

        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchemaInfoProfesional}
            enableReinitialize
            >
            {({ values, setFieldValue, errors,touched }) => (
                <Form>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold leading-none" htmlFor="biografia">
                            Biografia Personal *
                        </label>
                    <ErrorMessage name="biografia" component="div" className="mt-1 text-sm text-red-600" />
                        <Field
                            name="biografia"
                            id="biografia"
                            className="flex w-[90%] h-28 px-3 py-2 text-base bg-white border border-gray-300 rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 md:text-sm"
                        />
                    </div>

                    <div className="flex flex-col gap-2 mt-8">
                        <label className="text-sm font-bold leading-none" htmlFor="idiomas">
                            Idiomas Hablados *
                        </label>
                    <ErrorMessage name="idiomas" component="div" className="mt-1 text-sm text-red-600" />
                        <Field
                            name="idiomas"
                            id="idiomas"
                            className="flex w-[90%] h-10 px-3 py-2 text-base bg-white border border-gray-300 rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 md:text-sm"
                        />
                    </div>

                        <div className="grid grid-cols-1 gap-4 mt-10 md:grid-cols-2">
                                {[
                                    { id: 'matriculaProfesional', label: 'Matrícula Profesional *', desc: "Carga tu licencia actual" },
                                    { id: 'seguro', label: 'Seguro de mala praxis *', desc: "Certificado de seguro actual" },
                                ].map((item) => (
                                    <div key={item.id}>
                                            <label className="text-sm font-bold leading-none" htmlFor={item.id}>
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
                                        <span className="text-xs text-violet-600">{item.desc}</span>
                                    </div>
                                ))}
                            </div>

                            
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-2 mt-8">
                        <label className="text-sm font-bold leading-none" htmlFor="nombreEmpresa">
                            Nombre de la Empresa*
                        </label>
                        <Field
                            name="nombreEmpresa"
                            id="nombreEmpresa"
                            className="flex w-[90%] h-10 px-3 py-2 text-base bg-white border border-gray-300 rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 md:text-sm"
                        />
                    <ErrorMessage name="nombreEmpresa" component="div" className="mt-1 text-sm text-red-600" />
                    </div>
                    <div className="grid grid-cols-3">
                        <div className="flex flex-col gap-2 mt-8">
                            <label className="text-sm font-bold leading-none" htmlFor="ciudad">
                                Ciudad *
                            </label>
                            <Field
                                name="ciudad"
                                id="ciudad"
                                className="flex w-[90%] h-10 px-3 py-2 text-base bg-white border border-gray-300 rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 md:text-sm"
                            />
                        <ErrorMessage name="ciudad" component="div" className="mt-1 text-sm text-red-600" />
                        </div>
                        <div className="flex flex-col gap-2 mt-8">
                            <label className="text-sm font-bold leading-none" htmlFor="provincia">
                                Provincia *
                            </label>
                            <Field
                                name="provincia"
                                id="provincia"
                                className="flex w-[90%] h-10 px-3 py-2 text-base bg-white border border-gray-300 rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 md:text-sm"
                            />
                        <ErrorMessage name="provincia" component="div" className="mt-1 text-sm text-red-600" />
                        </div>
                        <div className="flex flex-col gap-2 mt-8">
                            <label className="text-sm font-bold leading-none" htmlFor="codigoPostal">
                                Código Postal*
                            </label>
                            <Field
                                name="codigoPostal"
                                id="codigoPostal"
                                className="flex w-[90%] h-10 px-3 py-2 text-base bg-white border border-gray-300 rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 md:text-sm"
                            />
                        <ErrorMessage name="codigoPostal" component="div" className="mt-1 text-sm text-red-600" />
                        </div>
                    </div>
                    <div className="grid grid-cols-2">          
                        <div className="flex flex-col gap-2 mt-8">
                            <label className="text-sm font-bold leading-none" htmlFor="telefonoEmpresa">
                                Teléfono de la Empresa *
                            </label>
                            <Field
                                name="telefonoEmpresa"
                                id="telefonoEmpresa"
                                className="flex w-[90%] h-10 px-3 py-2 text-base bg-white border border-gray-300 rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 md:text-sm"
                            />
                        <ErrorMessage name="telefonoEmpresa" component="div" className="mt-1 text-sm text-red-600" />
                        </div>
                        <div className="flex flex-col gap-2 mt-8">
                            <label className="text-sm font-bold leading-none" htmlFor="experiencia">
                                Años de Experiencia
                            </label>
                            <Field
                                name="experiencia"
                                id="experiencia"
                                className="flex w-[90%] h-10 px-3 py-2 text-base bg-white border border-gray-300 rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 md:text-sm"
                            />
                            <ErrorMessage name="experiencia" component="div" className="mt-1 text-sm text-red-600" />
                        </div>
                    </div>
                    
                    
                    <div className="flex flex-col gap-2 mt-8">
                        <label className="text-sm font-bold leading-none" htmlFor="descripcion">
                            Descripción del Puesto*
                        </label>
                        <Field
                            name="descripcion"
                            id="descripcion"
                            className="flex w-[90%] h-10 px-3 py-2 text-base bg-white border border-gray-300 rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 md:text-sm"
                        />
                    <ErrorMessage name="descripcion" component="div" className="mt-1 text-sm text-red-600" />
                    </div>
                </div>


                <button type="submit" className="px-4 py-1 mt-10 rounded-xl bg-violet-600">Continuar</button>
            </Form>
            )}
        </Formik>
    </>
  );
};

export default InfoProfesional;
