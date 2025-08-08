'use client';
import { Formik } from 'formik';

import { initialValues } from '../../../../../../helpers/formRegister/initialValues';

import PrimeraSeccion from './PrimeraSeccion';
import SegundaSeccion from './SegundaSeccion';
import { RegisterSchema } from '@/helpers/formRegister/schema';

const RegisterForm = () => {
    return (
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={RegisterSchema}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    resetForm();
                    alert('Registrado con exito. Te avisaremos a la brevedad cuando validemos tus credenciales');
                    setSubmitting(false);
                }}
            >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, setFieldValue, setFieldError }) => {
                    console.log(errors);

                    const handleTiposChange = (e: any) => {
                        const { name, checked } = e.target;
                        handleChange(e);

                        if (!checked) {
                            switch (name) {
                                case 'tipos.individual':
                                    setFieldValue('sesionIndividual', '');
                                    setFieldError('sesionIndividual', undefined);
                                    break;
                                case 'tipos.pareja':
                                    setFieldValue('sesionDePareja', '');
                                    setFieldError('sesionDePareja', undefined);
                                    break;
                                case 'tipos.familia':
                                    setFieldValue('sesionFamilia', '');
                                    setFieldError('sesionFamilia', undefined);
                                    break;
                                case 'tipos.grupo':
                                    setFieldValue('sesionGrupo', '');
                                    setFieldError('sesionGrupo', undefined);
                                    break;
                            }
                        }
                    };
                    return (
                        <>
                            <form onSubmit={handleSubmit}>
                                <PrimeraSeccion
                                    errors={errors}
                                    touched={touched}
                                    handleChange={handleChange}
                                    handleTiposChange={handleTiposChange}
                                    handleBlur={handleBlur}
                                />

                                <SegundaSeccion
                                    errors={errors}
                                    touched={touched}
                                    handleChange={handleChange}
                                    handleBlur={handleBlur}
                                    values={values}
                                />
                            </form>
                        </>
                    );
                }}
            </Formik>
        </>
    );
};

export default RegisterForm;
