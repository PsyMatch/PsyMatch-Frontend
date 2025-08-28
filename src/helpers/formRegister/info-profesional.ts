import dayjs from 'dayjs';

export interface ValoresInfoProfesional {
    personal_biography: string;
    languages: string[];
    license_number: string | null;
    professional_title: string | null;
    professional_experience: number | null;
    office_address: string | null;
}

export const initialValuesInfoProfesional: ValoresInfoProfesional = {
    personal_biography: "",
    languages: [],
    license_number: "",
    professional_title: "",
    professional_experience: null,
    office_address: ""
}

import * as Yup from 'yup';

export const validationSchemaInfoProfesional = Yup.object().shape({
    personal_biography: Yup.string()
        .required("La biografia es obligatoria"),
    languages: Yup.array()
        .of(Yup.string().required())
        .required("Debes poner al menos un idioma"),
    license_number: Yup.mixed().required('La matricula es obligatoria'),
    professional_title: Yup.mixed().required('El titulo profesional es obligatorio'),

    professional_experience: Yup.number()
    .min(0, 'La experiencia no puede ser negativa')
    .required('Debes ingresar tu experiencia profesional')
    .test(
        'experience-not-greater-than-possible',
        'La experiencia profesional no puede ser mayor al tiempo posible desde los 18 años',
        function (value) {
        const { birthdate } = this.parent;
        if (!birthdate || value == null) return true;

        const birth = dayjs(birthdate);
        const age = dayjs().diff(birth, 'year');

        // La edad mínima en la que se puede empezar a trabajar
        const possibleExperience = Math.max(0, age - 18);

        return value <= possibleExperience;
        }
    ),
})


