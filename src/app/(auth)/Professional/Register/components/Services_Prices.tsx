"use client"
import { enfoques, initialValuesTipos, modalidades, tipos, validationSchema, Valores } from "@/helpers/formRegister/register-profesional";
import { obrasSociales } from "@/helpers/formRegister/register-profesional";
import { especialidades } from "@/helpers/formRegister/register-profesional";
import { Formik, Form, Field, ErrorMessage } from "formik";
import React, { useEffect, useState } from "react";
import { Dias } from "@/helpers/formRegister/register-profesional";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";


const Services_Prices = () => {
    const router = useRouter()

    const [initialValues, setInitialValues] = useState<typeof initialValuesTipos>({
        opcionesSeleccionadas: [],
        opcionesEnfoqueSeleccionadas: [],
        opcionesTipoSeleccionadas: [],
        opcionesModalidadSeleccionadas: [],
        opcionesObrasSeleccionadas: [],
        opcionesDiasSeleccionadas: [],

        fieldPareja: "",
        fieldIndividual: "",
        fieldFamiliar: "",
        fieldGrupo: "",

        fieldLunes: "",
        fieldMartes: "",
        fieldMiercoles: "",
        fieldJueves: "",
        fieldViernes: "",
        fieldSabado: "",
        fieldDomingo: "",

        Tarifas: "",
        Horarios: ""
    });

    interface Tarifa {
        tipo: string;
        valor: string;
    }

    interface Horario {
        tipo: string;
        valor: string;
    }

  useEffect(() => {
    const cookieData = Cookies.get("userDataPaso3");
    if (cookieData) {
      try {
        const parsed = JSON.parse(cookieData);
        setInitialValues({
            opcionesSeleccionadas: parsed.especialidades || [],
            opcionesEnfoqueSeleccionadas: parsed.enfoques || [],
            opcionesTipoSeleccionadas: parsed.tipos || [],
            opcionesModalidadSeleccionadas: parsed.modalidades || [],
            opcionesObrasSeleccionadas: parsed.obrasSociales || [],
            opcionesDiasSeleccionadas: parsed.dias || [],

            fieldPareja: parsed.Tarifas?.find((t: Tarifa) => t.tipo === "Pareja")?.valor || "",
            fieldIndividual: parsed.Tarifas?.find((t: Tarifa) => t.tipo === "Individual")?.valor || "",
            fieldFamiliar: parsed.Tarifas?.find((t: Tarifa) => t.tipo === "Familiar")?.valor || "",
            fieldGrupo: parsed.Tarifas?.find((t: Tarifa) => t.tipo === "Grupo")?.valor || "",

            fieldLunes: parsed.Horarios?.find((h: Horario) => h.tipo === "Lunes")?.valor || "",
            fieldMartes: parsed.Horarios?.find((h: Horario) => h.tipo === "Martes")?.valor || "",
            fieldMiercoles: parsed.Horarios?.find((h: Horario) => h.tipo === "Miércoles")?.valor || "",
            fieldJueves: parsed.Horarios?.find((h: Horario) => h.tipo === "Jueves")?.valor || "",
            fieldViernes: parsed.Horarios?.find((h: Horario) => h.tipo === "Viernes")?.valor || "",
            fieldSabado: parsed.Horarios?.find((h: Horario) => h.tipo === "Sábado")?.valor || "",
            fieldDomingo: parsed.Horarios?.find((h: Horario) => h.tipo === "Domingo")?.valor || "",

            Tarifas: parsed.Tarifas || [],
            Horarios: parsed.Horarios || [],
            });
      } catch {
      }
    }
  }, []);



const handleSubmit = (values: Valores) => {
    const tarifas = [
        {tipo: "Pareja", valor: values.fieldPareja || ""},
        {tipo: "Individual", valor: values.fieldIndividual || ""},
        {tipo: "Familiar", valor: values.fieldFamiliar || ""},
        {tipo: "Grupo", valor: values.fieldGrupo || ""}
    ].filter(d => values.opcionesTipoSeleccionadas.includes(d.tipo));
    
    const horarios = [
        { tipo: "Lunes", valor: values.fieldLunes || "" },
        { tipo: "Martes", valor: values.fieldMartes || "" },
        { tipo: "Miércoles", valor: values.fieldMiercoles || "" },
        { tipo: "Jueves", valor: values.fieldJueves || "" },
        { tipo: "Viernes", valor: values.fieldViernes || "" },
        { tipo: "Sábado", valor: values.fieldSabado || "" },
        { tipo: "Domingo", valor: values.fieldDomingo || "" }
    ].filter(d => values.opcionesDiasSeleccionadas.includes(d.tipo));
      
    //ACA A LA API
    const dataGuardar = {
        especialidades: values.opcionesSeleccionadas,
        enfoques: values.opcionesEnfoqueSeleccionadas,
        modalidades: values.opcionesModalidadSeleccionadas,
        tipos: values.opcionesTipoSeleccionadas,
        Tarifas: tarifas,
        obrasSociales: values.opcionesObrasSeleccionadas,
        dias: values.opcionesDiasSeleccionadas,
        Horarios: horarios,
    };

    Cookies.set("userDataPaso3", JSON.stringify(dataGuardar));

    const savedData = Cookies.get("userDataPaso3");
        if (savedData) {
        const parsedData = JSON.parse(savedData);
        console.log(parsedData);
    }

    alert("Registrado con exito!")
    router.push("/")
}


  return (
    <>
        <div className="flex flex-col space-y-1.5 py-6 mb-3">
            <div className="flex items-center text-[#5046E7] text-2xl font-semibold leading-none tracking-tight">
                Servicios y Especialidades
            </div>
            <div className="text-sm text-gray-500">¿Qué servicios ofreces y cuáles son tus áreas de especialización?</div>
        </div>

        <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
            >
            {({ values, setFieldValue, errors,touched }) => (
                <Form>
                    <div className="font-bold">Especialidades * (Selecciona al menos 3)</div>   
                    <ErrorMessage name="opcionesSeleccionadas" component="div" className="mt-1 text-sm text-red-600" />
                    <div className="grid grid-cols-3 gap-5 mt-5">
                        {especialidades.map((option) => (
                            <label key={option} className="text-[12px]">
                                <input
                                    type="checkbox"
                                    name="opcionesSeleccionadas"
                                    value={option}
                                    checked={values.opcionesSeleccionadas.includes(option)}
                                    onChange={() => {
                                        if (values.opcionesSeleccionadas.includes(option)) {
                                            // SACAR OPCION SI ESTA SELECCIONADA
                                            setFieldValue(
                                                "opcionesSeleccionadas",
                                        values.opcionesSeleccionadas.filter((item) => item !== option)
                                    );
                                    } else {
                                        // AGREGAR LA OPCION
                                        setFieldValue("opcionesSeleccionadas", [...values.opcionesSeleccionadas, option]);
                                    }
                                }}
                            />
                                {option}
                            </label>
                        ))}
                    </div>

                    <div className="mt-10 font-bold">Enfoques terapéutico * (Selecciona al menos 2)</div>
                    <ErrorMessage name="opcionesEnfoqueSeleccionadas" component="div" className="mt-1 text-sm text-red-600" />
                    <div className="grid grid-cols-3 gap-5 mt-5">
                        {enfoques.map((enfoque: string) => (
                            <label key={enfoque} className="text-[12px]">
                                <input
                                    type="checkbox"
                                    name="opcionesEnfoqueSeleccionadas"
                                    value={enfoque}
                                    checked={values.opcionesEnfoqueSeleccionadas.includes(enfoque)}
                                    onChange={() => {
                                        if (values.opcionesEnfoqueSeleccionadas.includes(enfoque)) {
                                            // SACAR OPCION SI ESTA SELECCIONADA
                                        setFieldValue(
                                            "opcionesEnfoqueSeleccionadas",
                                        values.opcionesEnfoqueSeleccionadas.filter((item) => item !== enfoque)
                                    );
                                    } else {
                                        // AGREGAR LA OPCION
                                        setFieldValue("opcionesEnfoqueSeleccionadas", [...values.opcionesEnfoqueSeleccionadas, enfoque]);
                                    }
                                }}
                            />
                                {enfoque}
                            </label>
                        ))}
                    </div>


                    <div className="mt-10 font-bold">Tipos de sesión ofrecidos *</div>
                    <ErrorMessage name="opcionesTipoSeleccionadas" component="div" className="mt-1 text-sm text-red-600" />
                    <div className="grid grid-cols-3 gap-5 mt-5">
                        {tipos.map((tipo: string) => (
                            <label key={tipo} className="text-[12px]">
                                <input
                                    type="checkbox"
                                    name="opcionesTipoSeleccionadas"
                                    value={tipo}
                                    checked={values.opcionesTipoSeleccionadas.includes(tipo)}
                                    onChange={() => {
                                        if (values.opcionesTipoSeleccionadas.includes(tipo)) {
                                            // SACAR OPCION SI ESTA SELECCIONADA
                                        setFieldValue(
                                            "opcionesTipoSeleccionadas",
                                        values.opcionesTipoSeleccionadas.filter((item) => item !== tipo)
                                    );
                                    } else {
                                        // AGREGAR LA OPCION
                                        setFieldValue("opcionesTipoSeleccionadas", [...values.opcionesTipoSeleccionadas, tipo]);
                                    }
                                    }}
                                />
                                {tipo}
                            </label>
                        ))}
                    </div>


                    <div className="mt-10 font-bold">Modalidad del Servicio *</div>
                    <ErrorMessage name="opcionesModalidadSeleccionadas" component="div" className="mt-1 text-sm text-red-600" />
                    <div className="grid grid-cols-3 gap-5 mt-5">
                        {modalidades.map((modalidad: string) => (
                            <label key={modalidad} className="text-[12px]">
                                <input
                                    type="checkbox"
                                    name="opcionesModalidadSeleccionadas"
                                    value={modalidad}
                                    checked={values.opcionesModalidadSeleccionadas.includes(modalidad)}
                                    onChange={() => {
                                        if (values.opcionesModalidadSeleccionadas.includes(modalidad)) {
                                            // SACAR OPCION SI ESTA SELECCIONADA
                                        setFieldValue(
                                            "opcionesModalidadSeleccionadas",
                                        values.opcionesModalidadSeleccionadas.filter((item) => item !== modalidad)
                                        );
                                        } else {
                                            // AGREGAR LA OPCION
                                            setFieldValue("opcionesModalidadSeleccionadas", [...values.opcionesModalidadSeleccionadas, modalidad]);
                                        }
                                    }}
                                />
                                {modalidad}
                            </label>
                        ))}
                    </div>


                    <div className="flex flex-col space-y-1.5 py-6 mt-10 mb-3">
                        <div className="flex items-center text-[#5046E7] text-2xl font-semibold leading-none tracking-tight">
                            Precios y Disponibilidad
                        </div>
                        <div className="text-sm text-gray-500">Establece tus tarifas y disponibilidad</div>
                    </div>

                    <div className="mb-4 font-bold ">Tarifa de las Sesiones *</div>
                        {!values.opcionesTipoSeleccionadas.length && <div className="mb-5 text-violet-600">Primero selecciona el tipo de sesión que ofreces</div>}
                    <div className="grid grid-cols-2">
                        {values.opcionesTipoSeleccionadas.find((sel) => sel === "Pareja" ) && 
                            <div>
                                <label className="text-sm font-medium leading-none" htmlFor="fieldPareja">
                                    Sesión de pareja *
                                </label>
                                <Field
                                    name="fieldPareja"
                                    id="fieldPareja"
                                    className="flex w-[90%] h-10 px-3 py-2 text-base bg-white border border-gray-300 rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 md:text-sm"
                                />
                                <ErrorMessage name="fieldPareja" component="div" className="mt-1 text-sm text-red-600" />
                            </div>
                        }

                        {values.opcionesTipoSeleccionadas.find((sel) => sel === "Individual" ) && 
                            <div>
                                <label className="text-sm font-medium leading-none" htmlFor="fieldIndividual">
                                    Sesión individual*
                                </label>
                                <Field
                                    name="fieldIndividual"
                                    id="fieldIndividual"               
                                    className="flex w-[90%] h-10 px-3 py-2 text-base bg-white border border-gray-300 rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 md:text-sm"
                                />
                            </div>
                        }
                        {values.opcionesTipoSeleccionadas.find((sel) => sel === "Familia" ) && 
                            <div>
                                <label className="text-sm font-medium leading-none" htmlFor="fieldFamiliar">
                                    Sesión familiar *
                                </label>
                                <Field
                                    name="fieldFamiliar"
                                    id="fieldFamiliar"
                                    className="flex w-[90%] h-10 px-3 py-2 text-base bg-white border border-gray-300 rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 md:text-sm"
                                />
                            </div>
                        }
                        {values.opcionesTipoSeleccionadas.find((sel) => sel === "Grupo" ) && 
                            <div>
                                <label className="text-sm font-medium leading-none" htmlFor="fieldGrupo">
                                    Sesión de grupo *
                                </label>
                                <Field
                                    name="fieldGrupo"
                                    id="fieldGrupo"
                                    className="flex w-[90%] h-10 px-3 py-2 text-base bg-white border border-gray-300 rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 md:text-sm"
                                />
                            </div>
                        }
                    </div>

                    <div className="mb-4 font-bold ">Obras sociales Aceptadas *</div>
                    <div className="grid grid-cols-3 gap-5">
                        {obrasSociales.map((obra: string) => (
                            <label key={obra} className="text-[12px]">
                                <input
                                    type="checkbox"
                                    name="opcionesObrasSeleccionadas"
                                    value={obra}
                                    checked={values.opcionesObrasSeleccionadas.includes(obra)}
                                    onChange={() => {
                                        if (values.opcionesObrasSeleccionadas.includes(obra)) {
                                            // SACAR OPCION SI ESTA SELECCIONADA
                                        setFieldValue(
                                            "opcionesObrasSeleccionadas",
                                        values.opcionesObrasSeleccionadas.filter((item) => item !== obra)
                                        );
                                        } else {
                                            // AGREGAR LA OPCION
                                            setFieldValue("opcionesObrasSeleccionadas", [...values.opcionesObrasSeleccionadas, obra]);
                                        }
                                    }}
                                />
                                {obra}
                            </label>
                        ))}
                    </div>


                    <div className="mt-10 font-bold ">Días de la semana Disponibles *</div>
                    <ErrorMessage name="opcionesDiasSeleccionadas" component="div" className="mt-1 text-sm text-red-600" />
                    <div className="grid grid-cols-3 gap-5 mt-5">
                        {Dias.map((dia: string) => (
                            <label key={dia} className="text-[12px]">
                                <input
                                    type="checkbox"
                                    name="opcionesDiasSeleccionadas"
                                    value={dia}
                                    checked={values.opcionesDiasSeleccionadas.includes(dia)}
                                    onChange={() => {
                                        if (values.opcionesDiasSeleccionadas.includes(dia)) {
                                            // SACAR OPCION SI ESTA SELECCIONADA
                                        setFieldValue(
                                            "opcionesDiasSeleccionadas",
                                        values.opcionesDiasSeleccionadas.filter((item) => item !== dia)
                                        );
                                        } else {
                                            // AGREGAR LA OPCION
                                            setFieldValue("opcionesDiasSeleccionadas", [...values.opcionesDiasSeleccionadas, dia]);
                                        }
                                    }}
                                />
                                {dia}
                            </label>
                        ))}
                    </div>

                    <div className="mt-8 mb-5 text-violet-600">Contanos tu disponibilidad horaria de cada día</div>
                    <div className="grid grid-cols-2 gap-5 mt-4">
                        {values.opcionesDiasSeleccionadas.find((sel) => sel === "Lunes" ) && 
                            <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium leading-none" htmlFor="fieldLunes">
                                        Lunes
                                    </label>
                                    <Field
                                        name="fieldLunes"
                                        id="fieldLunes"
                                        className="flex w-[90%] h-10 px-3 py-2 text-base bg-white border border-gray-300 rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 md:text-sm"
                                    />
                                     {touched.fieldLunes && errors.fieldLunes && (
                                        <div className="mt-1 text-sm text-red-600">{errors.fieldLunes}</div>
                                    )}
                            </div>
                        }
                        {values.opcionesDiasSeleccionadas.find((sel) => sel === "Martes" ) && 
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium leading-none" htmlFor="fieldMartes">
                                    Martes
                                </label>
                                <Field
                                    name="fieldMartes"
                                    id="fieldMartes"
                                    className="flex w-[90%] h-10 px-3 py-2 text-base bg-white border border-gray-300 rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 md:text-sm"
                                />
                            </div>
                        }
                        {values.opcionesDiasSeleccionadas.find((sel) => sel === "Miércoles" ) && 
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium leading-none" htmlFor="fieldMiercoles">
                                    Miercoles
                                </label>
                                <Field
                                    name="fieldMiercoles"
                                    id="fieldMiercoles"
                                    className="flex w-[90%] h-10 px-3 py-2 text-base bg-white border border-gray-300 rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 md:text-sm"
                                />
                            </div>
                        }
                        {values.opcionesDiasSeleccionadas.find((sel) => sel === "Jueves" ) && 
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium leading-none" htmlFor="fieldJueves">
                                    Jueves
                                </label>
                                <Field
                                    name="fieldJueves"
                                    id="fieldJueves"
                                    className="flex w-[90%] h-10 px-3 py-2 text-base bg-white border border-gray-300 rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 md:text-sm"
                                />
                            </div>
                        }
                        {values.opcionesDiasSeleccionadas.find((sel) => sel === "Viernes" ) && 
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium leading-none" htmlFor="fieldViernes">
                                    Viernes
                                </label>
                                <Field
                                    name="fieldViernes"
                                    id="fieldViernes"
                                    className="flex w-[90%] h-10 px-3 py-2 text-base bg-white border border-gray-300 rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 md:text-sm"
                                />
                            </div>
                        }
                        {values.opcionesDiasSeleccionadas.find((sel) => sel === "Sábado" ) && 
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium leading-none" htmlFor="fieldSabado">
                                    Sábado
                                </label>
                                <Field
                                    name="fieldSabado"
                                    id="fieldSabado"
                                    className="flex w-[90%] h-10 px-3 py-2 text-base bg-white border border-gray-300 rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 md:text-sm"
                                />
                            </div>
                        }
                        {values.opcionesDiasSeleccionadas.find((sel) => sel === "Domingo" ) && 
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium leading-none" htmlFor="fieldDomingo">
                                    Domingo
                                </label>
                                <Field
                                    name="fieldDomingo"
                                    id="fieldDomingo"
                                    className="flex w-[90%] h-10 px-3 py-2 text-base bg-white border border-gray-300 rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 md:text-sm"
                                />
                            </div>
                        }

                    
                    </div>


                <button type="submit" className="px-4 py-1 mt-10 rounded-xl bg-violet-600">Enviar</button>
            </Form>
            )}
        </Formik>
    </>
  );
};

export default Services_Prices;
