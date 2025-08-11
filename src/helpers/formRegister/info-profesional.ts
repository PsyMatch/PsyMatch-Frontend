export interface ValoresInfoProfesional {
    personal_biography: string;
    languages: string[];
    license_number: string | null;
    professional_experience: string | null
    office_address: string | null
}

export const initialValuesInfoProfesional: ValoresInfoProfesional = {
    personal_biography: "",
    languages: [],
    license_number: "",
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
})


