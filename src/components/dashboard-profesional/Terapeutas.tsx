'use client';
import { useState, useEffect } from "react"
import Image from "next/image"

type Terapeuta = {
  id: number
  nombre: string
  especialidad: string
  sesiones: number
  ultimaSesion: string
  foto?: string
}

const Terapeutas = () => {
  const [terapeutas, setTerapeutas] = useState<Terapeuta[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

 useEffect(() => {
  const token = localStorage.getItem("authToken");
  if (!token) {
    setError("No autenticado. Inicia sesión para ver tus terapeutas.");
    setLoading(false);
    return;
  }

  const fetchTerapeutas = async () => {
    try {
      const res = await fetch("http://localhost:8080/patient/professionals", {
        headers: {
          Authorization: `Bearer ${token}`
        },
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error("Error al obtener terapeutas");
      }
      const result = await res.json();
      setTerapeutas(result.data || []);
      if (!result.data || result.data.length === 0) {
        setError("No tienes terapeutas conectados todavía.");
      } else {
        setError(null);
      }
    } catch (error) {
      setError("No se pudieron obtener los terapeutas.");
      setTerapeutas([]);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  fetchTerapeutas();
}, [])



  if (loading) {
    return <div className="px-8 py-8">Cargando terapeutas...</div>;
  }

  if (error) {
    return <div className="px-8 py-8 text-gray-600">{error}</div>;
  }

  return (
    <div className="flex flex-col gap-3 px-8 py-8 h-fit">
      <div>
        <h1 className="text-xl font-semibold text-black">Lista de Terapeutas</h1>
        <span className="text-black">Gestiona tu lista de terapeutas</span>
      </div>
      <div>
        {terapeutas.length === 0 ? (
          <div className="text-gray-600 py-4">No hay psicólogos registrados para este usuario.</div>
        ) : (
          terapeutas.map((ter) => (
            <div
              key={ter.id}
              className="grid bg-gray-200 border-2 border-gray-300 items-center py-3 px-5 rounded-lg w-full grid-cols-[0.2fr_2fr_0.2fr] my-4"
            >
              <div className="w-10 h-10 bg-white rounded-full overflow-hidden">
                <Image
                  src={ter.foto ? ter.foto : "/person-gray-photo-placeholder-woman.webp"}
                  alt={ter.nombre}
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-extrabold text-black">{ter.nombre}</span>
                <span className="text-sm text-black">Especialidad: {ter.especialidad}</span>
                <div className="flex flex-row gap-2">
                  <span className="text-xs text-black">{ter.sesiones} Sesiones -</span>
                  <span className="text-xs text-black">Última: {ter.ultimaSesion}</span>
                </div>
              </div>
              <div className="flex items-end">
                <button className="px-10 py-2 text-white rounded-md bg-[#4138CA]">
                  Mensaje
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Terapeutas