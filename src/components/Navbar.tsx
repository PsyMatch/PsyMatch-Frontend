'use client';
import Image from 'next/image';
import logoCabeza from '../assets/logoCabeza.svg';
import { Menu } from 'lucide-react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthProfessionalContext } from '@/context/registerProfessional';
import { useAuth } from '@/hooks/useAuth';
import Cookies from 'js-cookie';

const Navbar = () => {
    const [menu, setMenu] = useState(false);
    const [token, setToken] = useState<string | null>(null);


    const { isAuth, resetUserData } = useAuthProfessionalContext();
    const { logout } = useAuth();
    const pathname = usePathname();
    const id = pathname?.split('/')[2] || '';


    // Cargar cookies y token SOLO en cliente
    useEffect(() => {
        const cookies = Cookies.get('responseData');
        const cookies = Cookies.get('responseData');
        if (cookies) {
            try {
                // setUserData no se usa, pero mantenemos la lógica por si se necesita después
                JSON.parse(cookies);
            } catch {
                // Error parsing, continuar
            }
        }
        setToken(localStorage.getItem('authToken') || Cookies.get('auth_token') || Cookies.get('authToken' )|| null );
    }, []);

    // Función mejorada de logout que combina ambas funcionalidades
    const handleLogout = async () => {
        try {
            // Usar la nueva función logout que borra todo
            await logout();
            // También llamar a resetUserData por compatibilidad
            resetUserData();
        } catch (error) {
            console.error('Error durante logout:', error);
            // Fallback a la función original
            resetUserData();
            window.location.href = '/';
        }
    };

    const rolGuardado = Cookies.get('role');

    const botonesNavBarHomeLogeado = [
        <Link key={0} href="/search-professionals">
            Buscar Terapeutas
        </Link>,
        <a key={1} href="/como-funciona">
            Como Funciona
        </a>,
        <a
            key={2}
            href={
                rolGuardado === 'Psicólogo'
                    ? '/dashboard/professional'
                    : rolGuardado === 'Paciente'
                    ? '/dashboard/user'
                    : rolGuardado === 'Administrador'
                    ? '/dashboard/admin'
                    : '/'
            }
            href={
                rolGuardado === 'Psicólogo'
                    ? '/dashboard/professional'
                    : rolGuardado === 'Paciente'
                    ? '/dashboard/user'
                    : rolGuardado === 'Administrador'
                    ? '/dashboard/admin'
                    : '/'
            }
            className="px-4 py-2 text-white rounded-md bg-[#5046E7] hover:bg-[#615ac2]"
        >
            Perfil
        </a>,
    ];

    const botonesNavBarMatch = [
        <Link key={0} href="/como-funciona">
            Como funciona
        </Link>,
        <Link key={1} href="/dashboard/user" className="px-4 py-2 text-white rounded-md bg-[#5046E7] hover:bg-[#615ac2]">
            Perfil
        </Link>,
    ];

    const botonesNavBarHome = [
        <a href={isAuth ? '/search-professionals' : '/register-user'} key={0}>
            Buscar Terapeutas
        </a>,
        <Link key={1} href="/como-funciona">
            Como Funciona
        </Link>,
        <Link key={2} href="/login">
            Iniciar Sesión
        </Link>,
        <Link key={3} href="/register-user" className="px-4 py-2 text-white rounded-md bg-[#5046E7] hover:bg-[#615ac2]">
            Comenzar
        </Link>,
    ];

    return (
        <div className="flex flex-row items-center justify-between w-full h-20 px-6 bg-white md:px-36">
            <Link href="/" className="flex flex-row items-center gap-2 cursor-pointer">
                <Image src={logoCabeza} alt="logo" />
                <h3 className="text-xl font-bold text-black">PsyMatch</h3>
            </Link>

            {/* Menú móvil */}
            <div className="md:hidden lg:hidden">
                <Menu onClick={() => setMenu((prev) => !prev)} />
                <Menu onClick={() => setMenu((prev) => !prev)} />
                {menu && pathname === '/' && (
                    <ul className="absolute flex flex-col items-center gap-4 p-3 top-20 right-1 bg-[#CDCDCD]">
                        {(!isAuth ? botonesNavBarHome : botonesNavBarHomeLogeado).map((boton, index) => (
                            <li key={index} className="text-sm list-none hover:text-gray-700">
                                {boton}
                            </li>
                            <li key={index} className="text-sm list-none hover:text-gray-700">
                                {boton}
                            </li>
                        ))}
                    </ul>
                )}
                {menu && pathname === '/search-professionals' && (
                    <ul className="absolute flex flex-col items-center gap-4 p-3 top-20 right-1 bg-[#CDCDCD]">
                        {botonesNavBarMatch.map((boton, index) => (
                            <li key={index} className="text-sm list-none hover:text-gray-700">
                                {boton}
                            </li>
                            <li key={index} className="text-sm list-none hover:text-gray-700">
                                {boton}
                            </li>
                        ))}
                    </ul>
                )}
                {menu && (pathname === '/dashboard/admin' || pathname === `/professionalProfile/${id}` || pathname === '/dashboard/user') && (
                    <ul className="absolute flex flex-col items-center gap-4 p-3 top-20 right-1 bg-[#CDCDCD]">
                        <li className="text-sm list-none hover:text-gray-700">
                            <button 
                                onClick={handleLogout}
                                className="px-4 py-1 text-white rounded-md bg-[#5046E7] hover:bg-[#615ac2]"
                            >
                                Cerrar Sesión
                            </button>
                        </li>
                    </ul>
                )}
                {menu && (pathname === '/dashboard/admin' || pathname === `/professionalProfile/${id}` || pathname === '/dashboard/user') && (
                    <ul className="absolute flex flex-col items-center gap-4 p-3 top-20 right-1 bg-[#CDCDCD]">
                        <li className="text-sm list-none hover:text-gray-700">
                            <button 
                                onClick={handleLogout}
                                className="px-4 py-1 text-white rounded-md bg-[#5046E7] hover:bg-[#615ac2]"
                            >
                                Cerrar Sesión
                            </button>
                        </li>
                    </ul>
                )}
            </div>

            {/* Menú escritorio */}
            {pathname === '/' && (
                <div className="hidden lg:block">
                    {!token ? (
                        <ul className="flex flex-row items-center gap-4 p-3">
                            {botonesNavBarHome.map((boton, index) => (
                                <li key={index} className="text-sm list-none hover:text-gray-700">
                                    {boton}
                                </li>
                                <li key={index} className="text-sm list-none hover:text-gray-700">
                                    {boton}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <ul className="flex flex-row gap-10">
                            {botonesNavBarHomeLogeado.map((boton, index) => (
                                <li key={index} className="text-sm list-none hover:text-gray-700">
                                    {boton}
                                </li>
                                <li key={index} className="text-sm list-none hover:text-gray-700">
                                    {boton}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}

            {pathname === '/search-professionals' && (
                <div className="hidden lg:block">
                    <ul className="flex flex-row items-center gap-4 p-3">
                        {botonesNavBarMatch.map((boton, index) => (
                            <li key={index} className="text-sm list-none hover:text-gray-700">
                                {boton}
                            </li>
                            <li key={index} className="text-sm list-none hover:text-gray-700">
                                {boton}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {(pathname === '/dashboard/admin' ||
                pathname === `/professionalProfile/${id}` ||
                pathname === '/dashboard/user' ||
                pathname === '/dashboard/professional') && (
            {(pathname === '/dashboard/admin' ||
                pathname === `/professionalProfile/${id}` ||
                pathname === '/dashboard/user' ||
                pathname === '/dashboard/professional') && (
                <div className="hidden lg:block">
                    <button 
                        onClick={handleLogout}
                        className="px-4 py-1 text-white rounded-md bg-[#5046E7] hover:bg-[#615ac2]"
                    >
                        Cerrar Sesión
                    </button>
                </div>
            )}
        </div>
    );
};

export default Navbar;
