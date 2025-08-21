"use client"

import { Mail, Phone, MessageSquare, Copy, Check } from "lucide-react"
import { useState } from "react"
import type { IProfessional } from "@/services/prrofessionalProfile"

const Contacto = ({ data }: { data: IProfessional }) => {
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const handleCopy = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedField(field)
      setTimeout(() => setCopiedField(null), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  return (
    <section
      className="flex flex-col w-full gap-6 p-6 mb-6 bg-white border-2 border-gray-200 rounded-xl shadow-sm"
      aria-labelledby="contact-title"
    >
      <h2 id="contact-title" className="text-xl font-bold text-gray-900 flex items-center gap-2">
        <MessageSquare className="w-5 h-5 text-blue-600" aria-hidden="true" />
        Opciones de Contacto
      </h2>

      <div className="space-y-4">
        {/* Phone Contact */}
        {data.phone && (
          <div className="group">
            <div className="flex items-center justify-between p-4 bg-gray-50 border-2 border-gray-200 rounded-lg">
              <div className="flex items-center gap-3 flex-1">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Phone className="w-4 h-4 text-green-600" aria-hidden="true" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Teléfono</p>
                  <p className="text-gray-700 font-mono">{data.phone}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleCopy(data.phone, "phone")}
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-lg transition-all duration-200 hover:-translate-y-px active:translate-y-0"
                  aria-label="Copiar número de teléfono"
                >
                  {copiedField === "phone" ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Email Contact */}
        {data.email && (
          <div className="group">
            <div className="flex items-center justify-between p-4 bg-gray-50 border-2 border-gray-200 rounded-lg">
              <div className="flex items-center gap-3 flex-1">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Mail className="w-4 h-4 text-blue-600" aria-hidden="true" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Email</p>
                  <p className="text-gray-700 font-mono text-sm break-all">{data.email}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleCopy(data.email, "email")}
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-lg transition-all duration-200 hover:-translate-y-px active:translate-y-0"
                  aria-label="Copiar email"
                >
                  {copiedField === "email" ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Contact Tips */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="text-sm font-semibold text-blue-900 mb-2">Consejos para el contacto</h3>
          <ul className="text-xs text-blue-800 space-y-1">
            <li>• Menciona tu disponibilidad horaria preferida</li>
            <li>• Describe brevemente el motivo de la consulta</li>
            <li>• Pregunta sobre modalidades de sesión disponibles</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Contacto
