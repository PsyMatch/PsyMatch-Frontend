'use client';

import { useNotifications } from '@/hooks/useNotifications';

const NotificationTestComponent = () => {
  const notifications = useNotifications();

  const handleTestSuccess = () => {
    notifications.success('¡Operación completada exitosamente!');
  };

  const handleTestError = () => {
    notifications.error('Algo salió mal. Por favor intenta nuevamente.');
  };

  const handleTestWarning = () => {
    notifications.warning('Por favor revisa los datos antes de continuar.');
  };

  const handleTestInfo = () => {
    notifications.info('Te hemos enviado un email con más información.');
  };

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-bold">Test de Notificaciones</h2>
      <div className="space-x-2">
        <button 
          onClick={handleTestSuccess}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Éxito
        </button>
        <button 
          onClick={handleTestError}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Error
        </button>
        <button 
          onClick={handleTestWarning}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          Advertencia
        </button>
        <button 
          onClick={handleTestInfo}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Información
        </button>
      </div>
    </div>
  );
};

export default NotificationTestComponent;
