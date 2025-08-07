import * as yup from "yup";

const archivoSchema = yup
  .mixed()
  .test("required", "Debés subir al menos una imagen", (value) => {
    if (!value) return false;
    const files = Array.isArray(value)
      ? value
      : value instanceof FileList
      ? Array.from(value)
      : [];

    return files.length > 0;
  })
  .test("maxFiles", "No podés subir más de 2 imágenes", (value) => {
    const files = Array.isArray(value)
      ? value
      : value instanceof FileList
      ? Array.from(value)
      : [];
    return files.length <= 2;
  })
  .test("fileType", "Solo se permiten imágenes jpg, jpeg o png", (value) => {
    const files = Array.isArray(value)
      ? value
      : value instanceof FileList
      ? Array.from(value)
      : [];

    return files.every((file) =>
      file instanceof File &&
      ["image/jpeg", "image/png", "image/jpg"].includes(file.type)
    );
  });

export const RegisterSchemaInfo = yup.object().shape({
  biografiaProfesional: yup
    .string()
    .required("La biografía profesional es obligatoria")
    .min(10, "La biografía debe tener al menos 10 caracteres"),

  idiomas: yup
    .string()
    .required("Debés ingresar al menos un idioma")
    .min(3, "El idioma debe tener al menos 3 caracteres"),

  // Validación para los idiomas adicionales
    agregarInput: yup.array().of(
    yup.object().shape({
        value: yup
        .string()
        .required("El idioma adicional no puede estar vacío")
        .min(2, "El idioma debe tener al menos 2 caracteres"),
    })
    ),

    matricula: archivoSchema,
    seguro: archivoSchema,
  
});


