'use client';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { useEffect, useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthProfessionalContext } from '@/context/registerProfessional';
import Cookies from 'js-cookie';

interface NavButton {
    href: string;
    label: string;
    isPrimary?: boolean;
    onClick?: () => void;
}

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [, setUserData] = useState<object | null>(null);
    const [token, setToken] = useState<string | null>(null);

    const { isAuth, resetUserData } = useAuthProfessionalContext();
    const pathname = usePathname();
    const id = pathname?.split('/')[2] || '';

    useEffect(() => {
        const cookies = Cookies.get('responseData');
        if (cookies) {
            try {
                setUserData(JSON.parse(cookies));
            } catch {
                setUserData(null);
            }
        }
        setToken(Cookies.get('auth_token') ?? null);
    }, []);

    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setIsMenuOpen(false);
            }
        };

        if (isMenuOpen) {
            document.addEventListener('keydown', handleEscape);
            // Prevent body scroll when menu is open
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isMenuOpen]);

    const rolGuardado = Cookies.get('role');

    const navigationConfig = useMemo(() => {
        const getDashboardUrl = () => {
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

        return {
            homeLoggedIn: [
                { href: '/search-professionals', label: 'Buscar Terapeutas' },
                { href: '/como-funciona', label: 'Como Funciona' },
                { href: getDashboardUrl(), label: 'Perfil', isPrimary: true },
            ] as NavButton[],

            searchProfessionals: [
                { href: '/como-funciona', label: 'Como funciona' },
                { href: '/dashboard/user', label: 'Perfil', isPrimary: true },
            ] as NavButton[],

            homeGuest: [
                { href: isAuth ? '/search-professionals' : '/register-user', label: 'Buscar Terapeutas' },
                { href: '/como-funciona', label: 'Como Funciona' },
                { href: '/login', label: 'Iniciar Sesión' },
                { href: '/register-user', label: 'Comenzar', isPrimary: true },
            ] as NavButton[],

            dashboard: [{ href: '/', label: 'Cerrar Sesión', isPrimary: true, onClick: resetUserData }] as NavButton[],
        };
    }, [isAuth, rolGuardado, resetUserData]);

    const currentNavButtons = useMemo(() => {
        if (pathname === '/') {
            return !token ? navigationConfig.homeGuest : navigationConfig.homeLoggedIn;
        }

        if (pathname === '/search-professionals') {
            return navigationConfig.searchProfessionals;
        }

        if (
            pathname === '/dashboard/admin' ||
            pathname === `/professionalProfile/${id}` ||
            pathname === '/dashboard/user' ||
            pathname === '/dashboard/professional'
        ) {
            return navigationConfig.dashboard;
        }

        return [];
    }, [pathname, token, navigationConfig, id]);

    const toggleMenu = useCallback(() => {
        setIsMenuOpen((prev) => !prev);
    }, []);

    const NavButton = ({ href, label, isPrimary, onClick }: NavButton) => {
        const baseClasses = 'relative transition-all duration-200 ease-in-out focus:ring-2 focus:ring-white focus:ring-offset-2 rounded-md';
        const primaryClasses =
            'px-4 py-2 text-white bg-black hover:bg-black/85 hover:shadow-md transform hover:-translate-y-0.5 active:translate-y-0';
        const secondaryClasses = 'text-gray-700 hover:text-black';

        const content = <span className={`${baseClasses} ${isPrimary ? primaryClasses : secondaryClasses}`}>{label}</span>;

        if (onClick) {
            return (
                <button onClick={onClick} className="block w-full text-left">
                    {content}
                </button>
            );
        }

        return (
            <Link href={href} className="block">
                {content}
            </Link>
        );
    };

    return (
        <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
            <div className="flex items-center justify-between w-full h-20 px-6 md:px-36">
                <Link
                    href="/"
                    className="flex items-center gap-2 transition-transform duration-200 hover:scale-105"
                    aria-label="PsyMatch - Ir al inicio"
                >
                    <Image
                        src="https://res.cloudinary.com/dibnkd72j/image/upload/v1755747168/logoCabeza_mb8k7q.svg"
                        alt="PsyMatch logo"
                        width={40}
                        height={40}
                    />
                    <h1 className="text-xl font-bold text-gray-900">PsyMatch</h1>
                </Link>

                <button
                    onClick={toggleMenu}
                    className="md:hidden p-2 rounded-md transition-colors duration-200 hover:bg-gray-100"
                    aria-expanded={isMenuOpen}
                    aria-controls="mobile-menu"
                    aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
                >
                    <div className="relative w-6 h-6">
                        <Menu
                            className={`absolute inset-0 transition-all duration-300 ${isMenuOpen ? 'opacity-0 rotate-180' : 'opacity-100 rotate-0'}`}
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

                {isMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <div className="fixed inset-0 bg-black bg-opacity-25 md:hidden z-40" onClick={toggleMenu} aria-hidden="true" />

                        {/* Mobile menu */}
                        <div
                            id="mobile-menu"
                            className="absolute top-full right-0 left-0 bg-white shadow-lg border-t border-gray-100 md:hidden z-50 animate-in slide-in-from-top-2 duration-300"
                        >
                            <ul className="flex flex-col p-4 space-y-3" role="menu">
                                {currentNavButtons.map((button, index) => (
                                    <li key={index} role="menuitem">
                                        <NavButton {...button} />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </>
                )}

                <div className="hidden md:block">
                    <ul className="flex items-center space-x-6" role="menubar">
                        {currentNavButtons.map((button, index) => (
                            <li key={index} role="menuitem">
                                <NavButton {...button} />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
