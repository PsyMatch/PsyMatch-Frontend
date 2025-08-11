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

export const modalidades = ['Presencial', 'Online', 'Telefono'];

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
    opcionesSeleccionadas: string[];
    opcionesEnfoqueSeleccionadas: string[];
    opcionesTipoSeleccionadas: string[];
    opcionesModalidadSeleccionadas: string[];
    opcionesObrasSeleccionadas: string[];
    opcionesDiasSeleccionadas: string[];

    fieldPareja: string;
    fieldIndividual: string;
    fieldFamiliar: string;
    fieldGrupo: string;

    fieldLunes: string;
    fieldMartes: string;
    fieldMiercoles: string;
    fieldJueves: string;
    fieldViernes: string;
    fieldSabado: string;
    fieldDomingo: string;

    Tarifas: string;
    Horarios: string;
}

export const initialValuesTipos: Valores = {
    opcionesSeleccionadas: [],
    opcionesEnfoqueSeleccionadas: [],
    opcionesTipoSeleccionadas: [],
    opcionesModalidadSeleccionadas: [],
    opcionesObrasSeleccionadas: [],
    opcionesDiasSeleccionadas: [],

    fieldPareja: '',
    fieldIndividual: '',
    fieldFamiliar: '',
    fieldGrupo: '',

    fieldLunes: '',
    fieldMartes: '',
    fieldMiercoles: '',
    fieldJueves: '',
    fieldViernes: '',
    fieldSabado: '',
    fieldDomingo: '',

    Tarifas: '',
    Horarios: '',
};

import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
    opcionesSeleccionadas: Yup.array().min(3, 'Selecciona al menos 3 especialidades').required('Debes seleccionar especialidades'),

    opcionesEnfoqueSeleccionadas: Yup.array().min(2, 'Selecciona al menos 2 enfoques terapéuticos').required('Debes seleccionar enfoques'),

    opcionesTipoSeleccionadas: Yup.array().min(1, 'Selecciona al menos un tipo de sesión').required('Debes seleccionar tipos de sesión'),

    opcionesModalidadSeleccionadas: Yup.array().min(1, 'Selecciona al menos una modalidad').required('Debes seleccionar modalidad'),

    fieldPareja: Yup.string().when('opcionesTipoSeleccionadas', (tipos: string[], schema: Yup.StringSchema) => {
        if (Array.isArray(tipos) && tipos.includes('Pareja')) {
            return schema.required('La tarifa para sesión de pareja es obligatoria');
        }
        return schema.notRequired();
    }),

    fieldIndividual: Yup.string().when('opcionesTipoSeleccionadas', (tipos: string[], schema: Yup.StringSchema) => {
        if (Array.isArray(tipos) && tipos.includes('Individual')) {
            return schema.required('La tarifa para sesión individual es obligatoria');
        }
        return schema.notRequired();
    }),

    fieldFamiliar: Yup.string().when('opcionesTipoSeleccionadas', (tipos: string[], schema: Yup.StringSchema) => {
        if (Array.isArray(tipos) && tipos.includes('Familia')) {
            return schema.required('La tarifa para sesión familiar es obligatoria');
        }
        return schema.notRequired();
    }),

    fieldGrupo: Yup.string().when('opcionesTipoSeleccionadas', (tipos: string[], schema: Yup.StringSchema) => {
        if (Array.isArray(tipos) && tipos.includes('Grupo')) {
            return schema.required('La tarifa para sesión de grupo es obligatoria');
        }
        return schema.notRequired();
    }),

    opcionesDiasSeleccionadas: Yup.array().min(1, 'Selecciona al menos un día disponible').required('Debes seleccionar días disponibles'),

    fieldLunes: Yup.string().when('opcionesDiasSeleccionadas', (dias, schema) => {
        if (Array.isArray(dias) && dias.includes('Lunes')) {
            return schema.required('Indica disponibilidad para Lunes');
        }
        return schema.notRequired();
    }),
    fieldMartes: Yup.string().when('opcionesDiasSeleccionadas', (dias: string[], schema: Yup.StringSchema) => {
        if (Array.isArray(dias) && dias.includes('Martes')) {
            return schema.required('Indica disponibilidad para Martes');
        }
        return schema.notRequired();
    }),
    fieldMiercoles: Yup.string().when('opcionesDiasSeleccionadas', (dias: string[], schema: Yup.StringSchema) => {
        if (Array.isArray(dias) && dias.includes('Miercoles')) {
            return schema.required('Indica disponibilidad para Miércoles');
        }
        return schema.notRequired();
    }),
    fieldJueves: Yup.string().when('opcionesDiasSeleccionadas', (dias: string[], schema: Yup.StringSchema) => {
        if (Array.isArray(dias) && dias.includes('Jueves')) {
            return schema.required('Indica disponibilidad para Jueves');
        }
        return schema.notRequired();
    }),
    fieldViernes: Yup.string().when('opcionesDiasSeleccionadas', (dias: string[], schema: Yup.StringSchema) => {
        if (Array.isArray(dias) && dias.includes('Viernes')) {
            return schema.required('Indica disponibilidad para Viernes');
        }
        return schema.notRequired();
    }),
    fieldSabado: Yup.string().when('opcionesDiasSeleccionadas', (dias: string[], schema: Yup.StringSchema) => {
        if (Array.isArray(dias) && dias.includes('Sabado')) {
            return schema.required('Indica disponibilidad para Sabado');
        }
        return schema.notRequired();
    }),
    fieldDomingo: Yup.string().when('opcionesDiasSeleccionadas', (dias: string[], schema: Yup.StringSchema) => {
        if (Array.isArray(dias) && dias.includes('Domingo')) {
            return schema.required('Indica disponibilidad para Domingo');
        }
        return schema.notRequired();
    }),
});
