export const especialidades = [
    'Anxiety Disorders',
    'Depression',
    'Trauma & PTSD',
    'Couples Therapy',
    'Family Therapy',
    'Addiction & Substance Abuse',
    'Eating Disorders',
    'ADHD',
    'Autism Spectrum Disorders',
    'Bipolar Disorder',
    'OCD',
    'Grief & Loss',
    'Life Transitions',
    'Career Counseling',
    'LGBTQ+ Issues',
    'Child & Adolescent Therapy',
    'Geriatric Psychology',
    'Chronic Pain Management',
    'Sleep Disorders',
    'Anger Management',
];

export const enfoques = [
    'Cognitive Behavioral Therapy (CBT)',
    'Acceptance and Commitment Therapy (ACT)',
    'Psychodynamic Therapy',
    'Family Systems Therapy',
    'Solution-Focused Brief Therapy',
    'Narrative Therapy',
    'Play Therapy',
    'Dialectical Behavior Therapy (DBT)',
    'Eye Movement Desensitization and Reprocessing (EMDR)',
    'Humanistic/Person-Centered Therapy',
    'Mindfulness-Based Therapy',
    'Gestalt Therapy',
    'Art Therapy',
    'Group Therapy',
];

export const tipos = ['Individual', 'Pareja', 'Familia', 'Grupo'];

export const Dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

export const horarios = [
    '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', 
    '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', 
    '20:00', '21:00', '22:00'
];

export const obrasSociales = [
    'OSDE',
    'Swiss Medical (SMG)',
    'IOMA',
    'PAMI',
    'Unión Personal',
    'OSDEPYM',
    'Luis Pasteur',
    'Jerárquicos Salud',
    'Sancor Salud',
    'OSECAC',
    'OSMECON Salud',
    'APROSS',
    'OSPRERA',
    'OSPAT',
    'ASE Nacional',
    'OSPSIP',
];


export interface Valores {
    name: string,
    email: string
    phone: string,
    password: string,
    confirmPassword: string,
    birthdate: string,
    dni: string,
    profile_picture: null,
    personal_biography: string,
    languages: [],
    license_number: string,
    professional_title: string,
    professional_experience: string,
    office_address: string,


    specialities: string[];
    therapy_approaches: string[];
    session_types: string[];
    modality: string;
    insurance_accepted: string[];
    availability: string[];
    working_hours: string[];
    consultation_fee: number;
}

export const initialValuesTipos: Valores = {
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    birthdate: '',
    dni: '',
    profile_picture: null,
    personal_biography: '',
    languages: [],
    license_number: '',
    professional_title: '',
    professional_experience: '',
    office_address: '',

    specialities: [],
    therapy_approaches: [],
    session_types: [],
    modality: '',
    insurance_accepted: [],
    availability: [],
    working_hours: [],
    consultation_fee: 0
};

import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
    specialities: Yup.array().min(3, 'Selecciona al menos 3 especialidades').required('Debes seleccionar especialidades'),

    therapy_approaches: Yup.array().min(2, 'Selecciona al menos 2 enfoques terapéuticos').required('Debes seleccionar enfoques'),

    session_types: Yup.array().min(1, 'Selecciona al menos un tipo de sesión').required('Debes seleccionar tipos de sesión'),

    modality: Yup.string()
      .required('Debes seleccionar modalidad')
      .test(
        'direccion-requerida',
        'Para seleccionar "Presencial" o "Híbrido" debes ingresar la dirección de tu oficina',
        function (value) {
          const { office_address } = this.parent;

          // Bloquea "Presencial" o "Híbrido" si no hay dirección
          if ((value === 'Presencial' || value === 'Híbrido') && (!office_address || office_address.trim() === '')) {
            return false;
          }

          return true;
        }
      ),

    availability: Yup.array().min(1, 'Selecciona al menos un día disponible').required('Debes seleccionar días disponibles'),

    working_hours: Yup.array().min(1, 'Selecciona al menos un horario de trabajo').required('Debes seleccionar horarios disponibles'),

    consultation_fee: Yup.number()
        .positive('El precio debe ser un número positivo')
        .max(9999999, 'El costo de la consulta no puede exceder los 7 dígitos')
        .required('Debes ingresar el costo de la consulta'),
});
