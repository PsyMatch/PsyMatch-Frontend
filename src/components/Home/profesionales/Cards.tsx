"use client"
import { Calendar, Clock, MapPin, User } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"

import {
  type PsychologistResponse,
  type PsychologistsApiResponse,
  psychologistsService,
} from "@/services/psychologists"

interface CardsState {
  profesionales: PsychologistResponse[]
  loading: boolean
  error: string | null
}

const Cards = () => {
  const [state, setState] = useState<CardsState>({
    profesionales: [],
    loading: true,
    error: null,
  })

  useEffect(() => {
    const loadPsychologists = async () => {
      try {
        setState((prev) => ({ ...prev, loading: true, error: null }))

        const response: PsychologistsApiResponse = await psychologistsService.getPsychologistsForPatient()

        const sortedByExperience = response.data
          .filter((psych) => psych.professional_experience != null)
          .sort((a, b) => (b.professional_experience || 0) - (a.professional_experience || 0))
          .slice(0, 3)

        setState({
          profesionales: sortedByExperience,
          loading: false,
          error: null,
        })
      } catch (error) {
        console.error("Error loading psychologists:", error)
        setState((prev) => ({
          ...prev,
          loading: false,
          error: "Error al cargar los profesionales. Por favor, intenta de nuevo.",
        }))
      }
    }

    loadPsychologists()
  }, [])

  if (state.loading) {
    return (
      <div className="flex justify-center w-full mt-10">
        <div className="flex gap-10">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="p-5 bg-gray-100 border-2 border-gray-200 rounded-xl w-80 md:w-96 min-h-72 animate-pulse"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-14 h-14 bg-gray-300 rounded-full" />
                <div className="flex-1">
                  <div className="h-4 bg-gray-300 rounded mb-2" />
                  <div className="h-3 bg-gray-300 rounded w-2/3" />
                </div>
              </div>
              <div className="space-y-3">
                <div className="h-6 bg-gray-300 rounded w-1/2" />
                <div className="h-4 bg-gray-300 rounded" />
                <div className="h-4 bg-gray-300 rounded w-3/4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (state.error) {
    return (
      <div className="flex justify-center w-full mt-10">
        <div className="p-8 text-center bg-red-50 border border-red-200 rounded-xl max-w-md">
          <div className="text-red-600 mb-2">⚠️</div>
          <p className="text-red-800 font-medium mb-4">{state.error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    )
  }

  if (state.profesionales.length === 0) {
    return (
      <div className="flex justify-center w-full mt-10">
        <div className="p-8 text-center bg-gray-50 border border-gray-200 rounded-xl max-w-md">
          <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No hay profesionales disponibles</h3>
          <p className="text-gray-600">En este momento no tenemos profesionales disponibles. Intenta más tarde.</p>
        </div>
      </div>
    )
  }

  return (
    <section className="flex justify-center w-full mt-10" aria-label="Profesionales destacados">
      <div className="flex flex-col lg:flex-row justify-center gap-6 lg:gap-10 px-4 max-w-7xl">
        {state.profesionales.map((profesional) => (
          <article
            key={profesional.id}
            className="p-6 bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow rounded-xl w-full max-w-sm lg:w-80 xl:w-96 min-h-72"
          >
            <header className="flex items-center gap-4 mb-6">
              <div className="relative">
                <Image
                  className="bg-gray-100 rounded-full object-cover"
                  src={profesional.profile_picture || "/person-gray-photo-placeholder-woman.webp"}
                  alt={`Foto de perfil de ${profesional.name || "Profesional"}`}
                  width={56}
                  height={56}
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 truncate">{profesional.name || "Nombre no disponible"}</h3>
                {profesional.professional_experience && (
                  <p className="text-sm text-gray-600 mt-1">
                    {profesional.professional_experience} años de experiencia
                  </p>
                )}
              </div>
            </header>

            {profesional?.specialities && profesional.specialities.length > 0 && (
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center px-3 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded-full">
                    {profesional.specialities[0]}
                  </span>
                  {profesional.specialities.length > 1 && (
                    <span className="inline-flex items-center px-2 py-1 text-xs text-gray-500 bg-gray-50 rounded-full">
                      +{profesional.specialities.length - 1} más
                    </span>
                  )}
                </div>
              </div>
            )}

            <div className="space-y-3 mb-6 text-sm text-gray-600">
              {profesional.office_address && (
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5 text-gray-400 flex-shrink-0" aria-hidden="true" />
                  <span className="leading-relaxed">{profesional.office_address}</span>
                </div>
              )}
              {profesional.availability && (
                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 mt-0.5 text-green-600 flex-shrink-0" aria-hidden="true" />
                  <span className="text-green-700 leading-relaxed">
                    {Array.isArray(profesional.availability)
                      ? profesional.availability.join(", ")
                      : profesional.availability}
                  </span>
                </div>
              )}
            </div>

            <footer className="flex gap-3">
              <Link
                href={`/profile/${profesional.id}`}
                className="flex-1 text-center px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                aria-label={`Ver perfil de ${profesional.name}`}
              >
                Ver Perfil
              </Link>
              <Link
                href={`/session/${profesional.id}`}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-gray-900 border border-transparent rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors"
                aria-label={`Reservar sesión con ${profesional.name}`}
              >
                <Calendar className="w-4 h-4" aria-hidden="true" />
                Reservar
              </Link>
            </footer>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Cards
