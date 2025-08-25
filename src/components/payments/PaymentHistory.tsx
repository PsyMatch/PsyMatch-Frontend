'use client';

import React from 'react';
import { usePayments } from '@/hooks/usePayments';
import { Payment } from '@/services/payments';

interface PaymentHistoryProps {
  className?: string;
  userType?: 'patient' | 'psychologist' | 'admin';
}

const PaymentStatusBadge = ({ status }: { status: string }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'bg-green-100 text-green-800';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'FAILED':
        return 'bg-red-100 text-red-800';
      case 'REFUNDED':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'Completado';
      case 'PENDING':
        return 'Pendiente';
      case 'FAILED':
        return 'Fallido';
      case 'REFUNDED':
        return 'Reembolsado';
      default:
        return status;
    }
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
        status
      )}`}
    >
      {getStatusText(status)}
    </span>
  );
};

const PaymentMethodBadge = ({ method }: { method: string }) => {
  const getMethodText = (method: string) => {
    switch (method) {
      case 'MERCADO_PAGO':
        return 'Mercado Pago';
      case 'CREDIT_CARD':
        return 'Tarjeta de Crédito';
      case 'DEBIT_CARD':
        return 'Tarjeta de Débito';
      case 'PAYPAL':
        return 'PayPal';
      case 'BANK_TRANSFER':
        return 'Transferencia';
      default:
        return method;
    }
  };

  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
      {getMethodText(method)}
    </span>
  );
};

export default function PaymentHistory({ className, userType = 'patient' }: PaymentHistoryProps) {
  const { payments, professionalPayments, loading, error, refetch } = usePayments();
  
  // Seleccionar los pagos correctos según el tipo de usuario
  const displayPayments = userType === 'psychologist' ? professionalPayments : payments;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatAmount = (amount: number, currency: string) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: currency === 'ARS' ? 'ARS' : 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  if (loading) {
    return (
      <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <svg
              className="mx-auto h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L3.314 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Error al cargar los pagos
          </h3>
          <p className="text-gray-500 mb-4">{error}</p>
          <button
            onClick={refetch}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-md ${className}`}>
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">
            {userType === 'psychologist' ? 'Pagos Recibidos' : 'Historial de Pagos'}
          </h2>
          <button
            onClick={refetch}
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="p-6">
        {displayPayments.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-400 mb-4">
              <svg
                className="mx-auto h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No hay pagos registrados
            </h3>
            <p className="text-gray-500">
              {userType === 'psychologist' 
                ? 'Aquí aparecerán los pagos que recibas de tus consultas.'
                : 'Aquí aparecerán tus pagos cuando realices alguna transacción.'
              }
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {displayPayments.map((payment: Payment) => (
              <div
                key={payment.payment_id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <PaymentStatusBadge status={payment.pay_status} />
                      <PaymentMethodBadge method={payment.pay_method} />
                    </div>
                    <p className="text-sm text-gray-600">
                      ID: {payment.payment_id.substring(0, 8)}...
                    </p>
                    {payment.mercado_pago_id && (
                      <p className="text-sm text-gray-600">
                        MP ID: {payment.mercado_pago_id}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-gray-900">
                      {formatAmount(payment.amount, payment.currency)}
                    </p>
                    <p className="text-sm text-gray-500">
                      {formatDate(payment.created_at)}
                    </p>
                  </div>
                </div>

                {payment.notes && (
                  <div className="mt-3 p-3 bg-gray-50 rounded-md">
                    <p className="text-sm text-gray-700">{payment.notes}</p>
                  </div>
                )}

                {payment.payer_email && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Email:</span>{' '}
                      {payment.payer_email}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
