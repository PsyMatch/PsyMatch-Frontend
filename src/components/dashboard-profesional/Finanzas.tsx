'use client';
import React, { useState } from 'react';
import PaymentHistory from '@/components/payments/PaymentHistory';
import MercadoPagoPayment from '@/components/payments/MercadoPagoPayment';
import { usePayments } from '@/hooks/usePayments';
import { useAuth } from '@/hooks/useAuth';

const Finanzas = () => {
    const [showPaymentForm, setShowPaymentForm] = useState(false);
    const { payments, professionalPayments } = usePayments();
    const { user } = useAuth();

    // Detectar tipo de usuario automáticamente
    const userType = user?.role === 'PSYCHOLOGIST' ? 'psychologist' : 'patient';
    const displayPayments = userType === 'psychologist' ? professionalPayments : payments;

    const handlePaymentSuccess = () => {
        setShowPaymentForm(false);
        // El componente PaymentHistory se actualizará automáticamente
        window.location.reload(); // Temporal, idealmente usaríamos el refetch del hook
    };

    const handlePaymentError = (error: string) => {
        alert(`Error en el pago: ${error}`);
    };

    // Calcular estadísticas básicas
    const completedPayments = displayPayments.filter(p => p.pay_status === 'COMPLETED');
    const totalAmount = completedPayments.reduce((sum, payment) => sum + payment.amount, 0);
    const lastPayment = completedPayments.length > 0 
        ? completedPayments[0] 
        : null;

    return (
        <div className="flex flex-col gap-6 px-8 py-8 h-fit">
            {/* Header */}
            <div className="mb-4">
                <h1 className="text-xl font-semibold text-black">
                    {userType === 'psychologist' ? 'Ingresos' : 'Mis Pagos'}
                </h1>
                <span className="text-gray-600">
                    {userType === 'psychologist' 
                        ? 'Gestiona tus ingresos y comisiones' 
                        : 'Historial de pagos y transacciones'
                    }
                </span>
            </div>

            {/* Stats Cards - Solo para usuarios que pagan */}
            {userType === 'patient' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-gray-50 p-4 rounded-lg border">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <svg
                                    className="h-5 w-5 text-gray-400"
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
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-500">Total Gastado</p>
                                <p className="text-lg font-semibold text-gray-900">
                                    ${totalAmount.toFixed(2)} ARS
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg border">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <svg
                                    className="h-5 w-5 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-500">Pagos Realizados</p>
                                <p className="text-lg font-semibold text-gray-900">
                                    {completedPayments.length}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg border">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <svg
                                    className="h-5 w-5 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M8 7V3a4 4 0 118 0v4m-4 8a4 4 0 11-8 0v-1a2 2 0 012-2h4.586a1 1 0 01.707.293l2.414 2.414a1 1 0 01.293.707V17a2 2 0 01-2 2H8a2 2 0 01-2-2v-1z"
                                    />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-500">Último Pago</p>
                                <p className="text-lg font-semibold text-gray-900">
                                    {lastPayment 
                                        ? `$${lastPayment.amount.toFixed(2)}` 
                                        : '-'
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Stats Cards - Para psicólogos mostrar ingresos */}
            {userType === 'psychologist' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-gray-50 p-4 rounded-lg border">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <svg
                                    className="h-5 w-5 text-gray-400"
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
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-500">Total Recibido</p>
                                <p className="text-lg font-semibold text-green-600">
                                    ${totalAmount.toFixed(2)} ARS
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg border">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <svg
                                    className="h-5 w-5 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-500">Pagos Recibidos</p>
                                <p className="text-lg font-semibold text-gray-900">
                                    {completedPayments.length}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg border">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <svg
                                    className="h-5 w-5 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M8 7V3a4 4 0 118 0v4m-4 8a4 4 0 11-8 0v-1a2 2 0 012-2h4.586a1 1 0 01.707.293l2.414 2.414a1 1 0 01.293.707V17a2 2 0 01-2 2H8a2 2 0 01-2-2v-1z"
                                    />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-500">Último Pago</p>
                                <p className="text-lg font-semibold text-gray-900">
                                    {lastPayment 
                                        ? `$${lastPayment.amount.toFixed(2)}` 
                                        : '-'
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Action Buttons - Solo para usuarios que pagan */}
            {userType === 'patient' && (
                <div className="mb-6">
                    <button
                        onClick={() => setShowPaymentForm(!showPaymentForm)}
                        className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors flex items-center"
                    >
                        <svg
                            className="h-5 w-5 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            />
                        </svg>
                        {showPaymentForm ? 'Cancelar Pago' : 'Realizar Pago'}
                    </button>
                </div>
            )}

            {/* Payment Form - Solo para usuarios que pagan */}
            {userType === 'patient' && showPaymentForm && (
                <div className="mb-6">
                    <div className="bg-white rounded-lg border p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            Realizar Nuevo Pago
                        </h3>
                        <div className="max-w-md">
                            <MercadoPagoPayment
                                amount={55}
                                onSuccess={handlePaymentSuccess}
                                onError={handlePaymentError}
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Payment History */}
            <div className="flex-1">
                <PaymentHistory 
                    className="border-0 shadow-none" 
                    userType={userType}
                />
            </div>
        </div>
    );
};

export default Finanzas;
