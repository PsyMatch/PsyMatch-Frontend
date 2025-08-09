'use client'

import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import CustomInput from '@/components/ui/Custom-input'
import Link from 'next/link'
import { Button } from '@/components/ui/button'



const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Correo electrónico inválido')
    .required('El correo electrónico es requerido'),
  password: Yup.string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .required('La contraseña es requerida'),
})

export default function LoginForm() {
  const handleSubmit = async (values: { email: string; password: string }) => {
    console.log('Login values:', values)
    // aca la lógica para login bro
  }

  return (
    <div className="w-full max-w-sm space-y-4 sm:max-w-md sm:space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">Bienvenido de Vuelta</h1>
        <p className="text-sm text-gray-600 sm:text-base">Ingresa tus credenciales para acceder a tu cuenta</p>
      </div>

      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched, handleChange, handleBlur, values }) => (
          <Form className="space-y-3 sm:space-y-4">
            <CustomInput
              label="Correo electrónico"
              id="email"
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              error={errors.email && touched.email && errors.email}
              placeholder="tu@email.com"
            />

            <CustomInput
              label="Contraseña"
              id="password"
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              error={errors.password && touched.password && errors.password}
              placeholder="Tu contraseña"
            />

            <div className="flex flex-col pt-2 space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full text-white bg-blue-600 sm:flex-1 hover:bg-blue-700"
              >
                Iniciar Sesión
              </Button>
              <Link href="/register-user">
              <Button className="w-full text-black bg-white sm:flex-1 hover:text-blue-700">
                Crear Cuenta 
              </Button>
              </Link>
            </div>
          </Form>
        )}
      </Formik>

      <div className="text-xs text-center text-gray-600 sm:text-sm">
        ¿Eres un profesional de salud mental?{' '}
        <Link href="/professional/register" className="text-blue-600 hover:underline">
          Únete a Nuestra Red
        </Link>
      </div>
    </div>
  )
}