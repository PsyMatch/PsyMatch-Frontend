"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { LogOut } from 'lucide-react';

interface LogoutButtonProps {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  showIcon?: boolean;
  children?: React.ReactNode;
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({
  variant = 'outline',
  size = 'default',
  className = '',
  showIcon = true,
  children
}) => {
  const { logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);
    
    try {
      // Llamar a la función logout que ahora es async
      await logout();
    } catch (error) {
      console.error('Error durante logout:', error);
      // Incluso si hay error, la función logout maneja la limpieza local
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={handleLogout}
      disabled={isLoggingOut}
    >
      {showIcon && <LogOut className="w-4 h-4 mr-2" />}
      {children || (isLoggingOut ? 'Cerrando sesión...' : 'Cerrar Sesión')}
    </Button>
  );
};
