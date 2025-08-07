"use client";

import RegisterForm from "@/components/register-user-form/Registerform";
import Link from "next/link";

const  RegisterUserPage = () => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Register form on left (desktop) / bottom (mobile) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-gray-100 order-2 lg:order-1">
        <div className="w-full max-w-sm sm:max-w-md space-y-4 sm:space-y-6">
          <RegisterForm />
          <div className="flex justify-center text-xs sm:text-sm text-gray-600">
            <span>
              ¿Ya tienes cuenta?{' '}
              <Link href="/login" className="text-blue-600 hover:underline">
                Inicia Sesión
              </Link>
            </span>
          </div>
        </div>
      </div>
      {/* Register - Purple background on right (desktop) / top (mobile) */}
      <div className="w-full lg:w-1/2 h-32 lg:h-auto bg-gradient-to-br from-purple-500 to-indigo-900 flex items-center justify-center order-1 lg:order-2">
        <div className="text-white text-center lg:hidden">
          <h2 className="text-xl font-bold">Únete a nosotros</h2>
          <p className="text-sm opacity-90">Crea tu cuenta</p>
        </div>
      </div>
    </div>
  );
}
export default RegisterUserPage;
