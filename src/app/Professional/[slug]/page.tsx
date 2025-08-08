import { profesionales } from "@/helpers/professional";

import React from "react"
import Professional from "../components/Professional";
import SobreMi from "../components/SobreMi";
import InfoRapida from "../components/InfoRapida";
import SesionesPrecios from "../components/SesionesPrecios";
import Contacto from "../components/Contacto";
import Reseñas from "../components/Reseñas";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const [idString] = slug;
  const id = Number(idString);

  const profesionalSeleccionado = profesionales.find((prof) => prof.id === id);

  if (!profesionalSeleccionado) {
    return <div>No se encontró al profesional</div>;
  }

  return (
    <div className="w-[100%] flex justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="w-[80%] flex flex-col">
            <Professional data={profesionalSeleccionado}/>
            <div className="grid gap-6 grid-cols-[60%_37.5%]">
                <div className="flex flex-col">
                    <SobreMi data={profesionalSeleccionado}/>
                    <SesionesPrecios data={profesionalSeleccionado}/>
                </div>
                <div>
                    <InfoRapida data={profesionalSeleccionado}/>
                    <Contacto data={profesionalSeleccionado} />
                </div>
            </div>
            <Reseñas data={profesionalSeleccionado} />
        </div>
    </div>
  );
}