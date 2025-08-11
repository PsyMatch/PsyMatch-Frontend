"use client"
import { enfoques, initialValuesTipos, tipos, validationSchema, Valores } from "@/helpers/formRegister/register-profesional";
import { Formik, Form, Field, ErrorMessage } from "formik";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { dataToSave, getCookieObject, saveMerged } from "@/helpers/formRegister/helpers";
import { useFotoDePerfil } from "@/context/fotoDePerfil";


const modalidades = [
  { label: "Presencial", value: "in_person" },
  { label: "Online", value: "online" },
  { label: "Hibrido", value: "hybrid" }
];

const especialidades = [
  { label: "Trastornos de Ansiedad", value: "anxiety_disorder" },
  { label: "Terapia de Pareja", value: "couples_therapy" },
  { label: "Trastornos de la Conducta Alimentaria", value: "eating_disorder" },
  { label: "Trastorno Bipolar", value: "bipolar_disorder" },
  { label: "Transiciones de Vida", value: "life_transitions" },
  { label: "Terapia Infantil y Adolescente", value: "child_adolescent_therapy" },
  { label: "Trastornos del Sueño", value: "sleep_disorders" },
  { label: "Depresión", value: "depression" },
  { label: "Terapia Familiar", value: "family_therapy" },
  { label: "TDAH", value: "adhd" },
  { label: "TOC", value: "ocd" },
  { label: "Asesoramiento Laboral", value: "career_counseling" },
  { label: "Psicología Geriátrica", value: "geriatric_psychology" },
  { label: "Manejo de la Ira", value: "anger_management" },
  { label: "Trauma y TEPT", value: "trauma_ptsd" },
  { label: "Adicciones y Abuso de Sustancias", value: "addiction_substance_abuse" },
  { label: "Trastornos del Espectro Autista", value: "autism_spectrum_disorder" },
  { label: "Duelo y Pérdida", value: "grief_loss" },
  { label: "Temas LGBTQ+", value: "lgbtqia" },
  { label: "Manejo del Dolor Crónico", value: "chronic_pain_management" }
];

const enfoquesTerapia = [
  { label: "Terapia Cognitivo-Conductual (TCC)", value: "cognitive_behavioral_therapy" },
  { label: "Terapia de Aceptación y Compromiso (ACT)", value: "acceptance_commitment_therapy" },
  { label: "Terapia Psicodinámica", value: "psychodynamic_therapy" },
  { label: "Terapia de Sistemas Familiares", value: "family_systems_therapy" },
  { label: "Terapia Breve Centrada en Soluciones", value: "solution_focused_brief_therapy" },
  { label: "Terapia de Juego", value: "play_therapy" },
  { label: "Terapia Dialéctico-Conductual (TDC)", value: "dialectical_behavioral_therapy" },
  { label: "Desensibilización y Reprocesamiento por Movimiento Ocular (EMDR)", value: "eye_movement_desensitization_reprocessing" },
  { label: "Terapia Humanista/Centrada en la Persona", value: "humanistic_centred_therapy" },
  { label: "Terapia Basada en Mindfulness", value: "mindfulness_based_therapy" },
  { label: "Terapia Gestalt", value: "gestalt_therapy" },
  { label: "Terapia de Arte", value: "art_therapy" },
  { label: "Terapia de Grupo", value: "group_therapy" }
];

const tiposTerapia = [
  { label: "Individual", value: "individual" },
  { label: "Pareja", value: "couple" },
  { label: "Familiar", value: "family" },
  { label: "Grupo", value: "group" }
];

const disponibilidad = [
  { label: "Lunes", value: "monday" },
  { label: "Martes", value: "tuesday" },
  { label: "Miércoles", value: "wednesday" },
  { label: "Jueves", value: "thursday" },
  { label: "Viernes", value: "friday" },
  { label: "Sábado", value: "saturday" },
  { label: "Domingo", value: "sunday" }
];

const obrasSociales = [
  { label: "OSDE", value: "osde" },
  { label: "Swiss Medical", value: "swiss-medical" },
  { label: "IOMA", value: "ioma" },
  { label: "PAMI", value: "pami" },
  { label: "Unión Personal", value: "unión-personal" },
  { label: "OSDEPYM", value: "osdepy" },
  { label: "Luis Pasteur", value: "luis-pasteur" },
  { label: "Jerárquicos Salud", value: "jerarquicos-salud" },
  { label: "Sancor Salud", value: "sancor-salud" },
  { label: "OSECAC", value: "osecac" },
  { label: "Osmecón Salud", value: "osmecón-salud" },
  { label: "APROSS", value: "apross" },
  { label: "OSPRERA", value: "osprera" },
  { label: "OSPAT", value: "ospat" },
  { label: "ASE Nacional", value: "ase-nacional" },
  { label: "OSPSIP", value: "ospsip" }
];


