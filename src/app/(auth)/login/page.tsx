"use client";

import LoginForm from "@/components/login-form/Login-form";
import Link from "next/link";

const LoginPage =() => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <div className="w-full lg:w-1/2 h-32 lg:h-auto bg-gradient-to-br from-blue-500 to-indigo-800 flex items-center justify-center lg:order-1">
        <div className="text-white text-center lg:hidden">
          <h2 className="text-xl font-bold">Bienvenido</h2>
          <p className="text-sm opacity-90">Accede a tu cuenta</p>
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-gray-100 lg:order-2">
        <div className="w-full max-w-sm sm:max-w-md space-y-4 sm:space-y-6">
          <LoginForm />
          <div className="text-center text-xs sm:text-sm text-gray-600">
            ¿No tienes cuenta?{' '}
            <Link href="/register-user" className="text-blue-500 hover:underline">
              Regístrate
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default LoginPage;
