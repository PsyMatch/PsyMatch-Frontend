"use client"
import { useEffect, useRef, useState } from "react"
import { Field, Formik } from "formik"
import { Form } from "formik"

interface ResponseDataProfile {
    name: string;
    email: string;
    phone: number;
    professional_title: string;
    personal_biography: string;
    languages: string[];
    professional_experience: number;
    office_address: string;
    therapy_approaches: string[]
    // availability: string[];
}

const Perfil = () => {
    const [perfil, setPerfil] = useState<ResponseDataProfile | null>(null);
    const [cambios, setCambios] = useState<Partial<ResponseDataProfile>>({});
    
    useEffect(() => {

        const token = localStorage.getItem("authToken");
        if (!token) return;

        fetch("http://localhost:8080/psychologist/me", {
            headers: { 
                Authorization: `Bearer ${token}` 
            },
        })
        .then(res => res.json())
            .then(response => {
                setPerfil(response);
        })
        .catch(console.error);
    }, []);

    console.log(perfil)


    const handleUpdateProfile = (    cambios: Partial<ResponseDataProfile>,
    original: ResponseDataProfile) => {
        const token = localStorage.getItem("authToken");
        if(!token) return;

        const bodySend = Object.fromEntries(
            Object.entries(cambios).filter(([key, value]) => value !== original[key as keyof ResponseDataProfile])
        );

        if (Object.keys(bodySend).length === 0) {
            console.log("No hay cambios para enviar");
            return;
        }

        console.log("Cuerpo de la solicitud:", bodySend);

        fetch("http://localhost:8080/psychologist/me", {
            method: "PUT",
            headers: {
                // "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(bodySend)
        })
        .then(res => res.json())
        .then(response => {
            console.log("Respuesta:", response);

            setPerfil(prev => ({ ...prev, ...response }));
            setCambios({});

        })
        .catch((error) => {
            console.error("Error al actualizar el perfil:", error.message);
        });
    }
    console.log("Enviando cambios:", cambios);



    // const [profileImage, setProfileImage] = useState<string>("https://ui-avatars.com/api/?name=Profesional&background=E0E7FF&color=3730A3");
    const [editable, setEditable] = useState<boolean>(false);

    // const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const file = e.target.files?.[0];
    //     if (file) {
    //         const reader = new FileReader();
    //         reader.onloadend = () => {
    //             setProfileImage(reader.result as string);
    //         };
    //         reader.readAsDataURL(file);
    //     }
    // };


  return (
        <div className="flex flex-col w-full gap-8 px-2 py-8 md:flex-row bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl">
            <div className="flex flex-col items-center w-full md:w-1/2">
                {/* ...profile image code... */}
            </div>
            <div className="flex flex-col w-full md:w-1/2">
                <div className="p-8 bg-white rounded-lg shadow-md">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold">Mi cuenta profesional</h2>
                        <button onClick={() => setEditable((e) => !e)} className="px-4 py-2 text-white rounded bg-violet-600 hover:bg-violet-700">
                            {editable ? 'Cancelar' : 'Editar'}
                        </button>
                    </div>
                    <Formik<Partial<ResponseDataProfile>>
                        enableReinitialize
                        initialValues={{
                            name: perfil?.name || "",
                            professional_title: perfil?.professional_title || "",
                            personal_biography: perfil?.personal_biography || "",
                            // availability: perfil?.availability || [],
                            professional_experience: perfil?.professional_experience || 0,
                            office_address: perfil?.office_address || "",
                        }}
                        onSubmit={(values) => {
                            if (!perfil) return;
                            handleUpdateProfile(values, perfil); 
                        }}
                    >
                        {({ values, handleChange }) => (
                            <Form className="space-y-6">
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div>
                                        <label className="block mb-1 text-sm font-medium">Nombre Completo</label>
                                        <Field
                                            type="text"
                                            name="name"
                                            className="w-full px-3 py-2 border rounded"
                                            disabled={!editable}
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-1 text-sm font-medium">Título Profesional</label>
                                        <Field
                                            type="text"
                                            name="professional_title"
                                            className="w-full px-3 py-2 border rounded"
                                            disabled={!editable}
                                            
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block mb-1 text-sm font-medium">Biografía Profesional</label>
                                        <Field
                                            type="textarea"
                                            name="personal_biography"
                                            className="w-full px-3 py-2 border rounded resize-none"
                                            disabled={!editable}
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block mb-1 text-sm font-medium">Dirección del consultorio</label>
                                        <Field
                                            type="textarea"
                                            name="office_address"
                                            className="w-full px-3 py-2 border rounded resize-none"
                                            disabled={!editable}
                                            
                                        />
                                    </div>
                                    {/* <div>
                                        <label className="block mb-1 text-sm font-medium">Especialidades</label>
                                        <ul>
                                            {perfil?.therapy_approaches?.map((serv: string, index: number) => (
                                                <li key={index} className="bg-white-400 px-4 py-[2px] text-sm font-bold rounded-xl">
                                                    {serv}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <label className="block mb-1 text-sm font-medium">Idiomas</label>
                                        <div className="flex flex-row flex-wrap gap-2">
                                            {perfil?.languages.map((idioma: string, index: number) => (
                                                <span key={index} className="bg-white-400 px-4 py-[2px] text-sm font-bold rounded-xl">{idioma}</span>
                                            ))}
                                        </div>
                                    </div> */}
                                    <div>
                                        {/* <label className="block mb-1 text-sm font-medium">Disponibilidad</label>
                                        <Field
                                            type="textarea"
                                            name="availability"
                                            className="w-full h-20 px-3 py-2 border rounded resize-none"
                                            disabled={!editable}
                                            
                                        /> */}

                                        <label className="block mb-1 text-sm font-medium">Experiencia</label>
                                        <Field
                                            type="number"
                                            name="professional_experience"
                                            className="w-full px-3 py-2 border rounded"
                                            disabled={!editable}
                                            
                                        />
                                    </div>
                                </div>
                                {editable && (
                                    <div className="flex justify-end">
                                        <button type="submit" className="px-6 py-2 text-white bg-green-600 rounded hover:bg-green-700">
                                            Guardar
                                        </button>
                                    </div>
                                )}
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default Perfil;
