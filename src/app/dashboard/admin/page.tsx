'use client';
import MenuNavegacionAdmin from '@/components/dashboard-admin/MenuNavegacionAdmin';
import { useEffect, useState } from 'react';
import { useAdminDashboardMetrics } from '@/hooks/useAdminDashboardMetrics';
import DashboardWidget from '@/components/dashboard-admin/DashboardWidget';
import FlowbiteLineChart from '@/components/dashboard-admin/FlowbiteLineChart';
import FlowbiteBarChart from '@/components/dashboard-admin/FlowbiteBarChart';
import FlowbitePieChart from '@/components/dashboard-admin/FlowbitePieChart';
import FlowbitePaymentsChart from '@/components/dashboard-admin/FlowbitePaymentsChart';
import { adminService } from '@/services/admin';

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    profile_picture?: string;
    verified?: string;
    phone?: string;
    dni?: number;
    birthdate?: string;
    emergency_contact?: string | null;
    professional_experience?: number;
}

const AdminDashboard = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loadingUsers, setLoadingUsers] = useState(true);
    const { metrics, loading: loadingMetrics, error: errorMetrics } = useAdminDashboardMetrics();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const result = await adminService.getUsers({ limit: 50 });
                if (result.success && result.data) {
                    setUsers(Array.isArray(result.data) ? result.data : []); // Verificar que sea un array
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                setLoadingUsers(false);
            }
        };
        fetchUsers();
    }, []);

    // Mostrar solo datos reales semanales si existen
    const totalUsers = metrics?.weekly?.users?.at(-1)?.value ?? 0;

        // Datos reales para los gráficos y tablas (ejemplo simple, puedes adaptar según la estructura de tu backend)
                    // Solo datos semanales reales para el gráfico de sesiones de terapias
                    const sessionDataWeek = metrics?.weekly?.appointments
                        ? metrics.weekly.appointments.map((item: { week: string; value: number }) => ({
                                label: item.week,
                                value: item.value,
                            }))
                        : [];

            // Datos reales para el gráfico de barras: citas programadas últimos 14 días
            const appointmentsData = metrics?.daily?.appointments
                ? metrics.daily.appointments.map((item: { day: string; value: number }) => ({
                        month: item.day,
                        value: item.value,
                    }))
                : [
                        { month: 'Día 1', value: 5 },
                        { month: 'Día 2', value: 7 },
                        { month: 'Día 3', value: 6 },
                        { month: 'Día 4', value: 8 },
                        { month: 'Día 5', value: 4 },
                        { month: 'Día 6', value: 9 },
                    ];

            // Datos para el gráfico de torta de páginas más visitadas - DATOS REALES
            const pagesData = metrics?.pageVisits ? 
                metrics.pageVisits.map((page, index) => ({
                    name: page.page,
                    value: page.visits,
                    color: ['#5046E7', '#6366F1', '#8B5CF6', '#7C3AED', '#A855F7'][index] || '#5046E7'
                })) 
                : [
                    { name: 'Dashboard Principal', value: 4235, color: '#5046E7' },
                    { name: 'Búsqueda de Psicólogos', value: 3825, color: '#6366F1' },
                    { name: 'Perfil de Usuario', value: 2947, color: '#8B5CF6' },
                    { name: 'Sesiones', value: 2186, color: '#7C3AED' },
                    { name: 'Pagos', value: 1829, color: '#A855F7' },
                ];

            // Datos para el gráfico de pagos semanales
            const paymentsData = metrics?.weekly?.payments
                ? metrics.weekly.payments.map((item: { week: string; value: number }) => ({
                    date: item.week,
                    amount: item.value * 50, // Multiplicar por precio promedio por sesión
                    status: 'completed' as const,
                    method: 'credit_card'
                }))
                : [
                    { date: 'Sem 1', amount: 2500, status: 'completed' as const, method: 'credit_card' },
                    { date: 'Sem 2', amount: 3200, status: 'completed' as const, method: 'credit_card' },
                    { date: 'Sem 3', amount: 2800, status: 'completed' as const, method: 'credit_card' },
                    { date: 'Sem 4', amount: 4100, status: 'completed' as const, method: 'credit_card' },
                    { date: 'Sem 5', amount: 3600, status: 'completed' as const, method: 'credit_card' },
                    { date: 'Sem 6', amount: 3900, status: 'completed' as const, method: 'credit_card' },
                    { date: 'Sem 7', amount: 4500, status: 'completed' as const, method: 'credit_card' },
                ];

    return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-indigo-100 relative overflow-hidden">
            {(loadingMetrics || loadingUsers) && (
                <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-60 z-50">
                    <div className="text-center px-4">
                        <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-[#5046E7] mx-auto mb-4"></div>
                        <span className="text-lg sm:text-xl font-semibold text-[#5046E7]">
                            {loadingMetrics && loadingUsers ? 'Cargando datos...' : 
                             loadingMetrics ? 'Cargando métricas...' : 'Cargando usuarios...'}
                        </span>
                    </div>
                </div>
            )}
            {errorMetrics && (
                <div className="fixed inset-0 flex items-center justify-center bg-red-100 bg-opacity-80 z-50 px-4">
                    <div className="text-center max-w-md">
                        <span className="text-lg sm:text-xl font-semibold text-red-600">Error: {errorMetrics}</span>
                    </div>
                </div>
            )}
            {/* Elementos decorativos de fondo más sutiles */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-indigo-100/30 to-purple-100/30 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-100/30 to-indigo-100/30 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-50/20 to-indigo-50/20 rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
                {/* Widgets del dashboard con colores PsyMatch */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
                    <DashboardWidget
                        title="USUARIOS TOTALES"
                        value={metrics?.users ?? '—'}
                        change="8.2%"
                        changeType="positive"
                        subtitle="Desde el mes pasado"
                        icon={
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                            </svg>
                        }
                        color="from-[#5046E7] to-[#4338CA]"
                    />
                    <DashboardWidget
                        title="CITAS"
                        value={metrics?.appointments ?? '—'}
                        change="12.5%"
                        changeType="positive"
                        subtitle="Desde la semana pasada"
                        icon={
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                        }
                        color="from-[#6366F1] to-[#5046E7]"
                    />
                    <DashboardWidget
                        title="RESEÑAS"
                        value={metrics?.reviews ?? '—'}
                        change="3.1%"
                        changeType="positive"
                        subtitle="Desde ayer"
                        icon={
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.80a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                            </svg>
                        }
                        color="from-[#8B5CF6] to-[#6366F1]"
                    />
                    <DashboardWidget
                        title="PAGOS"
                        value={metrics?.payments ?? '—'}
                        change="5.2%"
                        changeType="positive"
                        subtitle="Pagos procesados"
                        icon={
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"/>
                            </svg>
                        }
                        color="from-[#7C3AED] to-[#8B5CF6]"
                    />
                </div>

                {/* Gráficos profesionales */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                    <FlowbiteLineChart 
                        data={sessionDataWeek}
                        title="Sesiones de Terapia (por semana)"
                        color="#5046E7"
                    />
                    <FlowbiteBarChart 
                        data={appointmentsData} 
                        title="Citas Programadas (últimos 14 días)" 
                        color="#6366F1"
                    />
                </div>

                {/* Gráficos de análisis */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                    <FlowbitePieChart 
                        title="Páginas más visitadas" 
                        data={pagesData}
                    />
                    <FlowbitePaymentsChart 
                        title="Pagos Semanales" 
                        data={paymentsData}
                    />
                </div>

                {/* Sección de Gestión de Usuarios */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 sm:p-6 lg:p-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
                                Gestión de Usuarios
                            </h2>
                            <p className="text-gray-600 mt-2 text-base sm:text-lg">
                                Administra pacientes, psicólogos y sus estados de verificación
                            </p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="bg-[#5046E7] rounded-xl p-3 sm:p-4 shadow-lg">
                                <div className="flex items-center space-x-2 sm:space-x-3">
                                    <div className="w-3 h-3 sm:w-4 sm:h-4 bg-white rounded-full"></div>
                                    <span className="text-xs sm:text-sm font-semibold text-white">
                                        Total: {totalUsers} usuarios activos
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Métricas rápidas en tarjetas de gestión */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                        <div className="bg-gradient-to-br from-[#5046E7] to-[#4338CA] rounded-xl p-4 sm:p-6 text-white shadow-lg hover:shadow-[#5046E7]/25 transition-all duration-300 cursor-pointer">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-indigo-100 text-xs sm:text-sm font-semibold uppercase tracking-wider">Pacientes</p>
                                    <h1 className="text-2xl sm:text-3xl font-bold mt-2">{metrics?.patients ?? 0}</h1>
                                    <p className="text-indigo-200 text-xs sm:text-sm mt-1">Usuarios registrados (total)</p>
                                </div>
                                <div className="bg-white bg-opacity-20 rounded-xl p-2 sm:p-3">
                                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-[#6366F1] to-[#5046E7] rounded-xl p-4 sm:p-6 text-white shadow-lg hover:shadow-[#6366F1]/25 transition-all duration-300 cursor-pointer">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-indigo-100 text-xs sm:text-sm font-semibold uppercase tracking-wider">Psicólogos</p>
                                    <h1 className="text-2xl sm:text-3xl font-bold mt-2">{metrics?.professionals ?? 0}</h1>
                                    <p className="text-indigo-200 text-xs sm:text-sm mt-1">Profesionales activos (total)</p>
                                </div>
                                <div className="bg-white bg-opacity-20 rounded-xl p-2 sm:p-3">
                                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-[#8B5CF6] to-[#6366F1] rounded-xl p-4 sm:p-6 text-white shadow-lg hover:shadow-[#8B5CF6]/25 transition-all duration-300 cursor-pointer">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-purple-100 text-xs sm:text-sm font-semibold uppercase tracking-wider">Estado</p>
                                    <h1 className="text-2xl sm:text-3xl font-bold mt-2">✓</h1>
                                    <p className="text-purple-200 text-xs sm:text-sm mt-1">Todo al día</p>
                                </div>
                                <div className="bg-white bg-opacity-20 rounded-xl p-2 sm:p-3">
                                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    <MenuNavegacionAdmin data={users} />
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
