'use client';
import Image from 'next/image';
import logoCabeza from '../assets/logoCabeza.svg';
import { Menu } from 'lucide-react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthProfessionalContext } from '@/context/registerProfessional';
import Cookies from 'js-cookie';

const Navbar = () => {
    const [menu, setMenu] = useState(false);
    const [userData, setUserData] = useState<any>(null);
    const [token, setToken] = useState<string | null>(null);
    
    const { isAuth, resetUserData } = useAuthProfessionalContext();
    const pathname = usePathname();
    const id = pathname?.split('/')[2] || '';
    
    // Cargar cookies y token SOLO en cliente
    useEffect(() => {
        const cookies = Cookies.get("responseData");
        if (cookies) {
            try {
                setUserData(JSON.parse(cookies));
            } catch {
                setUserData(null);
            }
        }
        setToken(localStorage.getItem("authToken"));
    }, []);
    
    const rolGuardado = Cookies.get("role");

    const botonesNavBarHomeLogeado = [
        <Link key={0} href="/search-professionals">Buscar Terapeutas</Link>,
        <a key={1} href="/como-funciona">Como Funciona</a>,
        <a
            key={2}
            href={rolGuardado === "Psicólogo" ? "/dashboard/professional" : "/dashboard/user"}
            className="px-4 py-2 text-white rounded-md bg-[#5046E7] hover:bg-[#615ac2]"
        >
            Perfil
        </a>,
    ];



    const botonesNavBarMatch = [
        <Link key={0} href="/como-funciona">Como funciona</Link>,
        <Link key={1} href="/dashboard/user" className="px-4 py-2 text-white rounded-md bg-[#5046E7] hover:bg-[#615ac2]">Perfil</Link>,
    ];

    const botonesNavBarHome = [
        <a href={isAuth ? "/search-professionals" : "/register-user"} key={0}>Buscar Terapeutas</a>,
        <Link key={1} href="/como-funciona">Como Funciona</Link>,
        <Link key={2} href="/login">Iniciar Sesión</Link>,
        <Link key={3} href="/register-user" className="px-4 py-2 text-white rounded-md bg-[#5046E7] hover:bg-[#615ac2]">Comenzar</Link>,
    ];

    return (
        <div className="flex flex-row items-center justify-between w-full h-20 px-6 bg-white md:px-36">
            <Link href="/" className="flex flex-row items-center gap-2 cursor-pointer">
                <Image src={logoCabeza} alt="logo" />
                <h3 className="text-xl font-bold text-black">PsyMatch</h3>
            </Link>

            {/* Menú móvil */}
            <div className="md:hidden lg:hidden">
                <Menu onClick={() => setMenu(prev => !prev)} />
                {menu && pathname === '/' && (
                    <ul className="absolute flex flex-col items-center gap-4 p-3 top-20 right-1 bg-[#CDCDCD]">
                        {(!isAuth ? botonesNavBarHome : botonesNavBarHomeLogeado).map((boton, index) => (
                            <li key={index} className="text-sm list-none hover:text-gray-700">{boton}</li>
                        ))}
                    </ul>
                )}
                {menu && pathname === '/search-professionals' && (
                    <ul className="absolute flex flex-col items-center gap-4 p-3 top-20 right-1 bg-[#CDCDCD]">
                        {botonesNavBarMatch.map((boton, index) => (
                            <li key={index} className="text-sm list-none hover:text-gray-700">{boton}</li>
                        ))}
                    </ul>
                )}
                {menu &&
                    (pathname === '/dashboard/professional' || pathname === `/professionalProfile/${id}` || pathname === '/dashboard/user') && (
                        <ul className="absolute flex flex-col items-center gap-4 p-3 top-20 right-1 bg-[#CDCDCD]">
                            <li className="text-sm list-none hover:text-gray-700">
                                <Link href="/">
                                    <button className="px-4 py-1 text-white rounded-md bg-[#5046E7] hover:bg-[#615ac2]">Cerrar Sesión</button>
                                </Link>
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
                                <li key={index} className="text-sm list-none hover:text-gray-700">{boton}</li>
                            ))}
                        </ul>
                    ) : (
                        <ul className="flex flex-row gap-10">
                            {botonesNavBarHomeLogeado.map((boton, index) => (
                                <li key={index} className="text-sm list-none hover:text-gray-700">{boton}</li>
                            ))}
                        </ul>
                    )}
                </div>
            )}

            {pathname === '/search-professionals' && (
                <div className="hidden lg:block">
                    <ul className="flex flex-row items-center gap-4 p-3">
                        {botonesNavBarMatch.map((boton, index) => (
                            <li key={index} className="text-sm list-none hover:text-gray-700">{boton}</li>
                        ))}
                    </ul>
                </div>
            )}

            {(pathname === '/dashboard/professional' || pathname === `/professionalProfile/${id}` || pathname === '/dashboard/user') && (
                <div className="hidden lg:block">
                    <Link href="/">
                        <button onClick={resetUserData} className="px-4 py-1 text-white rounded-md bg-[#5046E7] hover:bg-[#615ac2]">
                            Cerrar Sesión
                        </button>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Navbar;
