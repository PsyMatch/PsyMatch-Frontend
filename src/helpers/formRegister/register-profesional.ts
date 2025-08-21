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
    specialities: string[];
    therapy_approaches: string[];
    session_types: string[];
    modality: string;
    insurance_accepted: string[];
    availability: string[];
    consultation_fee: number;
}

export const initialValuesTipos: Valores = {
    specialities: [],
    therapy_approaches: [],
    session_types: [],
    modality: '',
    insurance_accepted: [],
    availability: [],
    consultation_fee: 0
};

import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
    specialities: Yup.array().min(3, 'Selecciona al menos 3 especialidades').required('Debes seleccionar especialidades'),

    therapy_approaches: Yup.array().min(2, 'Selecciona al menos 2 enfoques terapéuticos').required('Debes seleccionar enfoques'),

    session_types: Yup.array().min(1, 'Selecciona al menos un tipo de sesión').required('Debes seleccionar tipos de sesión'),

    modality: Yup.string().required('Debes seleccionar modalidad'),

    availability: Yup.array().min(1, 'Selecciona al menos un día disponible').required('Debes seleccionar días disponibles'),

    consultation_fee: Yup.number()
        .positive('El precio debe ser un número positivo')
        .max(9999999, 'El costo de la consulta no puede exceder los 7 dígitos')
        .required('Debes ingresar el costo de la consulta'),
});
