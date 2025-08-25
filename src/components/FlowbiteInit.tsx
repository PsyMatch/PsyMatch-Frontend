'use client';
import { useEffect } from 'react';

export default function FlowbiteInit() {
  useEffect(() => {
    // Inicializar Flowbite cuando el componente se monta
    if (typeof window !== 'undefined') {
      import('flowbite').then((flowbite) => {
        flowbite.initFlowbite();
      });
    }
  }, []);

  return null; // Este componente no renderiza nada
}
