'use client';
import { Formik } from 'formik';

import Input from '@/components/Input';
import React, { useState } from 'react';
import { RegisterSchemaInfo } from '@/helpers/formRegister/schemaInfoProfesional';
import { Info_Docs } from './Info-Docs';

type FormValues = {
    biografiaProfesional: string;
    idiomas: string;
    matricula: File[];
    seguro: File[];
    agregarInput: { value: string }[];
};

const Info_RegisterForm = () => {
    const handleAgregarIdioma = (values: FormValues, setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void) => {
        const nuevosIdiomas = [...values.agregarInput, { value: '' }];
        setFieldValue('agregarInput', nuevosIdiomas);
    };

    const handleCambioIdiomaExtra = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number,
        values: FormValues,
        setFieldValue: (field: string, value: any) => void
    ) => {
        const nuevosIdiomas = values.agregarInput.map((item, i) => (i === index ? { value: e.target.value } : item));
        setFieldValue('agregarInput', nuevosIdiomas);
    };

    const handleEliminarIdiomaExtra = (index: number, values: FormValues, setFieldValue: (field: string, value: any) => void) => {
        const nuevosIdiomas = values.agregarInput.filter((_, i) => i !== index);
        setFieldValue('agregarInput', nuevosIdiomas);
    };

    return (
        <>
            <Formik<FormValues>
                initialValues={{
                    biografiaProfesional: '',
                    idiomas: '',
                    matricula: [],
                    seguro: [],
                    agregarInput: [],
                }}
                validationSchema={RegisterSchemaInfo}
                onSubmit={(values, { setSubmitting }) => {
                    console.log('submit!');
                    alert('Seguimos al siguiente paso');
                    console.log(values);
                    setSubmitting(false);
                }}
            >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, setFieldValue, setFieldError }) => {
                    console.log(errors);
                    return (
                        <>
                            <form className="flex flex-col" onSubmit={handleSubmit}>
                                <div className="flex flex-col mb-6">
                                    <Input
                                        label="Biografía profesional *"
                                        id="biografiaProfesional"
                                        type="text"
                                        name="biografiaProfesional"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.biografiaProfesional}
                                    />
                                    {typeof errors.biografiaProfesional === 'string' && touched.biografiaProfesional && (
                                        <p className="text-sm text-red-600">{errors.biografiaProfesional}</p>
                                    )}

                                    <div className="my-10">
                                        <Input
                                            label="Idiomas hablados *"
                                            id="idiomas"
                                            type="text"
                                            name="idiomas"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.idiomas}
                                        />
                                        {typeof errors.idiomas === 'string' && touched.idiomas && (
                                            <p className="text-sm text-red-600">{errors.idiomas}</p>
                                        )}

                                        {values.agregarInput.map((idioma, index) => (
                                            <div key={index} className="w-full">
                                                <div className="flex flex-row items-end w-full">
                                                    <Input
                                                        label={`Idioma extra`}
                                                        name={`agregarInput[${index}].value`}
                                                        value={idioma.value}
                                                        onChange={(e) => handleCambioIdiomaExtra(e, index, values, setFieldValue)}
                                                        onBlur={handleBlur}
                                                    />

                                                    <button
                                                        className="mb-3"
                                                        type="button"
                                                        onClick={() => handleEliminarIdiomaExtra(index, values, setFieldValue)}
                                                    >
                                                        Eliminar
                                                    </button>
                                                </div>
                                                {errors.agregarInput?.[index] &&
                                                    typeof errors.agregarInput[index] === 'object' &&
                                                    errors.agregarInput[index].value &&
                                                    touched.agregarInput?.[index]?.value && (
                                                        <p className="text-sm text-red-600">{errors.agregarInput[index].value}</p>
                                                    )}
                                            </div>
                                        ))}

                                        <div className="flex flex-row">
                                            <button
                                                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                                                type="button"
                                                onClick={() => handleAgregarIdioma(values, setFieldValue)}
                                            >
                                                Agregar otro idioma
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <Info_Docs errors={errors} setFieldValue={setFieldValue} touched={touched} />
                            </form>
                        </>
                    );
                }}
            </Formik>
        </>
    );
};

export default Info_RegisterForm;
