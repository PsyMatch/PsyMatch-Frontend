'use client';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthProfessionalContext } from '@/context/registerProfessional';
import { useAuth } from '@/hooks/useAuth';
import Cookies from 'js-cookie';

interface NavItem {
    href: string;
    label: string;
    isPrimary?: boolean;
    onClick?: () => void;
    requiresAuth?: boolean;
    requiresGuest?: boolean;
    allowedRoles?: string[];
    description?: string;
}

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [token, setToken] = useState<string | null>(null);
    const [userRole, setUserRole] = useState<string | null>(null);
    const [alertMessage, setAlertMessage] = useState('');

    const { resetUserData } = useAuthProfessionalContext();
    const { logout } = useAuth();
    const pathname = usePathname();

    const updateAuthState = useCallback(() => {
        const authToken = Cookies.get('auth_token');
        const role = Cookies.get('role');
        setToken(authToken ?? null);
        setUserRole(role ?? null);
    }, []);

    useEffect(() => {
        updateAuthState();

        const handleAuthChange = () => {
            updateAuthState();
        };

        window.addEventListener('authStateChange', handleAuthChange);

        return () => {
            window.removeEventListener('authStateChange', handleAuthChange);
        };
    }, [updateAuthState]);

    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsMenuOpen(false);
        };

        if (isMenuOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isMenuOpen]);

    const handleLogout = useCallback(async () => {
        try {
            await logout();
            resetUserData();
            Cookies.remove('auth_token');
            Cookies.remove('role');
            Cookies.remove('responseData');

            setToken(null);
            setUserRole(null);
            window.dispatchEvent(new CustomEvent('authStateChange'));
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    }, [logout, resetUserData]);

    const getDashboardUrl = useCallback(() => {
        switch (userRole) {
            case 'Psicólogo':
                return '/dashboard/professional';
            case 'Paciente':
                return '/dashboard/user';
            case 'Administrador':
                return '/dashboard/admin';
            default:
                return '/dashboard/user';
        }
    }, [userRole]);

    const getAllNavItems = (): NavItem[] => [
        {
            href: '/search-professionals',
            label: 'Buscar Terapeutas',
            requiresAuth: true,
            description: 'Encuentra el terapeuta ideal para ti',
        },
        {
            href: '/how-does-it-work',
            label: 'Cómo Funciona',
            description: 'Conoce nuestro proceso',
        },
        {
            href: '/login',
            label: 'Iniciar Sesión',
            requiresGuest: true,
            description: 'Accede a tu cuenta',
        },
        {
            href: '/register-user',
            label: 'Registrarse',
            requiresGuest: true,
            isPrimary: true,
            description: 'Crea tu cuenta de paciente',
        },
        {
            href: '/register-professional',
            label: 'Únete como Profesional',
            requiresGuest: true,
            isPrimary: true,
            description: 'Regístrate como terapeuta',
        },
        {
            href: getDashboardUrl(),
            label: 'Mi Perfil',
            requiresAuth: true,
            isPrimary: true,
            description: 'Accede a tu panel personal',
        },
        {
            href: '#',
            label: 'Cerrar Sesión',
            requiresAuth: true,
            onClick: handleLogout,
            description: 'Salir de tu cuenta',
        },
    ];

    const getVisibleNavItems = (): NavItem[] => {
        const allItems = getAllNavItems();

        return allItems.filter((item) => {
            if (item.requiresAuth && !token) {
                return false;
            }

            if (item.requiresGuest && token) {
                return false;
            }

            if (item.allowedRoles && item.allowedRoles.length > 0 && !item.allowedRoles.includes(userRole || '')) {
                return false;
            }

            if (userRole === 'Psicólogo' && item.href === '/search-professionals') {
                return false;
            }

            return true;
        });
    };

    const navItems = getVisibleNavItems();

    const displayAlert = useCallback((message: string) => {
        setAlertMessage(message);
        setTimeout(() => setAlertMessage(''), 3000);
    }, []);

    const isItemAvailable = useCallback((_item: NavItem): { available: boolean; reason?: string } => {
        // Always return available for now
        return { available: true };
    }, []);

    const handleItemClick = useCallback(
        (item: NavItem, e: React.MouseEvent) => {
            const { available, reason } = isItemAvailable(item);

            if (!available && reason) {
                e.preventDefault();
                displayAlert(reason);
                return;
            }

            if (item.onClick) {
                e.preventDefault();
                item.onClick();
            }
        },
        [isItemAvailable, displayAlert]
    );

    const toggleMenu = useCallback(() => {
        setIsMenuOpen((prev) => !prev);
    }, []);

    const NavButton = ({ item }: { item: NavItem }) => {
        const { available } = isItemAvailable(item);

        const baseClasses = 'relative transition-all duration-200 ease-in-out focus:ring-2 focus:ring-offset-2 rounded-md focus:ring-blue-500';

        // Estilos específicos para "Únete como Profesional" - Responsivo
        const professionalClasses =
            'px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base text-white bg-black  hover:shadow-md transform hover:-translate-y-0.5 active:translate-y-0 font-medium';

        const primaryClasses =
            'px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base text-white bg-blue-600 hover:bg-blue-700 hover:shadow-md transform hover:-translate-y-0.5 active:translate-y-0 font-medium';
        const secondaryClasses = 'text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-2 py-1 text-sm sm:text-base';

        // Determinar qué estilos usar
        let buttonClasses = secondaryClasses;
        if (item.isPrimary) {
            buttonClasses = item.label === 'Únete como Profesional' ? professionalClasses : primaryClasses;
        }

        const content = (
            <span className={`${baseClasses} ${buttonClasses} flex items-center gap-1 sm:gap-2`} title={item.description}>
                {item.label === 'Únete como Profesional' ? (
                    <>
                        <span className="sm:hidden">Únete</span>
                        <span className="hidden sm:inline">{item.label}</span>
                    </>
                ) : (
                    item.label
                )}
            </span>
        );

        const classes = available ? '' : 'opacity-50 pointer-events-none';

        if (item.onClick) {
            return (
                <button aria-disabled={!available} onClick={(e) => handleItemClick(item, e)} className={`block w-full text-left ${classes}`}>
                    {content}
                </button>
            );
        }

        return (
            <Link href={item.href} className={`block ${classes}`} onClick={(e) => handleItemClick(item, e)} aria-disabled={!available}>
                {content}
            </Link>
        );
    };

    return (
        <>
            {alertMessage && (
                <div className="fixed top-4 right-4 z-[60] bg-red-500 text-white px-4 py-2 rounded-md shadow-lg animate-in slide-in-from-right-2">
                    <span>{alertMessage}</span>
                </div>
            )}

            <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
                <div className="flex items-center justify-between w-full h-16 px-4 md:px-8 lg:px-12">
                    <Link
                        href="/"
                        className="flex items-center gap-2 transition-transform duration-200 hover:scale-105"
                        aria-label="PsyMatch - Ir al inicio"
                    >
                        <Image
                            src="https://res.cloudinary.com/dibnkd72j/image/upload/v1755747168/logoCabeza_mb8k7q.svg"
                            alt="PsyMatch logo"
                            width={32}
                            height={32}
                            className="md:w-10 md:h-10"
                        />
                        <h1 className="text-lg font-bold text-gray-900 md:text-xl">PsyMatch</h1>
                    </Link>

                    <div className="hidden lg:block">
                        <ul className="flex items-center space-x-1" role="menubar">
                            {navItems.map((item, index) => (
                                <li key={`${item.href}-${index}`} role="menuitem">
                                    <NavButton item={item} />
                                </li>
                            ))}
                        </ul>
                    </div>

                    <button
                        onClick={toggleMenu}
                        className="p-2 transition-colors duration-200 rounded-md lg:hidden hover:bg-gray-100"
                        aria-expanded={isMenuOpen}
                        aria-controls="mobile-menu"
                        aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
                    >
                        <div className="relative w-6 h-6">
                            <Menu
                                className={`absolute inset-0 transition-all duration-300 ${
                                    isMenuOpen ? 'opacity-0 rotate-180' : 'opacity-100 rotate-0'
                                }`}
                                size={24}
                            />
                            <X
                                className={`absolute inset-0 transition-all duration-300 ${
                                    isMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-180'
                                }`}
                                size={24}
                            />
                        </div>
                    </button>
                </div>

                {isMenuOpen && (
                    <>
                        <div className="fixed inset-0 z-40 bg-black bg-opacity-25 lg:hidden" onClick={toggleMenu} aria-hidden="true" />

                        <div
                            id="mobile-menu"
                            className="absolute left-0 right-0 z-50 duration-300 bg-white border-t border-gray-200 shadow-lg top-full lg:hidden animate-in slide-in-from-top-2"
                        >
                            <ul className="flex flex-col p-4 space-y-2 max-h-[70vh] overflow-y-auto" role="menu">
                                {navItems.map((item, index) => (
                                    <li key={`mobile-${item.href}-${index}`} role="menuitem">
                                        <NavButton item={item} />
                                    </li>
                                ))}
                            </ul>

                            <div className="px-4 pt-2 pb-4 text-sm text-gray-600 border-t border-gray-100">
                                {token ? (
                                    <div>
                                        <p>
                                            Sesión activa como: <span className="font-medium">{userRole || 'Usuario'}</span>
                                        </p>
                                    </div>
                                ) : (
                                    <p>No has iniciado sesión</p>
                                )}
                            </div>
                        </div>
                    </>
                )}
            </nav>
        </>
    );
};

export default Navbar;
