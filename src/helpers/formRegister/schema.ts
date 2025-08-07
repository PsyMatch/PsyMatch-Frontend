import * as yup from "yup";

export const RegisterSchema = yup.object().shape({
    
    dias: yup
    .object()
    .required("Seleccioná al menos 1 día")
    .test("min-1", "Seleccioná al menos 1 día", (value) => {
        return value && Object.values(value).filter(Boolean).length >= 1;
    }),

    especialidades: yup
        .object()
        .test("min-3", "Seleccioná al menos 3 especialidades", (value) => {
        return value && Object.values(value).filter(Boolean).length >= 3;
        }),

    enfoques: yup
        .object()
        .test("min-2", "Seleccioná al menos 2 enfoques", (value) => {
        return value && Object.values(value).filter(Boolean).length >= 2;
        }),


    tipos: yup
    .object()
    .required("Seleccioná al menos 1 día")
    .test("min-1", "Seleccioná al menos 1 tipo", (value) => {
        return value && Object.values(value).filter(Boolean).length >= 1;
    }),

    modalidades: yup
    .object()
    .required("Seleccioná al menos 1 día")
    .test("min-1", "Seleccioná al menos 1 modalidad", (value) => {
        return value && Object.values(value).filter(Boolean).length >= 1;
    }),

sesionIndividual: yup
  .number()
  .typeError("Debe ser un número válido")
  .positive("Debe ser mayor a cero")
  .when(["tipos"], ([tipos], schema) =>
    tipos?.individual
      ? schema.required("El precio de sesión individual es obligatorio")
      : schema.notRequired()
  ),

sesionDePareja: yup
  .number()
  .typeError("Debe ser un número válido")
  .positive("Debe ser mayor a cero")
  .when(["tipos"], ([tipos], schema) =>
    tipos?.pareja
      ? schema.required("El precio de sesión de pareja es obligatorio")
      : schema.notRequired()
  ),

sesionFamiliar: yup
  .number()
  .typeError("Debe ser un número válido")
  .positive("Debe ser mayor a cero")
  .when(["tipos"], ([tipos], schema) =>
    tipos?.familia
      ? schema.required("El precio de sesión familiar es obligatorio")
      : schema.notRequired()
  ),

sesionGrupo: yup
  .number()
  .typeError("Debe ser un número válido")
  .positive("Debe ser mayor a cero")
  .when(["tipos"], ([tipos], schema) =>
    tipos?.grupo
      ? schema.required("El precio de sesión grupal es obligatorio")
      : schema.notRequired()
  ),


})