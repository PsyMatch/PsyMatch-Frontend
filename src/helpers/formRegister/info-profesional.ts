export interface ValoresInfoProfesional {
    biografia: string;
    idiomas: string;
    matriculaProfesional: File | null;
    seguro: File | null;
        nombreEmpresa: string,
        ciudad: string,
        provincia: string,
        codigoPostal: number,
        telefonoEmpresa: number,
        experiencia: number,
        descripcion: string

}

export const initialValuesInfoProfesional: ValoresInfoProfesional = {
    biografia: "",
    idiomas: "",
    matriculaProfesional: null,
    seguro: null,
        nombreEmpresa: "",
        ciudad: "",
        provincia: "",
        codigoPostal: 0,
        telefonoEmpresa: 0,
        experiencia: 0,
        descripcion: ""

}

import * as Yup from 'yup';

export const validationSchemaInfoProfesional = Yup.object().shape({
    biografia: Yup.string()
        .required("La biografia es obligatoria"),
    idiomas: Yup.string()
        .required("Debes poner al menos un idioma"),
    matriculaProfesional: Yup.mixed().required('La matricula es obligatoria'),
    
    nombreEmpresa: Yup.string()
        .required("El nombre de la empresa es obligatorio"),

    ciudad: Yup.string()
        .required("La ciudad es obligatoria"),

    provincia: Yup.string()
        .required("La provincia es obligatoria"),

    codigoPostal: Yup.string()
        .matches(/^\d{4,10}$/, "Código postal inválido")
        .required("El código postal es obligatorio"),

    telefonoEmpresa: Yup.string()
        .required('El número de teléfono es obligatorio')
        .matches(/^\d{2}\s?\d{4}\s?\d{4}$/, 'El número debe tener 10 dígitos, puede incluir espacios'),
        

    experiencia: Yup.number()
        .typeError("Debe ser un número")
        .min(0, "No puede ser negativo")
        .max(100, "Máximo 100 años")
        .nullable(), 

    descripcion: Yup.string()
        .required("La descripción del puesto es obligatoria")
})


