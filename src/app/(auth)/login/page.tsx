"use client";

import LoginForm from "@/components/login-form/Login-form";
import Link from "next/link";

const LoginPage =() => {
  return (
    <div className="flex flex-col min-h-screen lg:flex-row">
      <div className="flex items-center justify-center w-full h-32 lg:w-1/2 lg:h-auto bg-gradient-to-br from-blue-500 to-indigo-800 lg:order-1">
        <div className="text-center text-white lg:hidden">
          <h2 className="text-xl font-bold">Bienvenido</h2>
          <p className="text-sm opacity-90">Accede a tu cuenta</p>
        </div>
      </div>
      <div className="flex items-center flex-grow justify-center w-full p-4 bg-gray-100 lg:w-1/2 sm:p-6 lg:p-8 lg:order-2">
        <div className="w-full max-w-sm space-y-4 sm:max-w-md sm:space-y-6">
          <LoginForm />
          <div className="text-xs text-center text-gray-600 sm:text-sm">
            ¿No tienes cuenta?{' '}
            <Link href="/register-user" className="text-blue-500 hover:underline">
              Regístrate
            </Link>
          </div>
          <div className="text-xs text-center text-gray-600 sm:text-sm">
            <Link href="/password/send-mail" className="text-blue-500 hover:underline">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default LoginPage;
