import dayjs from 'dayjs';

export interface ValoresInfoProfesional {
    personal_biography: string;
    languages: string[];
    license_number: string | null;
    professional_title: string | null;
    professional_experience: string | null;
    office_address: string | null;
}

export const initialValuesInfoProfesional: ValoresInfoProfesional = {
    personal_biography: "",
    languages: [],
    license_number: "",
    professional_title: "",
    professional_experience: "",
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
      'experience-not-greater-than-age',
      'La experiencia profesional no puede ser mayor a tu edad',
      function (value) {
        const { birthdate } = this.parent; // accedemos a otros campos del formulario
        if (!birthdate || !value) return true; // si no hay fecha o experiencia, dejamos pasar (otra validación se encargará)
        const birth = dayjs(birthdate);
        const age = dayjs().diff(birth, 'year'); // calcula edad en años
        return value <= age; // True si la experiencia es menor o igual a la edad
      }
    ),
})


