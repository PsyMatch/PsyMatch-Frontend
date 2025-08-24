import { useState, useEffect, useCallback } from 'react';
import { paymentsApi, Payment, CreatePaymentData, MercadoPagoPreference } from '../services/payments';
import { useAuth } from './useAuth';
import Cookies from 'js-cookie';

export function usePayments() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [professionalPayments, setProfessionalPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const getToken = () => Cookies.get('authToken') || Cookies.get('auth_token');

  const fetchUserPayments = useCallback(async () => {
    const token = getToken();
    if (!user?.id || !token) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await paymentsApi.getUserPayments(user.id, token);
      setPayments(data);
      setError(null);
    } catch (err: Error | unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  const fetchAllPayments = useCallback(async () => {
    const token = getToken();
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await paymentsApi.getAllPayments(token);
      setPayments(data);
      setError(null);
    } catch (err: Error | unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchProfessionalPayments = useCallback(async () => {
    const token = getToken();
    if (!user?.id || !token) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await paymentsApi.getProfessionalPayments(user.id, token);
      setProfessionalPayments(data);
      setError(null);
    } catch (err: Error | unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  const createPayment = async (paymentData: CreatePaymentData): Promise<Payment> => {
    const token = getToken();
    if (!token) {
      throw new Error('No authenticated');
    }

    try {
      const newPayment = await paymentsApi.createPayment(paymentData, token);
      setPayments((prev) => [newPayment, ...prev]);
      return newPayment;
    } catch (err) {
      throw err;
    }
  };

  const createMercadoPagoPreference = async (
    userId?: string,
    appointmentId?: string,
    amount?: number,
  ): Promise<MercadoPagoPreference> => {
    const token = getToken();
    try {
      const preference = await paymentsApi.createMercadoPagoPreference(
        userId,
        appointmentId,
        amount,
        token || undefined,
      );
      return preference;
    } catch (err) {
      throw err;
    }
  };

  const updatePayment = async (paymentId: string, updateData: Partial<Payment>): Promise<Payment> => {
    const token = getToken();
    if (!token) {
      throw new Error('No authenticated');
    }

    try {
      const updatedPayment = await paymentsApi.updatePayment(paymentId, updateData, token);
      setPayments((prev) =>
        prev.map((payment) =>
          payment.payment_id === paymentId ? updatedPayment : payment,
        ),
      );
      return updatedPayment;
    } catch (err) {
      throw err;
    }
  };

  const deletePayment = async (paymentId: string): Promise<void> => {
    const token = getToken();
    if (!token) {
      throw new Error('No authenticated');
    }

    try {
      await paymentsApi.deletePayment(paymentId, token);
      setPayments((prev) => prev.filter((payment) => payment.payment_id !== paymentId));
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    if (user?.role === 'ADMIN') {
      fetchAllPayments();
    } else if (user?.role === 'PSYCHOLOGIST') {
      fetchProfessionalPayments();
    } else if (user?.id) {
      fetchUserPayments();
    }
  }, [user?.role, user?.id, fetchAllPayments, fetchUserPayments, fetchProfessionalPayments]);

  return {
    payments,
    professionalPayments,
    loading,
    error,
    refetch: user?.role === 'ADMIN' 
      ? fetchAllPayments 
      : user?.role === 'PSYCHOLOGIST' 
        ? fetchProfessionalPayments 
        : fetchUserPayments,
    createPayment,
    createMercadoPagoPreference,
    updatePayment,
    deletePayment,
  };
}
