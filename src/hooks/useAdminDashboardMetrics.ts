import { useEffect, useState } from 'react';
import { envs } from '@/config/envs.config';
import Cookies from 'js-cookie';
export interface AdminDashboardMetrics {
  users: number;
  appointments: number;
  reviews: number;
  payments: number;
  patients: number;
  professionals: number;
  weekly?: {
    appointments: { week: string; value: number }[];
    reviews: { week: string; value: number }[];
    payments: { week: string; value: number }[];
    users: { week: string; value: number }[];
  };
  daily?: {
    appointments: { day: string; value: number }[];
  };
}

export function useAdminDashboardMetrics(pollInterval = 10000) {
  const [metrics, setMetrics] = useState<AdminDashboardMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchMetrics = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('authToken') || Cookies.get('authToken') || Cookies.get('auth_token');
        const res = await fetch(`${envs.next_public_api_url}/admin/dashboard/metrics`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('Error al obtener métricas');
        const data = await res.json();
        if (isMounted) setMetrics(data);
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
        if (isMounted) setError(errorMessage);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchMetrics();
    const intervalId = setInterval(fetchMetrics, pollInterval);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, [pollInterval]);

  return { metrics, loading, error };
}
