import type React from "react"
import UserPhoto from "./UserPhoto"
import type { IUser } from "@/services/prrofessionalProfile"
import { Mail, Phone, MapPin, Calendar, Shield, User } from "lucide-react"

const InfoRapidaUser: React.FC<IUser> = ({ address, created_at, name, photoUrl, email, phone, health_insurance }) => {
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    } catch {
      return dateString
    }
  }

  return (
    <article
      className="flex flex-col items-center p-8 bg-white border-2 border-gray-200 rounded-xl shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-lg animate-fade-in animate-slide-in-from-bottom"
      role="article"
      aria-labelledby="user-name"
    >
      {/* Profile Photo */}
      <div className="mb-6">
        <UserPhoto photoUrl={photoUrl} name={name} size="xl" />
      </div>

      {/* User Name */}
      <h1 id="user-name" className="text-2xl font-bold text-gray-900 mb-6 text-center">
        {name}
      </h1>

      {/* User Information Grid */}
      <div className="w-full max-w-md space-y-4">
        {/* Email */}
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors duration-200">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Mail className="w-4 h-4 text-blue-600" aria-hidden="true" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">Email</p>
            <p className="text-gray-700 text-sm break-all">{email}</p>
          </div>
        </div>

        {/* Phone */}
        {phone && (
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors duration-200">
            <div className="p-2 bg-green-100 rounded-lg">
              <Phone className="w-4 h-4 text-green-600" aria-hidden="true" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Teléfono</p>
              <p className="text-gray-700 font-mono">{phone}</p>
            </div>
          </div>
        )}

        {/* Address */}
        {address && (
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors duration-200">
            <div className="p-2 bg-purple-100 rounded-lg">
              <MapPin className="w-4 h-4 text-purple-600" aria-hidden="true" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Ciudad</p>
              <p className="text-gray-700">{address}</p>
            </div>
          </div>
        )}

        {/* Member Since */}
        {created_at && (
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors duration-200">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Calendar className="w-4 h-4 text-orange-600" aria-hidden="true" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Miembro desde</p>
              <p className="text-gray-700">{formatDate(created_at)}</p>
            </div>
          </div>
        )}

        {/* Health Insurance */}
        {health_insurance && (
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors duration-200">
            <div className="p-2 bg-teal-100 rounded-lg">
              <Shield className="w-4 h-4 text-teal-600" aria-hidden="true" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Obra Social</p>
              <p className="text-gray-700">{health_insurance}</p>
            </div>
          </div>
        )}
      </div>

      {/* User Status Badge */}
      <div className="mt-6 px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium flex items-center gap-2">
        <User className="w-4 h-4" aria-hidden="true" />
        Usuario Activo
      </div>
    </article>
  )
}

export default InfoRapidaUser
