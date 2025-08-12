export const dashboardProfesionalMock = {
    profesional: {
        nombre: "Lucía Ramírez",
        titulo: "Psicóloga Clínica Licenciada",
        biografia: "Psicóloga con más de 10 años de experiencia en terapia cognitivo-conductual, especializada en ansiedad, depresión y trauma. Apasionada por acompañar procesos de transformación y bienestar emocional.",
        serviciosYEspecialidades: ["Ansiedad","Depresión","Atención para ansiedad y estrés", "Duelo"], 
        idioma: ["Español", "Ingles"]
    },

    panel:{
      pacientesActivos: 15,
      citasProximas: 3,
      valoracionMedida: 4.8,
      ingresos: "$45,230"
    },

    pacientes:[
      {
        nombre: "María García",
        problema: "Ansiedad",
        sesiones: 12,
        ultimaSesion: "25 ENE 2025"
      },
      {
        nombre: "Juan Pérez",
        problema: "Depresión leve",
        sesiones: 8,
        ultimaSesion: "28 ENE 2025"
      },
      {
        nombre: "Lucía Fernández",
        problema: "Estrés laboral",
        sesiones: 5,
        ultimaSesion: "30 ENE 2025"
      },
      {
        nombre: "Sofía Martínez",
        problema: "Trastorno de sueño",
        sesiones: 10,
        ultimaSesion: "02 FEB 2025"
      }
    ],

    citas: [
      {
        fecha: "25 ENE",
        paciente: "Maria Garcia",
        horario: "10:00",
        duracion: "45min",
        tipoSesion: "Sesión Individual",
        Notas: "Seguimiento de técnicas de relajación",
        estado: "aceptado"
      },
      {
        fecha: "28 ENE",
        paciente: "Juan Pérez",
        horario: "14:30",
        duracion: "60min",
        tipoSesion: "Terapia de Pareja",
        Notas: "Trabajo en comunicación y resolución de conflictos",
        estado: "pendiente"
      },
      {
        fecha: "30 ENE",
        paciente: "Lucía Fernández",
        horario: "09:15",
        duracion: "45min",
        tipoSesion: "Sesión Individual",
        Notas: "Evaluación de progreso en manejo de ansiedad",
        estado: "cancelado"
      }
    ],
    reseñas: [
      {
        autor: "Paciente Anónimo",
        comentario:
          "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
        valores: ["Empatía", "Profesionalismo", "Efectividad"],
        fecha: "12/30/2025"
      },
      {
        autor: "Carla Martin",
        comentario:
          "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
        valores: ["Empatía", "Profesionalismo", "Efectividad"],
        fecha: "12/30/2025"
      }
    ],
    diasDisponibles: [
      "Lunes: 09:00 - 16:30",
      "Martes: 09:00 - 16:30",
      "Miércoles: 09:00 - 16:30",
      "Jueves: 09:00 - 16:30" ,
      "Viernes: 09:00 - 16:30" ,
      "Sábado: 09:00 - 13:00" ,
      "Domingo: Cerrado" 
    ],
  transacciones: [
    {
      nombre: "María Garcia",
      hora: "10:00",
      tipo: "Sesión Individual",
      valor: "$14.000"
    },
    {
      nombre: "Juan Pérez",
      hora: "11:30",
      tipo: "Sesión de Pareja",
      valor: "$20.000"
    },
    {
      nombre: "Lucía Fernández",
      hora: "13:00",
      tipo: "Sesión Individual",
      valor: "$14.000"
    },
    {
      nombre: "Carlos López",
      hora: "15:15",
      tipo: "Sesión Grupal",
      valor: "$10.000"
    },
    {
      nombre: "Ana Torres",
      hora: "17:00",
      tipo: "Sesión Individual",
      valor: "$14.000"
    }
  ]
}