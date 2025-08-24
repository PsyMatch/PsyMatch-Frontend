const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export interface Payment {
  payment_id: string;
  appointment_id?: string;
  user_id?: string;
  amount: number;
  currency: string;
  pay_method: string;
  pay_status: string;
  mercado_pago_id?: string;
  preference_id?: string;
  payer_email?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface CreatePaymentData {
  appointment_id?: string;
  user_id?: string;
  amount: number;
  currency?: string;
  pay_method: string;
  notes?: string;
}

export interface MercadoPagoPreference {
  init_point: string;
  preference_id: string;
}

export const paymentsApi = {
  // Crear preferencia de MercadoPago
  createMercadoPagoPreference: async (
    userId?: string,
    appointmentId?: string,
    amount?: number,
    token?: string
  ): Promise<MercadoPagoPreference> => {
    // Construir la URL con los parámetros
    const params = new URLSearchParams();
    if (userId) params.append('userId', userId);
    if (appointmentId) params.append('appointmentId', appointmentId);
    if (amount) params.append('amount', amount.toString());

    const url = `${API_BASE_URL}/payments/mercadopago-preference${params.toString() ? `?${params.toString()}` : ''}`;

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      method: 'POST',
      headers,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error creating MercadoPago preference');
    }

    return response.json();
  },

  // Crear pago
  createPayment: async (paymentData: CreatePaymentData, token: string): Promise<Payment> => {
    const response = await fetch(`${API_BASE_URL}/payments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(paymentData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error processing payment');
    }

    return response.json();
  },

  // Obtener todos los pagos (solo admin)
  getAllPayments: async (token: string): Promise<Payment[]> => {
    const response = await fetch(`${API_BASE_URL}/payments`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Error fetching payments');
    }

    return response.json();
  },

  // Obtener pagos de un usuario específico
  getUserPayments: async (userId: string, token: string): Promise<Payment[]> => {
    const response = await fetch(`${API_BASE_URL}/payments/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Error fetching user payments');
    }

    return response.json();
  },

  // Obtener pagos recibidos por un profesional
  getProfessionalPayments: async (professionalId: string, token: string): Promise<Payment[]> => {
    const response = await fetch(`${API_BASE_URL}/payments/professional/${professionalId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Error fetching professional payments');
    }

    return response.json();
  },

  // Obtener pago por ID
  getPaymentById: async (paymentId: string, token: string): Promise<Payment> => {
    const response = await fetch(`${API_BASE_URL}/payments/${paymentId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Payment not found');
    }

    return response.json();
  },

  // Actualizar pago (solo admin)
  updatePayment: async (
    paymentId: string,
    updateData: Partial<Payment>,
    token: string
  ): Promise<Payment> => {
    const response = await fetch(`${API_BASE_URL}/payments/${paymentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updateData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error updating payment');
    }

    return response.json();
  },

  // Eliminar pago (solo admin)
  deletePayment: async (paymentId: string, token: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/payments/${paymentId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error deleting payment');
    }
  },
};
