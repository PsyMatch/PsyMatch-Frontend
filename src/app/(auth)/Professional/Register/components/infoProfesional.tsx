"use client"
import { Formik, Form, Field, ErrorMessage } from "formik";
import React, { useEffect, useState } from "react";
import { validationSchemaInfoProfesional, ValoresInfoProfesional } from "@/helpers/formRegister/info-profesional";
import Cookies from "js-cookie";
import { useBotonesRegisterContext } from "@/context/botonesRegisterContext";
import { AutoSaveCookies, dataToSave, getCookieObject, saveMerged } from "@/helpers/formRegister/helpers";

const idiomas = [
  { label: "Español", value: "spanish" },
  { label: "Ingles", value: "english" },
  { label: "Portugues", value: "portuguese" }
];


const InfoProfesional = () => {
    const {avanzarPaso} = useBotonesRegisterContext()

const [initialValues, setInitialValues] = useState<ValoresInfoProfesional>({
        personal_biography: "",
        languages: [], 
        license_number: "", 
        professional_experience: "",
        office_address: "" 
    });

useEffect(() => {
  if (initialValues.personal_biography === "" &&  initialValues.license_number === "" && initialValues.languages.length === 0) {
    const cookieData = getCookieObject();
    if (cookieData) {
      try {
        setInitialValues({
            personal_biography: cookieData.personal_biography ||  "",
            languages: cookieData.languages || [],
            license_number: cookieData.license_number || "",
            professional_experience: cookieData.license_number || "",
            office_address: cookieData.office_address || ""
        });
      } catch (error) {
        console.error(error);
      }
    }
  }
}, []);


    const handleSubmit = (values: ValoresInfoProfesional) => {

        const toSave = dataToSave(values)
        console.log("Guardando en cookie (submit):", toSave);
        saveMerged(toSave)     
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
                    <AutoSaveCookies />
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold leading-none" htmlFor="personal_biography">
                            Biografia Personal *
                        </label>
                    <ErrorMessage name="personal_biography" component="div" className="mt-1 text-sm text-red-600" />
                        <Field
                            as="textarea"
                            name="personal_biography"
                            id="personal_biography"
                            className="w-[90%] h-28 px-3 py-2 text-base bg-white border border-gray-300 rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 md:text-sm resize-none align-top"
                        />
                    </div>

                    <div className="mt-10 font-bold">Idiomas *</div>   
                    <ErrorMessage name="languages" component="div" className="mt-1 text-sm text-red-600" />
                    <div className="grid grid-cols-3 gap-5 mt-5"> 
                            {idiomas.map((idioma) => (
                              <label key={idioma.value} className="text-[12px]">
                                <input
                                  type="checkbox"
                                  name="languages"
                                  value={idioma.value}
                                  checked={values.languages.includes(idioma.value)}
                                  onChange={() => {
                                    if (values.languages.includes(idioma.value)) {
                                      // SACAR OPCION SI ESTA SELECCIONADA
                                      setFieldValue(
                                        "languages",
                                        values.languages.filter((item) => item !== idioma.value)
                                      );
                                    } else {
                                      // AGREGAR LA OPCION
                                      setFieldValue("languages", [...values.languages, idioma.value]);
                                    }
                                  }}
                                />
                                {idioma.label}
                              </label>
                            ))}
                          </div>

                    <div className="flex flex-col gap-2 mt-10">
                        <label className="text-sm font-bold leading-none" htmlFor="professional_experience">
                            Años de experiencia
                        </label>
                    <ErrorMessage name="professional_experience" component="div" className="mt-1 text-sm text-red-600" />
                        <Field
                            name="professional_experience"
                            id="professional_experience"
                            type="number"
                            className="flex w-[90%] h-10 px-3 py-2 text-base bg-white border border-gray-300 rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 md:text-sm"
                        />
                    </div>

                    <div className="flex flex-col gap-2 mt-10">
                        <label className="text-sm font-bold leading-none" htmlFor="license_number">
                            Nro de Matricula Profesional *
                        </label>
                    <ErrorMessage name="license_number" component="div" className="mt-1 text-sm text-red-600" />
                        <Field
                            name="license_number"
                            id="license_number"
                            type="number"
                            className="flex w-[90%] h-10 px-3 py-2 text-base bg-white border border-gray-300 rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 md:text-sm"
                        />
                    </div>

                    <div className="flex flex-col gap-2 mt-10">
                        <label className="text-sm font-bold leading-none" htmlFor="office_address">
                            Dirección de oficina/consultorio (opcional si haces sesiones presencial)
                        </label>
                    <ErrorMessage name="office_address" component="div" className="mt-1 text-sm text-red-600" />
                        <Field
                            name="office_address"
                            id="office_address"
                            className="flex w-[90%] h-10 px-3 py-2 text-base bg-white border border-gray-300 rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 md:text-sm"
                        />
                    </div>

                <button type="submit" className="px-4 py-1 mt-10 rounded-xl bg-violet-600">Continuar</button>
            </Form>
            )}
        </Formik>
    </>
  );
};

export default InfoProfesional;
