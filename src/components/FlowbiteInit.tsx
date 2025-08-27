'use client';
import { useEffect } from 'react';

export default function FlowbiteInit() {
  useEffect(() => {
    // Inicializar Flowbite cuando el componente se monta
    if (typeof window !== 'undefined') {
      import('flowbite').then((flowbite) => {
        try {
          // Verificar que los elementos necesarios existan antes de inicializar
          flowbite.initFlowbite();
        } catch (error) {
          // Suprimir errores de elementos faltantes en Flowbite
          console.warn('Flowbite initialization warning:', error);
        }
      });
    }
  }, []);

  return null; // Este componente no renderiza nada
}
