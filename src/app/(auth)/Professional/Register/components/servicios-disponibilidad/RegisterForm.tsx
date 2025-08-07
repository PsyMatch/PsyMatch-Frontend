"use client"
import { Formik } from "formik";
import * as yup from "yup";

import {initialValues} from "../../../../../../helpers/formRegister/initialValues"

import PrimeraSeccion from "./PrimeraSeccion";
import SegundaSeccion from "./SegundaSeccion";

const RegisterSchema = yup.object().shape({
    
    dias: yup
    .object()
    .required("Seleccioná al menos 1 día")
    .test("min-1", "Seleccioná al menos 1 día", (value) => {
        return value && Object.values(value).filter(Boolean).length >= 1;
    }),

    especialidades: yup
        .object()
        .test("min-3", "Seleccioná al menos 3 especialidades", (value) => {
        return value && Object.values(value).filter(Boolean).length >= 3;
        }),

    enfoques: yup
        .object()
        .test("min-2", "Seleccioná al menos 2 enfoques", (value) => {
        return value && Object.values(value).filter(Boolean).length >= 2;
        }),


    tipos: yup
    .object()
    .required("Seleccioná al menos 1 día")
    .test("min-1", "Seleccioná al menos 1 tipo", (value) => {
        return value && Object.values(value).filter(Boolean).length >= 1;
    }),

    modalidades: yup
    .object()
    .required("Seleccioná al menos 1 día")
    .test("min-1", "Seleccioná al menos 1 modalidad", (value) => {
        return value && Object.values(value).filter(Boolean).length >= 1;
    }),

sesionIndividual: yup
  .number()
  .typeError("Debe ser un número válido")
  .positive("Debe ser mayor a cero")
  .when(["tipos"], ([tipos], schema) =>
    tipos?.individual
      ? schema.required("El precio de sesión individual es obligatorio")
      : schema.notRequired()
  ),

sesionDePareja: yup
  .number()
  .typeError("Debe ser un número válido")
  .positive("Debe ser mayor a cero")
  .when(["tipos"], ([tipos], schema) =>
    tipos?.pareja
      ? schema.required("El precio de sesión de pareja es obligatorio")
      : schema.notRequired()
  ),

sesionFamiliar: yup
  .number()
  .typeError("Debe ser un número válido")
  .positive("Debe ser mayor a cero")
  .when(["tipos"], ([tipos], schema) =>
    tipos?.familia
      ? schema.required("El precio de sesión familiar es obligatorio")
      : schema.notRequired()
  ),

sesionGrupo: yup
  .number()
  .typeError("Debe ser un número válido")
  .positive("Debe ser mayor a cero")
  .when(["tipos"], ([tipos], schema) =>
    tipos?.grupo
      ? schema.required("El precio de sesión grupal es obligatorio")
      : schema.notRequired()
  ),


})


const RegisterForm = () => {
    return (
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={RegisterSchema}


                onSubmit={(values, {setSubmitting}) => {
                    //seccion 1
                    const arrayDeObjeto = Object.entries(values.especialidades)
                    const arrayDeObjetoEnfoques = Object.entries(values.enfoques)
                    const arrayDeObjetoTipos = Object.entries(values.tipos)
                    const arrayDeObjetoModalidades = Object.entries(values.modalidades)

                
                    const seleccionado = arrayDeObjeto.filter((seleccionado) => {
                        if(seleccionado[1] === true){
                            return seleccionado
                        }
                    })

                    const seleccionadoEnfoques = arrayDeObjetoEnfoques.filter((seleccionado) => {
                        if(seleccionado[1] === true){
                            return seleccionado
                        }
                    })

                    const seleccionadoTipos = arrayDeObjetoTipos.filter((seleccionado) => {
                        if(seleccionado[1] === true){
                            return seleccionado
                        }
                    })


                    const seleccionadoModalidades = arrayDeObjetoModalidades.filter((seleccionado) => {
                        if(seleccionado[1] === true){
                            return seleccionado
                        }
                    })

                    //seccion 2
                    const arrayDeObjetoObras = Object.entries(values.obras)
                    const arrayDeObjetoDias = Object.entries(values.dias)

                    const seleccionadoObras = arrayDeObjetoObras.filter((seleccionado) => {
                        if(seleccionado[1] === true){
                            return seleccionado
                        }
                    })

                    const seleccionadoDias = arrayDeObjetoDias.filter((seleccionado) => {
                        if(seleccionado[1] === true){
                            return seleccionado
                        }
                    })


                    console.log(seleccionado)
                    console.log(seleccionadoEnfoques)
                    console.log(seleccionadoTipos)
                    console.log(seleccionadoModalidades)
                    console.log(seleccionadoObras)
                    console.log(seleccionadoDias)
                    console.log(values.sesionDePareja)
                    console.log(values.sesionIndividual)
                    console.log(values.sesionFamiliar)
                    console.log(values.sesionGrupal)
                    console.log(values.horarioInicial)
                    console.log(values.horarioFinal)
                    setSubmitting(false)
                }}
            >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                setFieldValue,
                setFieldError,
            }) => {
                console.log(errors)
                
                const handleTiposChange = (e:any) => {
                    const { name, checked } = e.target;
                    handleChange(e); 

                    if (!checked) {
                        switch(name) {
                        case "tipos.individual":
                            setFieldValue("sesionIndividual", "");
                            setFieldError("sesionIndividual", undefined);
                            break;
                        case "tipos.pareja":
                            setFieldValue("sesionDePareja", "");
                            setFieldError("sesionDePareja", undefined);
                            break;
                        case "tipos.familia":
                            setFieldValue("sesionFamilia", "");
                            setFieldError("sesionFamilia", undefined);
                            break;
                        case "tipos.grupo":
                            setFieldValue("sesionGrupo", "");
                            setFieldError("sesionGrupo", undefined);
                            break;
                        }
                    }
                };
                return (
                <>
                    <form onSubmit={handleSubmit}>

                            <PrimeraSeccion 
                                errors={errors} 
                                touched={touched} 
                                handleChange={handleChange} 
                                handleTiposChange={handleTiposChange} 
                                handleBlur={handleBlur} 
                            />

                            <SegundaSeccion
                                errors={errors} 
                                touched={touched} 
                                handleChange={handleChange} 
                                handleBlur={handleBlur} 
                                values = {values}
                                />

                        <div className="flex flex-row items-center justify-between px-16">
                            <button className="p-1 px-5 mt-4 mb-4 border-2 border-gray-400 rounded-lg w-fit" type="button" disabled={isSubmitting}>
                                Volver
                            </button>
                            <button className="p-1 mt-4 mb-4 rounded-lg px-7 w-fit bg-violet-500 hover:bg-violet-400" type="submit" disabled={isSubmitting}>
                                Enviar Solicitud
                            </button>
                        </div>
                    </form>
                </>
                )
            }}
            </Formik>
        </>
    )
}

export default RegisterForm;