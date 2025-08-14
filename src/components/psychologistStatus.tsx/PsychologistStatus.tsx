"use client";

import { CheckCircle, XCircle, Clock } from "lucide-react";

type StatusType = "pending" | "accepted" | "rejected";

interface PsychologistStatusProps {
  status: StatusType;
  name: string;
}

export default function PsychologistStatus({ status, name }: PsychologistStatusProps) {
  const config = {
    pending: {
      icon: <Clock className="text-yellow-500 w-14 h-14 mx-auto" />,
      title: "Revisión en Proceso",
      message: `Hola ${name}, tu cuenta está siendo revisada. Te notificaremos cuando sea aprobada.`,
      buttonDisabled: true,
      bg: "bg-yellow-50"
    },
    accepted: {
      icon: <CheckCircle className="text-green-500 w-14 h-14 mx-auto" />,
      title: "Cuenta Aprobada",
      message: `Hola ${name}, tu cuenta ha sido aprobada. Ya puedes acceder al Dashboard.`,
      buttonText: "Ir al Dashboard",
      buttonDisabled: false,
      link: "/dashboard/professional",
      bg: "bg-green-50"
    },
    rejected: {
      icon: <XCircle className="text-red-500 w-14 h-14 mx-auto" />,
      title: "Cuenta Rechazada",
      message: `Hola ${name}, lamentablemente tu cuenta fue rechazada. Contacta soporte para más información.`,
      buttonText: "Contactar Soporte",
      buttonDisabled: false,
      link: "https://mail.google.com/mail/?view=cm&fs=1&to=psymatch.contact@gmail.com",
      bg: "bg-red-50"
    }
  }[status];

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50 p-4">
      <div className="bg-white rounded-xl shadow-lg px-20 py-12 max-w-md w-full aspect-[3/3] flex flex-col justify-between text-center">
        {/* Icono y título */}
        <div>
          {config.icon}
          <h1 className="text-3xl font-bold mt-6">{config.title}</h1>
          <p className="text-gray-600 mt-6 text-lg">{config.message}</p>
        </div>
        {/* Botón */}
        {!config.buttonDisabled && (
          <button
            className="px-8 py-3 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700 text-lg"
            onClick={() => {
              if (config.link) window.location.href = config.link;
            }}
          >
            {config.buttonText}
          </button>
        )}
      </div>
    </div>
  );
}