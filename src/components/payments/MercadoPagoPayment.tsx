'use client';

import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { usePayments } from '@/hooks/usePayments';
import { MercadoPagoPreference } from '@/services/payments';

interface MercadoPagoPaymentProps {
  amount?: number;
  appointmentId?: string;
  onSuccess?: (data: MercadoPagoPreference) => void;
  onError?: (error: string) => void;
  disabled?: boolean;
}

export default function MercadoPagoPayment({
  amount = 5000, // Precio por defecto: $5000 ARS
  appointmentId,
  onSuccess,
  onError,
  disabled = false,
}: MercadoPagoPaymentProps) {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { createMercadoPagoPreference } = usePayments();

  const handlePayment = async () => {
    if (!user) {
      onError?.('Debes iniciar sesión para realizar un pago');
      return;
    }

    try {
      setLoading(true);
      
      // Crear preferencia de pago en MercadoPago con el monto y appointmentId
      const preference = await createMercadoPagoPreference(
        user.id,
        appointmentId,
        amount
      );
      
      // Redirigir al usuario a MercadoPago
      window.location.href = preference.init_point;
      
      onSuccess?.(preference);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al procesar el pago';
      onError?.(errorMessage);
      console.error('Error creating MercadoPago preference:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Pagar con Mercado Pago
        </h3>
        <p className="text-gray-600">
          Realiza tu pago de forma segura a través de Mercado Pago
        </p>
      </div>

      <div className="mb-6">
        <div className="bg-gray-50 p-4 rounded-md">
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Monto a pagar:</span>
            <span className="text-xl font-bold text-green-600">
              ${amount} ARS
            </span>
          </div>
          {appointmentId && (
            <div className="flex justify-between items-center mt-2">
              <span className="text-gray-700">Cita:</span>
              <span className="text-sm text-gray-500">
                {appointmentId.substring(0, 8)}...
              </span>
            </div>
          )}
        </div>
      </div>

      <button
        onClick={handlePayment}
        disabled={disabled || loading}
        className={`w-full py-3 px-4 rounded-md font-medium transition-colors ${
          disabled || loading
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
        }`}
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Procesando...
          </div>
        ) : (
          'Pagar con Mercado Pago'
        )}
      </button>

      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500">
          Al continuar, serás redirigido a Mercado Pago para completar tu pago de forma segura.
        </p>
      </div>
    </div>
  );
}
