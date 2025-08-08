import InputCheckbox from '@/components/InputCheckbox';
import { FormikErrors, FormikTouched } from 'formik';
import { ChangeEvent, FocusEvent } from 'react';
import { arrayEspecialidades } from '@/helpers/formRegister/arrayEspecialidades';
import { arrayEnfoques } from '@/helpers/formRegister/arrayEnfoques';
import { arrayTipos } from '@/helpers/formRegister/arrayTipos';
import { arrayModalidades } from '@/helpers/formRegister/arrayModalidades';

interface PrimeraSeccionProps {
    errors: FormikErrors<any>;
    touched: FormikTouched<any>;
    handleChange: (e: ChangeEvent<any>) => void;
    handleTiposChange: (e: ChangeEvent<any>) => void;
    handleBlur: (e: FocusEvent<any>) => void;
}

const PrimeraSeccion = ({ errors, touched, handleChange, handleTiposChange, handleBlur }: PrimeraSeccionProps) => {
    return (
        <>
            <span className="font-bold">Especialidades* (Selecciona al menos 3)</span>
            {typeof errors.especialidades === 'string' && touched.especialidades && (
                <p className="mt-1 text-sm text-red-600">{errors.especialidades}</p>
            )}
            <div className="grid grid-cols-3 gap-3 mt-4 mb-20 text-sm text-start">
                {arrayEspecialidades.map((especialidad) => (
                    <InputCheckbox
                        key={especialidad.id}
                        label={especialidad.label}
                        id={especialidad.id}
                        type="checkbox"
                        name={`especialidades.${especialidad.id}`}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={especialidad.value}
                    />
                ))}
            </div>

            <span className="font-bold">Enfoques terapéuticos* (Selecciona al menos 2)</span>
            {typeof errors.enfoques === 'string' && touched.enfoques && <p className="mt-1 text-sm text-red-600">{errors.enfoques}</p>}
            <div className="grid grid-cols-2 gap-3 mt-4 mb-20 text-sm text-start">
                {arrayEnfoques.map((enfoque) => (
                    <InputCheckbox
                        key={enfoque.id}
                        label={enfoque.label}
                        id={enfoque.id}
                        type="checkbox"
                        name={`enfoques.${enfoque.id}`}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={enfoque.value}
                    />
                ))}
            </div>

            <span className="font-bold">Tipos de sesión ofrecidos</span>
            {typeof errors.tipos === 'string' && touched.tipos && <p className="mt-1 text-sm text-red-600">{errors.tipos}</p>}
            <div className="grid grid-cols-3 gap-3 mt-4 mb-10 text-sm text-start">
                {arrayTipos.map((tipos) => (
                    <InputCheckbox
                        key={tipos.id}
                        label={tipos.label}
                        id={tipos.id}
                        type="checkbox"
                        name={`tipos.${tipos.id}`}
                        onChange={handleTiposChange}
                        onBlur={handleBlur}
                        value={tipos.value}
                    />
                ))}
            </div>

            <span className="font-bold">Modalidades de servicio</span>
            {typeof errors.modalidades === 'string' && touched.modalidades && <p className="mt-1 text-sm text-red-600">{errors.modalidades}</p>}
            <div className="grid grid-cols-3 gap-3 mt-4 text-sm text-start">
                {arrayModalidades.map((modalidad) => (
                    <InputCheckbox
                        key={modalidad.id}
                        label={modalidad.label}
                        id={modalidad.id}
                        type="checkbox"
                        name={`modalidades.${modalidad.id}`}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={modalidad.value}
                    />
                ))}
            </div>
        </>
    );
};

export default PrimeraSeccion;
