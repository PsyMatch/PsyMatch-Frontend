import { arrayEspecialidades } from "./arrayEspecialidades";
import { arrayEnfoques } from "./arrayEnfoques";
import { arrayTipos } from "./arrayTipos";
import { arrayObrasSociales } from "./arrayObras";
import { arrayDiasSemana } from "./arrayDias";
import { arrayModalidades } from "./arrayModalidades";

const generarInitialValues = (array: { id: string }[]): Record<string, boolean> => {
  return array.reduce<Record<string, boolean>>((acc, field) => {
    acc[field.id] = false;
    return acc;
  }, {});
};


export const initialValues = { 
  especialidades: generarInitialValues(arrayEspecialidades),
  enfoques: generarInitialValues(arrayEnfoques),
  tipos: generarInitialValues(arrayTipos),
  modalidades: generarInitialValues(arrayModalidades),
  obras: generarInitialValues(arrayObrasSociales),
  dias: generarInitialValues(arrayDiasSemana),
  sesionDePareja: "",
  sesionIndividual: "",
  sesionFamiliar: "",
  sesionGrupal: "",
  horarioInicial: "",
  horarioFinal: ""
}



