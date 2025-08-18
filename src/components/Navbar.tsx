'use client';
import Image from 'next/image';
import logoCabeza from '../assets/logoCabeza.svg';
import { Menu } from 'lucide-react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthProfessionalContext } from '@/context/registerProfessional';
import Cookies from 'js-cookie';

const Navbar = () => {
    const [menu, setMenu] = useState(false);
    const [rolGuardado, setRolGuardado] = useState<string | null>(null);
    const [isClient, setIsClient] = useState(false);

    const { isAuth, resetUserData } = useAuthProfessionalContext();
    const router = useRouter();

    // Evitar problemas de hidratación
    useEffect(() => {
        setIsClient(true);
        setRolGuardado(Cookies.get('role') || null);
        
        // Debug: verificar estado de autenticación
        console.log('Navbar - Estado de autenticación:', {
            isAuth,
            rolGuardado: Cookies.get('role'),
            authToken: Cookies.get('authToken'),
            responseData: Cookies.get('responseData')
        });
    }, [isAuth]);

    const handleLogout = () => {
        resetUserData();
        setMenu(false);
        // Limpiar cookies adicionales
        Cookies.remove('responseData');
        Cookies.remove('role');
        router.push('/');
    };

    const closeMenu = () => setMenu(false);

    // Función para obtener la URL del dashboard basada en el rol
    const getDashboardUrl = () => {
        if (!rolGuardado) return '/';
        switch (rolGuardado) {
            case 'Psicólogo':
                return '/dashboard/professional';
            case 'Paciente':
                return '/dashboard/user';
            case 'Administrador':
                return '/dashboard/admin';
            default:
                return '/';
        }
    };

    // Función para determinar qué botones mostrar
    const getNavigationButtons = () => {
        // Si no se ha cargado el estado del cliente, mostrar navegación básica
        if (!isClient) {
            return {
                mobile: [],
                desktop: [],
            };
        }

        // Usuario autenticado - navegación completa (incluye dashboards)
        if (isAuth) {
            const authButtons = [
                <Link key="buscar" href="/search-professionals" onClick={closeMenu}>
                    Buscar Terapeutas
                </Link>,
                <Link key="como-funciona" href="/como-funciona" onClick={closeMenu}>
                    Como Funciona
                </Link>,
                <Link
                    key="perfil"
                    href={getDashboardUrl()}
                    onClick={closeMenu}
                    className="px-4 py-2 text-white rounded-md bg-[#5046E7] hover:bg-[#615ac2]"
                >
                    Perfil
                </Link>,
                <button key="logout" onClick={handleLogout} className="px-4 py-1 text-white rounded-md bg-red-500 hover:bg-red-600">
                    Cerrar Sesión
                </button>,
            ];
            return {
                mobile: authButtons,
                desktop: authButtons,
            };
        }

        // Usuario no autenticado - navegación pública
        const publicButtons = [
            <Link key="como-funciona" href="/como-funciona" onClick={closeMenu}>
                Como Funciona
            </Link>,
            <Link key="login" href="/login" onClick={closeMenu}>
                Iniciar Sesión
            </Link>,
            <Link
                key="register"
                href="/register-user"
                onClick={closeMenu}
                className="px-4 py-2 text-white rounded-md bg-[#5046E7] hover:bg-[#615ac2]"
            >
                Comenzar
            </Link>,
        ];

        return {
            mobile: publicButtons,
            desktop: publicButtons,
        };
    };

    const { mobile: mobileButtons, desktop: desktopButtons } = getNavigationButtons();

    return (
        <div className="flex flex-row items-center justify-between w-full h-20 px-6 bg-white md:px-36">
            <Link href="/" className="flex flex-row items-center gap-2 cursor-pointer">
                <Image src={logoCabeza} alt="logo" />
                <h3 className="text-xl font-bold text-black">PsyMatch</h3>
            </Link>

            {/* Solo mostrar navegación si hay botones para mostrar */}
            {(mobileButtons.length > 0 || desktopButtons.length > 0) && (
                <>
                    {/* Menú móvil */}
                    <div className="md:hidden lg:hidden">
                        <Menu onClick={() => setMenu((prev) => !prev)} className="cursor-pointer" />
                        {menu && mobileButtons.length > 0 && (
                            <ul className="absolute flex flex-col items-center gap-4 p-3 top-20 right-1 bg-[#CDCDCD] rounded-md shadow-lg z-50">
                                {mobileButtons.map((boton, index) => (
                                    <li key={index} className="text-sm list-none hover:text-gray-700">
                                        {boton}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Menú escritorio */}
                    <div className="hidden lg:block">
                        {desktopButtons.length > 0 && (
                            <ul className="flex flex-row items-center gap-4 p-3">
                                {desktopButtons.map((boton, index) => (
                                    <li key={index} className="text-sm list-none hover:text-gray-700">
                                        {boton}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default Navbar;
