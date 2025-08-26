export enum AppointmentDisplayStatus {
  PENDING_PAYMENT = 'pending_payment',
  PENDING_APPROVAL = 'pending_approval', 
  CONFIRMED = 'confirmed',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export interface AppointmentWithPayment {
  id: string;
  date: string;
  hour: string;
  status: string;
  duration?: number;
  notes?: string;
  modality: string;
  session_type?: string;
  therapy_approach?: string;
  insurance?: string;
  price?: number;
  patient?: {
    id: string;
    name: string;
    email: string;
  };
  psychologist?: {
    id: string;
    name: string;
    email: string;
  };
  payment?: {
    payment_id: string;
    pay_status: string;
    amount: number;
    created_at: string;
  };
}

export interface StatusInfo {
  status: AppointmentDisplayStatus;
  label: string;
  color: string;
  description: string;
  canCancel: boolean;
  canPay: boolean;
  canApprove: boolean;
  canConfirmCompletion: boolean;
  isTimeToConfirm: boolean;
}

/**
 * Determina el estado real de un turno basado en:
 * - Estado del turno en base de datos
 * - Estado del pago asociado
 * - Tiempo transcurrido desde la cita
 */
export function getAppointmentDisplayStatus(appointment: AppointmentWithPayment): StatusInfo {
  const now = new Date();
  const appointmentDateTime = new Date(`${appointment.date}T${appointment.hour}`);
  const sessionEndTime = new Date(appointmentDateTime.getTime() + (appointment.duration || 45) * 60000);
  const timeToConfirm = new Date(sessionEndTime.getTime() + 45 * 60000); // 45 min después del fin de sesión
  
  // Si fue cancelado, ese estado prevalece
  if (appointment.status === 'cancelled') {
    return {
      status: AppointmentDisplayStatus.CANCELLED,
      label: 'Cancelado',
      color: 'bg-red-100 text-red-800',
      description: 'Esta cita fue cancelada',
      canCancel: false,
      canPay: false,
      canApprove: false,
      canConfirmCompletion: false,
      isTimeToConfirm: false,
    };
  }

  // Si ya pasó el tiempo para confirmar completitud y no está marcado como completado
  const isTimeToConfirm = now >= timeToConfirm;
  
  if (appointment.status === 'completed') {
    return {
      status: AppointmentDisplayStatus.COMPLETED,
      label: 'Realizado',
      color: 'bg-blue-100 text-blue-800',
      description: 'La sesión fue realizada y confirmada',
      canCancel: false,
      canPay: false,
      canApprove: false,
      canConfirmCompletion: false,
      isTimeToConfirm: false,
    };
  }

  // Lógica basada en estados de pago y aprobación
  const hasPayment = appointment.payment;
  const isPaymentCompleted = hasPayment && appointment.payment!.pay_status === 'COMPLETED';
  
  // Priorizar el estado del appointment sobre el estado del pago
  
  // Estado PENDING_APPROVAL - Pagado pero no aprobado
  if (appointment.status === 'pending_approval') {
    return {
      status: AppointmentDisplayStatus.PENDING_APPROVAL,
      label: 'Pendiente de aprobación',
      color: 'bg-orange-100 text-orange-800',
      description: 'El pago fue procesado, esperando aprobación del psicólogo',
      canCancel: true,
      canPay: false,
      canApprove: true,
      canConfirmCompletion: false,
      isTimeToConfirm: false,
    };
  }
  
  // Estado PENDING o PENDING_PAYMENT - Sin pago o pago pendiente
  if (appointment.status === 'pending' || appointment.status === 'pending_payment' || 
      (!hasPayment || appointment.payment!.pay_status === 'PENDING')) {
    return {
      status: AppointmentDisplayStatus.PENDING_PAYMENT,
      label: 'Pendiente de pago',
      color: 'bg-yellow-100 text-yellow-800',
      description: 'El turno está reservado pero aún no se ha realizado el pago',
      canCancel: true,
      canPay: true,
      canApprove: false,
      canConfirmCompletion: false,
      isTimeToConfirm: false,
    };
  }

  // Confirmado por psicólogo
  if (isPaymentCompleted && appointment.status === 'confirmed') {
    // Si ya pasó el tiempo, necesita confirmación de realización
    if (isTimeToConfirm) {
      return {
        status: AppointmentDisplayStatus.CONFIRMED,
        label: 'Confirmado - Confirmar realización',
        color: 'bg-green-100 text-green-800',
        description: 'La sesión está confirmada. Confirme si se realizó',
        canCancel: false,
        canPay: false,
        canApprove: false,
        canConfirmCompletion: true,
        isTimeToConfirm: true,
      };
    }
    
    return {
      status: AppointmentDisplayStatus.CONFIRMED,
      label: 'Confirmado',
      color: 'bg-green-100 text-green-800',
      description: 'La cita está confirmada y lista para realizarse',
      canCancel: true,
      canPay: false,
      canApprove: false,
      canConfirmCompletion: false,
      isTimeToConfirm: false,
    };
  }

  // Fallback - estado pendiente de pago
  return {
    status: AppointmentDisplayStatus.PENDING_PAYMENT,
    label: 'Pendiente de pago',
    color: 'bg-yellow-100 text-yellow-800',
    description: 'Estado no determinado - pendiente de pago',
    canCancel: true,
    canPay: true,
    canApprove: false,
    canConfirmCompletion: false,
    isTimeToConfirm: false,
  };
}

/**
 * Mapea estados del backend a estados de visualización
 * Para compatibilidad con estados antiguos
 */
export function mapBackendStatus(backendStatus: string): AppointmentDisplayStatus {
  const statusMap: Record<string, AppointmentDisplayStatus> = {
    'pending': AppointmentDisplayStatus.PENDING_PAYMENT,
    'pending_payment': AppointmentDisplayStatus.PENDING_PAYMENT,
    'pending_approval': AppointmentDisplayStatus.PENDING_APPROVAL,
    'confirmed': AppointmentDisplayStatus.CONFIRMED,
    'completed': AppointmentDisplayStatus.COMPLETED,
    'cancelled': AppointmentDisplayStatus.CANCELLED,
  };
  
  return statusMap[backendStatus] || AppointmentDisplayStatus.PENDING_PAYMENT;
}
