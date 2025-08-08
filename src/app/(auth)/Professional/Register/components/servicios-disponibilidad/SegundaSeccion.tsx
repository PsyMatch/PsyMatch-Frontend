import InputCheckbox from '@/components/InputCheckbox';
import { FormikErrors, FormikTouched, FormikValues } from 'formik';
import { ChangeEvent, FocusEvent } from 'react';
import Input from '@/components/Input';
import { arrayObrasSociales } from '@/helpers/formRegister/arrayObras';
import { arrayDiasSemana } from '@/helpers/formRegister/arrayDias';
import { CalendarCheck } from 'lucide-react';

interface SegundaSeccionProps {
    errors: FormikErrors<any>;
    touched: FormikTouched<any>;
    values: FormikValues;
    handleChange: (e: ChangeEvent<any>) => void;
    handleBlur: (e: FocusEvent<any>) => void;
}

const SegundaSeccion = ({ errors, touched, handleChange, handleBlur, values }: SegundaSeccionProps) => {
    return (
        <>
            <div className="flex flex-col space-y-1.5 my-10">
                <div className="text-2xl font-semibold leading-none tracking-tight flex items-center">
                    <CalendarCheck className="h-5 w-5 mr-2" />
                    Precios y Disponibilidad
                </div>
                <div className="text-sm text-gray-500">Establece tus tarifas y disponibilidad</div>
            </div>

            <span className="font-bold ">Tarifa de Sesiones * </span>

            <div className="grid grid-cols-2 mb-10">
                {!values.tipos.pareja && !values.tipos.individual && !values.tipos.grupo && !values.tipos.familia && (
                    <span className="text-violet-600">Primero elige el tipo de sesion </span>
                )}

                {values.tipos?.pareja && (
                    <div className="flex flex-col">
                        <Input
                            label="Sesión de Pareja"
                            id="sesionDePareja"
                            type="text"
                            name="sesionDePareja"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.sesionDePareja}
                        />
                        {typeof errors.sesionDePareja === 'string' && touched.sesionDePareja && (
                            <p className="text-sm text-red-600">{errors.sesionDePareja}</p>
                        )}
                    </div>
                )}

                {values.tipos?.individual && (
                    <div className="flex flex-col">
                        <Input
                            label="Sesión Individual"
                            id="sesionIndividual"
                            type="text"
                            name="sesionIndividual"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.sesionIndividual}
                        />
                        {typeof errors.sesionIndividual === 'string' && touched.sesionIndividual && (
                            <p className="text-sm text-red-600">{errors.sesionIndividual}</p>
                        )}
                    </div>
                )}

                {values.tipos?.familia && (
                    <div className="flex flex-col">
                        <Input
                            label="Sesión Familiar"
                            id="sesionFamiliar"
                            type="text"
                            name="sesionFamiliar"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.sesionFamiliar}
                        />
                        {typeof errors.sesionFamiliar === 'string' && touched.sesionFamiliar && (
                            <p className="text-sm text-red-600">{errors.sesionFamiliar}</p>
                        )}
                    </div>
                )}

                {values.tipos?.grupo && (
                    <div className="flex flex-col">
                        <Input
                            label="Sesión Grupal"
                            id="sesionGrupal"
                            type="text"
                            name="sesionGrupal"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.sesionGrupal}
                        />
                        {typeof errors.sesionGrupal === 'string' && touched.sesionGrupal && (
                            <p className="text-sm text-red-600">{errors.sesionGrupal}</p>
                        )}
                    </div>
                )}
            </div>

            <span className="font-bold">Obras Sociales Aceptadas</span>
            <div className="grid grid-cols-3 gap-3 mt-4 mb-20 text-sm text-start">
                {arrayObrasSociales.map((obra) => (
                    <InputCheckbox
                        key={obra.id}
                        label={obra.label}
                        id={obra.id}
                        type="checkbox"
                        name={`obra.${obra.id}`}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={obra.value}
                    />
                ))}
            </div>

            <span className="font-bold">Días Disponibles</span>
            {typeof errors.dias === 'string' && touched.dias && <p className="mt-1 text-sm text-red-600">{errors.dias}</p>}
            <div className="grid grid-cols-3 gap-3 mt-4 mb-10 text-sm text-start">
                {arrayDiasSemana.map((dia) => (
                    <div key={dia.id}>
                        <InputCheckbox
                            key={dia.id}
                            label={dia.label}
                            id={dia.id}
                            type="checkbox"
                            name={`dias.${dia.id}`}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={dia.value}
                        />

                        {values.dias?.[dia.id] && (
                            <>
                                <Input
                                    type="text"
                                    label="Desde:"
                                    name={`horarioInicial.${dia.id}`}
                                    id={`horarioInicial.${dia.id}`}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.horarioInicial?.[dia.id] || ''}
                                />
                                {(errors.horarioInicial as Record<string, string>)?.[dia.id] &&
                                    (touched.horarioInicial as Record<string, boolean>)?.[dia.id] && (
                                        <p className="text-sm text-red-600">{(errors.horarioInicial as Record<string, string>)[dia.id]}</p>
                                    )}
                                <Input
                                    type="text"
                                    label="Hasta:"
                                    name={`horarioFinal.${dia.id}`}
                                    id={`horarioFinal.${dia.id}`}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.horarioFinal?.[dia.id] || ''}
                                />
                                {(errors.horarioFinal as Record<string, string>)?.[dia.id] &&
                                    (touched.horarioFinal as Record<string, boolean>)?.[dia.id] && (
                                        <p className="text-sm text-red-600">{(errors.horarioFinal as Record<string, string>)[dia.id]}</p>
                                    )}
                            </>
                        )}
                    </div>
                ))}
            </div>
        </>
    );
};

export default SegundaSeccion;
