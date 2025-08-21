"use client";

import { Button } from '@/components/ui/button';
import { envs } from '@/config/envs.config';

interface GoogleLoginButtonProps {
  className?: string;
  size?: 'default' | 'sm' | 'lg';
}

export const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({ 
  className = '', 
  size = 'default' 
}) => {
  const handleGoogleLogin = () => {
    // Redirige directamente al endpoint de Google Auth del backend
    window.location.href = `${envs.next_public_api_url}/auth/google`;
  };

  return (
    <Button
      type="button"
      onClick={handleGoogleLogin}
      size={size}
      className={`
        flex items-center justify-center gap-3 px-6 py-3 
        font-medium text-gray-700 transition-all 
        bg-white border border-gray-300 rounded-lg shadow-sm 
        hover:bg-gray-50 hover:shadow-md
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
    >
      <svg 
        width="20" 
        height="20" 
        viewBox="0 0 48 48" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_17_40)">
          <path
            d="M47.532 24.552c0-1.636-.146-3.2-.418-4.704H24.48v9.02h13.02c-.56 3.02-2.24 5.58-4.76 7.3v6.06h7.7c4.5-4.14 7.09-10.24 7.09-17.68z"
            fill="#4285F4"
          />
          <path
            d="M24.48 48c6.48 0 11.92-2.14 15.89-5.82l-7.7-6.06c-2.14 1.44-4.88 2.3-8.19 2.3-6.3 0-11.64-4.26-13.56-9.98H2.6v6.24C6.56 43.98 14.7 48 24.48 48z"
            fill="#34A853"
          />
          <path
            d="M10.92 28.44c-.5-1.44-.8-2.98-.8-4.44s.3-3 .8-4.44v-6.24H2.6A23.97 23.97 0 000 24c0 3.98.96 7.76 2.6 11.24l8.32-6.8z"
            fill="#FBBC05"
          />
          <path
            d="M24.48 9.52c3.54 0 6.68 1.22 9.16 3.62l6.86-6.86C36.4 2.14 30.96 0 24.48 0 14.7 0 6.56 4.02 2.6 10.76l8.32 6.24c1.92-5.72 7.26-9.98 13.56-9.98z"
            fill="#EA4335"
          />
        </g>
        <defs>
          <clipPath id="clip0_17_40">
            <rect width="48" height="48" fill="white" />
          </clipPath>
        </defs>
      </svg>
      <span>Continuar con Google</span>
    </Button>
  );
};
