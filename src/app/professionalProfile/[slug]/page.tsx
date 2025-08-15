import React, { useEffect } from "react"
import Professional from "../../../components/perfil-profesional/Professional";
import SobreMi from "../../../components/perfil-profesional/SobreMi";
import InfoRapida from "../../../components/perfil-profesional/InfoRapida";
import SesionesPrecios from "../../../components/perfil-profesional/SesionesPrecios";
import Contacto from "../../../components/perfil-profesional/Contacto";
import { getProfessionalById, IUser } from "@/services/prrofessionalProfile";
import { cookies } from "next/headers";
import { IProfessional } from "@/services/prrofessionalProfile";
import UserProfilePage from "@/app/userProfile/[slug]/page";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const id = (await params).slug;

  const cookieStore = await cookies();
  const token = cookieStore.get("authToken")?.value;


  const profesionalSeleccionado: IProfessional | IUser | null = await getProfessionalById(id, token);
     

  if (!profesionalSeleccionado) {
    return <div>No se encontró al profesional</div>;
  }

  return (
    <>
    {profesionalSeleccionado.role === "Psicólogo" ? <div className="w-[100%] flex justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="w-[80%] flex flex-col">
              <Professional data={profesionalSeleccionado as IProfessional}/>
              <div className="grid gap-6 grid-cols-[60%_37.5%]">
                  <div className="flex flex-col">
                      <SobreMi data={profesionalSeleccionado as IProfessional}/>
                      <SesionesPrecios data={profesionalSeleccionado as IProfessional}/>
                  </div>
                  <div>
                      <InfoRapida data={profesionalSeleccionado as IProfessional}/>
                      <Contacto data={profesionalSeleccionado as IProfessional} />
                  </div>
              </div>
              {/* <Reseñas data={profesionalSeleccionado} /> */}
          </div>
      </div>
      
      :
      <>
        <UserProfilePage data={profesionalSeleccionado as IUser} />
      </>
    }
    </>
  );
}