"use client"
import { Formik } from "formik";

import {initialValues} from "../../../../../../helpers/formRegister/initialValues"

import PrimeraSeccion from "./PrimeraSeccion";
import SegundaSeccion from "./SegundaSeccion";
import { RegisterSchema } from "@/helpers/formRegister/schema";


const RegisterForm = () => {
    return (
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={RegisterSchema}

                onSubmit={(values, {setSubmitting, resetForm}) => {
                    
                    resetForm()
                    alert("Registrado con exito. Te avisaremos a la brevedad cuando validemos tus credenciales")
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
                setFieldError
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