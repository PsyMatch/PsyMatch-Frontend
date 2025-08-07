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
    <div className="w-full max-w-sm sm:max-w-md space-y-4 sm:space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Bienvenido de Vuelta</h1>
        <p className="text-sm sm:text-base text-gray-600">Ingresa tus credenciales para acceder a tu cuenta</p>
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

            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 pt-2">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:flex-1 bg-blue-600  hover:bg-blue-700 text-white"
              >
                Iniciar Sesión
              </Button>
              <Link href="/register-user">
              <Button className="w-full sm:flex-1 bg-white hover:text-blue-700  text-black">
                Crear Cuenta 
              </Button>
              </Link>
            </div>
          </Form>
        )}
      </Formik>

      <div className="text-center text-xs sm:text-sm text-gray-600">
        ¿Eres un profesional de salud mental?{' '}
        <a href="#" className="text-blue-600 hover:underline">
          Únete a Nuestra Red
        </a>
      </div>
    </div>
  )
}