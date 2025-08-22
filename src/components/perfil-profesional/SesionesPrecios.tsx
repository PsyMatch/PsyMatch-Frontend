import { Calendar, CheckCircle } from "lucide-react"
import type { IProfessional } from "@/services/prrofessionalProfile"

const SesionesPrecios = ({ data }: { data: IProfessional }) => {
  return (
    <section
      className="flex flex-col w-full gap-6 p-6 mb-6 bg-white border-2 border-gray-200 rounded-xl shadow-sm"
      aria-labelledby="sessions-title"
    >
      <h2 id="sessions-title" className="text-xl font-bold text-gray-900 flex items-center gap-2">
        <Calendar className="w-5 h-5 text-blue-600" aria-hidden="true" />
        Tipos de Sesiones
      </h2>

      <div className="space-y-4">
        {data?.session_types && data.session_types.length > 0 ? (
          data.session_types.map((tipo, index) => (
            <div key={index} className="p-4 bg-gray-50 border-2 border-gray-200 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <CheckCircle className="w-4 h-4 text-blue-600" aria-hidden="true" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-gray-900">{tipo}</h3>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center p-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <div className="text-center">
              <Calendar className="w-8 h-8 text-gray-400 mx-auto mb-2" aria-hidden="true" />
              <p className="text-sm text-gray-600">No hay tipos de sesiones registrados</p>
              <p className="text-xs text-gray-500 mt-1">Contacta al profesional para más información</p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default SesionesPrecios
