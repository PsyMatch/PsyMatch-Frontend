// Hook personalizado para notificaciones
// Uso: const notifications = useNotifications();

// Ejemplos de uso:

// 1. Éxito
notifications.success('Operación completada exitosamente');

// 2. Error
notifications.error('Hubo un problema al procesar la solicitud');

// 3. Advertencia
notifications.warning('Por favor revisa los datos ingresados');

// 4. Información
notifications.info('Se ha enviado un email de confirmación');

// Casos comunes reemplazados:

// ANTES: alert('Registro exitoso. Por favor inicia sesión.');
// AHORA: notifications.success('Registro exitoso. Por favor inicia sesión.');

// ANTES: alert('Error al crear la cuenta');
// AHORA: notifications.error('Error al crear la cuenta');

// ANTES: alert('El horario seleccionado ya no está disponible');
// AHORA: notifications.warning('El horario seleccionado ya no está disponible');

// ANTES: alert('Por favor, completa todos los campos requeridos');
// AHORA: notifications.warning('Por favor, completa todos los campos requeridos');

// Configuración automática:
// - ToastContainer ya está configurado en layout.tsx
// - Los estilos de react-toastify ya están importados
// - Posición: top-right
// - Auto-cierre: 3-5 segundos dependiendo del tipo
// - Se pueden cerrar haciendo click
// - Pausan al hacer hover
// - Son arrastrables