const Services_Prices = () => {
    const router = useRouter()

    const { profileImageFile } = useFotoDePerfil();

    const [initialValues, setInitialValues] = useState<typeof initialValuesTipos>({
        specialities: [], 
        therapy_approaches: [], 
        session_types: [], 
        modality: "", 
        insurance_accepted: [], 
        availability: [], 
    });

useEffect(() => {
    const cookieData = getCookieObject();
    if (cookieData) {
      try {
        setInitialValues({
            specialities : cookieData.specialities || [],
            therapy_approaches: cookieData.therapy_approaches || [],
            session_types: cookieData.session_types || [],
            modality: cookieData.modality || "",
            insurance_accepted: cookieData.insurance_accepted || [],
            availability: cookieData.availability || [],
            });
      } catch (error) {
        console.error(error);
      }
  }
}, []);



const handleSubmit = async (values: Valores) => {

    const toSave = dataToSave(values)
    console.log("Guardando en cookie (submit):", toSave);
    saveMerged(toSave)
    console.log(Cookies.get('userDataCompleta'));

    const fullData = getCookieObject();



    
    try {
        const formData = new FormData();

        // Agregar los datos normales (excluyendo la imagen y la modalidad)
        Object.entries(fullData).forEach(([key, value]) => {
        // Saltear modality aquí porque la manejamos por separado
        if (key === 'modality') return;
        
        // Para arrays podés hacer:
        if (Array.isArray(value)) {
            value.forEach((item) => formData.append(`${key}[]`, item));
        } else {
            formData.append(key, String(value));
        }
        });

        // Agregar la modalidad solo si tiene un valor válido
        if (values.modality && values.modality !== "") {
            formData.append("modality", values.modality);
        }

        // Agregar la imagen solo si está
        if (profileImageFile) {
        formData.append("profile_picture", profileImageFile);
        }


        const response = await fetch('http://localhost:8080/auth/signup/psychologist', {
            method: 'POST',
            // headers: { 'Content-Type': 'application/json' },
            body: formData

        });
        
        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.message);
        }

        const data = await response.json()
        
        if (response.ok) {
        // Guardar token en localStorage si viene en la respuesta
            if (data.token) {
                localStorage.setItem('authToken', data.token)
            }
            
            // Redirigir según el tipo de usuario
            if (data.userType === 'professional') {
            router.push('/dashboard/professional')
            } else {
            router.push('/dashboard/user')
            }
        }

        Cookies.remove("userDataCompleta")
        alert("Registrado con exito!")
        router.push("/")
        
    } catch (error) {
        console.error('Error:', error);
    }

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
                    <ErrorMessage name="specialities" component="div" className="mt-1 text-sm text-red-600" />
                    <div className="grid grid-cols-3 gap-5 mt-5">
                        {especialidades.map((option) => (
                            <label key={option.value} className="text-[12px]">
                                <input
                                    type="checkbox"
                                    name="specialities"
                                    value={option.value}
                                    checked={values.specialities.includes(option.value)}
                                    onChange={() => {
                                        if (values.specialities.includes(option.value)) {
                                            // SACAR OPCION SI ESTA SELECCIONADA
                                            setFieldValue(
                                                "specialities",
                                        values.specialities.filter((item) => item !== option.value)
                                    );
                                    } else {
                                        // AGREGAR LA OPCION
                                        setFieldValue("specialities", [...values.specialities, option.value]);
                                    }
                                }}
                            />
                                {option.label}
                            </label>
                        ))}
                    </div>

                    <div className="mt-10 font-bold">Enfoques terapéutico * (Selecciona al menos 2)</div>
                    <ErrorMessage name="therapy_approaches" component="div" className="mt-1 text-sm text-red-600" />
                    <div className="grid grid-cols-3 gap-5 mt-5">
                        {enfoquesTerapia.map((enfoque) => (
                            <label key={enfoque.value} className="text-[12px]">
                                <input
                                    type="checkbox"
                                    name="therapy_approaches"
                                    value={enfoque.value}
                                    checked={values.therapy_approaches.includes(enfoque.value)}
                                    onChange={() => {
                                        if (values.therapy_approaches.includes(enfoque.value)) {
                                            // SACAR OPCION SI ESTA SELECCIONADA
                                        setFieldValue(
                                            "therapy_approaches",
                                        values.therapy_approaches.filter((item) => item !== enfoque.value)
                                    );
                                    } else {
                                        // AGREGAR LA OPCION
                                        setFieldValue("therapy_approaches", [...values.therapy_approaches, enfoque.value]);
                                    }
                                }}
                            />
                                {enfoque.label}
                            </label>
                        ))}
                    </div>


                    <div className="mt-10 font-bold">Tipos de sesión ofrecidos *</div>
                    <ErrorMessage name="session_types" component="div" className="mt-1 text-sm text-red-600" />
                    <div className="grid grid-cols-3 gap-5 mt-5">
                        {tiposTerapia.map((tipo) => (
                            <label key={tipo.value} className="text-[12px]">
                                <input
                                    type="checkbox"
                                    name="session_type"
                                    value={tipo.value}
                                    checked={values.session_types.includes(tipo.value)}
                                    onChange={() => {
                                        if (values.session_types.includes(tipo.value)) {
                                            // SACAR OPCION SI ESTA SELECCIONADA
                                        setFieldValue(
                                            "session_types",
                                        values.session_types.filter((item) => item !== tipo.value)
                                    );
                                    } else {
                                        // AGREGAR LA OPCION
                                        setFieldValue("session_types", [...values.session_types, tipo.value]);
                                    }
                                    }}
                                />
                                {tipo.label}
                            </label>
                        ))}
                    </div>


                    <div className="mt-10 font-bold">Modalidad del Servicio *</div>
                    <ErrorMessage name="modality" component="div" className="mt-1 text-sm text-red-600" />
                    <div className="grid grid-cols-3 gap-5 mt-5 mb-10">
                        {modalidades.map((modalidad) => (
                        <label key={modalidad.value} className="text-[12px]">
                            <input
                                type="radio"
                                name="modality" 
                                value={modalidad.value}
                                checked={values.modality === modalidad.value}  
                                onChange={() => setFieldValue('modality', modalidad.value)}
                            />
                            {modalidad.label}
                        </label>
                        ))}
                    </div>
                    

                    <div className="mb-4 font-bold ">Obras sociales Aceptadas *</div>
                    <div className="grid grid-cols-3 gap-5">
                        {obrasSociales.map((obra) => (
                            <label key={obra.value} className="text-[12px]">
                                <input
                                    type="checkbox"
                                    name="insurance_accepted"
                                    value={obra.value}
                                    checked={values.insurance_accepted.includes(obra.value)}
                                    onChange={() => {
                                        if (values.insurance_accepted.includes(obra.value)) {
                                            // SACAR OPCION SI ESTA SELECCIONADA
                                        setFieldValue(
                                            "insurance_accepted",
                                        values.insurance_accepted.filter((item) => item !== obra.value)
                                        );
                                        } else {
                                            // AGREGAR LA OPCION
                                            setFieldValue("insurance_accepted", [...values.insurance_accepted, obra.value]);
                                        }
                                    }}
                                />
                                {obra.label}
                            </label>
                        ))}
                    </div>


                    <div className="mt-10 font-bold ">Días de la semana Disponibles *</div>
                    <ErrorMessage name="availability" component="div" className="mt-1 text-sm text-red-600" />
                    <div className="grid grid-cols-3 gap-5 mt-5">
                        {disponibilidad.map((dia) => (
                            <label key={dia.value} className="text-[12px]">
                                <input
                                    type="checkbox"
                                    name="availability"
                                    value={dia.value}
                                    checked={values.availability.includes(dia.value)}
                                    onChange={() => {
                                        if (values.availability.includes(dia.value)) {
                                            // SACAR OPCION SI ESTA SELECCIONADA
                                        setFieldValue(
                                            "availability",
                                        values.availability.filter((item) => item !== dia.value)
                                        );
                                        } else {
                                            // AGREGAR LA OPCION
                                            setFieldValue("availability", [...values.availability, dia.value]);
                                        }
                                    }}
                                />
                                {dia.label}
                            </label>
                        ))}
                    </div>

                <button type="submit" className="px-4 py-1 mt-10 rounded-xl bg-violet-600">Enviar</button>
            </Form>
            )}
        </Formik>
    </>
  );
};

export default Services_Prices;
